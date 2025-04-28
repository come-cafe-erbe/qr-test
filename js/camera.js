// camera.js

document.addEventListener('DOMContentLoaded', () => {
  console.log('カメラ初期化開始');

  const html5QrCode = new Html5Qrcode("qr-reader");

  function onScanSuccess(decodedText, decodedResult) {
    console.log(`QRスキャン成功: ${decodedText}`);

    const nextButton = document.getElementById('next-button');
    if (nextButton) {
      nextButton.classList.remove('hidden');

      // ★ここで「次へ進む」ボタンを押したらtray.htmlに遷移
      nextButton.addEventListener('click', () => {
        window.location.href = 'tray.html';
      });
    }

    html5QrCode.stop().then(() => {
      console.log("QRコード読み取り終了");
    }).catch(err => {
      console.error("停止エラー:", err);
    });
  }

  function onScanError(errorMessage) {
    // スキャン失敗しても気にしない
  }

  html5QrCode.start(
    { facingMode: "environment" },
    {
      fps: 10,
      qrbox: 250
    },
    onScanSuccess,
    onScanError
  ).catch(err => {
    console.error("起動エラー:", err);
    alert("カメラの起動に失敗しました。設定を確認してください。");
  });
});
