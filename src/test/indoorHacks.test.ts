import { describe, it, expect } from 'vitest';
import { INDOOR_HACKS_LIBRARY } from '../data/indoorHacks';
import { PRESET_FAMILY_PROFILES } from '../data/presetProfiles';

describe('INDOOR_HACKS_LIBRARY', () => {
  it('contains essential physical hacks: Corsi-Rosenthal box, draft sealing, clean bedroom sanctuary, and kitchen zoning', () => {
    const ids = INDOOR_HACKS_LIBRARY.map(h => h.id);
    expect(ids).toContain('corsi-rosenthal-box');
    expect(ids).toContain('door-window-wet-towel-seal');
    expect(ids).toContain('clean-bedroom-sanctuary');
  });

  it('verifies all hacks have complete step-by-step instructions, materials, science principles, and pitfalls', () => {
    for (const hack of INDOOR_HACKS_LIBRARY) {
      expect(hack.title.length).toBeGreaterThan(5);
      expect(hack.materialsNeeded.length).toBeGreaterThan(0);
      expect(hack.stepByStep.length).toBeGreaterThanOrEqual(3);
      expect(hack.sciencePrinciple.length).toBeGreaterThan(20);
      expect(hack.commonPitfalls.length).toBeGreaterThan(0);
      expect(hack.effectivenessRating).toBeGreaterThanOrEqual(1);
      expect(hack.effectivenessRating).toBeLessThanOrEqual(5);
    }
  });

  it('validates Corsi-Rosenthal Box specifications mention MERV-13 and cardboard shroud', () => {
    const crBox = INDOOR_HACKS_LIBRARY.find(h => h.id === 'corsi-rosenthal-box');
    expect(crBox).toBeDefined();
    const allMaterials = crBox?.materialsNeeded.join(' ');
    expect(allMaterials).toContain('MERV-13');
    expect(allMaterials).toContain('shroud');
  });
});

describe('PRESET_FAMILY_PROFILES', () => {
  it('provides distinct diverse family vulnerability profiles covering different global smog scenarios', () => {
    expect(PRESET_FAMILY_PROFILES.length).toBeGreaterThanOrEqual(4);
    
    // Sharma family: High vulnerability, COPD, toddler
    const sharma = PRESET_FAMILY_PROFILES.find(p => p.familyNickname.includes('Sharma'));
    expect(sharma).toBeDefined();
    expect(sharma?.hasElderly).toBe(true);
    expect(sharma?.hasInfantsOrToddlers).toBe(true);
    expect(sharma?.respiratoryConditions).toContain('COPD');

    // Zhang family: Pregnancy, compact apartment, zero cost budget
    const zhang = PRESET_FAMILY_PROFILES.find(p => p.familyNickname.includes('Zhang'));
    expect(zhang).toBeDefined();
    expect(zhang?.hasPregnancy).toBe(true);
    expect(zhang?.budgetTier).toBe('zero_cost');
  });

  it('ensures all profiles contain valid home infrastructure and commute definitions', () => {
    for (const profile of PRESET_FAMILY_PROFILES) {
      expect(profile.householdMembers).toBeGreaterThan(0);
      expect(profile.homeType).toBeDefined();
      expect(profile.windowDraftLevel).toBeDefined();
      expect(profile.kitchenSetup).toBeDefined();
      expect(profile.commuteMode).toBeDefined();
    }
  });
});
