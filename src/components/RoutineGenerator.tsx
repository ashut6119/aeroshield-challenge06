import React, { useState } from 'react';
import { Calendar, Clock, Sparkles, AlertCircle, ShieldCheck, Flame, Moon, Sun, Printer, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RoutineItem, FamilyProfile, AirQualityData } from '../types';

interface RoutineGeneratorProps {
  routines: RoutineItem[];
  profile: FamilyProfile;
  airQuality: AirQualityData;
  onToggleComplete: (id: string) => void;
  onRegenerate: () => void;
  isGenerating: boolean;
  onOpenPrintModal: () => void;
}

export const RoutineGenerator: React.FC<RoutineGeneratorProps> = ({
  routines,
  profile,
  airQuality: _airQuality,
  onToggleComplete,
  onRegenerate: _onRegenerate,
  isGenerating: _isGenerating,
  onOpenPrintModal
}) => {
  const [selectedPhase, setSelectedPhase] = useState<string>('all');

  const filteredRoutines = selectedPhase === 'all'
    ? routines
    : routines.filter(r => r.phase === selectedPhase);

  const completedCount = routines.filter(r => r.completed).length;
  const progressPercent = routines.length > 0 ? Math.round((completedCount / routines.length) * 100) : 0;

  const handleCheckbox = (id: string, currentlyCompleted?: boolean) => {
    onToggleComplete(id);
    if (!currentlyCompleted) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#10b981', '#34d399', '#6ee7b7']
      });
    }
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'hazardous':
        return 'bg-red-950/80 text-rose-300 border-red-700';
      case 'high':
        return 'bg-purple-950/70 text-purple-300 border-purple-700/60';
      case 'moderate':
        return 'bg-amber-950/60 text-amber-300 border-amber-700/50';
      default:
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50';
    }
  };

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'morning':
        return <Sun className="w-4 h-4 text-amber-400" />;
      case 'midday':
      case 'afternoon':
        return <Sparkles className="w-4 h-4 text-emerald-400" />;
      case 'evening':
        return <Flame className="w-4 h-4 text-rose-400" />;
      case 'night':
        return <Moon className="w-4 h-4 text-indigo-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl backdrop-blur-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Personalized 24-Hour Smog Defense
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Tailored for {profile.familyNickname.split('(')[0]}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Diurnal Low-Emission Routine & Health Hacks
          </h3>
          <p className="text-xs text-slate-400">
            Engineered to decouple family transit and cooking from peak inversion hours.
          </p>
        </div>

        {/* Progress & Actions */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-semibold text-slate-400 block">Family Adherence</span>
            <span className="text-sm font-bold text-emerald-400">{completedCount} of {routines.length} completed ({progressPercent}%)</span>
          </div>

          <button
            onClick={onOpenPrintModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition"
            title="Export 1-Page Emergency Action Plan"
            aria-label="Export 1-Page Emergency Action Plan for printing"
          >
            <Printer className="w-3.5 h-3.5 text-slate-300" aria-hidden="true" />
            <span className="hidden sm:inline">Print Fridge Plan</span>
          </button>
        </div>
      </div>

      {/* Phase Filter Tabs */}
      <div 
        className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none"
        role="tablist"
        aria-label="Filter routines by time of day"
      >
        {[
          { id: 'all', label: 'Full 24h Day' },
          { id: 'morning', label: 'Morning (Inversion Peak)' },
          { id: 'midday', label: 'Midday' },
          { id: 'afternoon', label: 'Afternoon (Diurnal Trough)' },
          { id: 'evening', label: 'Evening (Smog Rise)' },
          { id: 'night', label: 'Night (Sanctuary Sleep)' }
        ].map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={selectedPhase === tab.id}
            aria-controls="routines-list"
            id={`tab-phase-${tab.id}`}
            onClick={() => setSelectedPhase(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedPhase === tab.id
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Routine Cards Grid */}
      <div 
        id="routines-list" 
        role="tabpanel" 
        aria-labelledby={`tab-phase-${selectedPhase}`}
        className="space-y-4 pt-2"
      >
        {filteredRoutines.map((item) => {
          const isDone = !!item.completed;
          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all duration-300 relative ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/40 opacity-80'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Top Card Info Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <button
                    role="checkbox"
                    aria-checked={isDone}
                    aria-label={`Mark routine "${item.title}" as ${isDone ? 'incomplete' : 'complete'}`}
                    onClick={() => handleCheckbox(item.id, item.completed)}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                      isDone
                        ? 'bg-emerald-500 border-emerald-400 text-white'
                        : 'border-slate-700 bg-slate-900 hover:border-emerald-500'
                    }`}
                  >
                    {isDone && <Check className="w-4 h-4 stroke-[3]" aria-hidden="true" />}
                  </button>

                  <div className="flex items-center gap-2">
                    {getPhaseIcon(item.phase)}
                    <span className="font-mono text-xs font-bold text-slate-300">{item.timeSlot}</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      {item.title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getRiskBadge(item.smogRiskLevel)}`}>
                    {item.smogRiskLevel} Smog Exposure
                  </span>
                </div>
              </div>

              {/* Contrast Section: Default High-Emission Habit vs AeroShield Routine */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-3">
                
                {/* Default High-Emission / High-Risk Habit */}
                <div className="bg-rose-950/20 border border-rose-900/30 rounded-xl p-3.5">
                  <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <AlertCircle className="w-3.5 h-3.5" /> High-Emission / High-Exposure Habit
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.defaultHabit}
                  </p>
                </div>

                {/* AeroShield Low-Emission Routine & Health Hack */}
                <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3.5 ring-1 ring-emerald-500/20">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> AeroShield Routine & Indoor Hack
                  </div>
                  <p className="text-xs text-slate-200 font-medium leading-relaxed">
                    {item.lowEmissionRoutine}
                  </p>
                  <div className="mt-2 pt-2 border-t border-emerald-500/20 text-[11px] text-emerald-300 flex items-start gap-1">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                    <span><strong>Health Hack:</strong> {item.healthHack}</span>
                  </div>
                </div>

              </div>

              {/* Rationale & Family Vulnerability Impact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] text-slate-400">
                <div>
                  <strong className="text-slate-300">Scientific Mechanism: </strong>
                  <span>{item.whyItMatters}</span>
                </div>
                <div>
                  <strong className="text-emerald-400">Tailored Family Impact: </strong>
                  <span>{item.familyImpact}</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
