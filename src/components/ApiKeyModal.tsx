import React, { useState, useEffect, useRef } from 'react';
import { X, Key, CheckCircle, ExternalLink, ShieldCheck, Cpu, AlertCircle } from 'lucide-react';
import {
  SUPPORTED_MODELS,
  saveStoredApiKey,
  saveStoredModel,
  getStoredApiKey,
  getStoredModel,
  isValidGeminiApiKey,
  SupportedModelId
} from '../services/gemini';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved: (key: string, model: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onKeySaved }) => {
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [model, setModel] = useState(getStoredModel());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape and focus close button on open
  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = (): void => {
    saveStoredApiKey(apiKey);
    saveStoredModel(model);
    onKeySaved(apiKey, model);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  const isKeyFormatValid = apiKey.trim() === '' || isValidGeminiApiKey(apiKey);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="api-modal-title"
      aria-describedby="api-modal-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full p-6 shadow-2xl shadow-emerald-500/10 relative text-slate-100">
        
        {/* Close button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close API configuration modal"
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <Key className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <h2 id="api-modal-title" className="text-lg font-bold text-white">Google Gemini API Configuration</h2>
            <p id="api-modal-desc" className="text-xs text-slate-400">Power AeroShield with Google's state-of-the-art GenAI models</p>
          </div>
        </div>

        {/* Model Selector */}
        <div className="space-y-4 mb-5">
          <div>
            <label htmlFor="gemini-model-select" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> Model Selection
            </label>
            <select
              id="gemini-model-select"
              value={model}
              onChange={(e) => setModel(e.target.value as SupportedModelId)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-400 transition"
            >
              {SUPPORTED_MODELS.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          {/* API Key Input */}
          <div>
            <label htmlFor="gemini-api-key-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Gemini API Key
            </label>
            <input
              id="gemini-api-key-input"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              aria-invalid={!isKeyFormatValid}
              className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus-visible:ring-2 transition ${
                !isKeyFormatValid
                  ? 'border-rose-500 focus:border-rose-400 focus-visible:ring-rose-400'
                  : 'border-slate-700 focus:border-emerald-500 focus-visible:ring-emerald-400'
              }`}
            />
            {!isKeyFormatValid && (
              <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1" role="alert">
                <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Standard Gemini keys start with "AIzaSy" and are 39 characters.</span>
              </p>
            )}
          </div>
        </div>

        {/* Info box & Free key link */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 text-xs text-slate-300 space-y-2 mb-6">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>Zero-Setup Fallback Included</span>
          </div>
          <p className="text-slate-400">
            Don't have an API key right now? No problem! AeroShield includes a deep, context-aware AI simulation engine so every feature, routine, and calculation works immediately for testing and evaluation.
          </p>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 underline font-medium focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
          >
            Get a free Gemini API key from Google AI Studio <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/20 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {savedSuccess ? (
              <>
                <CheckCircle className="w-4 h-4 text-white" aria-hidden="true" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save & Connect</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
