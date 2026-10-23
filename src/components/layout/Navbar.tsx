/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Universal Navigation and Header Component
 */

import React, { useState, useEffect } from 'react';
import {
  Home,
  Music,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  HelpCircle,
  Trophy,
  Award,
  Sparkles,
} from 'lucide-react';
import { soundManager } from '../../utils/audioSystem.ts';

interface NavbarProps {
  currentView: string;
  totalPoints: number;
  completedLessonsCount: number;
  completedGamesCount: number;
  onGoHome: () => void;
  onOpenPetunjuk: () => void;
  onOpenBadges: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  totalPoints,
  completedLessonsCount,
  completedGamesCount,
  onGoHome,
  onOpenPetunjuk,
  onOpenBadges,
}) => {
  const [isBgmOn, setIsBgmOn] = useState(false);
  const [isSfxOn, setIsSfxOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleToggleBgm = () => {
    const next = soundManager.toggleBgm();
    setIsBgmOn(next);
  };

  const handleToggleSfx = () => {
    const next = !isSfxOn;
    soundManager.setSfxEnabled(next);
    setIsSfxOn(next);
    if (next) soundManager.playClick();
  };

  const handleToggleFullscreen = () => {
    soundManager.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-indigo-500/20 px-3 sm:px-6 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand / Title lockup */}
        <button
          onClick={() => {
            soundManager.playClick();
            onGoHome();
          }}
          className="flex items-center gap-2 sm:gap-3 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-amber-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-lg sm:text-xl">
              🚀
            </div>
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-indigo-300 tracking-tight leading-tight">
              EKSPEDISI ANTARIKSA
            </h1>
            <p className="text-[10px] text-slate-400 hidden xs:block">
              IPAS Kelas VI SD • SMAN 8 Gorontalo
            </p>
          </div>
        </button>

        {/* Center Progress HUD (Points & Badges) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Points Pill */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenBadges();
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition-all shadow-sm"
            title="Lihat Poin & Lencana Pencapaian"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono-space tabular-nums">{totalPoints} Poin</span>
          </button>

          {/* Quick Progress Indicator */}
          <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-300 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
            <span>Materi: {completedLessonsCount}/6</span>
            <span className="text-slate-600">•</span>
            <span>Game: {completedGamesCount}/6</span>
          </div>
        </div>

        {/* Utility Actions: Home, BGM, SFX, Help, Fullscreen */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {currentView !== 'title' && currentView !== 'menu' && (
            <button
              onClick={() => {
                soundManager.playClick();
                onGoHome();
              }}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all"
              title="Kembali ke Menu Utama"
              aria-label="Menu Utama"
            >
              <Home className="w-4 h-4" />
            </button>
          )}

          {/* BGM Toggle */}
          <button
            onClick={handleToggleBgm}
            className={`p-2 rounded-xl border transition-all ${
              isBgmOn
                ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title={isBgmOn ? 'Matikan Musik Latar' : 'Putar Musik Kosmik (BGM)'}
            aria-label="Musik Latar"
          >
            <Music className={`w-4 h-4 ${isBgmOn ? 'animate-bounce' : ''}`} />
          </button>

          {/* SFX Toggle */}
          <button
            onClick={handleToggleSfx}
            className={`p-2 rounded-xl border transition-all ${
              isSfxOn
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title={isSfxOn ? 'Matikan Efek Suara' : 'Aktifkan Efek Suara'}
            aria-label="Efek Suara"
          >
            {isSfxOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Help Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenPetunjuk();
            }}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 transition-all"
            title="Petunjuk Penggunaan"
            aria-label="Petunjuk Penggunaan"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={handleToggleFullscreen}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all hidden xs:flex"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh'}
            aria-label="Layar Penuh"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
