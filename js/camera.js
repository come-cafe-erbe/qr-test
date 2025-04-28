document.addEventListener('DOMContentLoaded', () => {
  console.log('カメラ初期化開始');

  const html5QrCode = new Html5Qrcode("qr-reader");
  const nextButton = document.getElementById('next-button');

  nextButton.addEventListener('click', () => {
    console.log('次へ進むボタンが押された！');
    window.location.href = 'tray.html';
  });

  function onScanSuccess(decodedText, decodedResult) {
    console.log(`QRスキャン成功: ${decodedText}`);
    nextButton.classList.remove('hidden'); // QR読み取り後にボタンを出す

    html5QrCode.stop().then(() => {
      console.log("QRコード読み取り終了");
    }).catch(err => {
      console.error("停止エラー:", err);
    });
  }

  function onScanError(errorMessage) {
    // スキャン失敗しても無視
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
