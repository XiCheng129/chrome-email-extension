import { pipeline } from './assets/transformers.js';  // 引入 transformers.js

// 加载零样本分类和摘要生成模型
let classify;
let summarize;
(async () => {
      classify = await pipeline('zero-shot-classification', './assets/transformers.js');
      summarize = await pipeline('summarization', './assets/transformers.js');
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
                                    for (const message of data.messages) {
                                          const messageResponse = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`, {
                                                headers: {
                                                      'Authorization': `Bearer ${token}`
                                                }
                                          });
                                          const messageData = await messageResponse.json();
                                          const emailSnippet = messageData.snippet;

                                          // 使用 transformers.js 对邮件进行分类
                                          const labels = ["Important", "Normal", "Spam"];
                                          const result = await classify(emailSnippet, labels);
                                          const classification = result.labels[0];

                                          let summary = '';
                                          if (classification === 'Important') {
                                                summary = await summarize(emailSnippet);
                                          }

                                          emails.push({
                                                id: message.id,
                                                snippet: emailSnippet,
                                                classification: classification,
                                                summary: summary
                                          });
                                    }
                              }
                              sendResponse({ emails: emails });
                        })
                        .catch(error => {
                              console.error('Error fetching messages:', error);
                              sendResponse({ emails: [] });
                        });

                  return true;
            });
      }
});
