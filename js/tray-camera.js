// tray-camera.js

document.addEventListener('DOMContentLoaded', async () => {
  console.log('トレイ撮影用カメラ起動開始');

  const videoElem = document.getElementById('tray-camera');
  const captureButton = document.getElementById('capture-button');

  let stream;

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }, // 背面カメラ
      audio: false
    });

    videoElem.srcObject = stream;
    await videoElem.play();

  } catch (err) {
    console.error('カメラ起動失敗:', err);
    alert('カメラを起動できませんでした。設定を確認してください。');
    return;
  }

  captureButton.addEventListener('click', () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoElem.videoWidth;
      canvas.height = videoElem.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);

      const imageDataUrl = canvas.toDataURL('image/png');

      // デモ用：撮った写真を別ウィンドウでプレビュー表示
      const previewWindow = window.open();
      previewWindow.document.write(`<img src="${imageDataUrl}" style="width:100%;">`);

    } catch (err) {
      console.error('撮影エラー:', err);
      alert('撮影できませんでした');
    }
  });
});
