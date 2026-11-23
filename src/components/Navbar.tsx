import React from 'react';
import { Wind, Shield, Key, Sparkles, Code2, AlertTriangle } from 'lucide-react';
import { AirQualityData, FamilyProfile } from '../types';

interface NavbarProps {
  airQuality: AirQualityData;
  profile: FamilyProfile;
  onOpenApiKeyModal: () => void;
  onOpenPromptModal: () => void;
  hasApiKey: boolean;
  selectedModel: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  airQuality,
  profile: _profile,
  onOpenApiKeyModal,
  onOpenPromptModal,
  hasApiKey,
  selectedModel: _selectedModel
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative p-2 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-xl shadow-lg shadow-emerald-500/20 text-white flex items-center justify-center">
            <Wind className="w-5 h-5" />
            <Shield className="w-3.5 h-3.5 absolute -bottom-0.5 -right-0.5 text-emerald-200 fill-emerald-800" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
                AeroShield
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                Challenge 06
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Urban Air Quality & Winter Smog Defense for Families
            </p>
          </div>
        </div>

        {/* Center: Live Station AQI Badge */}
        <div className="hidden md:flex items-center gap-3 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700/60 shadow-inner">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: airQuality.severity === 'hazardous' ? '#ef4444' : '#10b981' }} />
            <span className="text-xs text-slate-300 font-medium">{airQuality.city}:</span>
            <span className="text-xs font-bold text-white bg-slate-700 px-2 py-0.5 rounded-md">
              AQI {airQuality.aqi}
            </span>
            <span className="text-[11px] font-semibold text-rose-300">
              {airQuality.severityLabel}
            </span>
          </div>
          {airQuality.inversionRisk === 'severe' && (
            <span className="text-[10px] bg-purple-900/50 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
              <AlertTriangle className="w-3 h-3 text-purple-400" /> Inversion Trap
            </span>
          )}
        </div>

        {/* Right CTA / Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Prompt Architecture Modal Button (PromptWars Feature) */}
          <button
            onClick={onOpenPromptModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-colors"
            title="Inspect System Prompts, JSON Schemas & Guardrails"
            aria-label="Inspect System Prompts, JSON Schemas and Guardrails"
          >
            <Code2 className="w-4 h-4 text-indigo-400" aria-hidden="true" />
            <span className="hidden sm:inline">Prompt Architecture</span>
          </button>

          {/* Gemini API Key & Model Configuration */}
          <button
            onClick={onOpenApiKeyModal}
            aria-label={hasApiKey ? 'Gemini 2.0 Active - Configure API Key and Model' : 'Setup Gemini API Key'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              hasApiKey
                ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${hasApiKey ? 'text-emerald-400' : 'text-amber-400'}`} aria-hidden="true" />
            <span className="hidden sm:inline">
              {hasApiKey ? 'Gemini 2.0 Active' : 'Setup Gemini Key'}
            </span>
            <span className="sm:hidden">
              <Key className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
