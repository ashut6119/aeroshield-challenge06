import { describe, it, expect } from 'vitest';
import { calculateCadrRequirements } from '../services/cadrCalculator';

describe('calculateCadrRequirements', () => {
  it('calculates room volume and required CADR correctly for standard 12x10 bedroom', () => {
    // 12 * 10 = 120 sq ft, 120 * 9 = 1080 cu ft
    // Required CADR = (1080 * 5) / 60 = 90 CFM
    const result = calculateCadrRequirements(12, 10, 9, 5);

    expect(result.roomLengthFt).toBe(12);
    expect(result.roomWidthFt).toBe(10);
    expect(result.ceilingHeightFt).toBe(9);
    expect(result.roomAreaSqFt).toBe(120);
    expect(result.roomVolumeCuFt).toBe(1080);
    expect(result.airChangesPerHourNeeded).toBe(5);
    expect(result.requiredCadrCfm).toBe(90);
  });

  it('selects 4-filter Corsi-Rosenthal cube for rooms <= 350 sq ft', () => {
    const result = calculateCadrRequirements(15, 15, 9, 5); // 225 sq ft
    expect(result.roomAreaSqFt).toBe(225);
    expect(result.corsiRosenthalConfig.filterCount).toBe(4);
    expect(result.corsiRosenthalConfig.costUsd).toBe(65);
    expect(result.corsiRosenthalConfig.fanSizeInches).toBe(20);
    expect(result.corsiRosenthalConfig.estimatedDeliveredCadr).toBe(420);
  });

  it('selects 5-filter Comparetto cube for large open rooms > 350 sq ft', () => {
    const result = calculateCadrRequirements(25, 20, 10, 5); // 500 sq ft
    expect(result.roomAreaSqFt).toBe(500);
    expect(result.corsiRosenthalConfig.filterCount).toBe(5);
    expect(result.corsiRosenthalConfig.costUsd).toBe(80);
  });

  it('provides compact commercial purifier recommendation when CADR <= 150 CFM', () => {
    const result = calculateCadrRequirements(10, 10, 8, 4); // 800 cu ft * 4 / 60 = ~53 CFM
    expect(result.requiredCadrCfm).toBeLessThanOrEqual(150);
    expect(result.commercialAlternativeRecommendation).toContain('compact commercial HEPA purifier');
  });

  it('provides mid-size commercial recommendation when CADR between 151 and 300 CFM', () => {
    const result = calculateCadrRequirements(20, 15, 9, 5); // 2700 cu ft * 5 / 60 = 225 CFM
    expect(result.requiredCadrCfm).toBeGreaterThan(150);
    expect(result.requiredCadrCfm).toBeLessThanOrEqual(300);
    expect(result.commercialAlternativeRecommendation).toContain('mid-size commercial HEPA unit');
  });

  it('provides DIY comparison warning when room requires > 300 CFM', () => {
    const result = calculateCadrRequirements(30, 20, 10, 6); // 6000 cu ft * 6 / 60 = 600 CFM
    expect(result.requiredCadrCfm).toBeGreaterThan(300);
    expect(result.commercialAlternativeRecommendation).toContain('DIY 4-filter Corsi-Rosenthal box');
  });

  it('uses default 9ft height and 5 ACH when optional params omitted', () => {
    const result = calculateCadrRequirements(14, 12);
    expect(result.ceilingHeightFt).toBe(9);
    expect(result.airChangesPerHourNeeded).toBe(5);
  });
});
