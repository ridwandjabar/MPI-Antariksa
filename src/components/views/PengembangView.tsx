/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Profil Pengembang MPI - Ridwan Djabar (SMAN 8 Gorontalo)
 */

import React, { useState, useEffect } from 'react';
import { User, Upload, ArrowLeft, Heart, School, Award, Sparkles, Check } from 'lucide-react';
import { DEVELOPER_INFO } from '../../data/developer.ts';
import { loadTeacherAvatar, saveTeacherAvatar } from '../../utils/storage.ts';
import { soundManager } from '../../utils/audioSystem.ts';

interface PengembangViewProps {
  onBackToMenu: () => void;
}

export const PengembangView: React.FC<PengembangViewProps> = ({ onBackToMenu }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    setAvatarUrl(loadTeacherAvatar());
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        saveTeacherAvatar(result);
        setAvatarUrl(result);
        soundManager.playSuccess();
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 p-4 md:p-6 rounded-2xl backdrop-blur-md">
        <div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
            Identitas Pengembang
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            Profil Pengembang Multimedia
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

      {/* Main Profile Card */}
      <div className="bg-slate-900/85 border border-indigo-500/30 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-800">
          {/* Avatar / Photo Container with Custom Upload Option */}
          <div className="flex flex-col items-center">
            <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-indigo-500/50 shadow-xl bg-slate-950 flex items-center justify-center group">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={DEVELOPER_INFO.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Elegant Educator Vector Placeholder */
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white mb-2 shadow-lg">
                    <User className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    Foto Pengembang
                  </span>
                </div>
              )}

              {/* Upload Overlay */}
              <label className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-center cursor-pointer transition-opacity p-2">
                <Upload className="w-6 h-6 text-cyan-400 mb-1" />
                <span className="text-[10px] text-cyan-300 font-bold">
                  Unggah / Ganti Foto Profil
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Upload status indicator */}
            {uploadSuccess && (
              <span className="text-[11px] text-emerald-400 font-bold mt-2 flex items-center gap-1 animate-in fade-in">
                <Check className="w-3.5 h-3.5" /> Foto tersimpan!
              </span>
            )}

            <label className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer flex items-center gap-1">
              <Upload className="w-3.5 h-3.5" />
              <span>Ganti Foto</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Profile Bio Details */}
          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                {DEVELOPER_INFO.name}
              </h3>
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-semibold">
                {DEVELOPER_INFO.role}
              </span>
            </div>

            <div className="space-y-1 text-sm text-slate-300">
              <p className="flex items-center justify-center sm:justify-start gap-2">
                <School className="w-4 h-4 text-cyan-400 shrink-0" />
                <strong className="text-white">{DEVELOPER_INFO.institution}</strong>
                <span>• {DEVELOPER_INFO.city}</span>
              </p>
              <p className="flex items-center justify-center sm:justify-start gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mata Pelajaran: <strong>{DEVELOPER_INFO.subject}</strong></span>
              </p>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
              {DEVELOPER_INFO.bio}
            </p>
          </div>
        </div>

        {/* Acknowledgments & Dedication */}
        <div className="space-y-3">
          <h4 className="text-base font-bold text-amber-400 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Ucapan Terima Kasih & Apresiasi</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DEVELOPER_INFO.acknowledgments.map((ack, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5"
              >
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{ack}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack Info */}
        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <strong>Spesifikasi Aplikasi:</strong> Multimedia Pembelajaran Interaktif (MPI) Kurikulum Merdeka Fase C Kelas VI SD.
          </div>
          <span className="font-mono-space text-slate-400 text-[11px]">
            Versi Edukasi 2.0 • Audio & Web Audio Terintegrasi
          </span>
        </div>
      </div>
    </div>
  );
};
