import { AirQualityData, FamilyProfile, RoutineItem } from '../types';

/**
 * Generates a deeply tailored 24-hour winter smog defense routine when offline or without an API key.
 */
export function generateContextualFallbackRoutine(
  profile: FamilyProfile,
  aqi: AirQualityData
): RoutineItem[] {
  const isSevere = aqi.aqi > 300;
  const hasKids = profile.hasInfantsOrToddlers || profile.hasSchoolChildren;
  const hasSeniors = profile.hasElderly;
  const hasAsthma = profile.respiratoryConditions.some(
    (c) => c.toLowerCase().includes('asthma') || c.toLowerCase().includes('copd')
  );

  return [
    {
      id: 'routine-1',
      timeSlot: '06:00 AM - 07:30 AM',
      phase: 'morning',
      title: 'Dawn Wake-Up & Inversion Ground-Trap Avoidance',
      category: 'ventilation',
      smogRiskLevel: 'hazardous',
      defaultHabit: 'Opening windows for "fresh morning air" and morning park walks or jogs.',
      lowEmissionRoutine: 'Keep all windows clamped shut. Do NOT idle vehicles or burn waste. Run home radiator on low steady setting instead of sudden burst.',
      healthHack: 'Inversion ceiling is lowest right now. Turn bedroom purifier to Turbo. Do not send seniors or asthmatic family members onto open balconies.',
      whyItMatters: 'Radiation inversion holds cold, dirty air within 100 meters of the earth surface. Morning air is currently the most toxic of the entire 24h cycle.',
      familyImpact: hasSeniors || hasAsthma ? 'Crucial: Prevents morning bronchospasms and cardiac stress.' : 'Protects resting lungs from sub-micron soot.'
    },
    {
      id: 'routine-2',
      timeSlot: '07:30 AM - 09:00 AM',
      phase: 'morning',
      title: 'School Transit & Commute Low-Emission Decoupling',
      category: 'commute',
      smogRiskLevel: 'high',
      defaultHabit: 'Individual solo car trips, idling engine with heater on in front of school gates, or two-wheeler bike drop-offs without sealed masks.',
      lowEmissionRoutine: 'Consolidate school runs via neighbor carpooling or electric metro. Strict "Zero Engine Idling" in school parking zones to protect waiting kids.',
      healthHack: 'Equip children with adjustable N95 / KF94 masks with nose-wire molded to face. Normal cloth masks or neck gaiters leak 70%+ of PM2.5.',
      whyItMatters: 'School gate congestion creates localized PM2.5 spikes up to 4x higher than background city levels due to cold exhaust idling.',
      familyImpact: hasKids ? 'Protects school-age children from concentrated exhaust in drop-off zones.' : 'Reduces traffic emissions during peak congestion.'
    },
    {
      id: 'routine-3',
      timeSlot: '11:30 AM - 01:30 PM',
      phase: 'midday',
      title: 'Negative-Pressure Cooking & Lunch Prep',
      category: 'cooking',
      smogRiskLevel: 'moderate',
      defaultHabit: 'High-heat deep frying or tadka/searing with open kitchen doors, allowing smoke into living areas.',
      lowEmissionRoutine: 'Shift heavy cooking to solar/electric methods (induction, pressure cookers, air fryers). Use lids on all pans to trap oil aerosols.',
      healthHack: 'Run kitchen exhaust at high speed 2 minutes before igniting burners. Keep kitchen door shut to create negative pressure preventing spread to bedrooms.',
      whyItMatters: 'Frying oil generates acrolein and ultrafine PM0.1 particles that exceed 900 µg/m³ indoors, rivaling the worst outdoor smog.',
      familyImpact: 'Keeps common living spaces clean and prevents indoor respiratory irritation.'
    },
    {
      id: 'routine-4',
      timeSlot: '01:30 PM - 03:30 PM',
      phase: 'afternoon',
      title: 'The "Diurnal Trough" Window: Commutes & Damp Cleaning',
      category: 'indoor_exercise',
      smogRiskLevel: 'low',
      defaultHabit: 'Dry sweeping with broom or running standard non-HEPA vacuum cleaner.',
      lowEmissionRoutine: 'Perform necessary outdoor errands now if unavoidable. Use damp microfiber mop with water—never dry sweep which aerosolizes settled PM2.5.',
      healthHack: 'Solar heating temporarily breaks the thermal inversion ceiling between 1:30 PM and 3:30 PM. AQI is at its lowest daily level.',
      whyItMatters: 'Vertical wind dispersion is strongest right now. PM2.5 drops by 30-40% compared to morning rush hour.',
      familyImpact: 'Safe window for brisk indoor movements or rapid errands with minimal exposure.'
    },
    {
      id: 'routine-5',
      timeSlot: '05:30 PM - 07:30 PM',
      phase: 'evening',
      title: 'Evening Inversion Lock & Kid Energy Burn',
      category: 'school_kids',
      smogRiskLevel: 'high',
      defaultHabit: 'Outdoor park play, evening jogging, outdoor sports coaching, burning autumn leaves/paper in yard.',
      lowEmissionRoutine: 'Strict ban on yard/waste burning. Switch to indoor cooperative family games (living room agility course, balloon keep-up).',
      healthHack: 'Wipe kids faces, hands, and rinse nostrils with saline solution upon return from school/work to remove trapped particulates.',
      whyItMatters: 'As sun sets, ground cools rapidly. Ground air temperature drops below atmospheric layer, re-trapping city vehicle exhaust.',
      familyImpact: hasKids ? 'Burns toddler and kid energy safely indoors without heavy outdoor particulate respiration.' : 'Protects respiratory recovery.'
    },
    {
      id: 'routine-6',
      timeSlot: '09:00 PM - 06:00 AM',
      phase: 'night',
      title: 'Sealed Bedroom Sanctuary Overnight Rest',
      category: 'purifier_control',
      smogRiskLevel: isSevere ? 'hazardous' : 'high',
      defaultHabit: 'Purifiers left in large living room on auto mode while family sleeps in unpurified bedrooms with open bedroom doors.',
      lowEmissionRoutine: 'Consolidate sleeping into 1 or 2 rooms if purifiers are limited. Keep bedroom door closed to preserve cleaned air pocket.',
      healthHack: 'Position DIY Corsi-Rosenthal box or HEPA unit 4 feet from headboards. Wedge a damp rolled towel under the bedroom door threshold.',
      whyItMatters: 'Sleeping takes 8 hours—representing 33% of daily exposure. A sealed bedroom with CADR creates an oasis of PM2.5 < 15 µg/m³.',
      familyImpact: 'Enables restorative sleep, clears alveolar macrophage inflammation, and guarantees safety for vulnerable members.'
    }
  ];
}

/**
 * Provides evidence-based offline medical and DIY advice when the Gemini API is unconfigured or unavailable.
 */
export function getIntelligentFallbackAdvice(
  question: string,
  profile: FamilyProfile,
  aqi: AirQualityData
): { text: string; reasoning?: string[] } {
  const q = question.toLowerCase();

  let text = '';
  if (q.includes('mask') || q.includes('n95') || q.includes('cloth')) {
    text = `### 🛡️ N95 & Respirator Protocol for Severe Winter Smog (AQI ${aqi.aqi})

1. **Why Cloth & Surgical Masks Fail**:
   Standard cloth masks and flat blue surgical masks have a loose perimeter seal and filtration ratings below 30% for PM2.5. Sub-micron particles simply flow around the cheeks and nose bridge.
2. **Recommended Standards**:
   - For Adults: **N95 (NIOSH)**, **FFP2 (EN 149)**, or **KF94 (Korean standard)**.
   - For Children: Seek certified **KF94 Kids** or **N95 small-size** with an integrated adjustable nose wire.
3. **The 3-Day Rotation Reuse Hack**:
   Do NOT wash N95 masks with water or alcohol (it destroys the electrostatic charge). Instead, maintain 3 brown paper bags labeled Day 1, Day 2, Day 3. Storing a used mask in a breathable paper bag for 72 hours naturally dries viruses and bacteria while preserving filtration efficiency for 40+ hours of cumulative wear.
4. **Fit Check Rule**:
   Cup your hands over the mask and inhale sharply. The mask should slightly collapse inward without air hissing across your eyes or cheeks.`;
  } else if (q.includes('plant') || q.includes('nasa') || q.includes('snake plant') || q.includes('aloe')) {
    text = `### 🌿 Indoor Plants vs. Winter Smog: Science vs. Myth

1. **The NASA Study Context**:
   The famous 1989 NASA Clean Air study tested plants in sealed, airless 1-cubic-meter chambers over several days for volatile organic compounds (benzene, formaldehyde).
2. **The Reality with PM2.5 Smog**:
   - Plants do **NOT** filter particulate matter (PM2.5 / PM10) efficiently. They cannot replace a mechanical HEPA or MERV-13 air filter.
   - To match a modest DIY Corsi-Rosenthal box (CADR 400 CFM), you would need between **600 to 1,000 indoor plants** in a standard living room!
3. **Winter Smog Plant Risks**:
   Overwatering indoor plants in winter increases indoor relative humidity above 60%, creating a prime breeding ground for **Aspergillus mold and dust mites**, worsening asthma in cold drafty homes.
4. **Best Strategy**:
   Enjoy 2-3 Snake Plants or Spider Plants for mental wellness and slight VOC buffering, but rely on mechanical MERV-13/HEPA filtration for smog defense.`;
  } else if (q.includes('diy') || q.includes('corsi') || q.includes('filter') || q.includes('box fan')) {
    text = `### ⚙️ DIY Corsi-Rosenthal Box Air Purifier: Blueprint

1. **Performance Specs**:
   - CADR: ~420 CFM (Matches or beats $600 commercial HEPA purifiers).
   - Cost: ~$50 - $70 (₹4,000 - ₹5,500).
   - Noise: Whisper-quiet on Medium speed.
2. **Required Materials**:
   - 1x 20-inch Box Fan
   - 4x MERV-13 furnace filters (20" x 20" x 1" or 2")
   - 1x Cardboard shroud (20" x 20" with 14" center circle cutout)
   - Duct tape or gorilla tape
3. **Golden Engineering Rule**:
   Always attach the **circular cardboard shroud** to the front of the fan! Box fan blades lose static pressure at the corner tips due to air recirculation. The shroud increases net Clean Air Delivery Rate by nearly **45%** without increasing electricity consumption!`;
  } else if (q.includes('cough') || q.includes('symptom') || q.includes('doctor') || q.includes('throat')) {
    text = `### 🩺 Smog Exposure Symptoms & Clinical Triage

During current conditions in ${profile.city} (AQI ${aqi.aqi}, PM2.5 ${aqi.pm25} µg/m³), the respiratory tract experiences direct oxidative stress:

- **Common Benign Smog Irritation**:
  * Dry, scratchy throat, burning eyes, mild morning hack, clear nasal discharge.
  * *Relief Hack*: Saline nasal spray/rinse morning and evening, warm water hydration, warm steam inhalation with plain water (never add harsh essential oils or camphor).
- **⚠️ Red Flag Symptoms (Seek Medical Attention Promptly)**:
  * Persistent wheezing or chest tightness unresponsive to prescribed rescue inhalers.
  * Retractions in infants (ribcage pulling in hard during breathing, nasal flaring).
  * High fever (>101°F / 38.3°C) or rust-colored / yellow-green sputum.
  * Extreme lethargy or blueish tint around lips/fingertips (hypoxemia).`;
  } else {
    text = `### 🛡️ AeroShield Family Guidance for ${profile.familyNickname}

Given current conditions in **${profile.city}** (AQI ${aqi.aqi} - **${aqi.severityLabel}**, Inversion: **${aqi.inversionRisk}**):

1. **Immediate Indoor Protection**:
   - Establish a **Clean Bedroom Sanctuary**: Run your air purifier in the primary sleeping room with the door shut.
   - Place a damp rolled towel along the bottom gap of the main entry door to block street-level particulate seepage.
2. **Low-Emission Commute Adjustments**:
   - Avoid two-wheeler or walking commutes between 06:30 AM and 09:00 AM when the temperature inversion holds exhaust at ground level.
   - If travel is essential, group trips around 01:30 PM - 03:30 PM when the inversion boundary breaks.
3. **Child & Vulnerability Care**:
   ${profile.hasSchoolChildren ? '- Keep school-age kids indoors during evening smog spikes (after 5 PM); replace outdoor play with living room obstacle courses.' : ''}
   ${profile.respiratoryConditions.length > 0 ? `- Ensure prescribed inhalers/spacers are clean and readily accessible for ${profile.respiratoryConditions.join(', ')}.` : ''}`;
  }

  return {
    text,
    reasoning: [
      `Assessed current AQI (${aqi.aqi}) and temperature inversion ceiling in ${profile.city}`,
      `Filtered advice for family profile: ${profile.familyNickname}`,
      `Applied evidence-based particulate filtration and low-emission guidance`
    ]
  };
}

/**
 * Generates a fallback 1-page printable emergency smog survival plan.
 */
export function getFallbackEmergencyPlan(profile: FamilyProfile, aqi: AirQualityData): string {
  return `# 🚨 AeroShield Family Smog Survival Action Plan
**Target Household**: ${profile.familyNickname} | **Location**: ${profile.city}
**Current Severe Smog Index**: AQI ${aqi.aqi} (${aqi.severityLabel}) | **Primary Threat**: PM2.5 ${aqi.pm25} µg/m³

---

### 🌟 3 Golden Rules for Tomorrow
1. **Zero Open Windows During Inversion (6 AM - 10 AM & 6 PM - 10 PM)**: The cold ground layer is saturated with toxic particulates. Keep all apertures clamped tight.
2. **Enforce the "Clean Bedroom Sanctuary"**: Keep bedroom doors closed 24/7. Run your purifier or DIY fan box inside this room for sleep restoration.
3. **Damp Mop Only (No Dry Brooms)**: Never dry sweep floors during smog alerts; dry brooms resuspend settled sub-micron dust straight into breathing zones.

---

### 👨‍👩‍👧 Family Vulnerability Checklist
- **Infant / Child Care**: Keep indoors during morning/evening commute spikes. For school, equip with certified N95/KF94 with snug nose-wire.
- **Respiratory Health**: Clean asthma spacer chambers; keep rescue inhalers bedside.
- **Door Draft Defense**: Place rolled damp cotton towels across outer door thresholds.
- **Cooking Protocol**: Run exhaust fans on high before turning on burners; cook with lids on; avoid deep frying during evening stagnant hours.

---
*Generated by AeroShield AI Assistant • Built for Google for Developers PromptWars*`;
}
