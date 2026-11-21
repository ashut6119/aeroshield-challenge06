import { IndoorHack } from '../types';

export const INDOOR_HACKS_LIBRARY: IndoorHack[] = [
  {
    id: 'corsi-rosenthal-box',
    title: 'DIY Corsi-Rosenthal Box (High-CADR Purifier)',
    category: 'diy_purifier',
    difficulty: 'intermediate',
    estimatedCost: '$45 - $70 (₹3,500 - ₹5,500)',
    effectivenessRating: 5,
    timeToSetupMin: 25,
    badgeText: 'Highest Efficiency',
    materialsNeeded: [
      '1x 20-inch standard box fan (or industrial ceiling-mount casing)',
      '4x MERV-13 furnace filters (20"x20"x2" or 20"x20"x1")',
      '1x Cardboard shroud (20"x20" with a 14-inch circular cutout)',
      'Heavy-duty duct tape (or gaffer tape)'
    ],
    stepByStep: [
      'Tape 4 MERV-13 filters together into a cube, making sure all airflow direction arrows face inward.',
      'Cut a square piece of cardboard for the bottom base and tape it securely to prevent air leaks.',
      'Place the 20-inch box fan on top, blowing upwards (exhaust out), pulling air through the 4 filters.',
      'Cut a 14-inch circular cardboard shroud and tape it to the face of the box fan. This prevents aerodynamic recirculation at the blade tips and boosts airflow efficiency by 40-50%!',
      'Seal all seams with duct tape. Run on low or medium speed for silent continuous particulate clearance.'
    ],
    sciencePrinciple: 'MERV-13 filters capture over 85% of particles in the 1.0 to 3.0 micron range and over 50% in the 0.3 to 1.0 micron range. By multiplying filter surface area by 4, airflow resistance drops significantly, yielding higher Clean Air Delivery Rate (CADR 350-500 CFM) than many $500 commercial units.',
    commonPitfalls: [
      'Never face the fan blowing down into the filter box; it creates backpressure and can overheat the motor.',
      'Do not omit the circular cardboard shroud—it creates vortex stability.',
      'Avoid MERV-8 filters (too coarse for PM2.5) or HEPA on weak fans (too high static pressure).'
    ]
  },
  {
    id: 'door-window-wet-towel-seal',
    title: 'Damp Towel Draft Stopper & Window Micro-Sealing',
    category: 'sealing',
    difficulty: 'beginner',
    estimatedCost: '$0 - $5 (₹0 - ₹400)',
    effectivenessRating: 4,
    timeToSetupMin: 10,
    badgeText: 'Zero Cost / Rapid',
    materialsNeeded: [
      'Old cotton bath towels or microfiber cloth rolls',
      'Painter tape or removable masking tape',
      'Clean water with a pinch of vinegar or tea tree oil (anti-fungal)',
      'Bubble wrap or cling wrap (for single-pane drafts)'
    ],
    stepByStep: [
      'Lightly dampen a rolled bath towel (damp, not dripping wet) and wedge it firmly across the gap beneath exterior doors and balcony sliding doors.',
      'For drafty window sash gaps, tape painter tape along the seams where the frame meets the wall.',
      'Spray mist on glass and apply standard bubble wrap (flat side out)—it creates an insulated thermal air gap reducing cold drafts and particulate pull caused by stack effect.'
    ],
    sciencePrinciple: 'In winter, the indoor stack effect causes cold, polluted air to get sucked into living spaces through floor-level exterior door gaps. The damp towel creates both a physical barrier and capillary particulate interception, preventing heavy smog ingress.',
    commonPitfalls: [
      'Do not soak the towel so much that it dampens wooden floors or breeds mildew.',
      'Wash and refresh the towel every 48 hours to remove captured particulates.'
    ]
  },
  {
    id: 'clean-bedroom-sanctuary',
    title: 'The "Clean Bedroom Sanctuary" Zoning Strategy',
    category: 'cleaning_protocol',
    difficulty: 'beginner',
    estimatedCost: '$0',
    effectivenessRating: 5,
    timeToSetupMin: 15,
    badgeText: 'Essential for Families',
    materialsNeeded: [
      'Single room chosen as sanctuary (prefer bedroom with fewest exterior walls)',
      '1 air purifier or DIY box fan',
      'Door draft seal',
      'Clean bed linens'
    ],
    stepByStep: [
      'Select the primary sleeping bedroom where children or vulnerable family members spend 8-10 night hours.',
      'Move all indoor plants out if using humidifiers to prevent high humidity (>60%) that traps mold spores.',
      'Keep the bedroom door closed at all times. Place your highest-performing air purifier directly beside the bed headboard, angled toward the breathing zone.',
      'Leave daytime shoes and heavy smog-exposed coats outside this sanctuary room.',
      'Run the purifier on High for 45 minutes before bedtime, then switch to Quiet/Night mode.'
    ],
    sciencePrinciple: 'Most families cannot afford purifiers in every room. By concentrating CADR in a sealed 150 sq ft bedroom, you can achieve safe PM2.5 levels (<15 µg/m³) for 35-40% of the day, dramatically reducing cumulative lung inflammation.',
    commonPitfalls: [
      'Leaving the bedroom door wide open dilutes purified air across the whole unsealed apartment within 12 minutes.'
    ]
  },
  {
    id: 'cooking-exhaust-negative-pressure',
    title: 'Negative-Pressure Cooking Smoke Containment',
    category: 'cooking_defense',
    difficulty: 'beginner',
    estimatedCost: '$0',
    effectivenessRating: 4,
    timeToSetupMin: 5,
    badgeText: 'Prevents Indoor Spikes',
    materialsNeeded: [
      'Kitchen door or heavy curtain',
      'Kitchen exhaust fan / chimney hood',
      'Cookware lids'
    ],
    stepByStep: [
      'Close the kitchen door leading to the rest of the home before lighting the stove.',
      'Turn on the kitchen exhaust on max speed 2 minutes BEFORE heating oils or boiling to establish directional airflow.',
      'Always cook with fitted lids on pans to contain aerosolized cooking oils and combustion byproducts.',
      'Shift stir-frying, deep-frying, and grilling to post-lunch hours (1:00 PM - 3:00 PM) when regional outdoor inversion lifts slightly, rather than 7:00 PM peak inversion.',
      'Leave the kitchen exhaust running for 10 minutes AFTER cooking is finished before opening the interior kitchen door.'
    ],
    sciencePrinciple: 'Deep-frying or high-heat searing can produce indoor PM2.5 spikes exceeding 800-1,200 µg/m³—higher than outdoor smog! Proper directional negative pressure evacuates volatile VOCs and particles directly outside without contaminating living spaces.',
    commonPitfalls: [
      'Opening windows in the living room while running kitchen exhaust without kitchen door closed will pull outdoor smog into the living room.'
    ]
  },
  {
    id: 'damp-mop-particulate-protocol',
    title: 'Damp-Mop Only Cleaning Protocol (No Dry Sweeping)',
    category: 'cleaning_protocol',
    difficulty: 'beginner',
    estimatedCost: '$0 - $10 (₹0 - ₹800)',
    effectivenessRating: 4,
    timeToSetupMin: 15,
    badgeText: 'Vital Pediatric Protection',
    materialsNeeded: [
      'Microfiber damp flat mop or cotton floor cloth',
      'Warm water with mild soap',
      'HEPA vacuum cleaner (only if certified true HEPA sealed exhaust)'
    ],
    stepByStep: [
      'NEVER dry-sweep with standard brooms during smog season. Dry brooms aerosolize settled micro-dust right into the breathing level of toddlers and pets.',
      'Use a damp microfiber mop with smooth, single-direction strokes from inner corners toward the exit.',
      'Rinse the mop head frequently in a bucket to avoid smearing particulate sludge.',
      'Damp-wipe window sills, TV consoles, and shelves with a moist microfiber cloth every 2 days.'
    ],
    sciencePrinciple: 'PM2.5 particles settle onto floors and low surfaces overnight due to gravity and moisture. Dry sweeping kicks these settled ultra-fine particles back into airborne suspension (resuspension rate >65%), where infants crawl and breathe at floor height.',
    commonPitfalls: [
      'Using a regular vacuum cleaner without a sealed HEPA exhaust filter will blow sub-micron smog particles right through its exhaust port like an aerosol cannon!'
    ]
  },
  {
    id: 'kid-smog-burn-energy-hacks',
    title: 'High-Smog Indoor Kid Energy Burning Hacks',
    category: 'kid_smog_hacks',
    difficulty: 'beginner',
    estimatedCost: '$0',
    effectivenessRating: 5,
    timeToSetupMin: 10,
    badgeText: 'Family Sanity Saver',
    materialsNeeded: [
      'Cushions, masking tape for floor agility ladder',
      'Balloons (safe indoor movement)',
      'Soft yoga mats or carpet'
    ],
    stepByStep: [
      'When outdoor playgrounds are hazardous (AQI >300), children get restless. Create a "Floor Is Lava" living room obstacle course using sofa cushions and painter tape.',
      'Play "Keep the Balloon in the Air"—gentle aerobic exercise that doesn’t induce heavy gasping in unfiltered air.',
      'Animal walks (Bear crawl, Crab walk, Frog jump) on the rug for 10 minutes burns energy with controlled breathing.',
      'Ensure the air purifier is running in the playroom at medium-high speed during physical activity.'
    ],
    sciencePrinciple: 'Children breathe 2 to 3 times faster than adults relative to their body weight and their lungs are still developing. Heavy outdoor aerobic exercise in smog deposits deep alveolar particulate matter; structured low-ventilation indoor games burn energy safely.',
    commonPitfalls: [
      'Allowing vigorous jumping jacks or running in unpurified, dusty rooms increases deep lung deposition of PM2.5.'
    ]
  }
];
