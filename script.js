const scanner = new Html5QrcodeScanner("scanner", { fps: 10, qrbox: 250 });
scanner.render(onScanSuccess);

function onScanSuccess(decodedText) {
  document.getElementById("result").innerText = "読み取り中…";

  // 📌 あなたのApps ScriptのURLに置き換えてね
  const scriptUrl = "https://script.google.com/macros/s/AKfycbwBWKho20e1J8zc0ZjMzCaapmS2cLWZ5GjzfDjR8McFkGE9RzYZMnBuGz39r5cLBT93/exec";

  fetch(`${scriptUrl}?id=${decodedText}`)
    .then(res => res.text())
    .then(result => {
      document.getElementById("result").innerText = result;
    })
    .catch(err => {
      console.error(err);
      document.getElementById("result").innerText = "通信エラーが発生しました。";
    });

  scanner.clear(); // 一度読み取ったらスキャンを止める
}
