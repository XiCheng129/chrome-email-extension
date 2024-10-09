import { pipeline } from './assets/transformers.js';  // 引入 transformers.js

// 加载零样本分类模型
let classify;
(async () => {
      classify = await pipeline('zero-shot-classification', './assets/transformers.js');
})();

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
                        .then(async data => {
                              const emails = [];
                              if (data.messages) {
                                    // 对每封未读邮件进行处理
                                    for (const message of data.messages) {
                                          const messageResponse = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`, {
                                                headers: {
                                                      'Authorization': `Bearer ${token}`
                                                }
                                          });
                                          const messageData = await messageResponse.json();

                                          // 获取邮件内容的片段（摘要）
                                          const emailSnippet = messageData.snippet;

                                          // 使用 transformers.js 对邮件进行分类
                                          const labels = ["Important", "Normal", "Spam"];
                                          const result = await classify(emailSnippet, labels);
                                          const classification = result.labels[0]; // 获取最高置信度的标签

                                          // 添加到邮件列表
                                          emails.push({
                                                id: message.id,
                                                snippet: emailSnippet,
                                                classification: classification
                                          });
                                    }
                              }
                              sendResponse({ emails: emails });
                        })
                        .catch(error => {
                              console.error('Error fetching messages:', error);
                              sendResponse({ emails: [] });
                        });

                  // 返回 true 表示 sendResponse 将异步调用
                  return true;
            });
      }
});
