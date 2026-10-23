/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Simulasi Antariksa (Virtual Laboratory) View
 */

import React, { useState } from 'react';
import { Orbit, Compass, Moon, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { OrbitSimulator } from '../simulasi/OrbitSimulator.tsx';
import { DayNightSimulator } from '../simulasi/DayNightSimulator.tsx';
import { EclipseSimulator } from '../simulasi/EclipseSimulator.tsx';
import { soundManager } from '../../utils/audioSystem.ts';

interface SimulasiViewProps {
  exploredSimulations: string[];
  onExploreSimulation: (simId: string) => void;
  onBackToMenu: () => void;
}

export const SimulasiView: React.FC<SimulasiViewProps> = ({
  exploredSimulations,
  onExploreSimulation,
  onBackToMenu,
}) => {
  const [activeSim, setActiveSim] = useState<'orbit' | 'daynight' | 'eclipse'>('orbit');

  const handleSimChange = (sim: 'orbit' | 'daynight' | 'eclipse') => {
    soundManager.playClick();
    setActiveSim(sim);
    onExploreSimulation(sim);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header and Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 md:p-6 rounded-2xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
              Laboratorium Sains Virtual
            </span>
            <span className="text-xs text-slate-400">
              Eksplorasi {exploredSimulations.length} dari 3 Aktivitas
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
            <span>🔬</span> Eksperimen Simulasi Antariksa
          </h2>
          <p className="text-xs md:text-sm text-slate-300 mt-1">
            Uji hipotesis sainsmu secara interaktif melalui 3 simulasi manipulatif tata surya.
          </p>
        </div>

        <button
          onClick={onBackToMenu}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Menu Utama</span>
        </button>
      </div>

      {/* 3 Simulators Switcher Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            id: 'orbit',
            title: '1. Jelajahi Orbit Planet',
            desc: 'Revolusi 8 planet mengitari Matahari & sabuk asteroid',
            icon: Orbit,
            color: 'border-amber-500/40 text-amber-300',
            activeBg: 'bg-gradient-to-r from-amber-950/60 to-orange-950/40 border-amber-500',
          },
          {
            id: 'daynight',
            title: '2. Siang dan Malam',
            desc: 'Rotasi Bumi 24 jam dengan poros miring 23,5°',
            icon: Compass,
            color: 'border-cyan-500/40 text-cyan-300',
            activeBg: 'bg-gradient-to-r from-cyan-950/60 to-blue-950/40 border-cyan-500',
          },
          {
            id: 'eclipse',
            title: '3. Eksperimen Gerhana',
            desc: 'Simulasi berkas cahaya umbra & penumbra Matahari/Bulan',
            icon: Moon,
            color: 'border-purple-500/40 text-purple-300',
            activeBg: 'bg-gradient-to-r from-purple-950/60 to-indigo-950/40 border-purple-500',
          },
        ].map((sim) => {
          const Icon = sim.icon;
          const isActive = activeSim === sim.id;
          const isExplored = exploredSimulations.includes(sim.id);

          return (
            <button
              key={sim.id}
              onClick={() => handleSimChange(sim.id as 'orbit' | 'daynight' | 'eclipse')}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                isActive
                  ? `${sim.activeBg} ring-2 ring-indigo-400/40 shadow-xl`
                  : 'bg-slate-900/70 hover:bg-slate-800/80 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className={`p-2 rounded-xl bg-slate-800/80 ${sim.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {isExplored && (
                  <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3" /> Dieksplorasi
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold text-white">{sim.title}</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">{sim.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Active Simulator Display */}
      <div>
        {activeSim === 'orbit' && (
          <OrbitSimulator onInteract={() => onExploreSimulation('orbit')} />
        )}
        {activeSim === 'daynight' && (
          <DayNightSimulator onInteract={() => onExploreSimulation('daynight')} />
        )}
        {activeSim === 'eclipse' && (
          <EclipseSimulator onInteract={() => onExploreSimulation('eclipse')} />
        )}
      </div>
    </div>
  );
};
