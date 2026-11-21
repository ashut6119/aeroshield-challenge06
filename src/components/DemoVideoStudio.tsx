import React, { useState, useEffect, useRef } from 'react';
import { Video, Play, Pause, RotateCcw, Download, Sparkles, CheckCircle, Volume2, VolumeX, Film, Clock, ArrowRight, Shield, Compass, Calendar, Wrench, Code2, Printer, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DemoVideoStudioProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Scene {
  id: number;
  timecode: string;
  durationSec: number;
  title: string;
  subtitle: string;
  tabKey: 'dashboard' | 'routine' | 'hacks' | 'prompt';
  narration: string;
  bulletPoints: string[];
  visualHighlights: string[];
}

const DEMO_SCENES: Scene[] = [
  {
    id: 1,
    timecode: '0:00 - 0:15',
    durationSec: 15,
    title: '1. Problem & Challenge Overview',
    subtitle: 'Google for Developers PromptWars Virtual • Challenge 06',
    tabKey: 'dashboard',
    narration: "Welcome to AeroShield, built for Challenge 06 of Google for Developers PromptWars Virtual. Every winter, millions of families face hazardous smog caused by thermal temperature inversions that trap toxic PM2.5 near the ground. AeroShield empowers families with AI-personalized low-emission routines and hospital-grade indoor air hacks.",
    bulletPoints: [
      'Challenge 06: Urban Air Quality Assistant for Families',
      'Target: Boundary-layer winter thermal inversion smog',
      'Goal: Protect vulnerable family members while reducing household emissions'
    ],
    visualHighlights: ['Hero Brand Banner', 'Challenge 06 Tag', 'Live Station Monitor']
  },
  {
    id: 2,
    timecode: '0:15 - 0:32',
    durationSec: 17,
    title: '2. Real-Time Inversion & Smog Dashboard',
    subtitle: 'Atmospheric Physics & The Diurnal Trough Window',
    tabKey: 'dashboard',
    narration: "Here in the Smog Dashboard, AeroShield monitors real-time particulate density and atmospheric inversion risks across global hotspots. Notice the 24-hour diurnal curve: solar radiation breaks the cold inversion ceiling between 1:30 PM and 3:30 PM, creating a diurnal trough where PM2.5 drops by nearly 40 percent. AeroShield actively schedules indispensable outdoor tasks into this safe window.",
    bulletPoints: [
      'Real-time AQI 418 & PM2.5 at 24x WHO safe limits',
      'Diurnal Inversion Predictor: Identifies 1:30 - 3:30 PM safe trough',
      'Open-Meteo live API integration with verified global hotspot presets'
    ],
    visualHighlights: ['AQI Gauge & Inversion Warning', 'Diurnal Forecast Curve', 'Safe Window Highlight']
  },
  {
    id: 3,
    timecode: '0:32 - 0:50',
    durationSec: 18,
    title: '3. Family Smog Vulnerability Matrix',
    subtitle: 'Demographic Sensitivity & Housing Diagnostics',
    tabKey: 'dashboard',
    narration: "Every family is unique. AeroShield calculates a cumulative vulnerability score based on household fragility. Toddlers breathe twice as fast per kilogram, and elderly members face cardiac stress. The matrix evaluates window draftiness, kitchen exhaust efficiency, and existing purifiers to tailor immediate mitigation strategies.",
    bulletPoints: [
      'Vulnerability Score: 85/100 (Critical Risk Level)',
      'Demographics: Toddlers, COPD elderly, pregnancy, asthma',
      'Housing envelope: Window draftiness, kitchen negative pressure, purifier count'
    ],
    visualHighlights: ['Vulnerability Score Pill', 'Preset Family Selectors', 'Demographic Checks']
  },
  {
    id: 4,
    timecode: '0:50 - 1:10',
    durationSec: 20,
    title: '4. Gemini AI 24h Low-Emission Routine',
    subtitle: 'Habit Decoupling & Adherence Celebration',
    tabKey: 'routine',
    narration: "Powered by Google Gemini, AeroShield generates a 24-hour routine contrasting default high-emission habits with low-emission alternatives. It enforces zero idling at school gates, schedules negative-pressure cooking to contain frying aerosols, and bans dry broom sweeping. Families track daily adherence with celebratory milestones.",
    bulletPoints: [
      'Habit Decoupling: Replaces school drop-off idling & peak cooking',
      'Clinical Rationale: Detailed physiological & atmospheric explanations',
      'Interactive Adherence: Checkbox tracking with celebratory confetti'
    ],
    visualHighlights: ['Habit Contrast Cards', 'Interactive Checkboxes', 'Confetti Celebration']
  },
  {
    id: 5,
    timecode: '1:10 - 1:28',
    durationSec: 18,
    title: '5. Indoor Hacks & DIY Purifier Studio',
    subtitle: 'Corsi-Rosenthal CADR Engineering at 1/5th Cost',
    tabKey: 'hacks',
    narration: "In the Indoor Hacks Studio, families can design hospital-grade air filtration at a fraction of commercial cost. Our interactive CADR calculator sizes a DIY Corsi-Rosenthal box using MERV-13 filters and an aerodynamic cardboard shroud. It also details zero-cost hacks like damp-towel threshold barriers and bedroom sanctuary zoning.",
    bulletPoints: [
      'Interactive CADR Calculator: Custom room sizing (CFM requirements)',
      'Corsi-Rosenthal Blueprint: 4x MERV-13 filters + 20" fan (~420 CFM)',
      'Verified Science vs. Myths: Why houseplants cannot filter PM2.5'
    ],
    visualHighlights: ['CADR Sizing Sliders', 'Step-by-Step Instructions', 'Mythbusters Section']
  },
  {
    id: 6,
    timecode: '1:28 - 1:45',
    durationSec: 17,
    title: '6. Prompt Architecture & Fridge Plan Export',
    subtitle: 'PromptWars Rubric Excellence & 1-Page Emergency Card',
    tabKey: 'prompt',
    narration: "AeroShield is built for PromptWars evaluation transparency. Our dedicated prompt modal displays our master system instructions, Chain-of-Thought reasoning steps, strict JSON schemas, and live prompt logs with zero hallucination. With one click, families can print their 1-page emergency survival plan for the refrigerator.",
    bulletPoints: [
      'PromptWars Transparency: System persona, CoT reasoning, JSON schemas',
      'Zero-Setup Fallback Engine: Works out of the box with or without an API key',
      '1-Page Printable Emergency Fridge Card for instant family action'
    ],
    visualHighlights: ['System Prompt Preview', 'JSON Schema Block', 'Print Fridge Plan Button']
  }
];

export const DemoVideoStudio: React.FC<DemoVideoStudioProps> = ({ isOpen, onClose }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVoiceoverEnabled, setIsVoiceoverEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<any>(null);

  const currentScene = DEMO_SCENES[currentSceneIndex];

  // Stop speech when closing or changing scenes
  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Speak narration
  const speakNarration = (text: string) => {
    if (!isVoiceoverEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Trigger scene transition
  const goToScene = (index: number) => {
    stopSpeech();
    setCurrentSceneIndex(index);
    if (isPlaying || isRecording) {
      speakNarration(DEMO_SCENES[index].narration);
      if (index === 3) {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      }
    }
  };

  // Play / Pause handling
  useEffect(() => {
    if (!isPlaying) {
      stopSpeech();
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    speakNarration(currentScene.narration);
    if (currentSceneIndex === 3) {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    }

    const durationMs = currentScene.durationSec * 1000;
    timerRef.current = setTimeout(() => {
      if (currentSceneIndex < DEMO_SCENES.length - 1) {
        goToScene(currentSceneIndex + 1);
      } else {
        setIsPlaying(false);
        if (isRecording) {
          stopRecording();
        }
      }
    }, durationMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentSceneIndex]);

  // Video Canvas Drawing (draws presentation slide into canvas for MediaRecorder)
  const drawSlideToCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas dimensions: 1280 x 720 (720p HD standard for YouTube/Loom)
    const w = canvas.width;
    const h = canvas.height;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#090d16');
    grad.addColorStop(0.5, '#0f172a');
    grad.addColorStop(1, '#064e3b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Decorative glow circles
    ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
    ctx.beginPath();
    ctx.arc(w - 150, 150, 220, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(99, 102, 241, 0.08)';
    ctx.beginPath();
    ctx.arc(150, h - 100, 260, 0, Math.PI * 2);
    ctx.fill();

    // Top Header
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.fillText('AeroShield • Challenge 06 Demo Video', 60, 65);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px Inter, sans-serif';
    ctx.fillText('Google for Developers PromptWars Virtual', 60, 95);

    // Timecode badge
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.roundRect(w - 220, 45, 160, 36, 10);
    ctx.fill();
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 15px JetBrains Mono, monospace';
    ctx.fillText(`SCENE ${currentScene.id}/6 [${currentScene.timecode}]`, w - 210, 69);

    // Main Title & Subtitle Card
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.lineWidth = 2;
    ctx.roundRect(60, 130, w - 120, 110, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Inter, sans-serif';
    ctx.fillText(currentScene.title, 85, 180);

    ctx.fillStyle = '#34d399';
    ctx.font = '500 18px Inter, sans-serif';
    ctx.fillText(currentScene.subtitle, 85, 215);

    // Two-Column Content: Left = Bullet Points, Right = Narration Transcript
    // Left Box: Key Features & Engineering
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.6)';
    ctx.roundRect(60, 265, 560, 390, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillText('CORE DEMO HIGHLIGHTS', 85, 305);

    currentScene.bulletPoints.forEach((pt, i) => {
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 20px Inter, sans-serif';
      ctx.fillText('✔', 85, 355 + i * 55);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '16px Inter, sans-serif';
      // Word wrap simple
      ctx.fillText(pt, 115, 355 + i * 55);
    });

    // Visual highlights badge
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'italic 14px Inter, sans-serif';
    ctx.fillText('Key UI Elements: ' + currentScene.visualHighlights.join(' • '), 85, 625);

    // Right Box: Live Voiceover Audio Transcript
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.6)';
    ctx.roundRect(650, 265, 570, 390, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillText('VOICEOVER SCRIPT & AUDIO', 675, 305);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '16px Inter, sans-serif';
    
    // Simple multi-line text wrap for narration
    const words = currentScene.narration.split(' ');
    let line = '';
    let y = 350;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 500 && n > 0) {
        ctx.fillText(line, 675, y);
        line = words[n] + ' ';
        y += 28;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 675, y);

    // Bottom Watermark
    ctx.fillStyle = '#64748b';
    ctx.font = '13px Inter, sans-serif';
    ctx.fillText('AeroShield • Built for Google for Developers PromptWars Virtual • Gemini 2.0 Flash', 60, 690);
  };

  // Redraw canvas whenever current scene changes
  useEffect(() => {
    drawSlideToCanvas();
  }, [currentSceneIndex, isOpen]);

  // Start Automated Recording
  const startRecording = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Draw initial slide
    drawSlideToCanvas();

    try {
      const stream = canvas.captureStream(30); // 30 FPS stream
      const options = { mimeType: 'video/webm;codecs=vp9' };
      const recorder = new MediaRecorder(stream, options);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'AeroShield-Demo-Video-Challenge06.webm';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };

      recorder.start(100);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingSeconds(0);
      goToScene(0);
      setIsPlaying(true);
    } catch (err) {
      console.error('Failed to start MediaRecorder:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPlaying(false);
      stopSpeech();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-5xl w-full p-5 sm:p-7 shadow-2xl relative text-slate-100 max-h-[95vh] flex flex-col overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => {
            stopSpeech();
            onClose();
          }}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
              <Film className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">Project Demo Video Studio</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  90-Second Walkthrough
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Automated animated presentation & in-browser HD video recorder for PromptWars submission
              </p>
            </div>
          </div>

          {/* Recorder CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsVoiceoverEnabled(!isVoiceoverEnabled)}
              className={`p-2 rounded-xl text-xs font-semibold border transition ${
                isVoiceoverEnabled
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  : 'bg-slate-800 text-slate-500 border-slate-700'
              }`}
              title={isVoiceoverEnabled ? 'Speech Voiceover Enabled' : 'Voiceover Muted'}
            >
              {isVoiceoverEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {!isRecording ? (
              <button
                onClick={startRecording}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-lg shadow-rose-600/25 transition animate-pulse"
              >
                <Video className="w-4 h-4" />
                <span>Record & Export Demo Video</span>
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-lg transition"
              >
                <Download className="w-4 h-4" />
                <span>Finish & Download Video</span>
              </button>
            )}
          </div>
        </div>

        {/* Hidden / Rendered Canvas for Video Export */}
        <div className="hidden">
          <canvas ref={canvasRef} width={1280} height={720} />
        </div>

        {/* Live Presentation Studio View */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          
          {/* Active Scene Preview Stage */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden ring-1 ring-emerald-500/20 shadow-xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  SCENE {currentScene.id} OF 6
                </span>
                <span className="text-xs text-slate-400 font-mono">[{currentScene.timecode}]</span>
              </div>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> ~{currentScene.durationSec}s duration
              </span>
            </div>

            <div className="space-y-1 mb-4">
              <h4 className="text-xl sm:text-2xl font-black text-white">{currentScene.title}</h4>
              <p className="text-xs font-semibold text-emerald-400">{currentScene.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              {/* Left: Key Talking Points */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 block mb-2">
                  Key Evaluation Highlights
                </span>
                <ul className="space-y-2 text-xs text-slate-300">
                  {currentScene.bulletPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Audio Narration Script */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-2">
                  Voiceover Transcript
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  "{currentScene.narration}"
                </p>
              </div>
            </div>

            {/* Visual Cues */}
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-2 border-t border-slate-800/80">
              <span className="font-bold text-slate-300">Focus UI Elements:</span>
              <span>{currentScene.visualHighlights.join(' • ')}</span>
            </div>

          </div>

          {/* Scene Navigation Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {DEMO_SCENES.map((scene, idx) => {
              const isActive = currentSceneIndex === idx;
              return (
                <button
                  key={scene.id}
                  onClick={() => goToScene(idx)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'bg-emerald-950/40 border-emerald-500 text-white ring-1 ring-emerald-500/40 shadow-md'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-400">Scene {scene.id}</span>
                    <span className="text-[9px] text-slate-500">{scene.durationSec}s</span>
                  </div>
                  <span className="text-xs font-bold text-white line-clamp-1 block">
                    {scene.title.split('. ')[1] || scene.title}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Player Controls Footer */}
        <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (isPlaying) {
                  setIsPlaying(false);
                  stopSpeech();
                } else {
                  setIsPlaying(true);
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause Presentation' : 'Play Auto-Tour'}</span>
            </button>

            <button
              onClick={() => goToScene(0)}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition"
              title="Restart Tour from Scene 1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {isRecording && (
              <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5 bg-rose-950/60 border border-rose-800/80 px-2.5 py-1 rounded-lg animate-pulse">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                RECORDING DEMO VIDEO...
              </span>
            )}
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>Also read full script:</span>
            <span className="font-mono text-emerald-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              DEMO_VIDEO_SCRIPT.md
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
