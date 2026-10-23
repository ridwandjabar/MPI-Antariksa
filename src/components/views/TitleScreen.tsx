/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Halaman Pembuka — Title Screen
 */

import React from 'react';
import { Play, HelpCircle, Info, Sparkles, Compass } from 'lucide-react';
import { soundManager } from '../../utils/audioSystem.ts';

interface TitleScreenProps {
  onStartAdventure: () => void;
  onOpenPetunjuk: () => void;
  onOpenTentang: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStartAdventure,
  onOpenPetunjuk,
  onOpenTentang,
}) => {
  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden select-none">
      {/* Background Starfield and Space Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-black pointer-events-none" />

      {/* Floating Space Ship Animation */}
      <div className="absolute top-12 left-0 right-0 pointer-events-none overflow-hidden h-32">
        <div className="w-12 h-12 text-3xl animate-float-ship absolute -left-12 animate-[marquee_25s_linear_infinite]"
          style={{ animation: 'floatAcross 28s linear infinite' }}
        >
          🛸
        </div>
      </div>

      <style>{`
        @keyframes floatAcross {
          0% { transform: translateX(-60px) translateY(10px) rotate(5deg); }
          50% { transform: translateX(50vw) translateY(-20px) rotate(-5deg); }
          100% { transform: translateX(105vw) translateY(15px) rotate(5deg); }
        }
      `}</style>

      {/* Hero Visual: Center Glowing Sun with 8 Orbiting Planets */}
      <div className="relative z-10 w-full max-w-4xl pt-4 sm:pt-8 flex flex-col items-center text-center">
        {/* Animated Solar System Lockup */}
        <div className="relative w-64 h-36 sm:w-80 sm:h-44 flex items-center justify-center mb-4">
          {/* Orbital path ellipses */}
          <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-spin" style={{ animationDuration: '40s' }} />
          <div className="absolute inset-4 rounded-full border border-cyan-500/20 animate-spin" style={{ animationDuration: '28s', animationDirection: 'reverse' }} />

          {/* Orbiting Planet Icons */}
          <div className="absolute -top-1 left-12 text-sm animate-twinkle">🪐</div>
          <div className="absolute bottom-2 right-10 text-sm animate-twinkle" style={{ animationDelay: '1s' }}>🌍</div>
          <div className="absolute top-8 right-6 text-xs animate-twinkle" style={{ animationDelay: '2s' }}>🔴</div>
          <div className="absolute bottom-4 left-16 text-xs animate-twinkle" style={{ animationDelay: '1.5s' }}>⚪</div>

          {/* Center Glowing Sun */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-orange-500 shadow-[0_0_60px_rgba(245,158,11,0.8)] flex items-center justify-center animate-pulse-glow z-10">
            <span className="text-3xl sm:text-4xl">☀️</span>
          </div>
        </div>

        {/* Mascot Cartoon Astronaut */}
        <div className="flex items-center gap-2 bg-indigo-950/60 border border-indigo-500/40 px-4 py-1.5 rounded-full text-xs font-bold text-indigo-200 mb-4 animate-bounce">
          <span className="text-xl">👨‍🚀</span>
          <span>Halo Teman-Teman! Aku Kapten Bima, Pemandu Antariksamu!</span>
        </div>

        {/* Main Titles */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-cyan-400 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] mb-2 font-heading">
          EKSPEDISI ANTARIKSA
        </h1>

        <p className="text-lg sm:text-2xl font-bold text-cyan-200 tracking-wide mb-3">
          Petualangan Menjelajahi Tata Surya
        </p>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed mb-8">
          Multimedia Pembelajaran Interaktif (MPI) IPAS Fase C Kelas VI SD. Kenali anggota tata surya, amati perputaran siang-malam, dan uji kemampuan astronomimu!
        </p>

        {/* 3 Main Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-md">
          {/* 1. MULAI PETUALANGAN */}
          <button
            onClick={() => {
              soundManager.playWarp();
              onStartAdventure();
            }}
            className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-base sm:text-lg shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:shadow-[0_0_50px_rgba(245,158,11,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <Play className="w-5 h-5 fill-slate-950 group-hover:translate-x-1 transition-transform" />
            <span>MULAI PETUALANGAN</span>
          </button>
        </div>

        <div className="flex items-center gap-3 mt-4">
          {/* 2. PETUNJUK PENGGUNAAN */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenPetunjuk();
            }}
            className="py-2.5 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 hover:border-cyan-400"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>PETUNJUK PENGGUNAAN</span>
          </button>

          {/* 3. TENTANG MPI */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTentang();
            }}
            className="py-2.5 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 hover:border-amber-400"
          >
            <Info className="w-4 h-4 text-amber-400" />
            <span>TENTANG MPI</span>
          </button>
        </div>
      </div>

      {/* Footer / Educator Badge */}
      <div className="relative z-10 pt-6 pb-2 text-center text-xs text-slate-400">
        <p>
          Pengembang: <strong className="text-slate-200">Ridwan Djabar</strong> • Instansi:{' '}
          <strong className="text-slate-200">SMAN 8 Gorontalo</strong>
        </p>
      </div>
    </div>
  );
};
