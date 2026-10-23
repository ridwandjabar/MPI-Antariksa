/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Menu Utama — 6 Menu Navigasi Futuristik
 */

import React from 'react';
import {
  BookOpen,
  Orbit,
  HelpCircle,
  Gamepad2,
  User,
  Library,
  ArrowRight,
  Trophy,
  Award,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { soundManager } from '../../utils/audioSystem.ts';
import { UserProgressData, determineEarnedBadges } from '../../utils/rules.ts';

interface MainMenuViewProps {
  progress: UserProgressData;
  totalPoints: number;
  onNavigate: (view: 'materi' | 'simulasi' | 'latihan' | 'game' | 'pengembang' | 'referensi') => void;
  onOpenBadges: () => void;
}

export const MainMenuView: React.FC<MainMenuViewProps> = ({
  progress,
  totalPoints,
  onNavigate,
  onOpenBadges,
}) => {
  const badges = determineEarnedBadges(progress);
  const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;

  const menuItems = [
    {
      id: 'materi',
      title: 'MATERI BELAJAR',
      subtitle: 'Konsep Tata Surya, Rotasi, Revolusi & Gerhana',
      icon: BookOpen,
      iconEmoji: '🌌',
      color: 'from-blue-600 via-indigo-600 to-cyan-500',
      badgeText: `${progress.completedLessons.length} / 6 Subbab Selesai`,
      accentBorder: 'hover:border-cyan-400',
      glow: 'group-hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]',
    },
    {
      id: 'simulasi',
      title: 'SIMULASI ANTARIKSA',
      subtitle: 'Laboratorium Virtual Orbit, Siang-Malam & Gerhana',
      icon: Orbit,
      iconEmoji: '🪐',
      color: 'from-cyan-600 via-teal-600 to-emerald-500',
      badgeText: `${progress.exploredSimulations.length} / 3 Simulasi`,
      accentBorder: 'hover:border-teal-400',
      glow: 'group-hover:shadow-[0_0_30px_rgba(45,212,191,0.3)]',
    },
    {
      id: 'latihan',
      title: 'LATIHAN SOAL',
      subtitle: '10 Soal Pilihan Ganda & Pembahasan Lengkap',
      icon: HelpCircle,
      iconEmoji: '📝',
      color: 'from-amber-500 via-orange-600 to-yellow-500',
      badgeText: progress.quizCompleted ? `Skor: ${progress.quizScore}/100` : 'Belum Dikerjakan',
      accentBorder: 'hover:border-amber-400',
      glow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]',
    },
    {
      id: 'game',
      title: 'GAME EDUKASI',
      subtitle: 'Enam Tantangan Permainan Sains Menyenangkan',
      icon: Gamepad2,
      iconEmoji: '🎮',
      color: 'from-purple-600 via-pink-600 to-rose-500',
      badgeText: `${progress.completedGames.length} / 6 Game`,
      accentBorder: 'hover:border-purple-400',
      glow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]',
    },
    {
      id: 'pengembang',
      title: 'PROFIL PENGEMBANG',
      subtitle: 'Ridwan Djabar • SMAN 8 Gorontalo',
      icon: User,
      iconEmoji: '👨‍🏫',
      color: 'from-indigo-600 via-violet-600 to-purple-500',
      badgeText: 'Pendidik Digital',
      accentBorder: 'hover:border-indigo-400',
      glow: 'group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]',
    },
    {
      id: 'referensi',
      title: 'SUMBER BELAJAR',
      subtitle: 'Buku IPAS SD Kemendikbud & Portal Sains NASA',
      icon: Library,
      iconEmoji: '📚',
      color: 'from-emerald-600 via-teal-700 to-cyan-600',
      badgeText: 'Rujukan Sah',
      accentBorder: 'hover:border-emerald-400',
      glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]',
    },
  ];

  const handleItemClick = (id: string) => {
    soundManager.playClick();
    onNavigate(id as 'materi' | 'simulasi' | 'latihan' | 'game' | 'pengembang' | 'referensi');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Student Progress & Badges Dashboard Banner */}
      <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900/90 via-indigo-950/60 to-slate-900/90 border border-indigo-500/30 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/20 shrink-0">
            👨‍🚀
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                Pusat Kendali Ekspedisi Antariksa
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                IPAS Kelas VI
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Pilih menu di bawah ini untuk memulai penjelajahan sains tata surya secara mandiri.
            </p>
          </div>
        </div>

        {/* Badges and Points pill */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenBadges();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-bold text-slate-200 transition-all shadow"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Lencana: {unlockedBadgesCount} / 3</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenBadges();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-bold text-amber-300 transition-all shadow"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="font-mono-space">{totalPoints} Poin</span>
          </button>
        </div>
      </div>

      {/* 6 Main Navigation Futuristic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`group relative p-6 rounded-3xl bg-slate-900/85 border border-slate-800 ${item.accentBorder} transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 shadow-xl ${item.glow}`}
            >
              {/* Top Row: Icon and Badge status */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} p-0.5 shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center`}
                  >
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-2xl">
                      {item.iconEmoji}
                    </div>
                  </div>

                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                    {item.badgeText}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              {/* Bottom CTA Arrow */}
              <div className="pt-6 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-cyan-400 transition-colors">
                <span>Buka Menu</span>
                <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
