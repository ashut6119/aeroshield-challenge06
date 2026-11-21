# 🛡️ AeroShield: Prompt Architecture & GenAI Engineering
> **Submission for Google for Developers PromptWars Virtual — Challenge 06**
> **Theme**: Urban Air Quality Assistant for Families (Winter Smog, Low-Emission Routines & Indoor Hacks)

---

## 1. System Prompt & Persona Architecture

AeroShield relies on a multi-disciplinary expert persona designed specifically to avoid generic generic advice and deliver high-precision physics and clinical guidance.

```text
You are AeroShield, an expert Urban Environmental Health & Smog Defense AI Assistant built for Google for Developers PromptWars Challenge 06.
Your dual mission is:
1. Protect families from severe winter smog (PM2.5, PM10, thermal inversions) using evidence-based indoor hacks and clinical exposure mitigation.
2. Formulate personalized low-emission daily routines that minimize the household's contribution to urban air pollution.
```

### Core Knowledge & Physical Principles Enforced:
1. **Radiation Temperature Inversion**:
   Winter smog is primarily caused by cold nocturnal air trapped beneath a warm air lid (boundary layer inversion). Particulate matter concentration peaks at ground level between **06:00 AM – 09:00 AM** and **07:00 PM – 11:00 PM**.
2. **The Diurnal Trough**:
   Between **1:00 PM – 3:30 PM**, solar radiation temporarily warms the ground layer, causing vertical mixing and lowering localized PM2.5 by 30–45%. Indispensable transit and room air exchange are strictly shifted to this window.
3. **Clean Air Delivery Rate (CADR)**:
   Air purification is governed by CADR ($CFM = \frac{Volume \times ACH}{60}$). High-cost commercial purifiers can be matched or exceeded by DIY **Corsi-Rosenthal Boxes** (4x MERV-13 filters + 20" fan + cardboard shroud).
4. **Indoor Combustion & Cooking Aerosols**:
   High-heat oil frying generates indoor PM2.5 spikes exceeding $900\ \mu g/m^3$. Negative-pressure kitchen venting prevents contamination of living quarters.

---

## 2. Chain-of-Thought (CoT) Prompting Strategy

Before generating daily schedules, the model undergoes a 4-stage reasoning sequence:

```
[Vulnerability Indexing] -> [Diurnal Inversion Mapping] -> [Emission Decoupling] -> [Sanctuary CADR Sizing]
```

- **Stage 1 (Vulnerability)**: Children breathe 2–3x faster per kg than adults; elderly and asthmatic members suffer rapid bronchospasms. Weighting determines risk priority.
- **Stage 2 (Inversion)**: Correlates ground temperature, humidity, and wind speed to predict inversion ceiling collapse.
- **Stage 3 (Emission Decoupling)**: Identifies default high-emission family routines (e.g., idling car at school drop-off, burning garden leaves, morning frying) and replaces them with community-friendly low-emission alternatives.
- **Stage 4 (CADR Engineering)**: Prescribes room zoning, beginning with the 8-hour sleeping sanctuary.

---

## 3. Strict JSON Schema for Structured Output

To eliminate hallucination and guarantee 100% reliable UI rendering, the routine generation prompt enforces strict JSON schema:

```json
[
  {
    "id": "routine-1",
    "timeSlot": "06:00 AM - 07:30 AM",
    "phase": "morning",
    "title": "Dawn Inversion Trap Avoidance",
    "category": "ventilation",
    "smogRiskLevel": "hazardous",
    "defaultHabit": "Opening windows for fresh morning air and outdoor morning jogs",
    "lowEmissionRoutine": "Keep all windows clamped; run bedroom purifier on High",
    "healthHack": "Wedge damp rolled towel under exterior door thresholds to block heavy ground smog",
    "whyItMatters": "Radiation inversion locks cold toxic air in the lowest 100 meters of the atmosphere",
    "familyImpact": "Protects toddler lungs and asthmatic family members from severe bronchospasms"
  }
]
```

---

## 4. Medical & Safety Guardrails

- **Zero Tolerance for Toxic Hacks**: Explicit negative constraints forbid recommending ozone-generating ionizers, unsealed open brooms, burning camphor/dhoop, or untested herbal syrups.
- **Respirator Authenticity**: Strictly specifies N95 / KF94 / FFP2 respirators with sealed nose clips, explaining why cloth and surgical masks fail for sub-micron PM2.5.
- **Clinical Triage Thresholds**: Identifies pediatric red flags (retractions, stridor, hypoxemia) and instructs prompt emergency medical consult rather than home remedies.

---

## 5. Model Selection & Fallback Resilience

- **Gemini 2.0 Flash**: Delivers sub-second latency and exceptional structured schema adherence.
- **Gemini 1.5 Flash / Pro**: Full backward compatibility.
- **Contextual Fallback Engine**: If no API key is provided, a comprehensive rule-based synthesizer generates customized, scientifically grounded routines and chat responses for any test scenario, ensuring judges can evaluate the app instantly without setup hurdles.
