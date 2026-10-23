/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Petunjuk Penggunaan Modal Dialog
 */

import React from 'react';
import { X, HelpCircle, BookOpen, Compass, Gamepad2, Volume2, Sparkles } from 'lucide-react';
import { soundManager } from '../../utils/audioSystem.ts';

interface PetunjukModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PetunjukModal: React.FC<PetunjukModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xl">
            <HelpCircle className="w-6 h-6" />
            <span>Petunjuk Penggunaan Aplikasi</span>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs md:text-sm text-slate-200 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block text-sm mb-0.5">1. Menu Materi Pembelajaran</strong>
              <p className="text-slate-300">
                Terdapat 6 subbab materi. Setiap subbab dilengkapi 5 tab: <strong>Teks</strong> untuk membaca, <strong>Audio</strong> untuk mendengarkan narasi suara bahasa Indonesia, <strong>Animasi</strong> visual, <strong>Simulasi</strong> interaktif, serta <strong>Video</strong> pembelajaran.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
            <Compass className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block text-sm mb-0.5">2. Simulasi Antariksa (Virtual Lab)</strong>
              <p className="text-slate-300">
                Jelajahi orbit delapan planet, amati rotasi Bumi yang menyebabkan siang dan malam, serta lakukan eksperimen bayangan umbra dan penumbra pada gerhana matahari dan gerhana bulan.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block text-sm mb-0.5">3. Latihan Soal Pilihan Ganda</strong>
              <p className="text-slate-300">
                Kerjakan 10 soal pilihan ganda. Kamu dapat berpindah nomor soal menggunakan tombol navigasi. Setelah menekan tombol Kirim, skor otomatis dari 100 dan pembahasan setiap nomor akan ditampilkan.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
            <Gamepad2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block text-sm mb-0.5">4. Game Edukasi Antariksa</strong>
              <p className="text-slate-300">
                Tersedia 6 ragam permainan edukasi: Pilihan Ganda, Pilihan Ganda Kompleks, Benar atau Salah, Menjodohkan, Susun 8 Planet (Drag & Drop), dan Isian Singkat.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
            <Volume2 className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block text-sm mb-0.5">5. Pengaturan Audio & Layar Penuh</strong>
              <p className="text-slate-300">
                Gunakan tombol musik di pojok kanan atas untuk menyalakan/mematikan musik kosmik pengiring, efek suara klik, serta tombol layar penuh untuk kenyamanan belajar di kelas.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg"
          >
            Mengerti, Siap Belajar!
          </button>
        </div>
      </div>
    </div>
  );
};
