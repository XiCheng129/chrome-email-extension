chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "getUnreadEmails") {
            chrome.identity.getAuthToken({ interactive: true }, function (token) {
                  if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError.message);
                        return sendResponse({ emails: [] });
                  }

                  fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages?q=is:unread', {
                        headers: {
                              'Authorization': `Bearer ${token}`
                        }
                  })
                        .then(response => response.json())
                        .then(data => {
                              sendResponse({ emails: data.messages || [] });
                        })
                        .catch(error => {
                              console.error('Error fetching messages:', error);
                              sendResponse({ emails: [] });
                        });

                  // 必须返回 true 以表明 sendResponse 将异步调用
                  return true;
            });
      }
});
