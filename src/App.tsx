import React, { useState, useEffect } from 'react';
import { Calendar, Wrench, MessageSquare, Printer, Compass, Code2 } from 'lucide-react';
import { AirQualityData, FamilyProfile, RoutineItem, TabType } from './types';
import { HOTSPOT_STATIONS, fetchAirQualityForStation, StationPreset } from './services/airQuality';
import { PRESET_FAMILY_PROFILES } from './data/presetProfiles';
import { getStoredApiKey, getStoredModel, generatePersonalizedRoutine } from './services/gemini';
import { Navbar } from './components/Navbar';
import { SmogDashboard } from './components/SmogDashboard';
import { FamilyProfiler } from './components/FamilyProfiler';
import { RoutineGenerator } from './components/RoutineGenerator';
import { IndoorHacksStudio } from './components/IndoorHacksStudio';
import { SmogAdvisorChat } from './components/SmogAdvisorChat';
import { ApiKeyModal } from './components/ApiKeyModal';
import { PromptArchitectureModal } from './components/PromptArchitectureModal';
import { ActionPlanPrintable } from './components/ActionPlanPrintable';

export function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Station and Air Quality State
  const [selectedStation, setSelectedStation] = useState<StationPreset>(HOTSPOT_STATIONS[0]);
  const [airQuality, setAirQuality] = useState<AirQualityData>({
    city: HOTSPOT_STATIONS[0].city,
    country: HOTSPOT_STATIONS[0].country,
    station: HOTSPOT_STATIONS[0].station,
    aqi: HOTSPOT_STATIONS[0].defaultAqi,
    severity: 'hazardous',
    severityLabel: 'Hazardous (Severe+)',
    pm25: HOTSPOT_STATIONS[0].pm25,
    pm10: HOTSPOT_STATIONS[0].pm10,
    no2: HOTSPOT_STATIONS[0].no2,
    co: HOTSPOT_STATIONS[0].co,
    tempC: HOTSPOT_STATIONS[0].tempC,
    humidity: HOTSPOT_STATIONS[0].humidity,
    windSpeedKmh: HOTSPOT_STATIONS[0].windSpeedKmh,
    inversionRisk: HOTSPOT_STATIONS[0].inversionRisk,
    primaryPollutant: HOTSPOT_STATIONS[0].primaryPollutant,
    advisoryHeadline: HOTSPOT_STATIONS[0].advisoryHeadline,
    timestamp: '12:00 PM',
    hourlyForecast: []
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Profile and Routines State
  const [profile, setProfile] = useState<FamilyProfile>(PRESET_FAMILY_PROFILES[0]);
  const [routines, setRoutines] = useState<RoutineItem[]>([]);
  const [isGeneratingRoutine, setIsGeneratingRoutine] = useState(false);

  // Modals
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Gemini Settings
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [model, setModel] = useState(getStoredModel());

  // Load initial air quality on mount
  useEffect(() => {
    loadAirQuality(selectedStation);
  }, []);

  // When profile or air quality changes, generate initial routine
  useEffect(() => {
    handleGenerateRoutine();
  }, [profile.familyNickname, airQuality.city]);

  const loadAirQuality = async (station: StationPreset) => {
    setIsRefreshing(true);
    try {
      const data = await fetchAirQualityForStation(station);
      setAirQuality(data);
    } catch (e) {
      console.error('Failed to load air quality:', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSelectStation = (station: StationPreset) => {
    setSelectedStation(station);
    loadAirQuality(station);
  };

  const handleGenerateRoutine = async () => {
    setIsGeneratingRoutine(true);
    try {
      const newRoutines = await generatePersonalizedRoutine(profile, airQuality);
      setRoutines(newRoutines);
    } catch (e) {
      console.error('Failed to generate routine:', e);
    } finally {
      setIsGeneratingRoutine(false);
    }
  };

  const handleToggleRoutineComplete = (id: string) => {
    setRoutines(prev =>
      prev.map(r => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navigation Bar */}
      <Navbar
        airQuality={airQuality}
        profile={profile}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onOpenPromptModal={() => setIsPromptModalOpen(true)}
        hasApiKey={!!apiKey}
        selectedModel={model}
      />

      {/* Hero Sub-header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/30 border border-slate-800 rounded-2xl p-4 sm:p-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Google for Developers • PromptWars Virtual
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">• Challenge 06: Winter Smog Defense</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              AeroShield: AI Urban Air Quality Assistant
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Empowering families to survive severe winter smog with personalized low-emission routines, diurnal inversion scheduling, and hospital-grade indoor air hacks.
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPromptModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 transition shadow-sm"
            >
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Prompt Architecture</span>
            </button>
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition shadow-sm"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Print Fridge Plan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
        <div role="tablist" aria-label="Main Application Views" className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto scrollbar-none shadow-lg">
          {[
            { id: 'dashboard' as TabType, label: '1. Smog Dashboard & Stations', icon: <Compass className="w-4 h-4" aria-hidden="true" /> },
            { id: 'routine' as TabType, label: '2. 24h Low-Emission Routine', icon: <Calendar className="w-4 h-4" aria-hidden="true" /> },
            { id: 'hacks' as TabType, label: '3. Indoor Hacks & DIY Purifier', icon: <Wrench className="w-4 h-4" aria-hidden="true" /> },
            { id: 'advisor' as TabType, label: '4. AI Smog Doctor & Coping', icon: <MessageSquare className="w-4 h-4" aria-hidden="true" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full flex-1 space-y-6 focus:outline-none">
        
        {/* Always visible or tab-linked: Family Profiler */}
        <FamilyProfiler
          profile={profile}
          onChangeProfile={setProfile}
          onGenerateNewRoutine={handleGenerateRoutine}
          isGenerating={isGeneratingRoutine}
        />

        {/* Tab 1: Smog Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            <SmogDashboard
              airQuality={airQuality}
              onSelectStation={handleSelectStation}
              onRefresh={() => loadAirQuality(selectedStation)}
              isRefreshing={isRefreshing}
            />

            {/* Teaser to Next Step */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">Next Step: View Personalized Smog Routine</h4>
                <p className="text-xs text-slate-400">
                  AeroShield has synchronized with the {selectedStation.city} temperature inversion curve for {profile.familyNickname}.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('routine')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-emerald-600/20 whitespace-nowrap"
              >
                Open 24h Routine &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: 24h Low-Emission Routine */}
        {activeTab === 'routine' && (
          <div className="space-y-6 animate-fadeIn">
            <RoutineGenerator
              routines={routines}
              profile={profile}
              airQuality={airQuality}
              onToggleComplete={handleToggleRoutineComplete}
              onRegenerate={handleGenerateRoutine}
              isGenerating={isGeneratingRoutine}
              onOpenPrintModal={() => setIsPrintModalOpen(true)}
            />
          </div>
        )}

        {/* Tab 3: Indoor Hacks Studio */}
        {activeTab === 'hacks' && (
          <div className="space-y-6 animate-fadeIn">
            <IndoorHacksStudio />
          </div>
        )}

        {/* Tab 4: AI Smog Doctor Chat */}
        {activeTab === 'advisor' && (
          <div className="space-y-6 animate-fadeIn">
            <SmogAdvisorChat
              profile={profile}
              airQuality={airQuality}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2 font-semibold text-slate-400">
            <span>AeroShield</span>
            <span>•</span>
            <span>Built for Google for Developers PromptWars Challenge 06</span>
            <span>•</span>
            <span>Powered by Google Gemini 2.0</span>
          </div>
          <p className="text-slate-500 max-w-xl mx-auto text-[11px]">
            Designed to safeguard families during severe winter smog using proven atmospheric physics, clinical environmental medicine, and community low-emission routines.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeySaved={(newKey, newModel) => {
          setApiKey(newKey);
          setModel(newModel);
        }}
      />

      <PromptArchitectureModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
      />

      <ActionPlanPrintable
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        profile={profile}
        airQuality={airQuality}
      />

    </div>
  );
}

export default App;
