// tray-camera.js

document.addEventListener('DOMContentLoaded', () => {
  console.log('トレイ撮影カメラ初期化開始');

  const html5QrCode = new Html5Qrcode("tray-reader");

  let captureImageDataUrl = null; // 撮影画像データ

  function onCaptureSuccess(decodedText, decodedResult) {
    // 今回はQR読み取り不要なので無視
  }

  function onCaptureError(errorMessage) {
    // エラーも無視
  }

  html5QrCode.start(
    { facingMode: "environment" },
    {
      fps: 10,
      qrbox: 250
    },
    onCaptureSuccess,
    onCaptureError
  ).catch(err => {
    console.error("カメラ起動エラー:", err);
    alert("カメラの起動に失敗しました。設定を確認してください。");
  });

  // 撮影ボタン処理
  const captureButton = document.getElementById('capture-button');
  captureButton.addEventListener('click', async () => {
    try {
      const canvas = document.querySelector('#tray-reader video').captureStream()
                      .getVideoTracks()[0]
                      .requestFrame()
                      .then(() => {
                        const video = document.querySelector('#tray-reader video');
                        const canvas = document.createElement('canvas');
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        captureImageDataUrl = canvas.toDataURL('image/png');

                        // 保存したデータURLを次の画面へ送るとかできる！

                        alert('撮影しました！（デモ：本番ではプレビュー画面へ）');
                      });
    } catch (err) {
      console.error('撮影エラー:', err);
      alert('撮影できませんでした');
    }
  });
});
