import { FamilyProfile } from '../types';

export const PRESET_FAMILY_PROFILES: FamilyProfile[] = [
  {
    familyNickname: 'The Sharma Family (High Vulnerability)',
    city: 'New Delhi (NCR)',
    householdMembers: 5,
    hasInfantsOrToddlers: true, // 2-year old toddler
    hasSchoolChildren: true,   // 8-year old in primary school
    hasElderly: true,          // 72-year old grandfather with COPD
    hasPregnancy: false,
    respiratoryConditions: ['Asthma', 'COPD', 'Dust Allergy'],
    hasPets: true,
    petType: 'Golden Retriever',
    homeType: 'apartment_high_floor',
    windowDraftLevel: 'moderate_gaps',
    kitchenSetup: 'simple_exhaust_fan',
    heatingType: 'electric_radiator',
    purifierCount: 1, // Only 1 purifier for entire 3BHK flat
    budgetTier: 'budget_under_50',
    commuteMode: 'carpool'
  },
  {
    familyNickname: 'The Zhang Family (Compact Urban Unit)',
    city: 'Beijing (Chaoyang)',
    householdMembers: 3,
    hasInfantsOrToddlers: false,
    hasSchoolChildren: true,   // 11-year old child
    hasElderly: false,
    hasPregnancy: true,        // Expecting mother in 2nd trimester
    respiratoryConditions: ['Mild Asthma'],
    hasPets: false,
    homeType: 'apartment_ground_floor', // High ground-level smog exposure
    windowDraftLevel: 'drafty_single_pane',
    kitchenSetup: 'ducted_chimney_hood',
    heatingType: 'reverse_cycle_ac',
    purifierCount: 0,
    budgetTier: 'zero_cost',
    commuteMode: 'public_transit'
  },
  {
    familyNickname: 'The Kowalski Family (Winter Inversion Valley)',
    city: 'Krakow / Katowice',
    householdMembers: 4,
    hasInfantsOrToddlers: true,
    hasSchoolChildren: true,
    hasElderly: true,
    hasPregnancy: false,
    respiratoryConditions: ['Bronchitis', 'Dust Allergy'],
    hasPets: true,
    petType: 'Indoor Cat',
    homeType: 'old_construction',
    windowDraftLevel: 'drafty_single_pane',
    kitchenSetup: 'window_only',
    heatingType: 'space_heater',
    purifierCount: 1,
    budgetTier: 'budget_under_50',
    commuteMode: 'solo_car'
  },
  {
    familyNickname: 'The Johnson Family (Valley Basin Smog)',
    city: 'Salt Lake City (Basin)',
    householdMembers: 4,
    hasInfantsOrToddlers: false,
    hasSchoolChildren: true,
    hasElderly: false,
    hasPregnancy: false,
    respiratoryConditions: ['None'],
    hasPets: true,
    petType: '2 Dogs',
    homeType: 'independent_house',
    windowDraftLevel: 'tight_double_glaze',
    kitchenSetup: 'ducted_chimney_hood',
    heatingType: 'reverse_cycle_ac',
    purifierCount: 2,
    budgetTier: 'prepared_investment',
    commuteMode: 'public_transit'
  }
];
