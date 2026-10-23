/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Game 3: Benar atau Salah Antariksa
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Check, X, CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight, HelpCircle } from 'lucide-react';
import { GAME_3_STATEMENTS } from '../../data/gamesData.ts';
import { soundManager } from '../../utils/audioSystem.ts';

interface GameTrueFalseProps {
  onComplete: (score: number) => void;
}

export const GameTrueFalse: React.FC<GameTrueFalseProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQ = GAME_3_STATEMENTS[currentIndex];
  const isAnswered = userChoice !== null;
  const isCorrect = userChoice === currentQ.isTrue;

  const handleChoice = (choice: boolean) => {
    if (isAnswered) return;
    soundManager.playClick();
    setUserChoice(choice);

    if (choice === currentQ.isTrue) {
      soundManager.playSuccess();
      setScore((prev) => prev + 20); // 20 pts per question, max 100
    } else {
      soundManager.playError();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex < GAME_3_STATEMENTS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserChoice(null);
    } else {
      setIsGameOver(true);
      onComplete(score);
      soundManager.playFanfare();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentIndex(0);
    setUserChoice(null);
    setScore(0);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 text-center max-w-lg mx-auto backdrop-blur-md">
        <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
          <Trophy className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Tantangan Benar / Salah Selesai!</h3>
        <p className="text-slate-300 text-sm mb-4">
          Kamu telah menguji ketelitian fakta-fakta sains antariksa!
        </p>
        <div className="text-4xl font-black text-amber-400 font-mono-space mb-6">
          {score} / 100 Poin
        </div>
        <button
          onClick={handleRestart}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all"
        >
          <RotateCcw className="w-4 h-4" /> Main Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 max-w-2xl mx-auto backdrop-blur-md">
      {/* Header and Progress */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800 text-xs">
        <span className="font-semibold text-emerald-400">
          Pernyataan {currentIndex + 1} dari {GAME_3_STATEMENTS.length}
        </span>
        <span className="font-mono-space text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
          Skor: {score}
        </span>
      </div>

      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
        <div
          className="bg-emerald-500 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / GAME_3_STATEMENTS.length) * 100}%` }}
        />
      </div>

      {/* Statement Card */}
      <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 mb-6 text-center">
        <span className="inline-block p-2 rounded-full bg-indigo-500/20 text-indigo-300 mb-3">
          <HelpCircle className="w-6 h-6" />
        </span>
        <h4 className="text-lg md:text-xl font-bold text-white leading-relaxed">
          &ldquo;{currentQ.statement}&rdquo;
        </h4>
      </div>

      {/* BENAR and SALAH Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => handleChoice(true)}
          disabled={isAnswered}
          className={`py-4 px-6 rounded-xl font-black text-base md:text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
            isAnswered
              ? currentQ.isTrue
                ? 'bg-emerald-600 text-white ring-4 ring-emerald-400/50'
                : userChoice === true
                ? 'bg-rose-600 text-white opacity-60'
                : 'bg-slate-800 text-slate-500'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95'
          }`}
        >
          <Check className="w-6 h-6 stroke-[3]" />
          <span>BENAR</span>
        </button>

        <button
          onClick={() => handleChoice(false)}
          disabled={isAnswered}
          className={`py-4 px-6 rounded-xl font-black text-base md:text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
            isAnswered
              ? !currentQ.isTrue
                ? 'bg-emerald-600 text-white ring-4 ring-emerald-400/50'
                : userChoice === false
                ? 'bg-rose-600 text-white opacity-60'
                : 'bg-slate-800 text-slate-500'
              : 'bg-rose-600 hover:bg-rose-500 text-white active:scale-95'
          }`}
        >
          <X className="w-6 h-6 stroke-[3]" />
          <span>SALAH</span>
        </button>
      </div>

      {/* Result & Explanation */}
      {isAnswered && (
        <div className="space-y-4 animate-in fade-in">
          <div
            className={`p-3.5 rounded-xl border flex items-center gap-2 text-sm font-bold ${
              isCorrect
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
            }`}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Analisis Tepat! (+20 Poin)</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>Belum tepat. Cek penjelasan di bawah ya!</span>
              </>
            )}
          </div>

          <div className="p-3.5 bg-slate-800/90 rounded-xl border border-slate-700 text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-amber-400 block mb-1">💡 Penjelasan:</span>
            {currentQ.explanation}
          </div>

          <button
            onClick={handleNext}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            <span>{currentIndex < GAME_3_STATEMENTS.length - 1 ? 'Pernyataan Berikutnya' : 'Lihat Hasil Akhir'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
