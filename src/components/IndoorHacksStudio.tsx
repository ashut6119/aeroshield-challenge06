import React, { useState } from 'react';
import { Wrench, ShieldAlert, CheckCircle, Calculator, ChevronRight, AlertTriangle, Lightbulb } from 'lucide-react';
import { INDOOR_HACKS_LIBRARY } from '../data/indoorHacks';
import { calculateCadrRequirements } from '../services/cadrCalculator';
import { IndoorHack } from '../types';

export const IndoorHacksStudio: React.FC = () => {
  // CADR Calculator state
  const [lengthFt, setLengthFt] = useState(16);
  const [widthFt, setWidthFt] = useState(14);
  const [heightFt, setHeightFt] = useState(9);
  const [targetAch, setTargetAch] = useState(5); // 5 Air Changes Per Hour for severe smog

  const [selectedHack, setSelectedHack] = useState<IndoorHack>(INDOOR_HACKS_LIBRARY[0]);

  const cadrResult = calculateCadrRequirements(lengthFt, widthFt, heightFt, targetAch);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl backdrop-blur-sm space-y-8">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400 flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5" /> Indoor Air Hacks & DIY Filtration Studio
          </span>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
            Science-Backed
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
          High-Efficiency DIY Air Purifier & Seal Hacks
        </h3>
        <p className="text-xs text-slate-400">
          Transform ordinary household hardware into hospital-grade particle filtration systems at 1/5th the commercial cost.
        </p>
      </div>

      {/* Part 1: Interactive DIY Corsi-Rosenthal CADR Engineering Calculator */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 sm:p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <h4 className="text-base font-bold text-white">
              Corsi-Rosenthal Box & CADR Sizing Calculator
            </h4>
          </div>
          <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-lg">
            Standard: 4-6 Air Changes/Hour
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Controls */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="cadr-length" className="block text-[11px] font-semibold text-slate-400 mb-1">Length (ft)</label>
                <input
                  id="cadr-length"
                  type="number"
                  min="8"
                  max="40"
                  value={lengthFt}
                  onChange={(e) => setLengthFt(Number(e.target.value) || 10)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus-visible:ring-2 focus-visible:ring-emerald-400"
                />
              </div>
              <div>
                <label htmlFor="cadr-width" className="block text-[11px] font-semibold text-slate-400 mb-1">Width (ft)</label>
                <input
                  id="cadr-width"
                  type="number"
                  min="8"
                  max="40"
                  value={widthFt}
                  onChange={(e) => setWidthFt(Number(e.target.value) || 10)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus-visible:ring-2 focus-visible:ring-emerald-400"
                />
              </div>
              <div>
                <label htmlFor="cadr-height" className="block text-[11px] font-semibold text-slate-400 mb-1">Ceiling (ft)</label>
                <input
                  id="cadr-height"
                  type="number"
                  min="7"
                  max="16"
                  value={heightFt}
                  onChange={(e) => setHeightFt(Number(e.target.value) || 9)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus-visible:ring-2 focus-visible:ring-emerald-400"
                />
              </div>
            </div>

            {/* Target Air Changes Per Hour Slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <label htmlFor="cadr-ach">Target Air Changes Per Hour (ACH):</label>
                <span className="font-bold text-emerald-400">{targetAch} ACH ({targetAch >= 5 ? 'Severe Smog Safe' : 'Standard Clean'})</span>
              </div>
              <input
                id="cadr-ach"
                type="range"
                min="3"
                max="8"
                step="1"
                value={targetAch}
                aria-valuemin={3}
                aria-valuemax={8}
                aria-valuenow={targetAch}
                aria-label="Target air changes per hour"
                onChange={(e) => setTargetAch(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>3 ACH (Normal)</span>
                <span>5 ACH (Smog Emergency)</span>
                <span>8 ACH (Clinical Room)</span>
              </div>
            </div>

            {/* Summary details */}
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-300">
              <span className="font-semibold text-white">Room Area: </span> {cadrResult.roomAreaSqFt} sq ft ({cadrResult.roomVolumeCuFt} cu ft volume)
            </div>
          </div>

          {/* Output Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-2xl p-5 ring-1 ring-emerald-500/20">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Required Clean Air Delivery Rate (CADR)
            </span>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl sm:text-5xl font-black text-white">{cadrResult.requiredCadrCfm}</span>
              <span className="text-sm font-semibold text-emerald-300">CFM (Cubic Feet / Min)</span>
            </div>

            <div className="space-y-2 pt-2 border-t border-emerald-500/20 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>DIY Corsi-Rosenthal Recommendation:</span>
                <span className="font-bold text-white">{cadrResult.corsiRosenthalConfig.filterCount}x MERV-13 Filters + 20" Fan</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated DIY Build Cost:</span>
                <span className="font-bold text-emerald-300">${cadrResult.corsiRosenthalConfig.costUsd} (vs $350+ commercial)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivered Filtration Capacity:</span>
                <span className="font-bold text-white">~{cadrResult.corsiRosenthalConfig.estimatedDeliveredCadr} CFM</span>
              </div>
            </div>

            <p className="mt-3 text-[11px] text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              {cadrResult.commercialAlternativeRecommendation}
            </p>
          </div>

        </div>
      </div>

      {/* Part 2: Interactive Hacks Library Selector */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" /> Curated Science-Backed Indoor Smog Hacks
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* List of Hacks */}
          <div className="md:col-span-5 space-y-2">
            {INDOOR_HACKS_LIBRARY.map((hack) => {
              const isSelected = selectedHack.id === hack.id;
              return (
                <button
                  key={hack.id}
                  onClick={() => setSelectedHack(hack)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/40'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{hack.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {hack.estimatedCost} • {hack.timeToSetupMin} mins setup
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-emerald-400 translate-x-1' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Selected Hack Deep Dive Card */}
          <div className="md:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {selectedHack.badgeText || 'Verified Science'}
                </span>
                <h5 className="text-base font-bold text-white mt-1">{selectedHack.title}</h5>
                <p className="text-xs text-slate-400">{selectedHack.estimatedCost} • Setup: ~{selectedHack.timeToSetupMin} mins</p>
              </div>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-500/10 px-2 py-1 rounded-lg">
                ★ {selectedHack.effectivenessRating}/5 Impact
              </div>
            </div>

            {/* Materials */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                Materials Needed:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-300">
                {selectedHack.materialsNeeded.map((mat, i) => (
                  <li key={i} className="flex items-center gap-1.5 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                Step-by-Step Instructions:
              </span>
              <ol className="space-y-1.5 text-xs text-slate-300">
                {selectedHack.stepByStep.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-emerald-400 font-mono text-[11px] shrink-0 mt-0.5">
                      {idx + 1}.
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Science Mechanism */}
            <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3 text-xs text-slate-300 leading-relaxed">
              <strong className="text-emerald-300 block mb-0.5">Physical Principle:</strong>
              {selectedHack.sciencePrinciple}
            </div>

            {/* Common Pitfalls */}
            {selectedHack.commonPitfalls && (
              <div className="bg-rose-950/20 border border-rose-900/30 rounded-xl p-3 text-xs text-slate-300">
                <strong className="text-rose-400 flex items-center gap-1 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> What to Avoid:
                </strong>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                  {selectedHack.commonPitfalls.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Part 3: Winter Smog Myths vs Science Buster */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-amber-400" /> Dangerous Smog Myths vs. Laboratory Science
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-rose-400 font-bold block">❌ Myth: "Houseplants clean winter smog"</span>
            <p className="text-slate-300 leading-relaxed">
              NASA tested plants for VOC gases in sealed airless boxes. Plants do not physically intercept sub-micron PM2.5. Overwatering plants in winter raises humidity above 60%, breeding toxic mold.
            </p>
          </div>

          <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-rose-400 font-bold block">❌ Myth: "Ionizing air purifiers are superior"</span>
            <p className="text-slate-300 leading-relaxed">
              Negative ionizers generate harmful ozone ($O_3$) as a byproduct. Ozone reacts with terpenes and lung surfactant to produce extreme airway inflammation, especially in asthmatic children.
            </p>
          </div>

          <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-rose-400 font-bold block">❌ Myth: "Burning camphor cleans indoor air"</span>
            <p className="text-slate-300 leading-relaxed">
              Combusting incense, camphor, or scented candles inside closed-window homes releases intense polycyclic aromatic hydrocarbons and carbon particulates directly into child breathing zones.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
