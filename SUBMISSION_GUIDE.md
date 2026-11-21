# 🚀 PromptWars Virtual: Challenge 06 Submission & Deployment Guide

This guide provides exact steps for **Ashutosh Thakkar** to deploy AeroShield, submit to the Google for Developers PromptWars dashboard, and maximize your score for a **Top 400 rank**!

---

## 📋 Challenge 06 Problem Statement
> **"Build an Urban Air Quality Assistant to help families beat severe winter smog with personalized low-emission routines and indoor air hacks."**

---

## 🛠️ Step 1: Local Testing & Validation

1. Open your terminal in this project folder:
   ```bash
   npm run dev
   ```
2. Open your browser to `http://localhost:5173`.
3. Try these actions:
   - Click between preset stations (**New Delhi, Lahore, Beijing, Salt Lake City, Krakow, London**).
   - Test preset families (**The Sharma Family, The Zhang Family, The Kowalski Family**).
   - Click **"Generate AI Smog Routine"** to see personalized 24h schedules.
   - Use the **Corsi-Rosenthal Box Calculator** in the *Indoor Hacks Studio* tab.
   - Click **"Prompt Architecture"** in the top navigation to inspect the system prompts and JSON schemas.
   - Click **"Print Fridge Plan"** to verify the printable 1-page emergency action sheet.

---

## 🌐 Step 2: Instant 2-Minute Deployment (Get Your Deployment Link)

The PromptWars submission requires a live public deployment link. You can deploy this Vite React application for free in under 2 minutes:

### Option A: Deploy with Vercel (Recommended — 60 seconds)
1. Initialize a git repository and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: AeroShield Challenge 06 complete solution"
   ```
2. Push to your GitHub account:
   ```bash
   git remote add origin https://github.com/<your-username>/aeroshield-challenge06.git
   git branch -M main
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com) -> **Add New Project** -> Import your GitHub repository.
4. Click **Deploy**! (Vercel automatically detects Vite + React).
5. Copy your live URL (e.g., `https://aeroshield-challenge06.vercel.app`).

### Option B: Deploy via Vercel CLI directly from terminal:
```bash
npx vercel --prod
```

### Option C: Deploy with Firebase App Hosting or Netlify:
```bash
npx netlify deploy --prod --dir=dist
```

---

## 📤 Step 3: Make Your Submission on the Dashboard

1. Navigate to the **Google for Developers PromptWars Virtual** dashboard.
2. Select **Challenge 06: Urban Air Quality Assistant**.
3. Submit:
   - **Application Title**: `AeroShield - Urban Air Quality Assistant for Families`
   - **Deployment URL**: `https://your-deployment-link.vercel.app`
   - **Repository URL**: `https://github.com/your-username/aeroshield-challenge06`
   - **Problem Statement Alignment**:
     - *Personalized Low-Emission Routines*: 24h diurnal schedule decoupling family activities from peak temperature inversions.
     - *Indoor Air Hacks*: DIY Corsi-Rosenthal Box CADR calculator, wet-towel threshold barrier, negative-pressure kitchen zoning, damp mopping protocol.
     - *Prompt Engineering*: Transparent system instructions, clinical safety constraints, structured JSON schema, and Gemini 2.0 Flash integration with full zero-setup fallback.

---

## 📊 Step 4: Iteration & Rank Maximization Strategy

You have **3 total attempts**:
1. **Attempt 1**: Submit immediately with your live link to secure your baseline score on the leaderboard.
2. **Review Feedback**: The dashboard rubric evaluates:
   - **Code Quality & Build Integrity**: 100% clean TypeScript build, responsive UI, zero console errors.
   - **Prompt Engineering**: Documented in `PROMPT_ARCHITECTURE.md` and accessible via the in-app modal.
   - **Problem Statement Relevance**: Directly addresses winter smog, family vulnerability, low-emission routines, and indoor air hacks.
3. **Attempt 2 & 3**: If needed, refine prompt temperature or add custom family scenarios based on the evaluation scorecard to lock in your Swag Credits and Top 400 spot!
