import { describe, it, expect } from 'vitest';
import {
  determineAqiSeverity,
  generateDiurnalForecast,
  HOTSPOT_STATIONS,
  fetchAirQualityForStation
} from '../services/airQuality';

describe('determineAqiSeverity', () => {
  it('identifies good air quality for AQI <= 50', () => {
    const res = determineAqiSeverity(35);
    expect(res.severity).toBe('good');
    expect(res.color).toBe('#10b981');
    expect(res.label).toContain('Good');
  });

  it('identifies moderate air quality for AQI 51-100', () => {
    const res = determineAqiSeverity(85);
    expect(res.severity).toBe('moderate');
    expect(res.color).toBe('#f59e0b');
  });

  it('identifies poor air quality for AQI 101-200', () => {
    const res = determineAqiSeverity(165);
    expect(res.severity).toBe('poor');
    expect(res.color).toBe('#f97316');
  });

  it('identifies very unhealthy air quality for AQI 201-300', () => {
    const res = determineAqiSeverity(240);
    expect(res.severity).toBe('unhealthy');
    expect(res.color).toBe('#ef4444');
  });

  it('identifies severe emergency air quality for AQI 301-400', () => {
    const res = determineAqiSeverity(380);
    expect(res.severity).toBe('severe');
    expect(res.color).toBe('#8b5cf6');
  });

  it('identifies hazardous air quality for AQI > 400', () => {
    const res = determineAqiSeverity(450);
    expect(res.severity).toBe('hazardous');
    expect(res.color).toBe('#7f1d1d');
    expect(res.label).toContain('Hazardous');
  });
});

describe('generateDiurnalForecast', () => {
  it('generates 10 hourly data points simulating winter diurnal smog curves', () => {
    const forecast = generateDiurnalForecast(200, 10);
    expect(forecast).toHaveLength(10);
  });

  it('simulates peak smog exposure during early morning thermal inversion (08:00)', () => {
    const forecast = generateDiurnalForecast(200, 10);
    const morningPeak = forecast.find(f => f.hour === '08:00');
    expect(morningPeak).toBeDefined();
    // 200 * 1.35 = 270 AQI
    expect(morningPeak?.aqi).toBe(270);
    expect(morningPeak?.inversion).toBe(true);
    expect(morningPeak?.tempC).toBe(8); // 10 - 2
  });

  it('simulates diurnal trough during afternoon sun mixing (14:00)', () => {
    const forecast = generateDiurnalForecast(200, 10);
    const middayTrough = forecast.find(f => f.hour === '14:00');
    expect(middayTrough).toBeDefined();
    // 200 * 0.70 = 140 AQI
    expect(middayTrough?.aqi).toBe(140);
    expect(middayTrough?.inversion).toBe(false);
    expect(middayTrough?.tempC).toBe(16); // 10 + 6
  });

  it('simulates evening inversion trap re-forming at night (22:00)', () => {
    const forecast = generateDiurnalForecast(200, 10);
    const nightPeak = forecast.find(f => f.hour === '22:00');
    expect(nightPeak?.inversion).toBe(true);
    expect(nightPeak?.aqi).toBe(260); // 200 * 1.30
  });
});

describe('HOTSPOT_STATIONS', () => {
  it('contains verified major winter smog hotspot cities', () => {
    const cities = HOTSPOT_STATIONS.map(s => s.city);
    expect(cities).toContain('New Delhi (NCR)');
    expect(cities).toContain('Lahore');
    expect(cities).toContain('Beijing');
    expect(cities).toContain('Salt Lake City');
    expect(cities).toContain('Krakow');
    expect(cities).toContain('London');
  });

  it('verifies all hotspot presets have valid coordinates, pollutant metrics, and advisory headlines', () => {
    for (const station of HOTSPOT_STATIONS) {
      expect(station.lat).toBeGreaterThanOrEqual(-90);
      expect(station.lat).toBeLessThanOrEqual(90);
      expect(station.lon).toBeGreaterThanOrEqual(-180);
      expect(station.lon).toBeLessThanOrEqual(180);
      expect(station.defaultAqi).toBeGreaterThan(0);
      expect(station.pm25).toBeGreaterThan(0);
      expect(station.advisoryHeadline.length).toBeGreaterThan(10);
    }
  });
});

describe('fetchAirQualityForStation', () => {
  it('returns valid fallback air quality structure when fetch rejects or is aborted', async () => {
    const preset = HOTSPOT_STATIONS[0];
    const data = await fetchAirQualityForStation(preset);

    expect(data.city).toBe(preset.city);
    expect(data.country).toBe(preset.country);
    expect(data.aqi).toBeGreaterThan(0);
    expect(data.severity).toBeDefined();
    expect(data.hourlyForecast.length).toBe(10);
    expect(data.timestamp).toBeDefined();
  });
});
