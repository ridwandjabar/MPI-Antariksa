/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Latihan Soal IPAS Kelas VI SD (10 Pilihan Ganda Resmi)
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Send,
  RotateCcw,
  Trophy,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../../data/quizQuestions.ts';
import { calculateQuizScore } from '../../utils/rules.ts';
import { soundManager } from '../../utils/audioSystem.ts';

interface LatihanSoalViewProps {
  onCompleteQuiz: (score: number, answers: Record<number, string>) => void;
  onBackToMenu: () => void;
}

export const LatihanSoalView: React.FC<LatihanSoalViewProps> = ({
  onCompleteQuiz,
  onBackToMenu,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({}); // { [questionId]: 'A' | 'B' | 'C' | 'D' }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const selectedOption = answers[currentQ.id] || null;

  const handleSelectOption = (key: string) => {
    if (isSubmitted) return;
    soundManager.playClick();
    setAnswers((prev) => ({ ...prev, [currentQ.id]: key }));
  };

  const handlePrev = () => {
    soundManager.playClick();
    if (currentIdx > 0) setCurrentIdx((prev) => prev - 1);
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Prompt confirm dialog on last question if not submitted
      setShowConfirmModal(true);
    }
  };

  const handleConfirmSubmit = () => {
    soundManager.playClick();
    setShowConfirmModal(false);
    setIsSubmitted(true);

    // Calculate score
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctKey) {
        correctCount++;
      }
    });

    const finalScore = calculateQuizScore(correctCount, QUIZ_QUESTIONS.length);
    onCompleteQuiz(finalScore, answers);

    if (finalScore >= 80) {
      soundManager.playFanfare();
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
      });
    } else {
      soundManager.playSuccess();
    }
  };

  const handleRestart = () => {
    soundManager.playClick();
    setAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
  };

  // Stats calculation
  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const correctCount = QUIZ_QUESTIONS.filter((q) => answers[q.id] === q.correctKey).length;
  const wrongCount = totalQuestions - correctCount;
  const finalScore = calculateQuizScore(correctCount, totalQuestions);

  // Motivational feedback based on score
  let motivationalFeedback = '';
  if (finalScore === 100) {
    motivationalFeedback = '🌟 Luar Biasa Sempurna! Kamu adalah Ahli Astronom Sejati Tata Surya!';
  } else if (finalScore >= 80) {
    motivationalFeedback = '🎉 Hebat Sekali! Pemahamanmu tentang Tata Surya sudah sangat mendalam!';
  } else if (finalScore >= 60) {
    motivationalFeedback = '👍 Bagus! Kamu sudah memahami konsep dasar dengan baik. Pelajari lagi pembahasannya untuk hasil maksimal!';
  } else {
    motivationalFeedback = '🚀 Semangat Penjelajah! Jangan berkecil hati, ayo baca kembali materi pembelajaran lalu coba lagi!';
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 md:p-6 rounded-2xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
              Evaluasi Pembelajaran IPAS SD
            </span>
            <span className="text-xs text-slate-400">
              Terjawab: {answeredCount} dari {totalQuestions} Soal
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Latihan Soal 10 Pilihan Ganda
          </h2>
        </div>

        <button
          onClick={onBackToMenu}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Menu Utama</span>
        </button>
      </div>

      {/* Question Number Pills Navigation (1 to 10) */}
      <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-2xl flex items-center justify-between gap-2 overflow-x-auto">
        <span className="text-xs font-bold text-slate-400 pl-2 shrink-0">Daftar Soal:</span>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {QUIZ_QUESTIONS.map((q, idx) => {
            const isCurrent = idx === currentIdx;
            const isAnswered = Boolean(answers[q.id]);
            const isCorrect = isSubmitted && answers[q.id] === q.correctKey;
            const isWrong = isSubmitted && answers[q.id] !== q.correctKey;

            return (
              <button
                key={q.id}
                onClick={() => {
                  soundManager.playClick();
                  setCurrentIdx(idx);
                }}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center justify-center ${
                  isCurrent
                    ? 'ring-2 ring-indigo-400 bg-indigo-600 text-white shadow'
                    : isSubmitted
                    ? isCorrect
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                      : 'bg-rose-950 text-rose-300 border border-rose-500'
                    : isAnswered
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {q.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Single Question Card */}
      <div className="bg-slate-900/85 border border-indigo-500/30 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl space-y-6">
        {/* Question Heading */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
          <span className="font-bold text-indigo-400">
            Nomor {currentQ.id} dari {totalQuestions}
          </span>
          <span className="text-slate-400">Bobot: 10 Poin</span>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed">
          {currentQ.question}
        </h3>

        {/* 4 Options (A, B, C, D) */}
        <div className="space-y-3">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOption === opt.key;
            const isCorrectKey = currentQ.correctKey === opt.key;

            let btnStyle = 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200';
            if (isSelected && !isSubmitted) {
              btnStyle = 'bg-indigo-600/30 border-indigo-400 text-white ring-2 ring-indigo-400/40';
            }
            if (isSubmitted) {
              if (isCorrectKey) {
                btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
              } else if (isSelected && !isCorrectKey) {
                btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
              } else {
                btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={opt.key}
                onClick={() => handleSelectOption(opt.key)}
                disabled={isSubmitted}
                className={`w-full text-left p-4 rounded-xl border font-medium flex items-center justify-between transition-all ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs border border-slate-700">
                    {opt.key}
                  </span>
                  <span className="text-sm md:text-base">{opt.text}</span>
                </div>

                {isSubmitted && isCorrectKey && (
                  <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Kunci Jawaban
                  </span>
                )}
                {isSubmitted && isSelected && !isCorrectKey && (
                  <span className="text-xs font-bold bg-rose-500/20 text-rose-300 px-2.5 py-1 rounded-md border border-rose-500/30">
                    Jawabanmu (Salah)
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation displayed ONLY after submission */}
        {isSubmitted && (
          <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 text-xs text-slate-200 leading-relaxed animate-in fade-in space-y-1">
            <strong className="text-amber-400 block text-sm mb-1">
              💡 Pembahasan Soal Nomor {currentQ.id}:
            </strong>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        {/* Navigation Buttons: Previous, Next, Submit */}
        <div className="flex items-center justify-between gap-3 pt-6 border-t border-slate-800">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs md:text-sm font-bold border border-slate-700 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          {!isSubmitted ? (
            currentIdx === totalQuestions - 1 ? (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs md:text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Kirim & Selesaikan Latihan</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Latihan</span>
              </button>
              {currentIdx < totalQuestions - 1 && (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
                >
                  <span>Pembahasan Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results Summary Box (Shown after submission) */}
      {isSubmitted && (
        <div className="bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border border-indigo-500/40 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl text-center space-y-4 animate-in fade-in">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-bold text-white">Hasil Latihan Soal IPAS</h3>

          <div className="text-5xl font-black text-amber-400 font-mono-space">
            {finalScore} <span className="text-xl text-slate-400 font-normal">/ 100</span>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-5 h-5" />
              <span>{correctCount} Benar</span>
            </div>
            <div className="flex items-center gap-1.5 text-rose-400 font-bold">
              <XCircle className="w-5 h-5" />
              <span>{wrongCount} Salah</span>
            </div>
          </div>

          <p className="text-sm text-cyan-200 font-medium max-w-lg mx-auto bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            {motivationalFeedback}
          </p>

          <div className="pt-2">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow"
            >
              Ulangi Latihan Soal
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal before Submit */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white text-center">
              Konfirmasi Kirim Jawaban
            </h4>
            <p className="text-xs text-slate-300 text-center leading-relaxed">
              Kamu telah menjawab <strong>{answeredCount}</strong> dari {totalQuestions} soal.
              {answeredCount < totalQuestions && (
                <span className="text-rose-400 block mt-1">
                  Peringatan: Masih ada {totalQuestions - answeredCount} soal yang belum kamu jawab!
                </span>
              )}
              Apakah kamu sudah yakin ingin menyelesaikan latihan sekarang?
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-all"
              >
                Periksa Lagi
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition-all"
              >
                Ya, Kirim Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
