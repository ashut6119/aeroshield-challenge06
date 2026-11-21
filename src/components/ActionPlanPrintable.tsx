import React from 'react';
import { X, Printer, Shield, AlertTriangle, CheckCircle, HeartPulse, Clock, Sparkles } from 'lucide-react';
import { FamilyProfile, AirQualityData } from '../types';

interface ActionPlanPrintableProps {
  isOpen: boolean;
  onClose: () => void;
  profile: FamilyProfile;
  airQuality: AirQualityData;
}

export const ActionPlanPrintable: React.FC<ActionPlanPrintableProps> = ({
  isOpen,
  onClose,
  profile,
  airQuality
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Close Button (No print) */}
        <div className="no-print absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Card Content */}
        <div className="overflow-y-auto pr-1 text-slate-800 space-y-5 print:p-0">
          
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-600 text-white rounded-lg">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight text-slate-900">
                    AeroShield Family Smog Survival Plan
                  </h1>
                  <p className="text-xs text-slate-600 font-medium">
                    Personalized Winter Defense Protocol • Keep Posted on Refrigerator
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-rose-600 block">CURRENT SMOG ALERT</span>
                <span className="text-lg font-black text-slate-900">AQI {airQuality.aqi}</span>
                <span className="text-xs text-slate-500 block">({airQuality.severityLabel})</span>
              </div>
            </div>
            
            <div className="mt-2 text-xs bg-slate-100 p-2 rounded-lg flex justify-between font-medium">
              <span><strong>Household:</strong> {profile.familyNickname}</span>
              <span><strong>City:</strong> {profile.city}</span>
              <span><strong>Members:</strong> {profile.householdMembers}</span>
              <span><strong>Inversion:</strong> {airQuality.inversionRisk.toUpperCase()}</span>
            </div>
          </div>

          {/* Golden Rules */}
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3.5">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" /> 3 Golden Rules for Severe Smog Days
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
                <strong className="block text-emerald-800 mb-0.5">1. Windows Clamped</strong>
                <span className="text-slate-600 leading-tight block">Zero open windows between 6-9 AM and 6-10 PM inversion hours.</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
                <strong className="block text-emerald-800 mb-0.5">2. Clean Sanctuary</strong>
                <span className="text-slate-600 leading-tight block">Keep primary bedroom door shut 24/7 with air purifier/DIY fan running.</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
                <strong className="block text-emerald-800 mb-0.5">3. Damp Mop Only</strong>
                <span className="text-slate-600 leading-tight block">Never dry sweep floors; brooms kick toxic micro-particles back into child air.</span>
              </div>
            </div>
          </div>

          {/* Room-by-Room Defense Checklist */}
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-2">
              Room-by-Room Smog Shielding Checklist
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              <div className="border border-slate-200 rounded-xl p-3 space-y-1.5">
                <strong className="text-slate-900 block font-bold">🚪 Entryway & Doors:</strong>
                <ul className="space-y-1 text-slate-600">
                  <li>• Damp rolled cotton towel wedged under exterior front door.</li>
                  <li>• Remove smog-exposed jackets & shoes at door threshold.</li>
                  <li>• Inspect weather-stripping along drafty window frames.</li>
                </ul>
              </div>

              <div className="border border-slate-200 rounded-xl p-3 space-y-1.5">
                <strong className="text-slate-900 block font-bold">🍳 Kitchen & Cooking:</strong>
                <ul className="space-y-1 text-slate-600">
                  <li>• Turn exhaust fan on 2 mins BEFORE cooking; shut kitchen door.</li>
                  <li>• Keep pan lids tightly on; avoid open deep frying after 6 PM.</li>
                  <li>• Leave kitchen exhaust running 10 mins post-cooking.</li>
                </ul>
              </div>

              <div className="border border-slate-200 rounded-xl p-3 space-y-1.5">
                <strong className="text-slate-900 block font-bold">🛏️ Bedroom Sanctuary:</strong>
                <ul className="space-y-1 text-slate-600">
                  <li>• Position air purifier / DIY Corsi-Rosenthal near headboard.</li>
                  <li>• Run on High for 45 mins before bedtime; drop to Low for sleep.</li>
                  <li>• Keep bedroom door closed continuously.</li>
                </ul>
              </div>

              <div className="border border-slate-200 rounded-xl p-3 space-y-1.5">
                <strong className="text-slate-900 block font-bold">🚗 Transit & Commute:</strong>
                <ul className="space-y-1 text-slate-600">
                  <li>• Avoid two-wheelers/walking during 6:30-9:00 AM rush.</li>
                  <li>• Car recirculate mode ON; avoid engine idling at school gates.</li>
                  <li>• Perform indispensable errands during 1:30-3:30 PM trough.</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Mask & Vulnerability Protocol */}
          <div className="border-t border-slate-200 pt-3 flex flex-col sm:flex-row justify-between gap-4 text-xs">
            <div>
              <strong className="text-slate-900 block font-bold mb-1">🎭 Respirator Protocol:</strong>
              <p className="text-slate-600 leading-relaxed">
                Use certified N95 / KF94 / FFP2 respirators. Form the aluminum wire tightly to the nasal bridge. Store masks in labeled breathable brown paper bags for 72 hours between uses.
              </p>
            </div>
            <div>
              <strong className="text-slate-900 block font-bold mb-1">🚨 Emergency Warning Signs:</strong>
              <p className="text-slate-600 leading-relaxed">
                Persistent wheezing unresponsive to rescue inhalers, infant chest retractions, or bluish lips require immediate emergency medical care.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-[10px] text-slate-400 text-center pt-2 border-t border-slate-100">
            AeroShield AI Urban Air Quality Assistant • Built for Google for Developers PromptWars
          </div>

        </div>

      </div>
    </div>
  );
};
