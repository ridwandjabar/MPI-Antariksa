/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Virtual Lab 1: Jelajahi Orbit Planet Tata Surya
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ZoomIn, Info, CheckCircle2 } from 'lucide-react';
import { PLANETS_DATA, SUN_DATA, PlanetData } from '../../data/planets.ts';
import { soundManager } from '../../utils/audioSystem.ts';

interface OrbitSimulatorProps {
  onInteract?: () => void;
}

export const OrbitSimulator: React.FC<OrbitSimulatorProps> = ({ onInteract }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const [showAsteroidBelt, setShowAsteroidBelt] = useState(true);
  const [elapsedDays, setElapsedDays] = useState(0);

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Orbital parameters for canvas rendering
  // Base speeds relative to Earth (365 days):
  // Mercury: 88, Venus: 225, Earth: 365, Mars: 687, Jupiter: 4333, Saturn: 10759, Uranus: 30687, Neptune: 60190
  const planetConfig = [
    { id: 'merkurius', r: 55, size: 7, period: 88, color: '#94a3b8' },
    { id: 'venus', r: 85, size: 10, period: 225, color: '#fbbf24' },
    { id: 'bumi', r: 120, size: 11, period: 365, color: '#38bdf8' },
    { id: 'mars', r: 155, size: 9, period: 687, color: '#ef4444' },
    { id: 'jupiter', r: 215, size: 24, period: 2000, color: '#f97316' }, // scaled for viewing
    { id: 'saturnus', r: 275, size: 20, period: 3200, color: '#fde047', hasRing: true },
    { id: 'uranus', r: 330, size: 15, period: 4500, color: '#2dd4bf' },
    { id: 'neptunus', r: 380, size: 14, period: 6000, color: '#3b82f6' },
  ];

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current !== null && isPlaying) {
        const delta = (time - lastTimeRef.current) * 0.001;
        setElapsedDays((prev) => prev + delta * 40 * speedMultiplier);
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speedMultiplier]);

  const handleSelectPlanet = (planet: PlanetData) => {
    soundManager.playClick();
    setSelectedPlanet(planet);
    if (onInteract) onInteract();
  };

  return (
    <div className="bg-slate-900/80 border border-indigo-500/30 rounded-2xl p-4 md:p-6 shadow-2xl backdrop-blur-md">
      {/* Header and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-amber-400 flex items-center gap-2">
            <span>🪐</span> Laboratorium Orbit Delapan Planet
          </h3>
          <p className="text-sm text-slate-300">
            Amati revolusi planet mengelilingi Matahari. Klik atau sentuh planet untuk melihat kartu informasi detail.
          </p>
        </div>

        {/* Speed & Playback */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => {
              soundManager.playClick();
              setIsPlaying(!isPlaying);
              if (onInteract) onInteract();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              isPlaying
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-600 text-white hover:bg-emerald-500'
            }`}
            aria-label={isPlaying ? 'Jeda Simulasi' : 'Mulai Simulasi'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Jeda' : 'Lanjutkan'}
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setElapsedDays(0);
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            title="Reset Putaran"
            aria-label="Atur Ulang Putaran"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Speed Presets */}
          <div className="flex items-center bg-slate-800/90 rounded-lg p-0.5 border border-slate-700">
            {[0.5, 1, 2, 4].map((spd) => (
              <button
                key={spd}
                onClick={() => {
                  soundManager.playClick();
                  setSpeedMultiplier(spd);
                  if (onInteract) onInteract();
                }}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  speedMultiplier === spd
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Toggles */}
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-all ${
              showLabels
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            Label: {showLabels ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => setShowAsteroidBelt(!showAsteroidBelt)}
            className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-all ${
              showAsteroidBelt
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            Sabuk Asteroid: {showAsteroidBelt ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Orbit Canvas Viewport */}
      <div className="relative w-full aspect-square max-h-[560px] mx-auto bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center select-none">
        {/* Deep space stars background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/30 via-slate-950 to-black pointer-events-none" />

        <svg
          viewBox="-420 -420 840 840"
          className="w-full h-full max-w-full max-h-full cursor-crosshair"
        >
          <defs>
            {/* Sun Glow */}
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="45%" stopColor="#f59e0b" />
              <stop offset="85%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </radialGradient>
            {/* Sun Corona Pulse */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Orbit Tracks */}
          {planetConfig.map((p) => (
            <circle
              key={`orbit-${p.id}`}
              cx="0"
              cy="0"
              r={p.r}
              fill="none"
              stroke="#334155"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              opacity="0.6"
            />
          ))}

          {/* Asteroid Belt Between Mars (155) and Jupiter (215) */}
          {showAsteroidBelt && (
            <g opacity="0.45">
              <circle
                cx="0"
                cy="0"
                r="185"
                fill="none"
                stroke="#78716c"
                strokeWidth="18"
                strokeDasharray="1.5 6"
              />
              <circle
                cx="0"
                cy="0"
                r="180"
                fill="none"
                stroke="#a8a29e"
                strokeWidth="8"
                strokeDasharray="2 10"
              />
            </g>
          )}

          {/* Central Sun */}
          <g
            className="cursor-pointer"
            onClick={() => handleSelectPlanet(SUN_DATA)}
            filter="url(#glow)"
          >
            <circle cx="0" cy="0" r="32" fill="url(#sunGlow)" />
            <circle cx="0" cy="0" r="24" fill="#fbbf24" />
            <circle cx="0" cy="0" r="18" fill="#fef08a" />
            {showLabels && (
              <text
                x="0"
                y="46"
                textAnchor="middle"
                fill="#fef08a"
                fontSize="11"
                fontWeight="bold"
                className="pointer-events-none drop-shadow"
              >
                Matahari
              </text>
            )}
          </g>

          {/* Planets on Orbit */}
          {planetConfig.map((p, idx) => {
            const planetData = PLANETS_DATA.find((item) => item.id === p.id)!;
            const angle = (elapsedDays / p.period) * 2 * Math.PI + idx * 0.8;
            const x = Math.cos(angle) * p.r;
            const y = Math.sin(angle) * p.r;
            const isSelected = selectedPlanet?.id === p.id;

            return (
              <g
                key={p.id}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer transition-transform hover:scale-125"
                onClick={() => handleSelectPlanet(planetData)}
              >
                {/* Selection Halo */}
                {isSelected && (
                  <circle
                    cx="0"
                    cy="0"
                    r={p.size + 8}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                    className="animate-spin"
                  />
                )}

                {/* Saturn Ring */}
                {p.hasRing && (
                  <ellipse
                    cx="0"
                    cy="0"
                    rx={p.size * 2.2}
                    ry={p.size * 0.7}
                    fill="none"
                    stroke="#fde047"
                    strokeWidth="3.5"
                    opacity="0.8"
                    transform="rotate(-20)"
                  />
                )}

                {/* Planet Body */}
                <circle
                  cx="0"
                  cy="0"
                  r={p.size}
                  fill={p.color}
                  stroke={isSelected ? '#ffffff' : '#0f172a'}
                  strokeWidth="1.5"
                />

                {/* Planet Atmosphere Shine */}
                <circle
                  cx={-p.size * 0.25}
                  cy={-p.size * 0.25}
                  r={p.size * 0.4}
                  fill="#ffffff"
                  opacity="0.35"
                />

                {/* Optional Label */}
                {showLabels && (
                  <text
                    x="0"
                    y={p.size + 13}
                    textAnchor="middle"
                    fill="#f1f5f9"
                    fontSize="10"
                    fontWeight="600"
                    className="pointer-events-none drop-shadow-md"
                  >
                    {planetData.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Scaled Legend Note */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/85 px-3 py-1.5 rounded-lg border border-slate-800">
          <span>Waktu Simulasi: ~{Math.floor(elapsedDays)} hari Bumi</span>
          <span className="italic text-slate-400">
            *Ukuran & jarak disederhanakan agar mudah diamati
          </span>
        </div>
      </div>

      {/* Selected Planet HUD Card */}
      {selectedPlanet && (
        <div className="mt-4 p-4 rounded-xl bg-slate-800/90 border border-cyan-500/40 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-slate-950 shadow-lg border border-white/40"
                style={{ background: selectedPlanet.gradient }}
              >
                {selectedPlanet.order === 0 ? '☀️' : selectedPlanet.order}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xl font-bold text-white">{selectedPlanet.name}</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {selectedPlanet.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{selectedPlanet.type}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedPlanet(null)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-700/60"
            >
              Tutup Info
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-700/60 text-xs">
            <div className="p-2 rounded bg-slate-900/60">
              <span className="text-slate-400 block">Jarak ke Matahari:</span>
              <strong className="text-amber-300">{selectedPlanet.distanceFromSun}</strong>
            </div>
            <div className="p-2 rounded bg-slate-900/60">
              <span className="text-slate-400 block">Periode Revolusi:</span>
              <strong className="text-cyan-300">{selectedPlanet.revolutionPeriod}</strong>
            </div>
            <div className="p-2 rounded bg-slate-900/60">
              <span className="text-slate-400 block">Periode Rotasi:</span>
              <strong className="text-emerald-300">{selectedPlanet.rotationPeriod}</strong>
            </div>
            <div className="p-2 rounded bg-slate-900/60">
              <span className="text-slate-400 block">Suhu Permukaan:</span>
              <strong className="text-rose-300">{selectedPlanet.surfaceTemp}</strong>
            </div>
          </div>

          <div className="mt-3 p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-200">
            <strong>Fakta Unik:</strong> {selectedPlanet.uniqueFact}
          </div>
        </div>
      )}
    </div>
  );
};
