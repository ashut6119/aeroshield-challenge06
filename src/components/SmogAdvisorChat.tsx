import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, HelpCircle } from 'lucide-react';
import { ChatMessage, FamilyProfile, AirQualityData } from '../types';
import { askSmogAdvisor } from '../services/gemini';

interface SmogAdvisorChatProps {
  profile: FamilyProfile;
  airQuality: AirQualityData;
}

const QUICK_PROMPTS = [
  "How to properly reuse N95 masks for 3 days without losing filtration?",
  "Do snake plants or spider plants actually filter PM2.5 smog?",
  "How can I tell a smog-induced cough from a viral respiratory infection?",
  "What is the most effective DIY air purifier hack under $50?",
  "What should I do if my child has to attend school during AQI 400+?"
];

export const SmogAdvisorChat: React.FC<SmogAdvisorChatProps> = ({ profile, airQuality }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am **AeroShield**, your AI Environmental Health & Smog Defense Advisor.

Currently in **${profile.city}**, the AQI is **${airQuality.aqi} (${airQuality.severityLabel})** with a **${airQuality.inversionRisk}** winter thermal inversion ceiling.

I am customized for **${profile.familyNickname}** (${profile.householdMembers} members, including ${
        profile.hasInfantsOrToddlers ? 'an infant/toddler, ' : ''
      }${profile.hasElderly ? 'seniors, ' : ''}${
        profile.respiratoryConditions.length > 0 && !profile.respiratoryConditions.includes('None')
          ? profile.respiratoryConditions.join(', ')
          : 'general health'
      }).

Ask me anything about DIY air purification, door sealing, mask fitting, child indoor exercise hacks, or safe commute planning!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reasoningSteps: [
        `Grounded to ${profile.city} atmospheric readings (PM2.5: ${airQuality.pm25} µg/m³)`,
        `Synchronized with family vulnerability matrix (${profile.familyNickname})`
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const question = (textToSend || input).trim();
    if (!question || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askSmogAdvisor(question, profile, airQuality, messages);
      const assistantMsg: ChatMessage = {
        id: 'assistant-' + Date.now(),
        role: 'assistant',
        content: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reasoningSteps: response.reasoning
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (_err: unknown) {
      setMessages(prev => [
        ...prev,
        {
          id: 'error-' + Date.now(),
          role: 'assistant',
          content: 'Sorry, I encountered an error while processing your request. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl backdrop-blur-sm flex flex-col h-[650px]">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white shadow-md shadow-emerald-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">AI Smog Doctor & Coping Advisor</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Gemini Powered
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Multi-turn clinical and mechanical advice tailored to {profile.familyNickname.split('(')[0]}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div role="log" aria-live="polite" aria-label="Chat messages with AI Smog Doctor" className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                isUser
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-slate-950/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
              }`}>
                {/* Message Body */}
                <div className="whitespace-pre-line space-y-2">
                  {msg.content}
                </div>

                {/* AI Reasoning Pill (PromptWars Feature) */}
                {msg.reasoningSteps && msg.reasoningSteps.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[10px] text-slate-400">
                    <span className="font-semibold text-emerald-400 block mb-1">
                      🧠 Contextual Reasoning Chain:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                      {msg.reasoningSteps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className={`mt-1.5 text-[9px] ${isUser ? 'text-emerald-200' : 'text-slate-500'} text-right`}>
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 border border-slate-700">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="bg-slate-950/90 border border-slate-800 text-slate-400 rounded-2xl rounded-tl-none p-4 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>Analyzing inversion meteorological ceiling and family health profile...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="py-2 overflow-x-auto flex items-center gap-2 scrollbar-none shrink-0">
        <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap flex items-center gap-1">
          <HelpCircle className="w-3 h-3" /> Quick questions:
        </span>
        {QUICK_PROMPTS.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSend(qp)}
            className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-full text-[11px] whitespace-nowrap transition"
          >
            {qp.length > 40 ? qp.slice(0, 38) + '...' : qp}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="pt-2 border-t border-slate-800 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            id="advisor-chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Type your message about indoor hacks, DIY filters, mask reuse, or symptom triage"
            placeholder="Ask about indoor hacks, DIY filters, mask reuse, child play..."
            className="flex-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Send message to AI Smog Doctor"
            className="p-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl shadow-md shadow-emerald-500/20 transition disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
          </button>
        </form>
      </div>

    </div>
  );
};
