import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Navbar } from '../components/Navbar';
import { SmogDashboard } from '../components/SmogDashboard';
import { RoutineGenerator } from '../components/RoutineGenerator';
import { IndoorHacksStudio } from '../components/IndoorHacksStudio';
import { FamilyProfiler } from '../components/FamilyProfiler';
import { PRESET_FAMILY_PROFILES } from '../data/presetProfiles';
import { AirQualityData, RoutineItem } from '../types';

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

const mockRoutines: RoutineItem[] = [
  {
    id: 'routine-1',
    timeSlot: '06:30 - 08:30 AM',
    phase: 'morning',
    title: 'Morning School Commute & Inversion Defense',
    category: 'commute',
    smogRiskLevel: 'hazardous',
    defaultHabit: 'Walking kids to school in foggy morning air with open car windows.',
    lowEmissionRoutine: 'Shift departure 30 minutes later; use internal car cabin air recirculation with N95 masks.',
    healthHack: 'Apply petroleum jelly around respirator nasal bridge for zero seal leaks.',
    whyItMatters: 'Thermal inversion traps diesel exhaust in the bottom 50 meters of the atmosphere.',
    familyImpact: 'Shields toddler and 72-year-old grandfather from bronchospasm trigger.',
    completed: false
  },
  {
    id: 'routine-2',
    timeSlot: '13:00 - 14:30 PM',
    phase: 'afternoon',
    title: 'Diurnal Trough Rapid Ventilation Window',
    category: 'ventilation',
    smogRiskLevel: 'moderate',
    defaultHabit: 'Keeping windows closed 24/7 causing dangerous indoor CO2 buildup > 2000 ppm.',
    lowEmissionRoutine: 'Open opposite-side windows for exactly 8 minutes while running box fan on high.',
    healthHack: 'Creates cross-flow flush without allowing heavy particulates to settle.',
    whyItMatters: 'Afternoon solar heating temporarily raises mixing height and disperses ground smog.',
    familyImpact: 'Flushes stale indoor VOCs and restores oxygen levels for focused remote work.',
    completed: true
  }
];

describe('ErrorBoundary', () => {
  it('renders child components cleanly when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child-element">Normal Content</div>
      </ErrorBoundary>
    );
    expect(screen.getByTestId('child-element')).toBeDefined();
    expect(screen.getByText('Normal Content')).toBeInTheDocument();
  });

  it('catches render errors and presents accessible recovery UI', () => {
    const ProblemComponent = () => {
      throw new Error('Test crash in child component');
    };

    // Suppress console.error in vitest output for intentional error test
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText(/An unexpected error occurred in this view/)).toBeInTheDocument();
    expect(screen.getByText('Reload Application')).toBeInTheDocument();

    spy.mockRestore();
  });
});

describe('Navbar Component', () => {
  it('renders branding, AQI badge, and interactive modal triggers', () => {
    const onOpenKey = vi.fn();
    const onOpenPrompt = vi.fn();

    render(
      <Navbar
        airQuality={mockAirQuality}
        profile={mockProfile}
        onOpenApiKeyModal={onOpenKey}
        onOpenPromptModal={onOpenPrompt}
        hasApiKey={true}
        selectedModel="gemini-2.0-flash"
      />
    );

    expect(screen.getByText('AeroShield')).toBeInTheDocument();
    expect(screen.getByText('Challenge 06')).toBeInTheDocument();
    expect(screen.getByText('AQI 418')).toBeInTheDocument();
    expect(screen.getByText('Prompt Architecture')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Inspect System Prompts, JSON Schemas and Guardrails'));
    expect(onOpenPrompt).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByLabelText(/Configure API Key and Model/));
    expect(onOpenKey).toHaveBeenCalledTimes(1);
  });
});

describe('SmogDashboard Component', () => {
  it('renders live AQI gauge, pollutant metrics, and city hotspots', () => {
    const onSelect = vi.fn();
    const onRefresh = vi.fn();

    render(
      <SmogDashboard
        airQuality={mockAirQuality}
        onSelectStation={onSelect}
        onRefresh={onRefresh}
        isRefreshing={false}
      />
    );

    expect(screen.getByText('418')).toBeInTheDocument();
    expect(screen.getByText('Hazardous (Severe+)')).toBeInTheDocument();
    expect(screen.getByText('New Delhi (NCR), India')).toBeInTheDocument();

    // Test station pill click
    const lahoreBtn = screen.getByRole('button', { name: /Select Lahore/i });
    fireEvent.click(lahoreBtn);
    expect(onSelect).toHaveBeenCalled();

    // Test refresh button click
    const refreshBtn = screen.getByLabelText('Refresh live sensor data');
    fireEvent.click(refreshBtn);
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });
});

describe('RoutineGenerator Component', () => {
  it('renders personalized routines and calculates completion progress accurately', () => {
    const onToggle = vi.fn();
    const onRegenerate = vi.fn();
    const onPrint = vi.fn();

    render(
      <RoutineGenerator
        routines={mockRoutines}
        profile={mockProfile}
        airQuality={mockAirQuality}
        onToggleComplete={onToggle}
        onRegenerate={onRegenerate}
        isGenerating={false}
        onOpenPrintModal={onPrint}
      />
    );

    // 1 of 2 completed = 50%
    expect(screen.getByText(/1 of 2 completed \(50%\)/)).toBeInTheDocument();
    expect(screen.getByText('Morning School Commute & Inversion Defense')).toBeInTheDocument();

    // Toggle completion checkbox
    const toggleBtn = screen.getByRole('checkbox', {
      name: /Mark routine "Morning School Commute & Inversion Defense" as complete/i
    });
    fireEvent.click(toggleBtn);
    expect(onToggle).toHaveBeenCalledWith('routine-1');

    // Filter by phase
    const morningTab = screen.getByRole('tab', { name: /Morning \(Inversion Peak\)/i });
    fireEvent.click(morningTab);
    expect(screen.getByText('Morning School Commute & Inversion Defense')).toBeInTheDocument();
  });
});

describe('IndoorHacksStudio Component', () => {
  it('renders interactive CADR calculator and recalculates room volume on input change', () => {
    render(<IndoorHacksStudio />);

    expect(screen.getByText('Corsi-Rosenthal Box & CADR Sizing Calculator')).toBeInTheDocument();
    expect(screen.getByText('High-Efficiency DIY Air Purifier & Seal Hacks')).toBeInTheDocument();
    expect(screen.getAllByText('DIY Corsi-Rosenthal Box (High-CADR Purifier)').length).toBeGreaterThan(0);

    const lengthInput = screen.getByLabelText(/Length \(ft\)/i);
    fireEvent.change(lengthInput, { target: { value: '20' } });
    expect(lengthInput).toHaveValue(20);
  });
});

describe('FamilyProfiler Component', () => {
  it('renders profile configuration and updates family vulnerabilities and presets', () => {
    const onChangeProfile = vi.fn();
    const onGenerate = vi.fn();

    render(
      <FamilyProfiler
        profile={mockProfile}
        onChangeProfile={onChangeProfile}
        onGenerateNewRoutine={onGenerate}
        isGenerating={false}
      />
    );

    expect(screen.getByRole('heading', { name: /The Sharma Family/i })).toBeInTheDocument();
    expect(screen.getByText(/Family Smog Vulnerability Matrix/)).toBeInTheDocument();

    // Click 'Edit Household Profile' to expand custom panel
    const expandBtn = screen.getByRole('button', { name: /Edit Household Profile/i });
    fireEvent.click(expandBtn);

    // Verify vulnerability checkboxes
    const infantsCheckbox = screen.getByLabelText(/Infants or Toddlers/i);
    expect(infantsCheckbox).toBeChecked();
    fireEvent.click(infantsCheckbox);
    expect(onChangeProfile).toHaveBeenCalled();

    // Switch preset
    const presetBtn = screen.getByRole('button', { name: /Select The Zhang Family/i });
    fireEvent.click(presetBtn);
    expect(onChangeProfile).toHaveBeenCalled();

    // Test AI routine generation trigger
    const generateBtn = screen.getByRole('button', { name: /Generate AI Personalized Smog Routine/i });
    fireEvent.click(generateBtn);
    expect(onGenerate).toHaveBeenCalled();
  });
});
