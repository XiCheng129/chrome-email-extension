document.addEventListener('DOMContentLoaded', function () {
  const authorizeButton = document.getElementById('authorize-btn');
  const viewEmailsButton = document.getElementById('view-emails-btn');
  const addRuleButton = document.getElementById('add-rule-btn');
  const rulesList = document.getElementById('rules-list');
  const emailList = document.getElementById('email-list');

  authorizeButton.addEventListener('click', function () {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log('Authorization successful:', token);
      }
    });
  });

  viewEmailsButton.addEventListener('click', async function () {
    // TODO: Add Gmail API call to fetch unread emails and display them.
    console.log('View Emails button clicked');
  });

  addRuleButton.addEventListener('click', function () {
    const keyword = document.getElementById('custom-keyword').value;
    if (keyword) {
      const ruleElement = document.createElement('div');
      ruleElement.textContent = keyword;
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.onclick = () => ruleElement.remove();
      ruleElement.appendChild(removeButton);
      rulesList.appendChild(ruleElement);
    }
  });
});
