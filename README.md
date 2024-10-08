# Chrome Email AI Extension

## 项目描述
这是一个 Chrome 浏览器扩展程序，使用 AI 模型帮助用户管理 Gmail 收件箱，包括：
- **邮件分类**：根据用户自定义的规则或通过语言模型对邮件进行智能分类。
- **摘要生成**：为重要邮件生成 TL;DR 摘要。
- **自定义规则**：用户可以为邮件创建自己的分类规则。

## 准备工作

### 1. 工具和技术栈选择
- **Node.js 安装**：
  - 前往 [Node.js 官方网站](https://nodejs.org/) 下载并安装 LTS 版本。
  - 安装完成后，使用以下命令验证是否成功安装：
    ```bash
    node -v
    npm -v
    ```

- **Google 账号准备**：
  - 需要一个 Google 账号，用于访问 Gmail API。
  - 如果还没有账号，可以在 [Google 账号注册页面](https://accounts.google.com/signup) 注册一个。

### 2. Gmail API 准备
#### 2.1 注册 Google Cloud 项目
- 前往 [Google Cloud Console](https://console.developers.google.com/) 并使用 Google 账号登录。
- 创建一个新的项目，例如 **Chrome Email AI Extension**。

#### 2.2 启用 Gmail API
- 在 Google Cloud Console 中，导航到 **API & Services** -> **Library**。
- 搜索 **Gmail API** 并启用。

#### 2.3 创建 OAuth 2.0 凭证
- 在 **Credentials** 页面，创建 OAuth 2.0 凭证。
- 设置应用类型为 **Chrome App**，并保存生成的 **client_id** 和 **client_secret**。

### 3. 获取依赖
- 进入项目目录并运行以下命令初始化 npm：
  ```bash
  npm init -y
