import { AirQualityData, FamilyProfile } from '../types';

export const SYSTEM_INSTRUCTION_SMOG_ASSISTANT = `You are AeroShield, an expert Urban Environmental Health & Smog Defense AI Assistant built for Google for Developers PromptWars Challenge 06.
Your dual mission is:
1. Protect families from severe winter smog (PM2.5, PM10, thermal inversions) using evidence-based indoor hacks and clinical exposure mitigation.
2. Formulate personalized low-emission daily routines that minimize the household's contribution to urban air pollution.

Core Knowledge & Physical Principles:
- Boundary Layer Temperature Inversion: Winter nighttime and early morning (6 AM - 9 AM) and evening (7 PM - 11 PM) have cold stagnant air trapping particulate matter close to the ground. Outdoor activities during these times cause extreme alveolar deposition of PM2.5.
- Diurnal Trough: Around 1:00 PM to 3:30 PM, solar radiation warms the surface layer, breaking the inversion and creating vertical air mixing. This is the optimal window for indispensable outdoor commutes or urgent ventilation.
- CADR & Filtration: MERV-13 and True HEPA filters capture particles <0.3 to 2.5 microns. Ionizers and ozone-generating "purifiers" are harmful and MUST be explicitly warned against.
- Cooking Aerosols: Indoor frying and searing produce PM2.5 concentrations exceeding 800 µg/m³. Proper negative-pressure kitchen zoning is vital.
- Vulnerable Groups: Children (under 12) have higher minute-ventilation rates per kg; elderly (65+) and those with asthma/COPD face heightened systemic inflammation and cardiac stress.

Safety & Medical Guardrails:
- Do NOT prescribe prescription medications (steroids, bronchodilators) without advising physician consult.
- Warn against dangerous traditional practices (burning camphor/incense for "cleansing", open indoor coal fires).
- Always recommend certified N95 / FFP2 / KF94 respirators; explain why cloth/surgical masks fail to filter sub-micron PM2.5.`;

export function buildRoutinePrompt(profile: FamilyProfile, aqi: AirQualityData): string {
  return `Generate a comprehensive, personalized 24-hour Winter Smog Defense & Low-Emission Daily Routine for the following household:

FAMILY VULNERABILITY PROFILE:
- Household Nickname: "${profile.familyNickname}"
- City / Region: ${profile.city}
- Household Size: ${profile.householdMembers} people
- High Vulnerability Groups:
  * Infant/Toddler (0-5 yrs): ${profile.hasInfantsOrToddlers ? 'YES' : 'NO'}
  * School Children (6-15 yrs): ${profile.hasSchoolChildren ? 'YES' : 'NO'}
  * Elderly Members (65+ yrs): ${profile.hasElderly ? 'YES' : 'NO'}
  * Pregnancy: ${profile.hasPregnancy ? 'YES' : 'NO'}
- Respiratory / Allergy History: ${profile.respiratoryConditions.join(', ') || 'None reported'}
- Pets: ${profile.hasPets ? `Yes (${profile.petType || 'Domestic'})` : 'None'}
- Home Infrastructure:
  * Structure: ${profile.homeType}
  * Window Sealing: ${profile.windowDraftLevel}
  * Kitchen Exhaust: ${profile.kitchenSetup}
  * Heating Method: ${profile.heatingType}
  * Active Air Purifiers: ${profile.purifierCount}
  * Budget Constraints: ${profile.budgetTier}
  * Current Commute Method: ${profile.commuteMode}

CURRENT METEOROLOGICAL & SMOG STATUS:
- Real-time AQI: ${aqi.aqi} (${aqi.severityLabel})
- Primary Pollutant: PM2.5 at ${aqi.pm25} µg/m³ (WHO 24h safe limit is 15 µg/m³)
- PM10: ${aqi.pm10} µg/m³, NO2: ${aqi.no2} ppb
- Ground Temperature: ${aqi.tempC}°C, Humidity: ${aqi.humidity}%, Wind: ${aqi.windSpeedKmh} km/h
- Inversion Warning: ${aqi.inversionRisk.toUpperCase()} risk of thermal ceiling trapping surface emissions.

INSTRUCTIONS:
1. Provide a step-by-step 24-hour schedule (Morning 06:00-09:00, Midday 09:00-13:00, Afternoon 13:00-17:00, Evening 17:00-21:00, Night 21:00-06:00).
2. For each time block, contrast the "Default High-Emission / High-Risk Habit" with the "AeroShield Low-Emission Routine & Health Hack".
3. Specifically address:
   - Avoiding cold morning transit spikes & safe school drop-off protocol.
   - Shifting cooking methods to prevent indoor PM2.5 spikes.
   - Indoor physical exercise/play hacks for children without smog exposure.
   - Air purifier cycling schedule and bedroom sanctuary sealing.
   - Low-emission household decisions (zero waste burning, carpool grouping, clean heating).
4. Output as a valid JSON array of RoutineItem objects with fields:
   id, timeSlot, phase, title, category, smogRiskLevel ('low'|'moderate'|'high'|'hazardous'), defaultHabit, lowEmissionRoutine, healthHack, whyItMatters, familyImpact.`;
}

export function buildAdvisorPrompt(
  userQuestion: string,
  profile: FamilyProfile,
  aqi: AirQualityData,
  chatHistory: { role: string; content: string }[]
): string {
  const historyText = chatHistory
    .slice(-6)
    .map(m => `${m.role.toUpperCase()}: ${m.content}`)
    .join('\n');

  return `Current Family Profile: ${profile.familyNickname} in ${profile.city}.
Current Local Air Quality: AQI ${aqi.aqi} (${aqi.severityLabel}), PM2.5 ${aqi.pm25} µg/m³, Inversion: ${aqi.inversionRisk}.
Vulnerable members: ${[
    profile.hasInfantsOrToddlers && 'Infant/Toddler',
    profile.hasElderly && 'Elderly (65+)',
    profile.hasPregnancy && 'Pregnant',
    profile.respiratoryConditions.length > 0 && `Conditions: ${profile.respiratoryConditions.join(', ')}`
  ].filter(Boolean).join(' | ')}.
Home details: ${profile.homeType}, ${profile.windowDraftLevel}, ${profile.purifierCount} purifiers.

Recent Conversation:
${historyText}

User Query:
"${userQuestion}"

Respond with high medical precision, actionable DIY engineering, and compassionate family-first guidance. Keep answers structured, practical, and clear.`;
}

export function buildEmergencyActionPlanPrompt(profile: FamilyProfile, aqi: AirQualityData): string {
  return `Create a concise, 1-page "Emergency Winter Smog Survival Card" suitable for printing and sticking on the family refrigerator.
Current local status: AQI ${aqi.aqi} (${aqi.severityLabel}), PM2.5 ${aqi.pm25} µg/m³, Inversion: ${aqi.inversionRisk}.
Include:
1. Golden Rules for Tomorrow (Top 3 actions).
2. High-Risk Vulnerability Warnings tailored for ${profile.familyNickname}.
3. The "Bedroom Clean Sanctuary" checklist.
4. N95 Mask Fit & Donning Protocol for children and adults.
5. Air-clearing cooking and ventilation rules during peak inversion.
Output structured markdown.`;
}
