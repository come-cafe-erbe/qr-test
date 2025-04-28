// confirm.js

document.addEventListener('DOMContentLoaded', async () => {
  const capturedImage = localStorage.getItem('capturedImage');
  if (!capturedImage) {
    console.error('撮影画像が見つかりません');
    return;
  }

  try {
    await fetch('プロキシURL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: capturedImage,
        channel: 'チャンネルID', // 必要なら
      })
    });

    console.log('Slack送信成功！');
    // 送信後、localStorage消しておく
    localStorage.removeItem('capturedImage');

  } catch (error) {
    console.error('Slack送信エラー:', error);
  }
});
