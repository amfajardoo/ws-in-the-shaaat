# WsInTheShaaat 🚀

**WsInTheShaaat** is a modern, real-time chat application built with Angular, Firebase, and TailwindCSS. Connect, chat, and share in a sleek, WhatsApp-inspired interface—right from your browser.

---

## ✨ Features

- **Google Authentication** – Secure sign-in with your Google account.
- **Contact Management** – Add contacts by email and see your friends list.
- **1:1 Real-Time Chat** – Instant messaging with live updates.
- **Responsive UI** – Beautiful, mobile-friendly design powered by TailwindCSS.
- **Server-Side Rendering (SSR)** – Fast loads and SEO-friendly.
- **Loading Animations** – Smooth session transitions for a premium feel.

---

## 🚦 Quick Start

1. **Clone the repo:**
   ```sh
   git clone https://github.com/your-username/ws-in-the-shaaat.git
   cd ws-in-the-shaaat
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure Firebase:**
   - Update your Firebase credentials in [`src/app/app.config.ts`](src/app/app.config.ts).

4. **Run the dev server:**
   ```sh
   npm start
   ```
   Visit [http://localhost:4200](http://localhost:4200) to chat!

---

## 🛠️ Scripts

- **Start Dev Server:**  
  `npm start`

- **Build for Production:**  
  `npm run build`

- **SSR Mode:**  
  `npm run serve:ssr:ws-in-the-shaaat`

- **Run Unit Tests:**  
  `npm test`

---

## 🗂️ Project Structure

- [`src/app/`](src/app/) – Main app code (components, pages, repositories)
- [`src/app/components/chat/`](src/app/components/chat/) – Chat UI and logic
- [`src/app/pages/home/`](src/app/pages/home/) – Home/dashboard page
- [`src/app/pages/login/`](src/app/pages/login/) – Login page
- [`src/app/repositories/`](src/app/repositories/) – Data access (users, contacts, chats)
- [`public/`](public/) – Static assets

---

## 🤝 Contributing

Pull requests and issues are welcome! Please open an issue to discuss your idea or bug before submitting a PR.

---

> Made with ❤️ using Angular, Firebase, and