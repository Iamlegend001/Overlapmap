# 🎯 OverlapMap – Friend vs You Recommendation Explorer

[![Live Demo](https://img.shields.io/badge/Live-Demo-34D399?style=flat-square&logo=vercel)](https://overlapmap.vercel.app/)
[![GitHub Stars](https://img.shields.io/github/stars/Iamlegend001/Overlapmap?style=social)](https://github.com/Iamlegend001/Overlapmap)
[![MIT License](https://img.shields.io/badge/License-MIT-blue)](#license)

A beautifully animated web application that compares your favorite recommendations (books, movies, shows, etc.) with those of your friends or the community — visualized in an engaging **interactive overlap map**.

---

## 🌟 Features

🔵 **Interactive Visual Comparison**  
- Venn Diagram / Force-Directed Graph styles  
- Dynamic shared area shows mutual interests  
- Click/hover bubbles to explore item details  

📝 **Add Recommendations Easily**  
- Input titles, tags (genre, platform, etc.)  
- Add comments, ratings, cover images  

💬 **Friend Interaction**  
- Comment & react (🔥 😭 🧠 ❤️) on items  
- Add friends via username/code  

💡 **Smart Matching**  
- Real-time **Common Ground Score**  
- Filters by genre, rating, platform  

🛠️ **Explore & Save**  
- Drag items to your **Watchlist / Readlist**  
- Export maps as image or shareable link  

---

## 🚀 Live Demo

👉 [Click here to try OverlapMap](https://overlapmap.vercel.app/)

---

## 🖥️ Tech Stack

| Tech                | Purpose                        |
|---------------------|--------------------------------|
| **React.js**        | Frontend Framework             |
| **Vite**            | Lightning-fast Build Tool      |
| **Tailwind CSS**    | Utility-first Styling          |
| **Framer Motion**   | Animations & Transitions       |
| **Visx + D3.js**    | Interactive Graphs             |
| **Redux Toolkit**   | State Management               |
| **Howler.js**       | Optional Audio Feedback        |

---

## 📁 Folder Structure

src/
│
├── assets/ # Images, icons, and audio
├── components/ # Reusable UI components
├── features/ # Redux slices or modules
├── pages/ # Main pages/views
├── utils/ # Utility functions & constants
├── App.jsx
├── main.jsx
└── index.css

yaml
Copy
Edit

---

## 🧑‍💻 Getting Started

### Clone & Install

```bash
git clone https://github.com/Iamlegend001/Overlapmap.git
cd Overlapmap
npm install
Run Dev Server
bash
Copy
Edit
npm run dev
📦 Dependencies
react, react-dom

tailwindcss, framer-motion, d3, @visx/*

@reduxjs/toolkit, react-redux

clsx, lodash, dayjs, howler, react-icons

📝 License
This project is licensed under the MIT License.
Feel free to fork, contribute, and expand!

💬 Feedback
Have ideas or want to collaborate?
Open an issue or reach out at overlapmap.vercel.app

Built with 💛 by @Iamlegend001
