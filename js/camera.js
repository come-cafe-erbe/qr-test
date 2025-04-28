// camera.js

import QrScanner from './js/qr-scanner.js';  // ここを正しく！

const videoElem = document.getElementById('camera');
const nextButton = document.getElementById('next-button');

// ボタンは最初隠す
nextButton.classList.add('hidden');

// カメラ＆スキャナ準備
QrScanner.hasCamera().then(hasCamera => {
  if (hasCamera) {
    const qrScanner = new QrScanner(
      videoElem,
      result => {
        console.log('QRコード読み取り成功:', result.data || result); // バージョンによる違い
        nextButton.classList.remove('hidden'); // 成功したらボタン出す
        qrScanner.stop(); // 読み取れたらスキャナ停止（無限にスキャンしない）
      },
      {
        preferredCamera: 'environment' // 背面カメラ優先（スマホ/iPad対応）
      }
    );
    qrScanner.start();
  } else {
    alert('カメラが見つかりませんでした');
  }
});
