/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Game 1: Pilihan Ganda Cepat Antariksa
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { GAME_1_QUESTIONS } from '../../data/gamesData.ts';
import { soundManager } from '../../utils/audioSystem.ts';

interface GameQuizProps {
  onComplete: (score: number) => void;
}

export const GameQuiz: React.FC<GameQuizProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQ = GAME_1_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      soundManager.playSuccess();
      setScore((prev) => prev + 20); // 20 pts each, total 100
    } else {
      soundManager.playError();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex < GAME_1_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsGameOver(true);
      const finalScore = score + (selectedOption === currentQ.correctIndex ? 0 : 0);
      onComplete(finalScore);
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
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-6 text-center max-w-lg mx-auto backdrop-blur-md">
        <div className="w-16 h-16 mx-auto mb-4 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400">
          <Trophy className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Misi Selesai!</h3>
        <p className="text-slate-300 text-sm mb-4">
          Kamu telah menyelesaikan tantangan Pilihan Ganda Cepat Antariksa.
        </p>
        <div className="text-4xl font-black text-amber-400 font-mono-space mb-6">
          {score} / 100 Poin
        </div>
        <button
          onClick={handleRestart}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all"
        >
          <RotateCcw className="w-4 h-4" /> Main Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-6 max-w-2xl mx-auto backdrop-blur-md">
      {/* Header and Progress */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800 text-xs">
        <span className="font-semibold text-indigo-400">
          Soal {currentIndex + 1} dari {GAME_1_QUESTIONS.length}
        </span>
        <span className="font-mono-space text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
          Skor: {score}
        </span>
      </div>

      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
        <div
          className="bg-indigo-500 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / GAME_1_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h4 className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed">
        {currentQ.question}
      </h4>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQ.options.map((opt, idx) => {
          let btnStyle = 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200';
          if (isAnswered) {
            if (idx === currentQ.correctIndex) {
              btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
            } else if (idx === selectedOption) {
              btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
            } else {
              btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-xl border font-medium flex items-center justify-between transition-all ${btnStyle}`}
            >
              <span>{opt}</span>
              {isAnswered && idx === currentQ.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
              )}
              {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation and Next Button */}
      {isAnswered && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-3.5 bg-slate-800/90 rounded-xl border border-slate-700 text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-amber-400 block mb-1">💡 Pembahasan:</span>
            {currentQ.explanation}
          </div>

          <button
            onClick={handleNext}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            <span>{currentIndex < GAME_1_QUESTIONS.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
