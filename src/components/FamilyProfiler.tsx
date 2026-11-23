import React, { useState } from 'react';
import { Users, Baby, HeartPulse, Home, Sparkles, Check, ChevronDown } from 'lucide-react';
import { FamilyProfile, WindowDraftLevel, BudgetTier } from '../types';
import { PRESET_FAMILY_PROFILES } from '../data/presetProfiles';

interface FamilyProfilerProps {
  profile: FamilyProfile;
  onChangeProfile: (profile: FamilyProfile) => void;
  onGenerateNewRoutine: () => void;
  isGenerating: boolean;
}

/**
 * Family Profiler component - calculates household smog fragility score
 * and allows 1-click test scenarios and full custom configuration.
 */
export const FamilyProfiler: React.FC<FamilyProfilerProps> = ({
  profile,
  onChangeProfile,
  onGenerateNewRoutine,
  isGenerating
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const calculateVulnerabilityScore = (): number => {
    let score = 20; // baseline
    if (profile.hasInfantsOrToddlers) score += 25;
    if (profile.hasElderly) score += 20;
    if (profile.hasPregnancy) score += 20;
    if (profile.respiratoryConditions.length > 0 && !profile.respiratoryConditions.includes('None')) {
      score += 25;
    }
    if (profile.windowDraftLevel === 'drafty_single_pane') score += 15;
    if (profile.kitchenSetup === 'window_only') score += 10;
    if (profile.purifierCount === 0) score += 15;
    if (profile.purifierCount >= 2) score -= 15;
    return Math.min(100, Math.max(10, score));
  };

  const score = calculateVulnerabilityScore();

  const getRiskLabel = (s: number): { label: string; color: string } => {
    if (s >= 75) return { label: 'CRITICAL VULNERABILITY', color: 'text-rose-400 bg-rose-500/20 border-rose-500/30' };
    if (s >= 50) return { label: 'HIGH VULNERABILITY', color: 'text-amber-400 bg-amber-500/20 border-amber-500/30' };
    return { label: 'MODERATE VULNERABILITY', color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30' };
  };

  const risk = getRiskLabel(score);

  return (
    <section aria-labelledby="family-matrix-heading" className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl backdrop-blur-sm">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" aria-hidden="true" /> Family Smog Vulnerability Matrix
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${risk.color}`} role="status">
              {risk.label} ({score}/100)
            </span>
          </div>
          <h2 id="family-matrix-heading" className="text-lg sm:text-xl font-bold text-white mt-1">
            Active Profile: {profile.familyNickname}
          </h2>
          <p className="text-xs text-slate-400">
            {profile.householdMembers} Family Members in {profile.city} • {profile.homeType.replace(/_/g, ' ')}
          </p>
        </div>

        {/* Generate / Regenerate AI Routine Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls="custom-profile-panel"
            className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 rounded-xl border border-slate-700/60 transition focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span>{isExpanded ? 'Hide Details' : 'Edit Household Profile'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onGenerateNewRoutine}
            disabled={isGenerating}
            aria-label="Generate AI Personalized Smog Routine"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} aria-hidden="true" />
            <span>{isGenerating ? 'Synthesizing with Gemini...' : 'Generate AI Smog Routine'}</span>
          </button>
        </div>
      </div>

      {/* Preset Family Quick Switch Bar */}
      <div className="py-4">
        <label id="presets-label" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Test with Real-World Preset Family Scenarios:
        </label>
        <div role="group" aria-labelledby="presets-label" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PRESET_FAMILY_PROFILES.map((preset) => {
            const isSelected = profile.familyNickname === preset.familyNickname;
            return (
              <button
                key={preset.familyNickname}
                type="button"
                onClick={() => onChangeProfile(preset)}
                aria-pressed={isSelected}
                aria-label={`Select ${preset.familyNickname} in ${preset.city}`}
                className={`p-3 rounded-2xl border text-left transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500 text-white ring-1 ring-emerald-500/50 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white line-clamp-1">{preset.familyNickname.split('(')[0]}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1">
                  {preset.city} • {preset.householdMembers} people
                </div>
                <div className="text-[10px] text-emerald-400/90 font-medium mt-1">
                  {preset.hasInfantsOrToddlers ? '👶 Toddler ' : ''}
                  {preset.hasElderly ? '👴 Senior ' : ''}
                  {preset.respiratoryConditions.length > 0 && preset.respiratoryConditions[0] !== 'None' ? `🫁 ${preset.respiratoryConditions[0]}` : ''}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded Customizer Form */}
      {isExpanded && (
        <div id="custom-profile-panel" className="mt-4 pt-4 border-t border-slate-800 space-y-5 animate-fadeIn">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Household Composition */}
            <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                <Baby className="w-4 h-4" aria-hidden="true" /> Vulnerable Demographics
              </h3>
              <div className="space-y-2.5">
                <label htmlFor="chk-infants" className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                  <span>Infants or Toddlers (0-5 yrs)</span>
                  <input
                    id="chk-infants"
                    type="checkbox"
                    checked={profile.hasInfantsOrToddlers}
                    onChange={(e) => onChangeProfile({ ...profile, hasInfantsOrToddlers: e.target.checked })}
                    className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500 w-4 h-4"
                  />
                </label>
                <label htmlFor="chk-schoolkids" className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                  <span>School Children (6-15 yrs)</span>
                  <input
                    id="chk-schoolkids"
                    type="checkbox"
                    checked={profile.hasSchoolChildren}
                    onChange={(e) => onChangeProfile({ ...profile, hasSchoolChildren: e.target.checked })}
                    className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500 w-4 h-4"
                  />
                </label>
                <label htmlFor="chk-elderly" className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                  <span>Elderly Members (65+ yrs)</span>
                  <input
                    id="chk-elderly"
                    type="checkbox"
                    checked={profile.hasElderly}
                    onChange={(e) => onChangeProfile({ ...profile, hasElderly: e.target.checked })}
                    className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500 w-4 h-4"
                  />
                </label>
                <label htmlFor="chk-pregnancy" className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                  <span>Pregnancy</span>
                  <input
                    id="chk-pregnancy"
                    type="checkbox"
                    checked={profile.hasPregnancy}
                    onChange={(e) => onChangeProfile({ ...profile, hasPregnancy: e.target.checked })}
                    className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500 w-4 h-4"
                  />
                </label>
              </div>
            </div>

            {/* Health & Respiratory Conditions */}
            <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4" aria-hidden="true" /> Respiratory Health Profile
              </h3>
              <div className="space-y-2">
                <span id="conditions-group-label" className="block text-[11px] text-slate-400">Pre-existing Conditions:</span>
                <div role="group" aria-labelledby="conditions-group-label" className="flex flex-wrap gap-1.5">
                  {['Asthma', 'COPD', 'Dust Allergy', 'Bronchitis', 'None'].map((cond) => {
                    const isChecked = profile.respiratoryConditions.includes(cond);
                    return (
                      <button
                        key={cond}
                        type="button"
                        aria-pressed={isChecked}
                        aria-label={`Toggle condition ${cond}`}
                        onClick={() => {
                          let updated: string[];
                          if (cond === 'None') {
                            updated = ['None'];
                          } else {
                            const withoutNone = profile.respiratoryConditions.filter(c => c !== 'None');
                            updated = isChecked
                              ? withoutNone.filter(c => c !== cond)
                              : [...withoutNone, cond];
                            if (updated.length === 0) updated = ['None'];
                          }
                          onChangeProfile({ ...profile, respiratoryConditions: updated });
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition focus-visible:ring-2 focus-visible:ring-rose-400 ${
                          isChecked
                            ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 font-semibold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {cond}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <label htmlFor="chk-pets" className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                    <span>Has Indoor Pets</span>
                    <input
                      id="chk-pets"
                      type="checkbox"
                      checked={profile.hasPets}
                      onChange={(e) => onChangeProfile({ ...profile, hasPets: e.target.checked })}
                      className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500 w-4 h-4"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Housing & Infrastructure */}
            <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3 flex items-center gap-1.5">
                <Home className="w-4 h-4" aria-hidden="true" /> Home Smog Infiltration
              </h3>
              <div className="space-y-2.5">
                <div>
                  <label htmlFor="select-window-draft" className="block text-[11px] text-slate-400 mb-1">Window Tightness:</label>
                  <select
                    id="select-window-draft"
                    value={profile.windowDraftLevel}
                    onChange={(e) => onChangeProfile({ ...profile, windowDraftLevel: e.target.value as WindowDraftLevel })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    <option value="drafty_single_pane">Drafty Single Pane (High infiltration)</option>
                    <option value="moderate_gaps">Moderate Gaps (Standard seals)</option>
                    <option value="tight_double_glaze">Airtight Double Glazed</option>
                  </select>
                </div>

                <div>
                  <label id="lbl-purifiers-count" className="block text-[11px] text-slate-400 mb-1">Active HEPA Purifiers:</label>
                  <div role="group" aria-labelledby="lbl-purifiers-count" className="flex items-center gap-2">
                    {[0, 1, 2, 3].map((count) => (
                      <button
                        key={count}
                        type="button"
                        aria-pressed={profile.purifierCount === count}
                        aria-label={`${count} active air purifiers`}
                        onClick={() => onChangeProfile({ ...profile, purifierCount: count })}
                        className={`flex-1 py-1 rounded-lg text-xs font-semibold border focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                          profile.purifierCount === count
                            ? 'bg-emerald-500 text-white border-emerald-400'
                            : 'bg-slate-900 border-slate-700 text-slate-400'
                        }`}
                      >
                        {count === 3 ? '3+' : count}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="select-budget-tier" className="block text-[11px] text-slate-400 mb-1">Budget Preference:</label>
                  <select
                    id="select-budget-tier"
                    value={profile.budgetTier}
                    onChange={(e) => onChangeProfile({ ...profile, budgetTier: e.target.value as BudgetTier })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    <option value="zero_cost">Zero Cost (Repurposed towels, lids, routines)</option>
                    <option value="budget_under_50">Budget &lt; $50 (DIY Corsi-Rosenthal, weather strips)</option>
                    <option value="prepared_investment">Flexible / Commercial HEPA Units</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </section>
  );
};
