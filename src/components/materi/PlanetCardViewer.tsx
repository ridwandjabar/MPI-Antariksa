/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 3D Planet Interactive Card Viewer
 */

import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { PLANETS_DATA, SUN_DATA, PlanetData } from '../../data/planets.ts';
import { soundManager, SpeechNarrator } from '../../utils/audioSystem.ts';

export const PlanetCardViewer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(2); // Start at Earth
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentPlanet = PLANETS_DATA[currentIndex];

  const handlePrev = () => {
    soundManager.playClick();
    SpeechNarrator.stop();
    setIsSpeaking(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : PLANETS_DATA.length - 1));
  };

  const handleNext = () => {
    soundManager.playClick();
    SpeechNarrator.stop();
    setIsSpeaking(false);
    setCurrentIndex((prev) => (prev < PLANETS_DATA.length - 1 ? prev + 1 : 0));
  };

  const handleSelect = (idx: number) => {
    soundManager.playClick();
    SpeechNarrator.stop();
    setIsSpeaking(false);
    setCurrentIndex(idx);
  };

  const handleToggleAudio = () => {
    if (isSpeaking) {
      SpeechNarrator.stop();
      setIsSpeaking(false);
    } else {
      soundManager.playClick();
      setIsSpeaking(true);
      SpeechNarrator.speak(
        `${currentPlanet.name}. ${currentPlanet.audioNarration} Fakta unik: ${currentPlanet.uniqueFact}`,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-6 backdrop-blur-md">
      {/* Mini Planet Selector Thumbnails */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-3 mb-4 border-b border-slate-800">
        {PLANETS_DATA.map((p, idx) => {
          const isSelected = idx === currentIndex;
          return (
            <button
              key={p.id}
              onClick={() => handleSelect(idx)}
              className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-xl transition-all shrink-0 ${
                isSelected
                  ? 'bg-cyan-500/20 border border-cyan-400 text-white shadow-lg'
                  : 'bg-slate-800/60 hover:bg-slate-700/60 border border-transparent text-slate-400'
              }`}
            >
              <div
                className="w-7 h-7 rounded-full shadow-md border border-white/20"
                style={{ background: p.gradient }}
              />
              <span className="text-[11px] font-bold">{p.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main 3D Card Display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Planet 3D Canvas / Visual Representation (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative p-6 bg-slate-950 rounded-2xl border border-slate-800">
          {/* Cosmic glow background */}
          <div
            className="absolute w-44 h-44 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ backgroundColor: currentPlanet.colorHex }}
          />

          {/* 3D Planet Graphic */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
            {/* Saturn Ring */}
            {currentPlanet.id === 'saturnus' && (
              <div
                className="absolute w-72 h-20 rounded-full border-[10px] border-amber-300/60 shadow-lg pointer-events-none"
                style={{
                  transform: 'rotate(-25deg)',
                  boxShadow: '0 0 25px rgba(253, 224, 71, 0.4)',
                }}
              />
            )}

            {/* Uranus Ring */}
            {currentPlanet.id === 'uranus' && (
              <div
                className="absolute w-64 h-14 rounded-full border-[4px] border-teal-300/40 shadow-sm pointer-events-none"
                style={{ transform: 'rotate(80deg)' }}
              />
            )}

            {/* Planet Body */}
            <div
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-full shadow-[inset_-25px_-25px_40px_rgba(0,0,0,0.8),_0_0_30px_rgba(255,255,255,0.15)] relative overflow-hidden transition-all duration-500 animate-float-ship"
              style={{ background: currentPlanet.gradient }}
            >
              {/* Surface Details */}
              {currentPlanet.id === 'bumi' && (
                <div className="absolute inset-0 opacity-80 mix-blend-overlay">
                  <div className="absolute top-6 left-8 w-14 h-12 bg-green-500 rounded-full blur-[2px]" />
                  <div className="absolute bottom-8 right-10 w-20 h-10 bg-emerald-600 rounded-full blur-[2px]" />
                  <div className="absolute top-12 right-6 w-12 h-8 bg-white/50 rounded-full blur-[3px]" />
                </div>
              )}

              {currentPlanet.id === 'jupiter' && (
                <div className="absolute inset-0 opacity-75">
                  <div className="w-full h-3 bg-amber-950/40 my-2" />
                  <div className="w-full h-4 bg-orange-900/40 my-2" />
                  {/* Great Red Spot */}
                  <div className="absolute bottom-10 right-10 w-10 h-7 bg-red-700 rounded-full border border-red-500/50 shadow" />
                </div>
              )}

              {currentPlanet.id === 'mars' && (
                <div className="absolute inset-0 opacity-75">
                  {/* Olympus Mons */}
                  <div className="absolute top-12 left-14 w-8 h-8 rounded-full bg-red-950/60 border border-amber-500/40" />
                </div>
              )}

              {/* Light reflection gloss */}
              <div className="absolute top-4 left-6 w-12 h-8 bg-white/25 rounded-full blur-[4px]" />
            </div>
          </div>

          {/* Navigation Controls under Planet */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              aria-label="Planet Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono-space text-slate-400">
              Planet {currentIndex + 1} dari 8
            </span>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              aria-label="Planet Berikutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Planet Information HUD (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-black text-xs flex items-center justify-center border border-cyan-500/30">
                  #{currentPlanet.order}
                </span>
                <h4 className="text-2xl md:text-3xl font-extrabold text-white">
                  {currentPlanet.name}
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold">
                  {currentPlanet.category}
                </span>
              </div>
              <p className="text-xs text-slate-300">{currentPlanet.type}</p>
            </div>

            {/* Audio Narration Button */}
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow ${
                isSpeaking
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? 'Hentikan Suara' : 'Dengarkan Suara'}</span>
            </button>
          </div>

          <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-800/50 p-3 rounded-xl border border-slate-700">
            {currentPlanet.keyCharacteristic}
          </p>

          {/* Key Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 block text-[11px]">Jarak dari Matahari:</span>
              <strong className="text-amber-400 font-mono-space">{currentPlanet.distanceFromSun}</strong>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 block text-[11px]">Kala Revolusi (Tahun):</span>
              <strong className="text-cyan-400 font-mono-space">{currentPlanet.revolutionPeriod}</strong>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 block text-[11px]">Kala Rotasi (Hari):</span>
              <strong className="text-emerald-400 font-mono-space">{currentPlanet.rotationPeriod}</strong>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 block text-[11px]">Diameter Planet:</span>
              <strong className="text-slate-200 font-mono-space">{currentPlanet.diameterKm}</strong>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 block text-[11px]">Suhu Permukaan:</span>
              <strong className="text-rose-400 font-mono-space">{currentPlanet.surfaceTemp}</strong>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 block text-[11px]">Satelit Alami (Bulan):</span>
              <strong className="text-indigo-400 font-mono-space">
                {currentPlanet.moonsCount > 0 ? `${currentPlanet.moonsCount} satelit` : 'Tidak memiliki'}
              </strong>
            </div>
          </div>

          {/* Atmosphere and Fun Fact */}
          <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs space-y-1.5">
            <div>
              <span className="text-slate-400 font-semibold">Kondisi Atmosfer: </span>
              <span className="text-indigo-200">{currentPlanet.atmosphere}</span>
            </div>
            <div>
              <span className="text-amber-400 font-semibold">✨ Fakta Unik Menakjubkan: </span>
              <span className="text-slate-200">{currentPlanet.uniqueFact}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
