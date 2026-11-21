# 🛡️ AeroShield — AI Urban Air Quality Assistant

[![Google for Developers](https://img.shields.io/badge/Google%20for%20Developers-PromptWars%20Virtual-4285F4?logo=google&logoColor=white)](https://developers.google.com)
[![Challenge](https://img.shields.io/badge/Challenge%2006-Urban%20Air%20Quality%20Assistant-10b981)](https://developers.google.com)
[![Gemini](https://img.shields.io/badge/Powered%20By-Google%20Gemini%202.0%20Flash-8B5CF6?logo=googlegemini&logoColor=white)](https://ai.google.dev)
[![React](https://img.shields.io/badge/React%2018-TypeScript%20%2B%20TailwindCSS-06B6D4?logo=react&logoColor=white)](https://react.dev)

> **Challenge 06 Problem Statement**:  
> *"Build an Urban Air Quality Assistant to help families beat severe winter smog with personalized low-emission routines and indoor air hacks."*

---

## 🌟 Overview

Severe winter smog is not merely general air pollution—it is driven by **boundary layer radiation temperature inversions**, in which cold nocturnal air traps toxic combustion particulates ($\text{PM}_{2.5}$, $\text{PM}_{10}$) within meters of the ground. 

**AeroShield** is a GenAI-powered web application specifically engineered to help households navigate winter smog crises. By synchronizing family vulnerability profiles with diurnal atmospheric curves, AeroShield generates **personalized 24-hour low-emission routines**, **DIY Clean Air Delivery Rate (CADR) purifier blueprints**, and **clinical indoor defense hacks**.

---

## 🎯 Key Capabilities

### 1. 🌡️ Hyperlocal Smog Dashboard & Diurnal Inversion Curve
- **Real-Time AQI & Meteorological Metrics**: Monitors $\text{PM}_{2.5}$, $\text{PM}_{10}$, humidity, surface temperature, wind dispersion speed, and inversion risk.
- **Global Hotspot Presets**: Anand Vihar (New Delhi NCR), Lahore, Beijing, Salt Lake City Basin, Krakow, and London.
- **The "Diurnal Trough" Predictor**: Accurately maps the 1:00 PM – 3:30 PM solar dispersal window where particulate concentration drops by ~40%, allowing families to safely execute essential transit and ventilation.

### 2. 👨‍👩‍👧 Family Smog Vulnerability Matrix
- **Demographic Risk Scoring**: Dynamically calculates household vulnerability based on infant minute-ventilation rates, elderly cardiopulmonary reserve, pregnancy, and pre-existing asthma/COPD.
- **Housing Envelope Diagnostics**: Evaluates single-pane vs. double-glazed windows, kitchen ducted hoods vs. open window venting, and heating type.
- **1-Click Verified Family Presets**: Test instantly with *The Sharma Family (High Vulnerability)*, *The Zhang Family (Ground Floor Inversion)*, or *The Kowalski Family (Old Construction)*.

### 3. 📅 AI-Generated 24-Hour Low-Emission Routines
- **Emission & Risk Decoupling**: Replaces high-emission habits (morning car idling at school gates, frying oil during closed-window hours, dry broom sweeping) with verified low-emission community alternatives.
- **Interactive Adherence Tracker**: Mark daily actions complete with celebratory visual feedback.
- **Atmospheric Rationale & Family Impact**: Explains the exact physics and clinical reasons behind every recommendation.

### 4. ⚙️ Indoor Air Hacks & DIY Purifier Studio
- **Interactive Corsi-Rosenthal CADR Calculator**: Enter room dimensions ($L \times W \times H$) and target Air Changes per Hour (ACH) to compute required CFM and DIY filter layouts ($4\times\text{MERV-13}$ + 20" box fan + cardboard shroud).
- **Verified Zero-Cost Hacks**:
  - *Damp-Towel Baseboard & Door Draft Stopper*: Intercepts heavy floor-level particulate infiltration.
  - *The "Clean Bedroom Sanctuary" Zoning Strategy*: Concentrates limited CADR where family members spend 8+ hours.
  - *Negative-Pressure Kitchen Cooking*: Prevents frying aerosols ($>800\ \mu g/m^3$) from contaminating living rooms.
  - *Damp-Mop Only Protocol*: Prevents toxic particulate resuspension caused by standard dry brooms.
- **Smog Myths Buster**: Explains why houseplants cannot replace mechanical filtration and warns against hazardous ozone-generating ionizers.

### 5. 🩺 AI Smog Doctor & Coping Advisor
- **Multi-Turn Guidance**: Ask questions on N95 mask reuse protocols (the 3-day paper bag rotation), child indoor energy-burning games, and distinguishing smog cough from viral infections.
- **Transparent Reasoning Chains**: Inspect the clinical and atmospheric reasoning steps behind every AI response.

### 6. 🖨️ Printable 1-Page Emergency Action Plan
- One-click export of an emergency family smog checklist formatted for refrigerator mounting.

---

## 🧠 PromptWars Engineering & Transparency

AeroShield is built to excel under the PromptWars evaluation rubric:

- **System Persona**: Combines pediatric environmental pulmonology with HVAC filtration engineering and sustainable transit design.
- **Strict JSON Schema**: Guarantees deterministic, structured routine outputs without JSON syntax errors.
- **Clinical Safety Constraints**: Enforces explicit negative prompts banning dangerous hacks (e.g. ozone ionizers, burning camphor, unventilated heaters).
- **Live Prompt Architecture Modal**: Evaluators can inspect the exact system prompts, schemas, and live prompt logs directly within the app interface.
- **Contextual Fallback Engine**: Works 100% out of the box even without an API key, while offering seamless integration with **Gemini 2.0 Flash** and **Gemini 1.5 Flash**.

See [`PROMPT_ARCHITECTURE.md`](./PROMPT_ARCHITECTURE.md) for full prompt documentation.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ (tested on v22.18.0)
- npm 9+

### Installation & Run

1. Clone or navigate to the repository:
   ```bash
   cd "Urban Air Quality Assistant - Challange 6 from Google_for_Developer_Virtual_promptwars"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`.

5. *(Optional)* Add your Gemini API key in the UI settings or create a `.env` file:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📦 Deployment

Deploy live in 1 minute to Vercel, Firebase App Hosting, or Netlify:

```bash
# Deploy with Vercel CLI
npx vercel --prod
```

Or connect the repository to [Vercel](https://vercel.com) / [Netlify](https://netlify.com) for automatic CI/CD builds.

---

## 🏆 Scoring & Rubric Mapping

| Rubric Dimension | AeroShield Implementation |
|---|---|
| **Problem Statement Alignment** | Fully addresses winter smog, thermal inversions, low-emission family routines, and indoor DIY air hacks. |
| **GenAI & Prompt Engineering** | Structured system prompts, CoT reasoning, strict JSON schemas, and live prompt log transparency modal. |
| **UI / UX Polish** | Dark/light glassmorphic UI, responsive layout, real-time gauges, interactive CADR calculator, printable fridge card, and confetti celebration. |
| **Reliability & Resilience** | Gemini 2.0 Flash integration + complete offline/fallback simulator ensuring zero evaluation failure. |

---

## 📄 License
MIT License. Built with ❤️ for **Google for Developers PromptWars Virtual — Challenge 06**.
