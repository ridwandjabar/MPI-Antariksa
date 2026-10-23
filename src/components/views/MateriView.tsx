/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Materi Pembelajaran Interaktif (MPI) View - 6 Subbab
 */

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Video,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Check,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { MATERI_LIST, MateriSubbab } from '../../data/materi.ts';
import { soundManager, SpeechNarrator } from '../../utils/audioSystem.ts';
import { PlanetCardViewer } from '../materi/PlanetCardViewer.tsx';
import {
  IdentifyMembersActivity,
  SunEnergyActivity,
  InnerOuterCompareActivity,
  ClassifyCelestialActivity,
} from '../materi/MateriActivities.tsx';
import { DayNightSimulator } from '../simulasi/DayNightSimulator.tsx';
import { EclipseSimulator } from '../simulasi/EclipseSimulator.tsx';
import { OrbitSimulator } from '../simulasi/OrbitSimulator.tsx';

interface MateriViewProps {
  completedLessons: string[];
  onCompleteLesson: (lessonId: string) => void;
  onBackToMenu: () => void;
}

type TabType = 'teks' | 'audio' | 'animasi' | 'simulasi' | 'video';

export const MateriView: React.FC<MateriViewProps> = ({
  completedLessons,
  onCompleteLesson,
  onBackToMenu,
}) => {
  const [selectedSubbabIndex, setSelectedSubbabIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>('teks');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [quickCheckAnswer, setQuickCheckAnswer] = useState<number | null>(null);
  const [isQuickCheckAnswered, setIsQuickCheckAnswered] = useState(false);

  // Custom teacher video link option
  const [customVideoUrl, setCustomVideoUrl] = useState<string>('');
  const [isEditingVideo, setIsEditingVideo] = useState(false);

  const currentMateri = MATERI_LIST[selectedSubbabIndex];
  const isLessonCompleted = completedLessons.includes(currentMateri.id);

  // Stop TTS when switching subbabs or unmounting
  useEffect(() => {
    SpeechNarrator.stop();
    setIsSpeaking(false);
    setQuickCheckAnswer(null);
    setIsQuickCheckAnswered(false);
    setActiveTab('teks');
  }, [selectedSubbabIndex]);

  const handleSubbabChange = (idx: number) => {
    soundManager.playClick();
    setSelectedSubbabIndex(idx);
  };

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      SpeechNarrator.stop();
      setIsSpeaking(false);
    } else {
      soundManager.playClick();
      setIsSpeaking(true);
      SpeechNarrator.speak(
        `${currentMateri.title}. ${currentMateri.narrationFullText}`,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    }
  };

  const handleQuickCheck = (optIdx: number) => {
    if (isQuickCheckAnswered) return;
    soundManager.playClick();
    setQuickCheckAnswer(optIdx);
    setIsQuickCheckAnswered(true);

    if (optIdx === currentMateri.quickCheck.correctIndex) {
      soundManager.playSuccess();
      onCompleteLesson(currentMateri.id);
    } else {
      soundManager.playError();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Subbab Tabs Horizontal Selector */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-2 md:p-3 backdrop-blur-md">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {MATERI_LIST.map((materi, idx) => {
            const isSelected = idx === selectedSubbabIndex;
            const isDone = completedLessons.includes(materi.id);

            return (
              <button
                key={materi.id}
                onClick={() => handleSubbabChange(idx)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/20'
                    : isDone
                    ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 hover:bg-slate-800'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60 border border-slate-700/60'
                }`}
              >
                <span>{materi.icon}</span>
                <span>{materi.title}</span>
                {isDone && (
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Lesson Content Card */}
      <div className="bg-slate-900/85 border border-indigo-500/30 rounded-3xl p-5 md:p-8 backdrop-blur-md shadow-2xl space-y-6">
        {/* Lesson Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold">
                {currentMateri.badge}
              </span>
              {isLessonCompleted && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Selesai Dipelajari
                </span>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {currentMateri.title}
            </h2>
            <p className="text-sm text-cyan-300 mt-1">{currentMateri.subtitle}</p>
          </div>

          {/* Audio Narration Quick Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSpeech}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold shadow-lg transition-all ${
                isSpeaking
                  ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? 'Hentikan Narasi' : 'Putar Narasi Suara (ID)'}</span>
            </button>
          </div>
        </div>

        {/* 5-Tab Multimedia Navigation: TEKS | AUDIO | ANIMASI | SIMULASI | VIDEO */}
        <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
          {[
            { id: 'teks', label: 'Teks Materi', icon: BookOpen },
            { id: 'audio', label: 'Audio Narasi', icon: Volume2 },
            { id: 'animasi', label: 'Animasi Visual', icon: Sparkles },
            { id: 'simulasi', label: 'Simulasi Interaktif', icon: Layers },
            { id: 'video', label: 'Video Edukasi', icon: Video },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(tab.id as TabType);
                }}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/70 hover:bg-slate-700/70 text-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: TEKS MATERI */}
        {activeTab === 'teks' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Summary Box */}
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-100 text-sm leading-relaxed">
              <strong className="text-indigo-300 block mb-1">📌 Ringkasan Konsep:</strong>
              {currentMateri.summary}
            </div>

            {/* Sections */}
            {currentMateri.textSections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-3">
                <h3 className="text-xl font-bold text-amber-300 flex items-center gap-2">
                  <span>✨</span> {sec.heading}
                </h3>
                <div className="space-y-2 text-slate-200 leading-relaxed text-sm md:text-base">
                  {sec.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {sec.callout && (
                  <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs md:text-sm leading-relaxed">
                    {sec.callout}
                  </div>
                )}
              </div>
            ))}

            {/* Embedded Specific Mini-Activity for this module */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              {currentMateri.id === 'materi-1' && (
                <IdentifyMembersActivity onInteract={() => onCompleteLesson(currentMateri.id)} />
              )}
              {currentMateri.id === 'materi-2' && (
                <SunEnergyActivity onInteract={() => onCompleteLesson(currentMateri.id)} />
              )}
              {currentMateri.id === 'materi-3' && (
                <div className="space-y-4">
                  <InnerOuterCompareActivity onInteract={() => onCompleteLesson(currentMateri.id)} />
                  <PlanetCardViewer />
                </div>
              )}
              {currentMateri.id === 'materi-4' && (
                <DayNightSimulator onInteract={() => onCompleteLesson(currentMateri.id)} />
              )}
              {currentMateri.id === 'materi-5' && (
                <EclipseSimulator onInteract={() => onCompleteLesson(currentMateri.id)} />
              )}
              {currentMateri.id === 'materi-6' && (
                <ClassifyCelestialActivity onInteract={() => onCompleteLesson(currentMateri.id)} />
              )}
            </div>
          </div>
        )}

        {/* Tab 2: AUDIO NARASI */}
        {activeTab === 'audio' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Volume2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Narasi Suara Bahasa Indonesia</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Dengarkan penjelasan lengkap materi ini yang dinarasikan secara santai, ramah, dan komunikatif untuk peserta didik kelas VI SD.
              </p>

              {/* Player Controls */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleToggleSpeech}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-xl transition-all ${
                    isSpeaking
                      ? 'bg-rose-600 hover:bg-rose-500 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {isSpeaking ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span>{isSpeaking ? 'Jeda Narasi' : 'Mulai Putar Narasi'}</span>
                </button>
              </div>

              {/* Audio Wave Visualizer Simulation */}
              {isSpeaking && (
                <div className="flex items-center justify-center gap-1 h-8 pt-2">
                  {[24, 40, 16, 56, 32, 48, 20, 60, 28, 44].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-cyan-400 rounded-full animate-pulse"
                      style={{
                        height: `${h}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Transcript text */}
            <div className="p-4 bg-slate-800/70 rounded-2xl border border-slate-700">
              <span className="text-xs font-bold text-amber-400 block mb-2">
                📜 Teks Transkrip Narasi:
              </span>
              <p className="text-sm text-slate-200 leading-relaxed italic">
                &ldquo;{currentMateri.narrationFullText}&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: ANIMASI VISUAL */}
        {activeTab === 'animasi' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {currentMateri.id === 'materi-1' && <OrbitSimulator />}
            {currentMateri.id === 'materi-2' && (
              <div className="p-8 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center">
                <div className="relative w-64 h-64 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-orange-500 shadow-[0_0_80px_rgba(245,158,11,0.6)] flex items-center justify-center animate-pulse-glow">
                  <div className="text-center">
                    <span className="text-6xl">☀️</span>
                    <span className="block text-xs font-bold text-slate-950 mt-2">
                      Fusi Inti Hidrogen ➔ Helium
                    </span>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-amber-400 mt-6">
                  Pusat Energi Tata Surya
                </h4>
                <p className="text-xs text-slate-300 max-w-lg mt-2">
                  Permukaan Matahari terus bergolak menghasilkan lidah api (prominensa) dan semburan badai matahari yang memancar ke ruang angkasa.
                </p>
              </div>
            )}
            {currentMateri.id === 'materi-3' && <PlanetCardViewer />}
            {currentMateri.id === 'materi-4' && <DayNightSimulator />}
            {currentMateri.id === 'materi-5' && <EclipseSimulator />}
            {currentMateri.id === 'materi-6' && (
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-4">
                <div className="flex items-center justify-center gap-6 text-4xl">
                  <span className="animate-bounce">☄️</span>
                  <span className="animate-pulse">🪐</span>
                  <span className="animate-spin" style={{ animationDuration: '15s' }}>
                    🪨
                  </span>
                </div>
                <h4 className="text-lg font-bold text-cyan-300">
                  Pengembara Luar Angkasa
                </h4>
                <p className="text-xs text-slate-300 max-w-lg mx-auto">
                  Komet meluncur dengan ekor gas bercahaya megah yang selalu menjauhi Matahari akibat hembusan angin surya.
                </p>
                <ClassifyCelestialActivity onInteract={() => onCompleteLesson(currentMateri.id)} />
              </div>
            )}
          </div>
        )}

        {/* Tab 4: SIMULASI INTERAKTIF */}
        {activeTab === 'simulasi' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {currentMateri.id === 'materi-4' ? (
              <DayNightSimulator onInteract={() => onCompleteLesson(currentMateri.id)} />
            ) : currentMateri.id === 'materi-5' ? (
              <EclipseSimulator onInteract={() => onCompleteLesson(currentMateri.id)} />
            ) : (
              <OrbitSimulator onInteract={() => onCompleteLesson(currentMateri.id)} />
            )}
          </div>
        )}

        {/* Tab 5: VIDEO EDUKASI */}
        {activeTab === 'video' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Video className="w-4 h-4 text-rose-500" />
                    <span>{currentMateri.videoResource.title}</span>
                  </h4>
                  <span className="text-xs text-slate-400">
                    Sumber Resmi: {currentMateri.videoResource.channelOrSource}
                  </span>
                </div>

                {/* Teacher Custom Slot Switcher */}
                <button
                  onClick={() => setIsEditingVideo(!isEditingVideo)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 underline"
                >
                  {isEditingVideo ? 'Tutup Pengaturan Slot' : 'Ganti Link Video (Fitur Guru)'}
                </button>
              </div>

              {isEditingVideo && (
                <div className="mb-4 p-3 bg-slate-900 rounded-xl border border-indigo-500/30 text-xs space-y-2">
                  <label className="text-slate-300 font-semibold block">
                    Masukkan URL Embed Video YouTube Milik Guru:
                  </label>
                  <input
                    type="text"
                    value={customVideoUrl}
                    onChange={(e) => setCustomVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/embed/..."
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                  <span className="text-[11px] text-slate-400 block">
                    *Kosongkan untuk menggunakan video edukasi resmi yang telah disediakan.
                  </span>
                </div>
              )}

              {/* Video Embed Frame */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                <iframe
                  src={customVideoUrl || currentMateri.videoResource.embedUrl}
                  title={currentMateri.videoResource.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {currentMateri.videoResource.description}
              </p>
            </div>
          </div>
        )}

        {/* Quick Check Quiz in every Module */}
        <div className="mt-8 p-5 bg-gradient-to-br from-indigo-950/60 to-purple-950/40 rounded-2xl border border-indigo-500/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
              <HelpCircle className="w-4 h-4" /> Kuis Cepat Pemahaman Subbab:
            </span>
            {isQuickCheckAnswered && (
              <span className="text-xs text-slate-400">
                {quickCheckAnswer === currentMateri.quickCheck.correctIndex
                  ? '✅ Jawaban Benar (+20 Poin Progres)'
                  : 'Coba evaluasi kembali ya!'}
              </span>
            )}
          </div>

          <h4 className="text-base font-bold text-white">
            {currentMateri.quickCheck.question}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {currentMateri.quickCheck.options.map((opt, optIdx) => {
              const isSelected = quickCheckAnswer === optIdx;
              const isCorrectOpt = optIdx === currentMateri.quickCheck.correctIndex;

              let btnStyle = 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200';
              if (isQuickCheckAnswered) {
                if (isCorrectOpt) {
                  btnStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-200';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/90 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleQuickCheck(optIdx)}
                  disabled={isQuickCheckAnswered}
                  className={`p-3 rounded-xl border text-left text-xs md:text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isQuickCheckAnswered && isCorrectOpt && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {isQuickCheckAnswered && (
            <div className="p-3 bg-slate-900/80 rounded-xl text-xs text-slate-300 leading-relaxed border border-slate-700 mt-2 animate-in fade-in">
              <strong className="text-amber-400 block mb-0.5">Penjelasan:</strong>
              {currentMateri.quickCheck.explanation}
            </div>
          )}
        </div>

        {/* Footer Navigation: Previous, Next Subbab & Back to Menu */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-800">
          <button
            onClick={() => {
              if (selectedSubbabIndex > 0) {
                handleSubbabChange(selectedSubbabIndex - 1);
              } else {
                onBackToMenu();
              }
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs md:text-sm font-bold border border-slate-700 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{selectedSubbabIndex > 0 ? 'Subbab Sebelumnya' : 'Kembali ke Menu'}</span>
          </button>

          <button
            onClick={() => {
              onCompleteLesson(currentMateri.id);
              if (selectedSubbabIndex < MATERI_LIST.length - 1) {
                handleSubbabChange(selectedSubbabIndex + 1);
              } else {
                onBackToMenu();
              }
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs md:text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all"
          >
            <span>
              {selectedSubbabIndex < MATERI_LIST.length - 1
                ? 'Lanjut ke Subbab Berikutnya'
                : 'Selesai Materi & Menu Utama'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
