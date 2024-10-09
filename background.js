importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs');
importScripts('https://cdn.jsdelivr.net/gh/xenova/transformers.js/dist/transformers.min.js');

let model;

// Load model using a web worker
async function loadModel() {
  model = await transformers.loadModel('path/to/model'); // Update with actual path
  console.log('Model loaded successfully');
}

loadModel();

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed and ready');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'classifyEmail') {
    classifyEmail(message.emailContent).then((label) => {
      sendResponse({ label });
    });
    return true; // Indicates async response
  }
});

async function classifyEmail(content) {
  if (!model) {
    console.error('Model not loaded');
    return 'unknown';
  }
  const result = await model.classify(content);
  return result.label;
}
