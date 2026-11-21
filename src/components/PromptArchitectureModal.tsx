import React, { useState } from 'react';
import { X, Code2, ShieldCheck, Terminal, Layers, Sparkles, BookOpen } from 'lucide-react';
import { SYSTEM_INSTRUCTION_SMOG_ASSISTANT } from '../prompts/templates';
import { PROMPT_INSPECTION_LOG } from '../services/gemini';

interface PromptArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromptArchitectureModal: React.FC<PromptArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'system' | 'chain_of_thought' | 'schema' | 'logs'>('system');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl shadow-indigo-500/10 relative text-slate-100 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 mb-6 shrink-0">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-white">PromptWars Architecture & Transparency Showcase</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                Evaluation Scorecard
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Complete disclosure of System Instructions, Chain-of-Thought Reasoning, JSON Schemas, and Guardrails
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 shrink-0 overflow-x-auto scrollbar-none">
          {[
            { id: 'system', label: '1. System Prompt & Persona', icon: <ShieldCheck className="w-4 h-4" /> },
            { id: 'chain_of_thought', label: '2. Chain-of-Thought Logic', icon: <Layers className="w-4 h-4" /> },
            { id: 'schema', label: '3. Structured Output & JSON Schema', icon: <Terminal className="w-4 h-4" /> },
            { id: 'logs', label: `4. Live Prompt Logs (${PROMPT_INSPECTION_LOG.length})`, icon: <Sparkles className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto py-4 text-xs leading-relaxed space-y-4 pr-1">
          
          {activeTab === 'system' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 block mb-2 font-mono">
                  // Master System Instruction (Passed to Gemini via systemInstruction parameter)
                </span>
                <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {SYSTEM_INSTRUCTION_SMOG_ASSISTANT}
                </pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl">
                  <h5 className="font-bold text-white mb-1">Key Prompt Engineering Highlights:</h5>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li><strong className="text-slate-200">Grounded Persona:</strong> Combines Pediatric Pulmonology, Filtration Engineering, and Sustainable Transit.</li>
                    <li><strong className="text-slate-200">Atmospheric Physics:</strong> Explicit instruction on Boundary Layer Thermal Inversion and the 1-3 PM diurnal trough.</li>
                    <li><strong className="text-slate-200">Negative Constraints:</strong> Bans ozone ionizers, unsealed open brooms, and unverified herbal cures.</li>
                  </ul>
                </div>

                <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl">
                  <h5 className="font-bold text-white mb-1">Context Injection Strategy:</h5>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li>Dynamic injection of live AQI, PM2.5, PM10, temperature, and wind.</li>
                    <li>Deep family profile injection (infants, elderly, pregnancy, asthma, draft tightness).</li>
                    <li>Budget tier targeting ($0 repurposed vs &lt;$50 DIY vs commercial).</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chain_of_thought' && (
            <div className="space-y-3">
              <p className="text-slate-300">
                AeroShield guides the Gemini model through a 4-step Chain-of-Thought (CoT) sequence before finalizing recommendations:
              </p>

              <div className="space-y-2.5">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="font-bold text-emerald-400 block">Step 1: Vulnerability Index Assessment</span>
                  <span className="text-slate-400">
                    Calculates cumulative household fragility based on minute ventilation rates (toddlers breathe 2x faster per kg), pulmonary reserve (elderly, COPD), and home envelope infiltration.
                  </span>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="font-bold text-emerald-400 block">Step 2: Diurnal Atmospheric Inversion Mapping</span>
                  <span className="text-slate-400">
                    Evaluates ground radiation cooling. Identifies peak morning (06:00-09:00) and evening (18:00-22:00) inversion caps versus the 13:00-15:30 solar-warmed dispersal window.
                  </span>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="font-bold text-emerald-400 block">Step 3: Low-Emission Habit Decoupling</span>
                  <span className="text-slate-400">
                    Replaces high-emission individual routines (idling car at school gates, frying food during closed-window hours, dry sweeping) with verified low-emission community alternatives.
                  </span>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="font-bold text-emerald-400 block">Step 4: Clean Air Delivery Rate (CADR) Engineering</span>
                  <span className="text-slate-400">
                    Recommends room-by-room zoning, starting with the 8-hour sleeping sanctuary, using Corsi-Rosenthal DIY filter specifications.
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-3">
              <p className="text-slate-300">
                To guarantee seamless UI parsing and zero hallucination of structural fields, AeroShield prompts Gemini to respond with strict JSON Schema:
              </p>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl font-mono text-[11px] text-emerald-300">
                <pre>{`[
  {
    "id": "routine-1",
    "timeSlot": "06:00 AM - 07:30 AM",
    "phase": "morning",
    "title": "Dawn Inversion Trap Avoidance",
    "category": "ventilation",
    "smogRiskLevel": "hazardous",
    "defaultHabit": "Opening windows for morning breeze and outdoor jogging",
    "lowEmissionRoutine": "Keep windows clamped; run bedroom purifier on High",
    "healthHack": "Wedge damp towel under exterior door threshold",
    "whyItMatters": "Ground radiation inversion locks particulates in lowest 100m",
    "familyImpact": "Protects toddler lungs from bronchospasm"
  }
]`}</pre>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-3">
              {PROMPT_INSPECTION_LOG.length === 0 ? (
                <div className="p-6 text-center text-slate-500">
                  No prompts logged yet in this session. Click "Generate AI Smog Routine" or ask a question in the AI Advisor to record live prompt interactions!
                </div>
              ) : (
                PROMPT_INSPECTION_LOG.map((log, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-emerald-400 uppercase tracking-wider">{log.feature}</span>
                      <span className="font-mono text-slate-500">{log.timestamp} • Model: {log.modelUsed}</span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      <span className="font-bold text-slate-400">User Prompt Snippet: </span>
                      {log.userPromptPreview}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
