# ⚡ n8n — Workflow Orchestration Platform

<div align="center">

🚀 **Build Automations • Orchestrate APIs • Connect Intelligence**

<br/>

![Next.js](https://img.shields.io/badge/Next.js-App_Router-black)
![tRPC](https://img.shields.io/badge/tRPC-TypeSafe-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![Inngest](https://img.shields.io/badge/Inngest-Workflows-purple)
![BetterAuth](https://img.shields.io/badge/Auth-BetterAuth-green)
![Polar](https://img.shields.io/badge/Payments-Polar-orange)

</div>

---

## 🎬 Live Workflow Builder

<div align="center">

<!-- 🔥 REPLACE THIS WITH YOUR OWN GIF -->
<!--![Demo](https://iconscout.com/lottie-animation/workflow-animation_12988731)-->

</div>

---

## 🌌 What is n8n?

**n8n** is a modern workflow orchestration SaaS that lets users visually design, execute, and monitor automations across APIs, AI models, and external services.

Think of it like:

🧩 Visual Automation Builder  
⚙️ Background Workflow Engine  
🤖 AI-Powered Nodes  
🔗 API Integrations  
💳 SaaS-Ready Billing  

---

## 🔥 Core Features

✔️ Drag-and-drop workflow editor  
✔️ Deterministic graph execution  
✔️ AI integrations (OpenAI / Gemini / Anthropic)  
✔️ API & service nodes (HTTP / Stripe / Discord / Slack)  
✔️ Dynamic variables via Handlebars  
✔️ Execution monitoring & status tracking  
✔️ Authentication & credential management  
✔️ Subscription & billing via Polar  
✔️ Workflow Editor → tRPC API → Execution Engine → Inngest → Node Executors → External Services

---

## 🏗️ How It Works

✔️ Workflows are stored as graphs  
✔️ Nodes execute in topological order  
✔️ Runs processed via event-driven background jobs  

---

## 🛠️ Tech Stack

**Frontend**
- Next.js (App Router)
- React
- React Flow
- Tailwind + ShadCN

**Backend**
- tRPC
- Prisma
- PostgreSQL (Neon)
- Inngest

**Auth & Payments**
- Better Auth
- Polar

**AI**
- OpenAI
- Gemini
- Anthropic

---
## 🚀 Getting Started

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
DATABASE_URL=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=


INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

POLAR_ACCESS_TOKEN=
POLAR_SUCCESS_URL=
POLAR_SERVER=
POLAR_PRODUCT_ID=

OPENAI_API_KEY=
GEMINI_API_KEY=
ANTHROPIC_API_KEY=

NEXT_PUBLIC_BASE_URL=
NGROK_URL=
INNGEST_BASE_URL=
NODE_ENV=
```

---

### 4️⃣ Prisma Setup

```bash
npx prisma migrate dev
npx prisma generate
```

---

### 5️⃣ Run Development Environment

This project uses **mprocs** to run multiple services concurrently.

```bash
npm run dev:all
```

This will start:

✔️ Next.js App  
✔️ Inngest Dev Server  
✔️ Any background workers / processes  

---

## 🧠 Alternative (Without mprocs)

If you prefer running processes manually:

**Terminal 1 – Next.js**

```bash
npm run dev
```

**Terminal 2 – Inngest**

```bash
npx inngest-cli@latest dev
```

(Ensure your local serve endpoint is configured correctly)

---

## ✨ Example Workflow

🧩 **Manual Trigger → 🤖 Gemini → 💬 Discord**

✔️ Ask AI a question  
✔️ Process response  
✔️ Send output to Discord automatically  

---

## 🎯 Project Goals

✔️ Build a SaaS-grade workflow orchestration engine  
✔️ Understand graph-based execution systems  
✔️ Explore event-driven architectures  
✔️ Integrate AI into automation pipelines  

---

## 👨‍💻 Author

**Fasi Owaiz Ahmed**

🚀 Full Stack AIML Engineer    
⚡ Systems • AI • SaaS • Architecture  

yes readme is made by chatgpt
---

<div align="center">

✨ **Build Automations. Orchestrate Intelligence.** ✨  

🚀⚙️🤖

</div>
