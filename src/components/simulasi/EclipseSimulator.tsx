/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Virtual Lab 3: Laboratorium Gerhana Matahari dan Gerhana Bulan
 */

import React, { useState } from 'react';
import { Eye, RotateCcw, AlertTriangle, Sparkles, HelpCircle } from 'lucide-react';
import { soundManager } from '../../utils/audioSystem.ts';

interface EclipseSimulatorProps {
  onInteract?: () => void;
}

export const EclipseSimulator: React.FC<EclipseSimulatorProps> = ({ onInteract }) => {
  const [eclipseType, setEclipseType] = useState<'matahari' | 'bulan'>('matahari');
  // Moon offset Y representing 5-degree orbital tilt (-40 to 40)
  const [moonOffsetY, setMoonOffsetY] = useState<number>(0);
  const [viewAngle, setViewAngle] = useState<'orbital' | 'earth_observer'>('orbital');

  const handleTypeChange = (type: 'matahari' | 'bulan') => {
    soundManager.playClick();
    setEclipseType(type);
    setMoonOffsetY(0); // align by default
    if (onInteract) onInteract();
  };

  const handleAlign = (aligned: boolean) => {
    soundManager.playClick();
    setMoonOffsetY(aligned ? 0 : 35);
    if (onInteract) onInteract();
  };

  // Determine eclipse state
  const absOffset = Math.abs(moonOffsetY);
  let statusText = '';
  let statusBadge = '';
  let statusColor = '';

  if (eclipseType === 'matahari') {
    if (absOffset <= 8) {
      statusText = 'Gerhana Matahari Total! Bulan tepat berada di tengah menghalangi seluruh piringan Matahari. Bayangan umbra jatuh di Bumi.';
      statusBadge = 'Gerhana Total 🌑';
      statusColor = 'bg-rose-950/70 border-rose-500/40 text-rose-200';
    } else if (absOffset <= 24) {
      statusText = 'Gerhana Matahari Sebagian! Hanya sebagian piringan Matahari yang tertutup oleh Bulan. Wilayah berada di zona penumbra.';
      statusBadge = 'Gerhana Sebagian 🌘';
      statusColor = 'bg-amber-950/70 border-amber-500/40 text-amber-200';
    } else {
      statusText = 'Tidak Terjadi Gerhana. Bulan melintas di atas atau di bawah garis pandang Matahari-Bumi karena orbit Bulan miring 5 derajat.';
      statusBadge = 'Bulan Baru Biasa 🌕';
      statusColor = 'bg-slate-800 border-slate-700 text-slate-300';
    }
  } else {
    // Gerhana Bulan
    if (absOffset <= 12) {
      statusText = 'Gerhana Bulan Total! Bulan masuk seutuhnya ke bayangan umbra Bumi dan tampak kemerahan (Blood Moon) akibat pembiasan sinar oleh atmosfer Bumi.';
      statusBadge = 'Gerhana Bulan Total 🔴';
      statusColor = 'bg-rose-950/70 border-rose-500/40 text-rose-200';
    } else if (absOffset <= 28) {
      statusText = 'Gerhana Bulan Sebagian! Sebagian permukaan Bulan terkena bayangan umbra dan penumbra Bumi.';
      statusBadge = 'Gerhana Bulan Sebagian 🌗';
      statusColor = 'bg-amber-950/70 border-amber-500/40 text-amber-200';
    } else {
      statusText = 'Tidak Terjadi Gerhana. Bulan Purnama biasa bersinar terang karena orbit Bulan yang miring tidak masuk ke bayangan Bumi.';
      statusBadge = 'Bulan Purnama Penuh 🌕';
      statusColor = 'bg-slate-800 border-slate-700 text-slate-300';
    }
  }

  return (
    <div className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-4 md:p-6 shadow-2xl backdrop-blur-md">
      {/* Header and Mode Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-purple-400 flex items-center gap-2">
            <span>🌘</span> Laboratorium Eksperimen Gerhana
          </h3>
          <p className="text-sm text-slate-300">
            Pelajari peristiwa perpaduan bayangan umbra dan penumbra ketika Matahari, Bumi, dan Bulan berada dalam garis lurus.
          </p>
        </div>

        {/* Eclipse Type Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleTypeChange('matahari')}
            className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all ${
              eclipseType === 'matahari'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            ☀️ Gerhana Matahari
          </button>
          <button
            onClick={() => handleTypeChange('bulan')}
            className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all ${
              eclipseType === 'bulan'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🌙 Gerhana Bulan
          </button>

          {/* View Angle Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              setViewAngle(viewAngle === 'orbital' ? 'earth_observer' : 'orbital');
              if (onInteract) onInteract();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-500/40 text-xs font-semibold hover:bg-indigo-900/50"
          >
            <Eye className="w-4 h-4" />
            {viewAngle === 'orbital' ? 'Lihat dari Bumi' : 'Lihat Ruang Angkasa'}
          </button>
        </div>
      </div>

      {/* Main Simulation Viewport */}
      {viewAngle === 'orbital' ? (
        /* Orbital Diagram View */
        <div className="relative w-full h-80 sm:h-96 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 select-none">
          {/* Cosmic backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-amber-950/20 via-slate-950 to-black pointer-events-none" />

          <svg viewBox="-40 -160 680 320" className="w-full h-full max-h-96">
            <defs>
              <radialGradient id="sunBall" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="70%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ea580c" />
              </radialGradient>
            </defs>

            {/* Sun on Left (X: 40, R: 60) */}
            <g transform="translate(40, 0)">
              <circle cx="0" cy="0" r="70" fill="url(#sunBall)" opacity="0.25" />
              <circle cx="0" cy="0" r="55" fill="url(#sunBall)" />
              <text x="0" y="75" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                Matahari
              </text>
            </g>

            {/* In Gerhana Matahari: Order is Sun -> Moon -> Earth */}
            {eclipseType === 'matahari' && (
              <>
                {/* Umbra Cone from Sun to Moon to Earth */}
                {/* Sun top (40, -55) and Sun bot (40, 55) */}
                {/* Moon at (260, moonOffsetY), r = 16 */}
                {/* Earth at (480, 0), r = 36 */}
                <polygon
                  points={`40,-55 260,${moonOffsetY - 16} 480,${moonOffsetY > 0 ? -10 : 10} 260,${
                    moonOffsetY + 16
                  } 40,55`}
                  fill="#0f172a"
                  opacity="0.6"
                />

                {/* Darker Core Umbra */}
                <polygon
                  points={`260,${moonOffsetY - 16} 480,${moonOffsetY * 1.5 - 6} 480,${
                    moonOffsetY * 1.5 + 6
                  } 260,${moonOffsetY + 16}`}
                  fill="#000000"
                  opacity="0.85"
                />

                {/* Light Ray Lines */}
                <line x1="40" y1="-55" x2="480" y2={moonOffsetY * 2 + 10} stroke="#fde047" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                <line x1="40" y1="55" x2="480" y2={moonOffsetY * 2 - 10} stroke="#fde047" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />

                {/* Moon (Middle) */}
                <g transform={`translate(260, ${moonOffsetY})`}>
                  <circle cx="0" cy="0" r="16" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
                  <circle cx="-5" cy="-4" r="3" fill="#94a3b8" />
                  <circle cx="4" cy="5" r="2.5" fill="#94a3b8" />
                  <text x="0" y="-22" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">
                    Bulan
                  </text>
                </g>

                {/* Earth (Right) */}
                <g transform="translate(480, 0)">
                  <circle cx="0" cy="0" r="36" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                  {/* Continents */}
                  <path d="M-20,-10 Q-10,-25 10,-15 Q15,10 -5,20 Z" fill="#16a34a" opacity="0.9" />
                  <text x="0" y="52" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
                    Bumi (Siang Hari)
                  </text>

                  {/* Umbra Shadow Patch on Earth if aligned */}
                  {absOffset <= 12 && (
                    <circle cx="-35" cy={moonOffsetY} r="6" fill="#000000" stroke="#f43f5e" strokeWidth="1.5" />
                  )}
                </g>
              </>
            )}

            {/* In Gerhana Bulan: Order is Sun -> Earth -> Moon */}
            {eclipseType === 'bulan' && (
              <>
                {/* Earth Shadow Cones extending past Earth */}
                {/* Earth at (280, 0), r = 36 */}
                {/* Moon at (500, moonOffsetY), r = 16 */}
                <polygon
                  points="280,-36 500,-18 500,18 280,36"
                  fill="#000000"
                  opacity="0.88"
                />
                <polygon
                  points="280,-36 500,-60 500,60 280,36"
                  fill="#1e1b4b"
                  opacity="0.45"
                />

                {/* Earth (Middle) */}
                <g transform="translate(280, 0)">
                  <circle cx="0" cy="0" r="36" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M-15,-15 Q5,-25 15,-10 Q10,15 -10,15 Z" fill="#16a34a" opacity="0.9" />
                  <text x="0" y="-44" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
                    Bumi
                  </text>
                </g>

                {/* Moon (Right) */}
                <g transform={`translate(500, ${moonOffsetY})`}>
                  <circle
                    cx="0"
                    cy="0"
                    r="16"
                    fill={absOffset <= 12 ? '#991b1b' : '#cbd5e1'}
                    stroke={absOffset <= 12 ? '#ef4444' : '#475569'}
                    strokeWidth="1.5"
                  />
                  <text
                    x="0"
                    y="32"
                    textAnchor="middle"
                    fill={absOffset <= 12 ? '#f87171' : '#e2e8f0'}
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {absOffset <= 12 ? 'Bulan (Blood Moon)' : 'Bulan'}
                  </text>
                </g>
              </>
            )}
          </svg>
        </div>
      ) : (
        /* Observer View From Earth */
        <div className="relative w-full h-80 sm:h-96 bg-black rounded-xl overflow-hidden border border-slate-800 flex flex-col items-center justify-center select-none p-6">
          <div className="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Pemandangan Langit dari Permukaan Bumi ({eclipseType === 'matahari' ? 'Siang Hari' : 'Malam Hari'})</span>
          </div>

          {eclipseType === 'matahari' ? (
            /* Solar Eclipse as seen from Earth */
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Sun Corona Rim */}
              {absOffset <= 8 && (
                <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-xl animate-pulse" />
              )}
              {/* Sun Body */}
              <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-[0_0_50px_rgba(245,158,11,0.8)] relative flex items-center justify-center overflow-hidden">
                {/* Overlapping Moon Disc */}
                <div
                  className="absolute w-36 h-36 rounded-full bg-slate-950 transition-all duration-200 border border-slate-800"
                  style={{
                    transform: `translate(${moonOffsetY * 1.5}px, ${moonOffsetY * 0.8}px)`,
                  }}
                />
              </div>
            </div>
          ) : (
            /* Lunar Eclipse as seen from Earth */
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div
                className={`w-36 h-36 rounded-full transition-colors duration-500 shadow-2xl flex items-center justify-center border ${
                  absOffset <= 12
                    ? 'bg-gradient-to-tr from-red-950 via-rose-900 to-amber-900 border-red-500/50 shadow-red-900/60'
                    : 'bg-gradient-to-tr from-slate-300 to-white border-white/50 shadow-cyan-500/20'
                }`}
              >
                {/* Moon crater textures */}
                <div className="w-8 h-8 rounded-full bg-black/20 absolute top-6 left-8" />
                <div className="w-5 h-5 rounded-full bg-black/15 absolute bottom-8 right-10" />
              </div>
            </div>
          )}

          <div className="mt-4 text-center">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${statusColor}`}>
              {statusBadge}
            </span>
          </div>
        </div>
      )}

      {/* Interactive Controls & Tilt Slider */}
      <div className="mt-4 p-4 rounded-xl bg-slate-800/80 border border-slate-700">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-2/3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span>Kemiringan Bidang Orbit Bulan (~5°):</span>
              <span className="text-cyan-400 font-mono">
                {moonOffsetY === 0 ? 'Tepat Sejajar (0°)' : `${moonOffsetY > 0 ? '+' : ''}${Math.round(moonOffsetY / 8)}°`}
              </span>
            </div>
            <input
              type="range"
              min="-35"
              max="35"
              step="1"
              value={moonOffsetY}
              onChange={(e) => {
                setMoonOffsetY(Number(e.target.value));
                if (onInteract) onInteract();
              }}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Orbit Miring ke Bawah</span>
              <span>Garis Lurus (Gerhana)</span>
              <span>Orbit Miring ke Atas</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => handleAlign(true)}
              className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow"
            >
              Luruskan Posisi (Terjadi Gerhana)
            </button>
            <button
              onClick={() => handleAlign(false)}
              className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium transition-all"
            >
              Miringkan Orbit (Tidak Ada Gerhana)
            </button>
          </div>
        </div>

        {/* Live Scientific Explanation */}
        <div className={`mt-3 p-3 rounded-lg border text-xs ${statusColor}`}>
          <div className="flex items-center gap-2 font-bold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Hasil Analisis: {statusBadge}</span>
          </div>
          <p className="leading-relaxed">{statusText}</p>
        </div>
      </div>
    </div>
  );
};
