// camera.js

// QRスキャナーライブラリを読み込む（CDNでも、ローカルファイルでもOK）
import QrScanner from './js/qr-scanner.min.js'; // もしくはパスを適宜修正

// HTML要素取得
const videoElem = document.getElementById('camera');
const nextButton = document.getElementById('next-button');

// 最初はボタンを非表示にしておく
nextButton.classList.add('hidden');

// カメラ起動＋QR読み取り開始
QrScanner.hasCamera().then(hasCamera => {
  if (hasCamera) {
    const qrScanner = new QrScanner(
      videoElem,
      result => {
        console.log('QRコード読み取り成功:', result);
        // QRコードを読み取ったらボタン表示
        nextButton.classList.remove('hidden');
        qrScanner.stop(); // もうスキャンしなくてOKなら止める
      },
      {
        preferredCamera: 'environment' // スマホやiPadなら背面カメラ優先
      }
    );
    qrScanner.start();
  } else {
    alert('カメラが見つかりませんでした');
  }
});
