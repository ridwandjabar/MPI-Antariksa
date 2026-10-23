/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Interactive mini-activities for each learning module
 */

import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, Sparkles, HelpCircle } from 'lucide-react';
import { soundManager } from '../../utils/audioSystem.ts';

interface ActivityProps {
  onInteract?: () => void;
}

/**
 * Activity for Subbab 1: Identifikasi Anggota Tata Surya
 */
export const IdentifyMembersActivity: React.FC<ActivityProps> = ({ onInteract }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const members = [
    {
      id: 'matahari',
      name: 'Matahari',
      icon: '☀️',
      role: 'Pusat Tata Surya & Bintang Induk',
      desc: 'Memiliki 99,8% massa seluruh tata surya. Gravitasinya mengikat seluruh planet agar mengorbit stabil.',
    },
    {
      id: 'planet',
      name: '8 Planet',
      icon: '🪐',
      role: 'Pengelana Utama Orbit',
      desc: 'Benda langit bulat yang mengitari Matahari dan telah membersihkan orbitnya dari puing lain.',
    },
    {
      id: 'satelit',
      name: 'Satelit Alami',
      icon: '🌑',
      role: 'Pengiring Planet',
      desc: 'Mengitari planet induknya (contoh: Bulan yang mengitari Bumi, Ganymede mengitari Jupiter).',
    },
    {
      id: 'kerdil',
      name: 'Planet Kerdil',
      icon: '⚪',
      role: 'Benda Langit Bulat Kecil',
      desc: 'Mengitari Matahari namun belum mampu membersihkan lingkungan orbitnya (contoh: Pluto dan Ceres).',
    },
    {
      id: 'asteroid',
      name: 'Asteroid',
      icon: '🪨',
      role: 'Bongkahan Batu Antariksa',
      desc: 'Bebatuan purba yang banyak berkumpul di Sabuk Asteroid antara orbit Mars dan Jupiter.',
    },
    {
      id: 'komet',
      name: 'Komet',
      icon: '☄️',
      role: 'Bola Es & Debu Berekor',
      desc: 'Gumpalan es beku yang menguap membentuk ekor gas bercahaya megah saat melintas dekat Matahari.',
    },
  ];

  return (
    <div className="bg-slate-900/60 p-4 rounded-xl border border-indigo-500/30">
      <h5 className="text-sm font-bold text-indigo-300 mb-2 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-indigo-400" />
        <span>Eksplorasi Anggota: Klik setiap anggota tata surya di bawah untuk melihat perannya!</span>
      </h5>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
        {members.map((m) => {
          const isSelected = selectedItem === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                soundManager.playClick();
                setSelectedItem(m.id);
                if (onInteract) onInteract();
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-indigo-600/30 border-indigo-400 ring-2 ring-indigo-400/40 text-white'
                  : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
              }`}
            >
              <span className="text-2xl block mb-1">{m.icon}</span>
              <strong className="text-xs block font-bold">{m.name}</strong>
              <span className="text-[10px] text-slate-400 block truncate">{m.role}</span>
            </button>
          );
        })}
      </div>

      {selectedItem && (
        <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-xs text-indigo-200 animate-in fade-in">
          {(() => {
            const current = members.find((m) => m.id === selectedItem)!;
            return (
              <div>
                <strong className="text-indigo-300 block mb-1">
                  {current.icon} {current.name} — {current.role}:
                </strong>
                <p className="leading-relaxed">{current.desc}</p>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

/**
 * Activity for Subbab 2: Eksplorasi Reaksi Fusi & Energi Matahari
 */
export const SunEnergyActivity: React.FC<ActivityProps> = ({ onInteract }) => {
  const [activeLayer, setActiveLayer] = useState<'inti' | 'fotosfer' | 'korona'>('inti');

  const layers = {
    inti: {
      name: 'Inti Matahari (Core)',
      temp: '15.000.000 °C',
      desc: 'Pusat dapur energi matahari di mana terjadi reaksi fusi termonuklir yang mengubah 4 atom hidrogen menjadi 1 atom helium, memancarkan foton energi raksasa.',
    },
    fotosfer: {
      name: 'Fotosfer (Lapisan Cahaya Tampak)',
      temp: '5.500 °C',
      desc: 'Permukaan Matahari yang memancarkan cahaya kuning terang yang sampai ke mata kita di Bumi dalam waktu 8 menit 20 detik.',
    },
    korona: {
      name: 'Korona (Mahkota Matahari)',
      temp: '1.000.000 – 3.000.000 °C',
      desc: 'Lapisan atmosfer terluar Matahari yang menyerupai mahkota perak bercahaya lembut, tampak jelas memukau saat terjadi Gerhana Matahari Total.',
    },
  };

  return (
    <div className="bg-slate-900/60 p-4 rounded-xl border border-amber-500/30">
      <h5 className="text-sm font-bold text-amber-300 mb-2 flex items-center gap-1.5">
        <span>☀️</span> Lapisan Penghasil Panas Matahari:
      </h5>

      <div className="flex gap-2 mb-3">
        {(['inti', 'fotosfer', 'korona'] as const).map((layer) => (
          <button
            key={layer}
            onClick={() => {
              soundManager.playClick();
              setActiveLayer(layer);
              if (onInteract) onInteract();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
              activeLayer === layer
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {layer}
          </button>
        ))}
      </div>

      <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-xs text-amber-100">
        <div className="flex items-center justify-between mb-1.5">
          <strong className="text-amber-300">{layers[activeLayer].name}</strong>
          <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[11px] font-mono-space">
            Suhu: {layers[activeLayer].temp}
          </span>
        </div>
        <p className="leading-relaxed">{layers[activeLayer].desc}</p>
      </div>
    </div>
  );
};

/**
 * Activity for Subbab 3: Perbandingan Planet Dalam vs Luar
 */
export const InnerOuterCompareActivity: React.FC<ActivityProps> = ({ onInteract }) => {
  const [activeGroup, setActiveGroup] = useState<'dalam' | 'luar'>('dalam');

  return (
    <div className="bg-slate-900/60 p-4 rounded-xl border border-cyan-500/30">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h5 className="text-sm font-bold text-cyan-300 flex items-center gap-1.5">
          <span>🔍</span> Analisis Perbedaan Planet Dalam dan Luar
        </h5>
        <div className="flex bg-slate-800 p-0.5 rounded-lg">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveGroup('dalam');
              if (onInteract) onInteract();
            }}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              activeGroup === 'dalam' ? 'bg-cyan-600 text-white' : 'text-slate-400'
            }`}
          >
            Planet Dalam
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveGroup('luar');
              if (onInteract) onInteract();
            }}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              activeGroup === 'luar' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Planet Luar
          </button>
        </div>
      </div>

      {activeGroup === 'dalam' ? (
        <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-xs space-y-2 text-cyan-100">
          <div className="font-bold text-cyan-300">
            Anggota: Merkurius, Venus, Bumi, Mars (4 Planet)
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            <li><strong>Letak:</strong> Berada di sebelah dalam batas Sabuk Asteroid (dekat Matahari).</li>
            <li><strong>Permukaan:</strong> Padat berbatu keras (Terestrial / Kebumian).</li>
            <li><strong>Ukuran:</strong> Relatif kecil jika dibandingkan planet luar.</li>
            <li><strong>Cincin:</strong> Tidak memiliki cincin sama sekali.</li>
            <li><strong>Satelit Alami:</strong> Sangat sedikit (Merkurius & Venus: 0, Bumi: 1, Mars: 2).</li>
          </ul>
        </div>
      ) : (
        <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-xs space-y-2 text-indigo-100">
          <div className="font-bold text-indigo-300">
            Anggota: Jupiter, Saturnus, Uranus, Neptunus (4 Planet)
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            <li><strong>Letak:</strong> Berada di sebelah luar batas Sabuk Asteroid (jauh dari Matahari).</li>
            <li><strong>Penyusun:</strong> Gas raksasa (Jupiter & Saturnus) dan Es raksasa (Uranus & Neptunus).</li>
            <li><strong>Ukuran:</strong> Sangat besar (Raksasa / Jovian).</li>
            <li><strong>Cincin:</strong> Seluruh planet luar memiliki sistem cincin (terutama Saturnus yang sangat menonjol).</li>
            <li><strong>Satelit Alami:</strong> Sangat banyak (Jupiter 95 satelit, Saturnus 146 satelit).</li>
          </ul>
        </div>
      )}
    </div>
  );
};

/**
 * Activity for Subbab 6: Game Mini Klasifikasi Benda Langit
 */
export const ClassifyCelestialActivity: React.FC<ActivityProps> = ({ onInteract }) => {
  const items = [
    { name: 'Komet Halley', correct: 'komet', hint: 'Bola salju beku berekor bercahaya saat dekat Matahari' },
    { name: 'Pluto & Ceres', correct: 'kerdil', hint: 'Benda bulat belum membersihkan orbit' },
    { name: 'Bulan & Ganymede', correct: 'satelit', hint: 'Benda langit yang mengitari suatu planet' },
    { name: 'Sabuk antara Mars-Jupiter', correct: 'asteroid', hint: 'Pecahan batuan luar angkasa raksasa' },
  ];

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (idx: number, type: string) => {
    if (isSubmitted) return;
    soundManager.playClick();
    setAnswers((prev) => ({ ...prev, [idx]: type }));
    if (onInteract) onInteract();
  };

  const handleCheck = () => {
    soundManager.playSuccess();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    soundManager.playClick();
    setAnswers({});
    setIsSubmitted(false);
  };

  return (
    <div className="bg-slate-900/60 p-4 rounded-xl border border-rose-500/30">
      <div className="flex items-center justify-between mb-3">
        <h5 className="text-sm font-bold text-rose-300 flex items-center gap-1.5">
          <span>☄️</span> Mini Kuis: Klasifikasikan Benda Langit Berikut
        </h5>
        <button
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      <div className="space-y-2.5 mb-4">
        {items.map((item, idx) => {
          const selected = answers[idx];
          const isCorrect = isSubmitted && selected === item.correct;

          return (
            <div
              key={idx}
              className={`p-2.5 rounded-lg border text-xs flex flex-wrap items-center justify-between gap-2 ${
                isSubmitted
                  ? isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                  : 'bg-slate-800/80 border-slate-700 text-slate-200'
              }`}
            >
              <div>
                <strong>{item.name}</strong>
                <span className="text-[10px] text-slate-400 block">{item.hint}</span>
              </div>

              <div className="flex gap-1.5">
                {[
                  { id: 'satelit', label: 'Satelit' },
                  { id: 'kerdil', label: 'Planet Kerdil' },
                  { id: 'asteroid', label: 'Asteroid' },
                  { id: 'komet', label: 'Komet' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSelect(idx, cat.id)}
                    disabled={isSubmitted}
                    className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                      selected === cat.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-700/80 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {!isSubmitted ? (
        <button
          onClick={handleCheck}
          disabled={Object.keys(answers).length < items.length}
          className="w-full py-2 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-bold rounded-lg transition-all"
        >
          Periksa Pengelompokan
        </button>
      ) : (
        <div className="p-2.5 bg-slate-800 rounded-lg text-center text-xs text-amber-300 font-bold">
          ✓ Pembelajaran Berhasil! Kamu sekarang dapat membedakan aneka ragam pengembara antariksa.
        </div>
      )}
    </div>
  );
};
