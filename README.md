🌱 Dashboard

A modern, extendable **Next.js UI Dashboard** built for testing, learning & scaling.


## 🚀 Features

| Feature                   | Description                                      |
| ------------------------- | ------------------------------------------------ |
| ⚡ Next.js 14 (App Router) | Fast, file-based routing & server rendering      |
| 🎨 Global CSS Layout      | Clean structure & easy styling from one place    |
| 🧭 Multi-Page Navigation  | Includes example routing from Home → Second Page |
| 🔍 Cypress E2E Testing    | Pre-configured navigation test included          |
| 🔥 Optimized for Growth   | Add pages, components & deployments easily       |


## 📦 Requirements

Before starting, ensure you have:

### 🟢 Node.js (Required)

| Download                                 | Version Recommended |
| ---------------------------------------- | ------------------- |
| [https://nodejs.org](https://nodejs.org) | `18+` or `20+`      |

Check if installed:

```bash
node -v
npm -v
```

If you see versions → you're ready.
If not → install Node first.

---

## 🛠 Installation & Setup

### 1️⃣ Clone or Download Project

```bash
git clone <repository-url>
cd soilscout_prototype
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start Local Dev Server

```bash
npm run dev
```

Your site is now live on 👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🗂 Project Structure

```
📦 XXXXXX
 ├─ app/
 │  ├─ page.js        → Home Page
 │  ├─ secondPage/    → Example 2nd Page
 │  │  └─ page.js  
 │  ├─ layout.js      → Root layout + global wrapper
 │  ├─ globals.css    → Global styles & layout visuals
 ├─ public/           → Images & static files
 ├─ cypress/e2e/      → End-to-End tests
```


## 🔍 Testing with Cypress

### Install Cypress

```bash
npm install cypress --save-dev
npx cypress open
```

### Run tests

```bash
npx cypress open
```

---

## 🌍 Deployment Options

| Platform      | Recommended  | Notes                             |
| ------------- | ------------ | --------------------------------- |
| **Vercel**    | 🏆 Best      | Instant & automatic for Next.js   |
| GitHub Pages  | ❗ Limited    | Not ideal for App Router apps     |
| Static Export | Experimental | Must configure `output: "export"` |

### Deploy to Vercel

```bash
npm i -g vercel
vercel

## ⭐ Final Notes

Happy building — you now have:

✔ Next.js boilerplate
✔ Routing system
✔ Cypress tests

