/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Game 4: Menjodohkan Nama Planet dengan Ciri Khasnya
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, RotateCcw, Trophy, Sparkles, Link2 } from 'lucide-react';
import { GAME_4_PAIRS, MatchPair } from '../../data/gamesData.ts';
import { soundManager } from '../../utils/audioSystem.ts';

interface GameMatchingProps {
  onComplete: (score: number) => void;
}

export const GameMatching: React.FC<GameMatchingProps> = ({ onComplete }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({}); // { planetId: charId }
  const [shuffledChars] = useState(() =>
    [...GAME_4_PAIRS].sort(() => Math.random() - 0.5)
  );
  const [isCompleted, setIsCompleted] = useState(false);

  // Handle selecting a planet card
  const handleSelectPlanet = (planetId: string) => {
    if (isCompleted || matchedPairs[planetId]) return;
    soundManager.playClick();
    setSelectedPlanet(selectedPlanet === planetId ? null : planetId);
  };

  // Handle selecting a characteristic card
  const handleSelectChar = (charId: string) => {
    if (isCompleted || !selectedPlanet) return;
    soundManager.playClick();

    // Check if this characteristic is already assigned
    const alreadyAssignedPlanet = Object.keys(matchedPairs).find(
      (pId) => matchedPairs[pId] === charId
    );

    if (alreadyAssignedPlanet) {
      // Remove previous assignment
      const updated = { ...matchedPairs };
      delete updated[alreadyAssignedPlanet];
      updated[selectedPlanet] = charId;
      setMatchedPairs(updated);
    } else {
      const updated = { ...matchedPairs, [selectedPlanet]: charId };
      setMatchedPairs(updated);

      // Check if all pairs are assigned
      if (Object.keys(updated).length === GAME_4_PAIRS.length) {
        checkAllPairs(updated);
      }
    }

    setSelectedPlanet(null);
  };

  const checkAllPairs = (pairs: Record<string, string>) => {
    let correctCount = 0;
    GAME_4_PAIRS.forEach((p) => {
      if (pairs[p.id] === p.id) {
        correctCount++;
      }
    });

    const score = correctCount * 20; // 5 pairs, 20 pts each = 100
    if (correctCount === GAME_4_PAIRS.length) {
      soundManager.playFanfare();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      soundManager.playSuccess();
    }

    setIsCompleted(true);
    onComplete(score);
  };

  const handleReset = () => {
    soundManager.playClick();
    setMatchedPairs({});
    setSelectedPlanet(null);
    setIsCompleted(false);
  };

  const correctCount = Object.keys(matchedPairs).filter(
    (pId) => matchedPairs[pId] === pId
  ).length;

  return (
    <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 md:p-6 max-w-3xl mx-auto backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h4 className="text-lg md:text-xl font-bold text-cyan-400 flex items-center gap-2">
            <span>🔗</span> Pasangkan Planet & Ciri Khasnya
          </h4>
          <p className="text-xs text-slate-300">
            Klik nama planet di kolom kiri, lalu klik ciri khas pasangannya di kolom kanan.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Atur Ulang
        </button>
      </div>

      {/* Matching Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
        {/* Left Column: Planets */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            1. Pilih Planet
          </h5>
          {GAME_4_PAIRS.map((pair) => {
            const isSelected = selectedPlanet === pair.id;
            const isPaired = Boolean(matchedPairs[pair.id]);
            const isPairCorrect = isCompleted && matchedPairs[pair.id] === pair.id;
            const isPairWrong = isCompleted && isPaired && matchedPairs[pair.id] !== pair.id;

            return (
              <button
                key={pair.id}
                onClick={() => handleSelectPlanet(pair.id)}
                disabled={isCompleted}
                className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between font-bold transition-all ${
                  isCompleted
                    ? isPairCorrect
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-rose-950/80 border-rose-500 text-rose-200'
                    : isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 ring-2 ring-cyan-400/40'
                    : isPaired
                    ? 'bg-indigo-950/40 border-indigo-500/50 text-indigo-200'
                    : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{pair.icon}</span>
                  <span>{pair.planetName}</span>
                </div>
                {isPaired && !isCompleted && (
                  <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/40">
                    Terpasang ✓
                  </span>
                )}
                {isCompleted && (
                  <span>
                    {isPairCorrect ? '✅' : '❌'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Characteristics */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            2. Pasangkan Ciri Khas
          </h5>
          {shuffledChars.map((charItem) => {
            // Find which planet is connected to this char
            const connectedPlanetId = Object.keys(matchedPairs).find(
              (pId) => matchedPairs[pId] === charItem.id
            );
            const isConnected = Boolean(connectedPlanetId);
            const isPairCorrect =
              isCompleted && connectedPlanetId === charItem.id;

            return (
              <button
                key={charItem.id}
                onClick={() => handleSelectChar(charItem.id)}
                disabled={isCompleted || !selectedPlanet}
                className={`w-full p-3.5 rounded-xl border text-left text-xs md:text-sm font-medium transition-all ${
                  isCompleted
                    ? isPairCorrect
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-rose-950/80 border-rose-500 text-rose-200'
                    : isConnected
                    ? 'bg-indigo-950/40 border-indigo-500/50 text-indigo-200'
                    : selectedPlanet
                    ? 'bg-slate-800/90 hover:bg-cyan-950/50 hover:border-cyan-500/50 border-slate-700 text-slate-200 cursor-pointer'
                    : 'bg-slate-800/50 border-slate-800 text-slate-400 cursor-not-allowed opacity-80'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5">•</span>
                  <span>{charItem.characteristic}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="p-4 bg-slate-800/90 rounded-xl border border-cyan-500/40 text-center animate-in fade-in">
          <div className="flex items-center justify-center gap-2 text-amber-400 font-black text-xl mb-1">
            <Trophy className="w-6 h-6" />
            <span>Skor: {correctCount * 20} / 100 Poin</span>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            {correctCount === 5
              ? 'Luar biasa! Seluruh pasangan planet dan ciri khasnya berhasil kamu jodohkan dengan tepat!'
              : `Kamu berhasil menjodohkan ${correctCount} dari 5 pasangan dengan benar.`}
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-xs transition-all shadow"
          >
            Pasangkan Ulang
          </button>
        </div>
      )}
    </div>
  );
};
