// confirm.js

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Confirm画面ロード → Slack送信開始');

  const capturedImage = localStorage.getItem('capturedImage');
  if (!capturedImage) {
    console.error('撮影画像が見つかりません');
    return;
  }

  try {
    await fetch('あなたのプロキシURL', { // ←ここを必ずプロキシURLに
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: capturedImage,
        channel: 'あなたのチャンネルID' // 必要なら
      })
    });

    console.log('Slack送信成功！');
    // 成功したら一時データ削除
    localStorage.removeItem('capturedImage');

  } catch (error) {
    console.error('Slack送信エラー:', error);
  }
});
