/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Lencana Pencapaian dan Rincian Poin Belajar Modal
 */

import React from 'react';
import { X, Trophy, Award, Lock, CheckCircle2, RotateCcw } from 'lucide-react';
import { determineEarnedBadges, UserProgressData } from '../../utils/rules.ts';
import { soundManager } from '../../utils/audioSystem.ts';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgressData;
  totalPoints: number;
  onResetProgress: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  progress,
  totalPoints,
  onResetProgress,
}) => {
  if (!isOpen) return null;

  const badges = determineEarnedBadges(progress);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xl">
            <Trophy className="w-6 h-6" />
            <span>Pencapaian & Lencana Antariksa</span>
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

        {/* Total Points Big Display */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-950 to-indigo-950/40 border border-amber-500/30 text-center space-y-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Total Poin Eksplorasi
          </span>
          <div className="text-4xl md:text-5xl font-black text-amber-400 font-mono-space">
            {totalPoints} Poin
          </div>
          <p className="text-xs text-slate-300 pt-1">
            Kumpulkan poin dengan mempelajari subbab materi, mencoba simulasi, latihan soal, dan memenangkan game!
          </p>
        </div>

        {/* Badges List */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-300">
            Tiga Lencana Kehormatan Penjelajah:
          </h4>

          <div className="space-y-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${
                  badge.unlocked
                    ? 'bg-amber-950/30 border-amber-500/50 shadow-lg'
                    : 'bg-slate-800/40 border-slate-800 opacity-60'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
                    badge.unlocked
                      ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-md'
                      : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  {badge.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h5 className="text-sm font-bold text-white">{badge.name}</h5>
                    {badge.unlocked ? (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Terbuka
                      </span>
                    ) : (
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Terkunci
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reset progress button for teacher or replay */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500">Mulai pembelajaran baru?</span>
          <button
            onClick={() => {
              if (window.confirm('Apakah kamu yakin ingin mereset seluruh progres dan poin belajar ke awal?')) {
                onResetProgress();
                onClose();
              }
            }}
            className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Atur Ulang Seluruh Progres</span>
          </button>
        </div>
      </div>
    </div>
  );
};
