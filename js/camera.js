// camera.js

// QRスキャン後の流れ管理
function handleQRScan(qrData) {
    console.log('QRスキャン成功:', qrData);

    // 次へ進むボタンを表示
    const nextButton = document.getElementById('next-button');
    if (nextButton) {
        nextButton.classList.remove('hidden');
    }
}

// ページロード時に初期化
document.addEventListener('DOMContentLoaded', () => {
    console.log('カメラ初期化開始');

    // ステータスエリアがなければ作成
    if (!document.getElementById('status')) {
        const statusElem = document.createElement('div');
        statusElem.id = 'status';
        document.body.appendChild(statusElem);
    }

    // QRスキャナー初期化を呼び出し
    initQRScanner(handleQRScan);
});
