import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { ApiKeyModal } from '../components/ApiKeyModal';
import { PromptArchitectureModal } from '../components/PromptArchitectureModal';
import { ActionPlanPrintable } from '../components/ActionPlanPrintable';
import { SmogAdvisorChat } from '../components/SmogAdvisorChat';
import { PRESET_FAMILY_PROFILES } from '../data/presetProfiles';
import { AirQualityData } from '../types';
import {
  saveStoredApiKey,
  generatePersonalizedRoutine,
  askSmogAdvisor,
  generateEmergencyActionPlan
} from '../services/gemini';

const mockAirQuality: AirQualityData = {
  city: 'New Delhi (NCR)',
  country: 'India',
  station: 'Anand Vihar Clean Air Station',
  aqi: 418,
  severity: 'hazardous',
  severityLabel: 'Hazardous (Severe+)',
  pm25: 365,
  pm10: 480,
  no2: 84,
  co: 3.4,
  tempC: 13,
  humidity: 86,
  windSpeedKmh: 4.2,
  inversionRisk: 'severe',
  primaryPollutant: 'PM2.5 (Fine Combustion Particulates)',
  advisoryHeadline: 'Severe+ Smog Emergency',
  timestamp: '14:00',
  hourlyForecast: [
    { hour: '06:00', aqi: 520, tempC: 9, inversion: true },
    { hour: '14:00', aqi: 290, tempC: 19, inversion: false }
  ]
};

const mockProfile = PRESET_FAMILY_PROFILES[0];

describe('App Integration & Accessible Navigation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders main landmarks, heading hierarchy, and switches accessible tabpanels', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: /AeroShield/i })).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'panel-dashboard');

    // Switch to Routine tab
    fireEvent.click(screen.getByRole('tab', { name: /24h Low-Emission Routine/i }));
    expect(screen.getByRole('tabpanel', { name: /24h Low-Emission Routine/i })).toBeInTheDocument();

    // Switch to Indoor Hacks tab
    fireEvent.click(screen.getByRole('tab', { name: /Indoor Hacks & DIY Purifier/i }));
    expect(screen.getByText('Corsi-Rosenthal Box & CADR Sizing Calculator')).toBeInTheDocument();

    // Switch to Advisor tab
    fireEvent.click(screen.getByRole('tab', { name: /AI Smog Doctor & Coping/i }));
    expect(screen.getByRole('log')).toBeInTheDocument();
  });
});

describe('Modal Accessibility & Interactions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('validates Gemini API key format in ApiKeyModal and closes on Escape', () => {
    const onClose = vi.fn();
    const onKeySaved = vi.fn();

    render(<ApiKeyModal isOpen={true} onClose={onClose} onKeySaved={onKeySaved} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');

    const input = screen.getByLabelText(/Gemini API Key/i);
    fireEvent.change(input, { target: { value: 'invalid-key' } });
    expect(screen.getByRole('alert')).toHaveTextContent(/Standard Gemini keys start with "AIzaSy"/i);

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('switches tabs in PromptArchitectureModal and closes on Escape', () => {
    const onClose = vi.fn();
    render(<PromptArchitectureModal isOpen={true} onClose={onClose} />);

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    const cotTab = screen.getByRole('tab', { name: /Chain-of-Thought Logic/i });
    fireEvent.click(cotTab);
    expect(cotTab).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders ActionPlanPrintable and triggers window.print cleanly', () => {
    const onClose = vi.fn();
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});

    render(
      <ActionPlanPrintable
        isOpen={true}
        onClose={onClose}
        profile={mockProfile}
        airQuality={mockAirQuality}
      />
    );

    expect(screen.getByText('AeroShield Family Smog Survival Plan')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Print or Save PDF/i }));
    expect(printSpy).toHaveBeenCalledTimes(1);

    printSpy.mockRestore();
  });
});

describe('SmogAdvisorChat & Secure Gemini API Header Transport', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('submits user question in SmogAdvisorChat and renders intelligent fallback when offline', async () => {
    render(<SmogAdvisorChat profile={mockProfile} airQuality={mockAirQuality} />);

    const input = screen.getByLabelText(/Type your message about indoor hacks/i);
    fireEvent.change(input, { target: { value: 'Do snake plants filter PM2.5?' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(screen.getByText(/Indoor Plants vs. Winter Smog/i)).toBeInTheDocument();
    });
  });

  it('transmits Gemini API key via x-goog-api-key header rather than URL query string', async () => {
    const testKey = 'AIzaSyA_abcdef1234567890abcdef123456789';
    saveStoredApiKey(testKey);

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: 'Verified safe response' }] } }]
      })
    });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const plan = await generateEmergencyActionPlan(mockProfile, mockAirQuality);
    expect(plan).toBe('Verified safe response');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).not.toContain(testKey);
    expect(url).not.toContain('?key=');
    expect((init.headers as Record<string, string>)['x-goog-api-key']).toBe(testKey);
  });

  it('falls back gracefully in generatePersonalizedRoutine and askSmogAdvisor when API fails', async () => {
    const routine = await generatePersonalizedRoutine(mockProfile, mockAirQuality);
    expect(routine.length).toBeGreaterThanOrEqual(5);

    const advice = await askSmogAdvisor('How to reuse N95 masks?', mockProfile, mockAirQuality, []);
    expect(advice.text).toContain('N95');
  });
});
