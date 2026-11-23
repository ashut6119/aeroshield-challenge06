export type AqiSeverity = 'good' | 'moderate' | 'poor' | 'unhealthy' | 'severe' | 'hazardous';

export interface AirQualityData {
  city: string;
  country: string;
  station: string;
  aqi: number;
  severity: AqiSeverity;
  severityLabel: string;
  pm25: number; // ug/m3
  pm10: number; // ug/m3
  no2: number;  // ppb
  co: number;   // ppm
  tempC: number;
  humidity: number;
  windSpeedKmh: number;
  inversionRisk: 'low' | 'moderate' | 'high' | 'severe';
  primaryPollutant: string;
  advisoryHeadline: string;
  timestamp: string;
  hourlyForecast: { hour: string; aqi: number; tempC: number; inversion: boolean }[];
}

export type HomeType = 'apartment_high_floor' | 'apartment_ground_floor' | 'independent_house' | 'old_construction';
export type WindowDraftLevel = 'tight_double_glaze' | 'moderate_gaps' | 'drafty_single_pane';
export type KitchenSetup = 'ducted_chimney_hood' | 'simple_exhaust_fan' | 'window_only';
export type HeatingType = 'reverse_cycle_ac' | 'electric_radiator' | 'space_heater' | 'wood_coal_stove';
export type BudgetTier = 'zero_cost' | 'budget_under_50' | 'prepared_investment';
export type CommuteMode = 'public_transit' | 'carpool' | 'solo_car' | 'two_wheeler_bike' | 'walking';
export type TabType = 'dashboard' | 'routine' | 'hacks' | 'advisor';
export type PromptTabType = 'system' | 'chain_of_thought' | 'schema' | 'logs';

export interface FamilyProfile {
  familyNickname: string;
  city: string;
  householdMembers: number;
  hasInfantsOrToddlers: boolean;
  hasSchoolChildren: boolean;
  hasElderly: boolean;
  hasPregnancy: boolean;
  respiratoryConditions: string[]; // 'Asthma', 'COPD', 'Dust Allergy', 'Bronchitis', 'None'
  hasPets: boolean;
  petType?: string;
  homeType: HomeType;
  windowDraftLevel: WindowDraftLevel;
  kitchenSetup: KitchenSetup;
  heatingType: HeatingType;
  purifierCount: number;
  budgetTier: BudgetTier;
  commuteMode: CommuteMode;
}

export interface RoutineItem {
  id: string;
  timeSlot: string; // e.g. "06:30 AM - 08:00 AM"
  phase: 'morning' | 'midday' | 'afternoon' | 'evening' | 'night';
  title: string;
  category: 'commute' | 'cooking' | 'indoor_exercise' | 'school_kids' | 'ventilation' | 'purifier_control';
  smogRiskLevel: 'low' | 'moderate' | 'high' | 'hazardous';
  defaultHabit: string;
  lowEmissionRoutine: string;
  healthHack: string;
  whyItMatters: string;
  familyImpact: string;
  completed?: boolean;
}

export interface IndoorHack {
  id: string;
  title: string;
  category: 'diy_purifier' | 'sealing' | 'cleaning_protocol' | 'cooking_defense' | 'kid_smog_hacks';
  difficulty: 'beginner' | 'intermediate' | 'handy';
  estimatedCost: string;
  effectivenessRating: number; // 1 to 5
  timeToSetupMin: number;
  materialsNeeded: string[];
  stepByStep: string[];
  sciencePrinciple: string;
  commonPitfalls: string[];
  badgeText?: string;
}

export interface CadrCalculationResult {
  roomLengthFt: number;
  roomWidthFt: number;
  ceilingHeightFt: number;
  roomAreaSqFt: number;
  roomVolumeCuFt: number;
  airChangesPerHourNeeded: number; // 4 to 6 ACH recommended for severe smog
  requiredCadrCfm: number;
  corsiRosenthalConfig: {
    fanSizeInches: number;
    filterCount: number;
    filterRating: string; // e.g., MERV-13
    estimatedDeliveredCadr: number;
    costUsd: number;
    lifespanMonths: number;
  };
  commercialAlternativeRecommendation: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  reasoningSteps?: string[];
  suggestedActions?: string[];
  isPromptDebugVisible?: boolean;
}

export interface PromptLogEntry {
  timestamp: string;
  feature: 'routine_generator' | 'diy_hack_customizer' | 'advisor_chat' | 'emergency_plan';
  modelUsed: string;
  systemInstructionPreview: string;
  userPromptPreview: string;
  tokenStats?: { promptTokens?: number; candidatesTokens?: number };
}
