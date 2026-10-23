/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Game Edukasi Antariksa View - 6 Games Hub
 */

import React, { useState } from 'react';
import {
  Gamepad2,
  Trophy,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Play,
  RotateCcw,
} from 'lucide-react';
import { GameQuiz } from '../games/GameQuiz.tsx';
import { GameComplex } from '../games/GameComplex.tsx';
import { GameTrueFalse } from '../games/GameTrueFalse.tsx';
import { GameMatching } from '../games/GameMatching.tsx';
import { GamePlanetSort } from '../games/GamePlanetSort.tsx';
import { GameShortAnswer } from '../games/GameShortAnswer.tsx';
import { soundManager } from '../../utils/audioSystem.ts';

interface GameEdukasiViewProps {
  completedGames: string[];
  gameHighScores: Record<string, number>;
  onCompleteGame: (gameId: string, score: number) => void;
  onBackToMenu: () => void;
}

export const GameEdukasiView: React.FC<GameEdukasiViewProps> = ({
  completedGames,
  gameHighScores,
  onCompleteGame,
  onBackToMenu,
}) => {
  const [activeGameId, setActiveGameId] = useState<string | null>(null);

  const gamesList = [
    {
      id: 'game-1',
      title: 'Game 1: Pilihan Ganda Cepat',
      desc: 'Jawab 5 pertanyaan kuis cepat tentang misteri tata surya.',
      icon: '⚡',
      color: 'from-amber-600 to-yellow-500',
    },
    {
      id: 'game-2',
      title: 'Game 2: Pilihan Ganda Kompleks',
      desc: 'Pilih semua pernyataan yang benar. Analisis fakta sains dengan teliti!',
      icon: '🧩',
      color: 'from-purple-600 to-indigo-500',
    },
    {
      id: 'game-3',
      title: 'Game 3: Benar atau Salah',
      desc: 'Tentukan apakah pernyataan tentang planet & gravitasi benar atau salah.',
      icon: '⚖️',
      color: 'from-emerald-600 to-teal-500',
    },
    {
      id: 'game-4',
      title: 'Game 4: Menjodohkan Planet',
      desc: 'Hubungkan kartu nama planet dengan ciri khas spektakulernya.',
      icon: '🔗',
      color: 'from-cyan-600 to-blue-500',
    },
    {
      id: 'game-5',
      title: 'Game 5: Susun 8 Planet',
      desc: 'Seret dan susun delapan planet berdasarkan jarak dari Matahari.',
      icon: '🚀',
      color: 'from-orange-600 to-amber-500',
    },
    {
      id: 'game-6',
      title: 'Game 6: Isian Singkat',
      desc: 'Ketik istilah-istilah sains antariksa yang tepat ke dalam kotak teks.',
      icon: '✍️',
      color: 'from-teal-600 to-cyan-500',
    },
  ];

  const handleLaunchGame = (id: string) => {
    soundManager.playWarp();
    setActiveGameId(id);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 md:p-6 rounded-2xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
              Arena Bermain & Belajar
            </span>
            <span className="text-xs text-slate-400">
              Diselesaikan: {completedGames.length} dari 6 Game
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
            <Gamepad2 className="w-7 h-7 text-amber-400" />
            <span>Enam Game Edukasi Antariksa</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-300 mt-1">
            Mainkan aneka permainan seru untuk mengasah daya ingat, logika, dan analisis astronomimu!
          </p>
        </div>

        <button
          onClick={activeGameId ? () => setActiveGameId(null) : onBackToMenu}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{activeGameId ? 'Pilih Game Lain' : 'Menu Utama'}</span>
        </button>
      </div>

      {/* Main Content: Either the 6 Cards Grid or Active Game */}
      {!activeGameId ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gamesList.map((game) => {
            const isDone = completedGames.includes(game.id);
            const highScore = gameHighScores[game.id] || 0;

            return (
              <div
                key={game.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 backdrop-blur-md transition-all flex flex-col justify-between hover:-translate-y-1 shadow-lg group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl p-2 rounded-xl bg-slate-800 group-hover:scale-110 transition-transform">
                      {game.icon}
                    </span>
                    {isDone ? (
                      <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Selesai ({highScore} Poin)
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                        Belum Dimainkan
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white mb-1.5">{game.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{game.desc}</p>
                </div>

                <div className="pt-5">
                  <button
                    onClick={() => handleLaunchGame(game.id)}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-md transition-all"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{isDone ? 'Mainkan Lagi' : 'Mulai Game'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="animate-in fade-in duration-300">
          {activeGameId === 'game-1' && (
            <GameQuiz onComplete={(score) => onCompleteGame('game-1', score)} />
          )}
          {activeGameId === 'game-2' && (
            <GameComplex onComplete={(score) => onCompleteGame('game-2', score)} />
          )}
          {activeGameId === 'game-3' && (
            <GameTrueFalse onComplete={(score) => onCompleteGame('game-3', score)} />
          )}
          {activeGameId === 'game-4' && (
            <GameMatching onComplete={(score) => onCompleteGame('game-4', score)} />
          )}
          {activeGameId === 'game-5' && (
            <GamePlanetSort onComplete={(score) => onCompleteGame('game-5', score)} />
          )}
          {activeGameId === 'game-6' && (
            <GameShortAnswer onComplete={(score) => onCompleteGame('game-6', score)} />
          )}
        </div>
      )}
    </div>
  );
};
