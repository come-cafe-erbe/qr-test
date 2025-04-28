// tray-camera.js

document.addEventListener('DOMContentLoaded', async () => {
  console.log('トレイ撮影用カメラ起動開始');

  const videoElem = document.getElementById('tray-camera');
  const captureButton = document.getElementById('capture-button');
  const previewImage = document.getElementById('preview-image');

  let stream;

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
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

      // ★ここ！window.open()は絶対使わない！
      previewImage.src = imageDataUrl;
      previewImage.style.display = 'block';

    } catch (err) {
      console.error('撮影エラー:', err);
      alert('撮影できませんでした');
    }
  });
});
