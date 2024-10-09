chrome.identity.getAuthToken({ interactive: true }, function(token) {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError.message);
    return;
  }

  console.log('Access Token:', token);

  // 在这里可以使用 token 调用 Gmail API，例如获取未读邮件
  fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages?q=is:unread', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Unread messages:', data);
    })
    .catch(error => {
      console.error('Error fetching messages:', error);
    });
});
