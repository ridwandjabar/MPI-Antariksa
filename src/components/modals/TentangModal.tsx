/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Tentang MPI & Capaian Pembelajaran Modal Dialog
 */

import React from 'react';
import { X, Info, CheckCircle2, Award, School } from 'lucide-react';
import { soundManager } from '../../utils/audioSystem.ts';

interface TentangModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TentangModal: React.FC<TentangModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const objectives = [
    'Mengidentifikasi anggota tata surya dan karakteristiknya.',
    'Menjelaskan urutan delapan planet berdasarkan jaraknya dari Matahari.',
    'Menganalisis perbedaan karakteristik planet dalam dan planet luar.',
    'Menjelaskan rotasi dan revolusi Bumi serta dampaknya bagi kehidupan.',
    'Menjelaskan fenomena gerhana Matahari dan gerhana Bulan melalui simulasi sederhana.',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xl">
            <Info className="w-6 h-6" />
            <span>Tentang Media Pembelajaran (MPI)</span>
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

        {/* Identity metadata */}
        <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2 text-xs md:text-sm">
          <div className="flex justify-between border-b border-indigo-500/20 pb-2">
            <span className="text-slate-400">Judul Aplikasi:</span>
            <strong className="text-white">EKSPEDISI ANTARIKSA — MENJELAJAHI TATA SURYA</strong>
          </div>
          <div className="flex justify-between border-b border-indigo-500/20 pb-2">
            <span className="text-slate-400">Mata Pelajaran:</span>
            <strong className="text-cyan-300">IPAS (Ilmu Pengetahuan Alam dan Sosial)</strong>
          </div>
          <div className="flex justify-between border-b border-indigo-500/20 pb-2">
            <span className="text-slate-400">Jenjang / Kelas:</span>
            <strong className="text-white">Sekolah Dasar (SD) / Kelas VI (Fase C)</strong>
          </div>
          <div className="flex justify-between border-b border-indigo-500/20 pb-2">
            <span className="text-slate-400">Topik Materi:</span>
            <strong className="text-amber-300">Tata Surya, Rotasi, Revolusi & Gerhana</strong>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-slate-400">Pengembang & Instansi:</span>
            <strong className="text-indigo-200">Ridwan Djabar — SMAN 8 Gorontalo</strong>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Tujuan Pembelajaran (Learning Objectives):</span>
          </h4>

          <div className="space-y-2">
            {objectives.map((obj, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-200 flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>{idx + 1}.</strong> {obj}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg"
          >
            Tutup Informasi
          </button>
        </div>
      </div>
    </div>
  );
};
