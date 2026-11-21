import { CadrCalculationResult } from '../types';

export function calculateCadrRequirements(
  lengthFt: number,
  widthFt: number,
  heightFt: number = 9,
  targetAch: number = 5
): CadrCalculationResult {
  const roomAreaSqFt = lengthFt * widthFt;
  const roomVolumeCuFt = roomAreaSqFt * heightFt;
  
  // Required CADR in CFM = (Room Volume in cu ft * Desired Air Changes per Hour) / 60 minutes
  const requiredCadrCfm = Math.round((roomVolumeCuFt * targetAch) / 60);

  // Corsi-Rosenthal Box specs:
  // Standard 20" box fan with 4x MERV-13 filters delivers ~350 CFM on Medium and ~480 CFM on High (with shroud).
  const estimatedDeliveredCadr = 420;
  const filterCount = roomAreaSqFt > 350 ? 5 : 4; // 5-filter Comparetto cube for large rooms, 4-filter for standard
  const costUsd = filterCount === 4 ? 65 : 80;

  let commercialAlternativeRecommendation = '';
  if (requiredCadrCfm <= 150) {
    commercialAlternativeRecommendation = 'A compact commercial HEPA purifier (CADR ~150 CFM, e.g. Levoit Core 300) is sufficient for this space.';
  } else if (requiredCadrCfm <= 300) {
    commercialAlternativeRecommendation = 'A mid-size commercial HEPA unit (CADR ~250-300 CFM, e.g. Coway AP-1512HH or Philips 2000i) is suitable.';
  } else {
    commercialAlternativeRecommendation = 'This large room requires high CADR (>350 CFM). Commercial units at this tier cost $300-$600+. A DIY 4-filter Corsi-Rosenthal box matches or exceeds this performance for under $70.';
  }

  return {
    roomLengthFt: lengthFt,
    roomWidthFt: widthFt,
    ceilingHeightFt: heightFt,
    roomAreaSqFt,
    roomVolumeCuFt,
    airChangesPerHourNeeded: targetAch,
    requiredCadrCfm,
    corsiRosenthalConfig: {
      fanSizeInches: 20,
      filterCount,
      filterRating: 'MERV-13 (1" or 2" depth)',
      estimatedDeliveredCadr,
      costUsd,
      lifespanMonths: 5
    },
    commercialAlternativeRecommendation
  };
}
