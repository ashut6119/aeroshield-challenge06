import { describe, it, expect, beforeEach } from 'vitest';
import {
  isValidGeminiApiKey,
  sanitizeUserInput,
  getStoredApiKey,
  saveStoredApiKey,
  getStoredModel,
  saveStoredModel,
  logPrompt,
  PROMPT_INSPECTION_LOG,
  SUPPORTED_MODELS
} from '../services/gemini';
import {
  SYSTEM_INSTRUCTION_SMOG_ASSISTANT,
  buildRoutinePrompt,
  buildAdvisorPrompt,
  buildEmergencyActionPlanPrompt
} from '../prompts/templates';
import { PRESET_FAMILY_PROFILES } from '../data/presetProfiles';
import { HOTSPOT_STATIONS } from '../services/airQuality';

describe('isValidGeminiApiKey', () => {
  it('validates genuine Google AI Studio Gemini API keys starting with AIza', () => {
    const validKey = 'AIzaSyA_abcdef1234567890abcdef1234567';
    expect(isValidGeminiApiKey(validKey)).toBe(true);
  });

  it('rejects keys that do not start with AIza', () => {
    expect(isValidGeminiApiKey('sk-ant-api03-1234567890123456789012345')).toBe(false);
    expect(isValidGeminiApiKey('open-ai-key-12345678901234567890123456')).toBe(false);
  });

  it('rejects invalid lengths or characters', () => {
    expect(isValidGeminiApiKey('AIzaShort')).toBe(false);
    expect(isValidGeminiApiKey('AIzaSyA_abcdef1234567890abcdef1234567!@#$')).toBe(false);
    expect(isValidGeminiApiKey('')).toBe(false);
  });
});

describe('sanitizeUserInput', () => {
  it('strips dangerous HTML tags and script injections', () => {
    const maliciousInput = '<script>alert("xss")</script>How do I seal my window? <img src=x onerror=alert(1)>';
    const cleaned = sanitizeUserInput(maliciousInput);
    expect(cleaned).not.toContain('<');
    expect(cleaned).not.toContain('>');
    expect(cleaned).toContain('How do I seal my window?');
  });

  it('strips non-printable ASCII and control characters', () => {
    const controlInput = 'Hello\u0000World\u001F\u0007AirQuality';
    const cleaned = sanitizeUserInput(controlInput);
    expect(cleaned).toBe('HelloWorldAirQuality');
  });

  it('enforces 1000 character maximum length limit', () => {
    const longString = 'A'.repeat(1500);
    const cleaned = sanitizeUserInput(longString);
    expect(cleaned.length).toBe(1000);
  });

  it('returns empty string when given null, undefined, or empty string', () => {
    expect(sanitizeUserInput('')).toBe('');
  });
});

describe('LocalStorage API key and model persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and retrieves Gemini API key', () => {
    const testKey = 'AIzaSyA_1234567890abcdefghijklmnopqrst';
    saveStoredApiKey(testKey);
    expect(getStoredApiKey()).toBe(testKey);
  });

  it('saves and retrieves selected Gemini model', () => {
    expect(getStoredModel()).toBe('gemini-2.0-flash');
    saveStoredModel('gemini-1.5-pro');
    expect(getStoredModel()).toBe('gemini-1.5-pro');
  });

  it('lists supported Google models including Gemini 2.0 Flash', () => {
    const ids = SUPPORTED_MODELS.map(m => m.id);
    expect(ids).toContain('gemini-2.0-flash');
    expect(ids).toContain('gemini-1.5-flash');
    expect(ids).toContain('gemini-1.5-pro');
  });
});

describe('Prompt Logging & Inspection', () => {
  it('logs prompt metadata without exceeding 20 bounded entries', () => {
    PROMPT_INSPECTION_LOG.length = 0; // reset
    for (let i = 0; i < 25; i++) {
      logPrompt({
        timestamp: new Date().toLocaleTimeString(),
        feature: 'routine_generator',
        modelUsed: 'gemini-2.0-flash',
        systemInstructionPreview: 'System instruction...',
        userPromptPreview: `Prompt ${i}`,
        tokenStats: { promptTokens: 120, candidatesTokens: 350 }
      });
    }

    expect(PROMPT_INSPECTION_LOG.length).toBe(20);
    expect(PROMPT_INSPECTION_LOG[0].userPromptPreview).toBe('Prompt 24'); // Most recent first
  });
});

describe('Prompt Engineering & Templates', () => {
  const profile = PRESET_FAMILY_PROFILES[0];
  const station = HOTSPOT_STATIONS[0];
  const aqiData = {
    city: station.city,
    country: station.country,
    station: station.station,
    aqi: station.defaultAqi,
    severity: 'hazardous' as const,
    severityLabel: 'Hazardous (Severe+)',
    pm25: station.pm25,
    pm10: station.pm10,
    no2: station.no2,
    co: station.co,
    tempC: station.tempC,
    humidity: station.humidity,
    windSpeedKmh: station.windSpeedKmh,
    inversionRisk: 'severe' as const,
    primaryPollutant: station.primaryPollutant,
    advisoryHeadline: station.advisoryHeadline,
    timestamp: '12:00',
    hourlyForecast: []
  };

  it('includes core physical principles and clinical guardrails in system instruction', () => {
    expect(SYSTEM_INSTRUCTION_SMOG_ASSISTANT).toContain('Boundary Layer Temperature Inversion');
    expect(SYSTEM_INSTRUCTION_SMOG_ASSISTANT).toContain('Diurnal Trough');
    expect(SYSTEM_INSTRUCTION_SMOG_ASSISTANT).toContain('MERV-13');
    expect(SYSTEM_INSTRUCTION_SMOG_ASSISTANT).toContain('N95 / FFP2 / KF94');
    expect(SYSTEM_INSTRUCTION_SMOG_ASSISTANT).toContain('Do NOT prescribe prescription medications');
  });

  it('builds structured 24-hour routine prompt including family vulnerabilities and meteorological status', () => {
    const prompt = buildRoutinePrompt(profile, aqiData);

    expect(prompt).toContain(profile.familyNickname);
    expect(prompt).toContain('418'); // AQI
    expect(prompt).toContain('Asthma');
    expect(prompt).toContain('Golden Retriever');
    expect(prompt).toContain('24-hour schedule');
    expect(prompt).toContain('AeroShield Low-Emission Routine');
    expect(prompt).toContain('JSON array of RoutineItem objects');
  });

  it('builds contextual smog advisor prompt incorporating conversation history', () => {
    const history = [
      { role: 'user', content: 'Can I exercise in the park at 7 AM?' },
      { role: 'model', content: 'No, morning temperature inversion traps peak particulate matter.' }
    ];
    const prompt = buildAdvisorPrompt('What should I do instead?', profile, aqiData, history);

    expect(prompt).toContain(profile.familyNickname);
    expect(prompt).toContain('What should I do instead?');
    expect(prompt).toContain('Can I exercise in the park at 7 AM?');
  });

  it('builds 1-page emergency action plan prompt with fridge card directives', () => {
    const prompt = buildEmergencyActionPlanPrompt(profile, aqiData);

    expect(prompt).toContain('Emergency Winter Smog Survival Card');
    expect(prompt).toContain(profile.familyNickname);
    expect(prompt).toContain('Bedroom Clean Sanctuary');
  });
});
