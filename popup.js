const customRules = [];

// 点击授权按钮事件
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

// 添加自定义规则
document.getElementById('add-rule-btn').addEventListener('click', function () {
      const keyword = document.getElementById('custom-keyword').value;
      if (keyword) {
            customRules.push(keyword);
            alert(`Rule added: ${keyword}`);
            document.getElementById('custom-keyword').value = ''; // 清空输入框
      }
});

// 查看未读邮件
document.getElementById('view-emails-btn').addEventListener('click', function () {
      chrome.runtime.sendMessage({ action: "getUnreadEmails" }, function (response) {
            if (response && response.emails) {
                  const emailListContainer = document.getElementById('email-list');
                  emailListContainer.innerHTML = ''; // 清空旧的列表

                  response.emails.forEach(email => {
                        let customClassification = email.classification;
                        // 根据用户定义的规则重新分类
                        customRules.forEach(rule => {
                              if (email.snippet.includes(rule)) {
                                    customClassification = "User Defined: Important";
                              }
                        });

                        const emailItem = document.createElement('div');
                        emailItem.className = 'email-item';
                        emailItem.innerHTML = `
          <p><strong>Snippet:</strong> ${email.snippet}</p>
          <p><strong>Classification:</strong> ${customClassification}</p>
        `;
                        emailListContainer.appendChild(emailItem);
                  });
            } else {
                  console.error('Unable to fetch emails');
            }
      });
});
