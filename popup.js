document.getElementById('authorize-btn').addEventListener('click', function () {
      chrome.identity.getAuthToken({ interactive: true }, function (token) {
            if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError.message);
                  return;
            }
            console.log('Access Token:', token);
            // 这里可以调用 API 或更新界面
            alert('Gmail Access Granted!');
      });
});
