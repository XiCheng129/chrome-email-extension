# Dump Your Inbox to AI

## Overview

"Dump Your Inbox to AI" is a Chrome extension that helps you manage your Gmail inbox efficiently. It uses AI to classify emails, summarize key information, and allows you to define custom rules for better inbox organization.

## Features

- **Gmail Authorization**: Authorize access to your Gmail inbox with OAuth 2.0.
- **Email Classification**: Uses machine learning models to classify emails based on their content.
- **Custom Rules**: Users can define their own classification rules by providing specific keywords.
- **Summarization**: Automatically summarize the key information in important emails (planned feature).

## Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/dump-your-inbox-to-ai.git
   ```

2. **Install Dependencies**
   Make sure you have the necessary dependencies in your `assets` folder, such as `transformers.js`.

3. **Update OAuth Client ID**
   Update the `manifest.json` file with your OAuth 2.0 client ID.

4. **Load Extension**
   - Go to `chrome://extensions/` in your browser.
   - Enable "Developer mode".
   - Click "Load unpacked" and select the extension folder.

## Usage

- Click the extension icon to open the popup.
- Authorize Gmail access using the "Authorize Gmail Access" button.
- Use the "View Unread Emails" button to view and classify unread emails.
- Define custom classification rules by entering a keyword and clicking "Add Rule".

## Technologies Used

- **Chrome Extensions API**
- **Gmail API**
- **JavaScript**: Frontend logic for user interactions.
- **TensorFlow.js**: For running AI models directly in the browser.
- **Transformers.js**: Provides pretrained transformer models for NLP tasks.

## Contributing

Contributions are welcome! If you have any ideas for new features or improvements, please create a pull request.

## License

This project is licensed under the MIT License.
