/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Game 2: Pilihan Ganda Kompleks (Multi-Select) Antariksa
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckSquare, Square, CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight, ShieldCheck } from 'lucide-react';
import { GAME_2_QUESTIONS } from '../../data/gamesData.ts';
import { checkComplexAnswer } from '../../utils/rules.ts';
import { soundManager } from '../../utils/audioSystem.ts';

interface GameComplexProps {
  onComplete: (score: number) => void;
}

export const GameComplex: React.FC<GameComplexProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQ = GAME_2_QUESTIONS[currentIndex];

  const handleToggleOption = (id: string) => {
    if (isChecked) return;
    soundManager.playClick();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCheckAnswer = () => {
    if (selectedIds.length === 0) return;
    soundManager.playClick();
    const correct = checkComplexAnswer(selectedIds, currentQ.correctIds);
    setIsCorrect(correct);
    setIsChecked(true);

    if (correct) {
      soundManager.playSuccess();
      setScore((prev) => prev + 20); // 20 pts per question, max 100
    } else {
      soundManager.playError();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex < GAME_2_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIds([]);
      setIsChecked(false);
      setIsCorrect(false);
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
    setSelectedIds([]);
    setIsChecked(false);
    setIsCorrect(false);
    setScore(0);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 text-center max-w-lg mx-auto backdrop-blur-md">
        <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400">
          <Trophy className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Tantangan Kompleks Tuntas!</h3>
        <p className="text-slate-300 text-sm mb-4">
          Hebat! Kamu telah menganalisis pilihan ganda kompleks dengan cermat.
        </p>
        <div className="text-4xl font-black text-amber-400 font-mono-space mb-6">
          {score} / 100 Poin
        </div>
        <button
          onClick={handleRestart}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg transition-all"
        >
          <RotateCcw className="w-4 h-4" /> Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 max-w-2xl mx-auto backdrop-blur-md">
      {/* Header and Progress */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800 text-xs">
        <span className="font-semibold text-purple-400">
          Soal {currentIndex + 1} dari {GAME_2_QUESTIONS.length} (Bisa pilih lebih dari satu)
        </span>
        <span className="font-mono-space text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
          Skor: {score}
        </span>
      </div>

      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
        <div
          className="bg-purple-500 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / GAME_2_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h4 className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed">
        {currentQ.question}
      </h4>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQ.options.map((opt) => {
          const isSelected = selectedIds.includes(opt.id);
          const isKeyOption = currentQ.correctIds.includes(opt.id);

          let containerStyle = 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200';
          if (isSelected) {
            containerStyle = 'bg-purple-950/60 border-purple-500 text-white';
          }
          if (isChecked) {
            if (isKeyOption) {
              containerStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-100';
            } else if (isSelected && !isKeyOption) {
              containerStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
            } else {
              containerStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleToggleOption(opt.id)}
              disabled={isChecked}
              className={`w-full text-left p-4 rounded-xl border font-medium flex items-center justify-between transition-all ${containerStyle}`}
            >
              <div className="flex items-center gap-3">
                {isSelected ? (
                  <CheckSquare className="w-5 h-5 text-purple-400 shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-slate-500 shrink-0" />
                )}
                <span>{opt.text}</span>
              </div>

              {isChecked && isKeyOption && (
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  Kunci Benar
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Check or Next Action */}
      {!isChecked ? (
        <button
          onClick={handleCheckAnswer}
          disabled={selectedIds.length === 0}
          className={`w-full py-3 px-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all ${
            selectedIds.length > 0
              ? 'bg-purple-600 hover:bg-purple-500 text-white cursor-pointer'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Periksa Jawaban ({selectedIds.length} dipilih)</span>
        </button>
      ) : (
        <div className="space-y-4 animate-in fade-in">
          {/* Result banner */}
          <div
            className={`p-3 rounded-xl border flex items-center gap-2 text-sm font-bold ${
              isCorrect
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
            }`}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Kombinasi Jawabanmu Tepat Sekali (+20 Poin)!</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>Kombinasi belum lengkap atau ada pilihan yang keliru.</span>
              </>
            )}
          </div>

          {/* Explanation */}
          <div className="p-3.5 bg-slate-800/90 rounded-xl border border-slate-700 text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-amber-400 block mb-1">💡 Pembahasan:</span>
            {currentQ.explanation}
          </div>

          <button
            onClick={handleNext}
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            <span>{currentIndex < GAME_2_QUESTIONS.length - 1 ? 'Pertanyaan Berikutnya' : 'Lihat Hasil Akhir'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
