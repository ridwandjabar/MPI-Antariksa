/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Game 6: Isian Singkat Antariksa
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight, Lightbulb } from 'lucide-react';
import { GAME_6_QUESTIONS, ShortAnswerQuestion } from '../../data/gamesData.ts';
import { checkShortAnswer } from '../../utils/rules.ts';
import { soundManager } from '../../utils/audioSystem.ts';

interface GameShortAnswerProps {
  onComplete: (score: number) => void;
}

export const GameShortAnswer: React.FC<GameShortAnswerProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputText, setInputText] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentQ = GAME_6_QUESTIONS[currentIndex];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isChecked) return;

    soundManager.playClick();
    const correct = checkShortAnswer(inputText, currentQ.acceptedAnswers);
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
    if (currentIndex < GAME_6_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setInputText('');
      setIsChecked(false);
      setIsCorrect(false);
      setShowHint(false);
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
    setInputText('');
    setIsChecked(false);
    setIsCorrect(false);
    setShowHint(false);
    setScore(0);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 text-center max-w-lg mx-auto backdrop-blur-md">
        <div className="w-16 h-16 mx-auto mb-4 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400">
          <Trophy className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Tantangan Isian Singkat Selesai!</h3>
        <p className="text-slate-300 text-sm mb-4">
          Hebat! Kamu telah menuliskan istilah-istilah penting tata surya dengan tepat.
        </p>
        <div className="text-4xl font-black text-amber-400 font-mono-space mb-6">
          {score} / 100 Poin
        </div>
        <button
          onClick={handleRestart}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-lg transition-all"
        >
          <RotateCcw className="w-4 h-4" /> Main Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 max-w-2xl mx-auto backdrop-blur-md">
      {/* Header and Progress */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800 text-xs">
        <span className="font-semibold text-teal-400">
          Pertanyaan {currentIndex + 1} dari {GAME_6_QUESTIONS.length}
        </span>
        <span className="font-mono-space text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
          Skor: {score}
        </span>
      </div>

      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
        <div
          className="bg-teal-500 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / GAME_6_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h4 className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed">
        {currentQ.question}
      </h4>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isChecked}
            placeholder="Ketik jawabanmu di sini..."
            className={`w-full px-4 py-3.5 rounded-xl border bg-slate-800/90 text-white placeholder-slate-500 font-medium text-base outline-none transition-all ${
              isChecked
                ? isCorrect
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                  : 'border-rose-500 bg-rose-950/40 text-rose-200'
                : 'border-slate-700 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20'
            }`}
          />
        </div>

        {/* Hint button & toggle */}
        <div className="flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setShowHint(!showHint);
            }}
            className="text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{showHint ? 'Sembunyikan Petunjuk' : 'Lihat Petunjuk'}</span>
          </button>
          <span className="text-slate-400 text-[11px]">
            *Huruf besar/kecil dan spasi tidak mempengaruhi penilaian
          </span>
        </div>

        {showHint && (
          <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 animate-in fade-in">
            💡 <strong>Petunjuk:</strong> {currentQ.hint}
          </div>
        )}

        {!isChecked && (
          <button
            type="submit"
            disabled={!inputText.trim()}
            className={`w-full py-3 px-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all ${
              inputText.trim()
                ? 'bg-teal-600 hover:bg-teal-500 text-white cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Kirim Jawaban</span>
          </button>
        )}
      </form>

      {/* Result feedback and Next */}
      {isChecked && (
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
                <span>Jawabanmu Tepat Sekali (+20 Poin)!</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>
                  Jawaban tepat adalah: <strong>{currentQ.canonicalAnswer}</strong>
                </span>
              </>
            )}
          </div>

          <button
            onClick={handleNext}
            className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            <span>{currentIndex < GAME_6_QUESTIONS.length - 1 ? 'Pertanyaan Berikutnya' : 'Lihat Hasil Akhir'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
