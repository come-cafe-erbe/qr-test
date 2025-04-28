// tray-camera.js

document.addEventListener('DOMContentLoaded', async () => {
  console.log('トレイ撮影用カメラ起動開始');

  const videoElem = document.getElementById('tray-camera');
  const captureButton = document.getElementById('capture-button');
  const previewImage = document.getElementById('preview-image');
  const previewModal = document.getElementById('preview-modal');

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

      // ★モーダルに撮影画像を表示！
      previewImage.src = imageDataUrl;
      previewModal.style.display = 'flex';

      // ★3秒後に次のページへ！
      setTimeout(() => {
        window.location.href = 'confirm.html'; // 仮
      }, 3000);

    } catch (err) {
      console.error('撮影エラー:', err);
      alert('撮影できませんでした');
    }
  });
});
