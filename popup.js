document.getElementById('authorize-btn').addEventListener('click', function () {
      chrome.identity.getAuthToken({ interactive: true }, function (token) {
            if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError.message);
                  return;
            }
            console.log('Access Token:', token);
            alert('Gmail Access Granted!');
      });
});

document.getElementById('view-emails-btn').addEventListener('click', function () {
      chrome.runtime.sendMessage({ action: "getUnreadEmails" }, function (response) {
            if (response && response.emails) {
                  alert(`You have ${response.emails.length} unread emails!`);
            } else {
                  console.error('Unable to fetch emails');
            }
      });
});
