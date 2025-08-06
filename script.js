import QrScanner from "./qr-scanner.min.js";

const video = document.getElementById("video");
const message = document.getElementById("message");

const scanner = new QrScanner(video, result => {
  console.log("✅ QRコード読み取り: ", result);
  scanner.stop();  // 読み取ったら止める

  // GASのURL（←あなたのに変えてね！）
  const gasURL = `https://script.google.com/macros/s/AKfycbwBWKho20e1J8zc0ZjMzCaapmS2cLWZ5GjzfDjR8McFkGE9RzYZMnBuGz39r5cLBT93/exec?id=${encodeURIComponent(result)}`;

  fetch(gasURL)
    .then(res => res.text())
    .then(text => {
      message.textContent = text;
    })
    .catch(err => {
      console.error("通信エラー", err);
      message.textContent = "❌ 通信エラーが発生しました。";
    });
});

scanner.start();
