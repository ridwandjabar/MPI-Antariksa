/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Virtual Lab 2: Simulasi Siang dan Malam (Rotasi Bumi)
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCw, Compass, Sun, Moon, CheckCircle2, HelpCircle } from 'lucide-react';
import { soundManager } from '../../utils/audioSystem.ts';

interface DayNightSimulatorProps {
  onInteract?: () => void;
}

export const DayNightSimulator: React.FC<DayNightSimulatorProps> = ({ onInteract }) => {
  const [isRotating, setIsRotating] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(60); // Angle in degrees
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [showAxis, setShowAxis] = useState(true);
  const [quizState, setQuizState] = useState<{
    targetRegion: string;
    targetAngleOffset: number; // Angle where this region is located on globe
    questionActive: boolean;
    userAnswer: 'siang' | 'malam' | null;
    isCorrect: boolean | null;
  }>({
    targetRegion: 'Kepulauan Indonesia (WIB/WITA/WIT)',
    targetAngleOffset: 120,
    questionActive: false,
    userAnswer: null,
    isCorrect: null,
  });

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Speed multiplier
  const speedVal = speed === 'slow' ? 15 : speed === 'normal' ? 35 : 70;

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current !== null && isRotating) {
        const delta = (time - lastTimeRef.current) * 0.001;
        setRotationAngle((prev) => (prev + delta * speedVal) % 360);
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRotating, speedVal]);

  // Determine whether Indonesia is facing the Sun (Sun is at Left, from 90° to 270°)
  // The Sun illuminates x < 0 in coordinate space when facing left
  const currentRegionAngle = (rotationAngle + quizState.targetAngleOffset) % 360;
  // If angle is between 90 and 270, it's facing Sun (Day)
  const isTargetInDay = currentRegionAngle >= 90 && currentRegionAngle <= 270;

  const handleAnswer = (ans: 'siang' | 'malam') => {
    soundManager.playClick();
    const correct = (ans === 'siang' && isTargetInDay) || (ans === 'malam' && !isTargetInDay);
    if (correct) {
      soundManager.playSuccess();
    } else {
      soundManager.playError();
    }
    setQuizState((prev) => ({
      ...prev,
      userAnswer: ans,
      isCorrect: correct,
    }));
    if (onInteract) onInteract();
  };

  return (
    <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-4 md:p-6 shadow-2xl backdrop-blur-md">
      {/* Title & Description */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <span>🌍</span> Laboratorium Siang dan Malam (Rotasi Bumi)
          </h3>
          <p className="text-sm text-slate-300">
            Perhatikan bagaimana Bumi berputar pada porosnya yang miring 23,5°. Sinar Matahari menyinari belahan Bumi secara bergantian!
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => {
              soundManager.playClick();
              setIsRotating(!isRotating);
              if (onInteract) onInteract();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              isRotating
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-600 text-white hover:bg-emerald-500'
            }`}
          >
            {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRotating ? 'Jeda Rotasi' : 'Mulai Rotasi'}
          </button>

          {/* Speed Selector */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            {(['slow', 'normal', 'fast'] as const).map((s) => (
              <button
                key={s}
                onClick={() => {
                  soundManager.playClick();
                  setSpeed(s);
                }}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md capitalize transition-all ${
                  speed === s
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s === 'slow' ? 'Lambat' : s === 'normal' ? 'Normal' : 'Cepat'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAxis(!showAxis)}
            className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-all ${
              showAxis
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            Sumbu Miring 23,5°: {showAxis ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Main Simulation Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Visual Canvas (2 cols) */}
        <div className="lg:col-span-2 relative w-full h-80 sm:h-96 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
          {/* Space ambient background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-amber-950/20 via-slate-950 to-black pointer-events-none" />

          {/* Sunlight Rays Flowing from Left */}
          <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-amber-500/30 via-amber-400/10 to-transparent pointer-events-none flex flex-col justify-around py-6 pl-2">
            <div className="text-amber-300 text-xs font-bold flex items-center gap-1.5">
              <Sun className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '20s' }} />
              <span>Sinar Matahari</span>
            </div>
            <div className="h-0.5 bg-gradient-to-r from-amber-400/80 to-transparent w-full" />
            <div className="h-0.5 bg-gradient-to-r from-amber-400/80 to-transparent w-3/4" />
            <div className="h-0.5 bg-gradient-to-r from-amber-400/80 to-transparent w-full" />
            <div className="h-0.5 bg-gradient-to-r from-amber-400/80 to-transparent w-5/6" />
          </div>

          {/* Earth SVG with Day/Night Terminator */}
          <svg viewBox="-180 -180 360 360" className="w-full h-full max-h-80 select-none">
            <defs>
              {/* Day / Night Shadow Mask */}
              <linearGradient id="terminatorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                <stop offset="50%" stopColor="#020617" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#020617" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#020617" stopOpacity="0.96" />
              </linearGradient>

              {/* Clip path for globe */}
              <clipPath id="earthClip">
                <circle cx="0" cy="0" r="100" />
              </clipPath>
            </defs>

            {/* Earth Container with 23.5 deg Axial Tilt */}
            <g transform={showAxis ? 'rotate(-23.5)' : ''}>
              {/* Axial Stick */}
              {showAxis && (
                <line
                  x1="0"
                  y1="-135"
                  x2="0"
                  y2="135"
                  stroke="#818cf8"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                />
              )}

              {/* North & South Pole Pins */}
              {showAxis && (
                <>
                  <circle cx="0" cy="-135" r="4" fill="#a5b4fc" />
                  <text x="8" y="-132" fill="#c7d2fe" fontSize="10" fontWeight="bold">
                    Kutub Utara (23.5°)
                  </text>
                  <circle cx="0" cy="135" r="4" fill="#a5b4fc" />
                  <text x="8" y="140" fill="#c7d2fe" fontSize="10" fontWeight="bold">
                    Kutub Selatan
                  </text>
                </>
              )}

              {/* Rotating Globe Content */}
              <g clipPath="url(#earthClip)">
                {/* Ocean Base */}
                <circle cx="0" cy="0" r="100" fill="#0284c7" />

                {/* Rotating Continents (Simulated via repeating stylized land masses) */}
                <g transform={`translate(${((rotationAngle * 2.5) % 360) - 180}, 0)`}>
                  {/* Continent Set 1 (Asia, Australia, Indonesia) */}
                  <path
                    d="M-100,-40 Q-70,-60 -30,-40 Q0,-50 20,-20 Q-10,10 -40,10 Q-80,20 -100,-40 Z"
                    fill="#15803d"
                    opacity="0.9"
                  />
                  {/* Indonesia archipelago dots */}
                  <g fill="#22c55e">
                    <circle cx="-10" cy="0" r="4" />
                    <circle cx="5" cy="2" r="5" />
                    <circle cx="20" cy="-2" r="4.5" />
                    <circle cx="35" cy="4" r="3.5" />
                  </g>
                  {/* Australia */}
                  <path
                    d="M10,30 Q40,20 50,45 Q40,65 15,60 Z"
                    fill="#ca8a04"
                    opacity="0.85"
                  />

                  {/* Continent Set 2 (Americas / Africa) */}
                  <path
                    d="M140,-50 Q160,-30 180,-10 Q170,30 150,50 Q130,20 140,-50 Z"
                    fill="#16a34a"
                    opacity="0.85"
                  />
                  <path
                    d="M260,-40 Q300,-50 330,-20 Q310,20 280,30 Z"
                    fill="#15803d"
                    opacity="0.9"
                  />
                </g>

                {/* Night Shadow Terminator (Overlaid on the right side) */}
                <rect
                  x="0"
                  y="-100"
                  width="100"
                  height="200"
                  fill="url(#terminatorGrad)"
                />

                {/* City Lights on the Night Side */}
                <g opacity="0.75" fill="#fef08a">
                  <circle cx="30" cy="-20" r="1" />
                  <circle cx="45" cy="-35" r="1.2" />
                  <circle cx="55" cy="-15" r="1.5" />
                  <circle cx="70" cy="10" r="1" />
                  <circle cx="40" cy="25" r="1.2" />
                  <circle cx="60" cy="35" r="0.8" />
                </g>

                {/* Target Marker Pin for Indonesia */}
                {(() => {
                  const rad = (currentRegionAngle * Math.PI) / 180;
                  const pinX = Math.cos(rad) * 65;
                  const pinY = Math.sin(rad) * 20; // Near equator
                  return (
                    <g transform={`translate(${pinX}, ${pinY})`}>
                      <circle cx="0" cy="0" r="5" fill="#ef4444" className="animate-ping" />
                      <circle cx="0" cy="0" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                      <text
                        x="7"
                        y="3"
                        fill="#ffffff"
                        fontSize="9"
                        fontWeight="bold"
                        className="drop-shadow-lg"
                      >
                        📍 Indonesia
                      </text>
                    </g>
                  );
                })()}

                {/* Equator Line */}
                <line
                  x1="-100"
                  y1="0"
                  x2="100"
                  y2="0"
                  stroke="#facc15"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                  opacity="0.5"
                />
              </g>

              {/* Atmosphere Glow Ring */}
              <circle
                cx="0"
                cy="0"
                r="101"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                opacity="0.4"
              />
            </g>

            {/* Daytime / Nighttime labels */}
            <text x="-90" y="165" fill="#facc15" fontSize="12" fontWeight="bold">
              ☀️ WILAYAH SIANG
            </text>
            <text x="35" y="165" fill="#94a3b8" fontSize="12" fontWeight="bold">
              🌙 WILAYAH MALAM
            </text>
          </svg>
        </div>

        {/* Interactive Challenge / Status Panel (1 col) */}
        <div className="flex flex-col gap-4 bg-slate-800/70 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 text-indigo-300 font-bold text-base">
            <Compass className="w-5 h-5 text-indigo-400" />
            <span>Kondisi Saat Ini di Indonesia</span>
          </div>

          {/* Live Day/Night Indicator */}
          <div
            className={`p-3 rounded-lg border flex items-center gap-3 transition-colors ${
              isTargetInDay
                ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                : 'bg-indigo-950/40 border-indigo-500/40 text-indigo-200'
            }`}
          >
            {isTargetInDay ? (
              <Sun className="w-8 h-8 text-amber-400 shrink-0 animate-bounce" />
            ) : (
              <Moon className="w-8 h-8 text-indigo-400 shrink-0 animate-pulse" />
            )}
            <div>
              <span className="text-xs text-slate-400 block">Posisi Wilayah Indonesia:</span>
              <strong className="text-sm font-bold">
                {isTargetInDay ? 'Sedang Menghadap Matahari (SIANG HARI)' : 'Sedang Membelakangi Matahari (MALAM HARI)'}
              </strong>
            </div>
          </div>

          {/* Interactive Student Challenge */}
          <div className="p-3 bg-slate-900/90 rounded-xl border border-cyan-500/30">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300 mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>Tantangan Detektif Antariksa:</span>
            </div>
            <p className="text-xs text-slate-300 mb-3">
              Jeda rotasi di mana saja. Menurutmu, apakah wilayah berbendera merah (Indonesia) sedang mengalami Siang atau Malam?
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAnswer('siang')}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all"
              >
                <Sun className="w-3.5 h-3.5" />
                SIANG
              </button>
              <button
                onClick={() => handleAnswer('malam')}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition-all"
              >
                <Moon className="w-3.5 h-3.5" />
                MALAM
              </button>
            </div>

            {/* Answer Feedback */}
            {quizState.isCorrect !== null && (
              <div
                className={`mt-3 p-2.5 rounded-lg text-xs flex items-start gap-2 animate-in fade-in ${
                  quizState.isCorrect
                    ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/60 border border-rose-500/40 text-rose-200'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  {quizState.isCorrect
                    ? '🎉 Hebat sekali! Jawabanmu 100% benar. Bagian yang terkena cahaya mengalami siang hari.'
                    : 'Ayo coba amati kembali arah datangnya cahaya matahari di sebelah kiri ya!'}
                </span>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
            💡 <strong>Konsep Inti:</strong> Rotasi Bumi membutuhkan waktu 24 jam (1 hari), menyebabkan pergantian siang dan malam serta gerak semu harian Matahari.
          </div>
        </div>
      </div>
    </div>
  );
};
