/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Referensi dan Sumber Belajar Terverifikasi View
 */

import React from 'react';
import { BookOpen, ExternalLink, ArrowLeft, ShieldCheck, Globe, Library } from 'lucide-react';
import { REFERENCES_LIST } from '../../data/references.ts';
import { soundManager } from '../../utils/audioSystem.ts';

interface ReferensiViewProps {
  onBackToMenu: () => void;
}

export const ReferensiView: React.FC<ReferensiViewProps> = ({ onBackToMenu }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 p-4 md:p-6 rounded-2xl backdrop-blur-md">
        <div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
            Sumber Belajar Sah
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            Daftar Referensi & Rujukan
          </h2>
        </div>

        <button
          onClick={onBackToMenu}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Menu Utama</span>
        </button>
      </div>

      {/* Intro Disclaimer */}
      <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Seluruh materi sains, urutan planet, data fisik astronomi, dan simulasi dalam media pembelajaran ini disusun berdasarkan sumber rujukan ilmiah resmi Kementerian Pendidikan Dasar dan Menengah RI serta portal sains antariksa NASA.
        </p>
      </div>

      {/* Reference Cards List */}
      <div className="space-y-4">
        {REFERENCES_LIST.map((ref) => (
          <div
            key={ref.id}
            className="p-5 rounded-2xl bg-slate-900/85 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-2 backdrop-blur-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                {ref.category}
              </span>
              {ref.year && (
                <span className="text-xs text-slate-400 font-mono-space">Tahun {ref.year}</span>
              )}
            </div>

            <h3 className="text-base md:text-lg font-bold text-white leading-snug">
              {ref.title}
            </h3>

            <p className="text-xs text-amber-300 font-medium">
              Lembaga / Penulis: {ref.institutionOrAuthor}
            </p>

            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              {ref.description}
            </p>

            <div className="pt-2">
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-cyan-300 transition-colors font-semibold"
              >
                <span>Buka Tautan Sumber Asli</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
