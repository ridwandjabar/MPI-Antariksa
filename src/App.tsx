/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * EKSPEDISI ANTARIKSA — MENJELAJAHI TATA SURYA
 * Multimedia Pembelajaran Interaktif (MPI) IPAS Kelas VI SD
 * Pengembang: Ridwan Djabar (SMAN 8 Gorontalo)
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar.tsx';
import { TitleScreen } from './components/views/TitleScreen.tsx';
import { MainMenuView } from './components/views/MainMenuView.tsx';
import { MateriView } from './components/views/MateriView.tsx';
import { SimulasiView } from './components/views/SimulasiView.tsx';
import { LatihanSoalView } from './components/views/LatihanSoalView.tsx';
import { GameEdukasiView } from './components/views/GameEdukasiView.tsx';
import { PengembangView } from './components/views/PengembangView.tsx';
import { ReferensiView } from './components/views/ReferensiView.tsx';
import { PetunjukModal } from './components/modals/PetunjukModal.tsx';
import { TentangModal } from './components/modals/TentangModal.tsx';
import { BadgesModal } from './components/modals/BadgesModal.tsx';
import {
  loadProgress,
  markLessonCompleted,
  markSimulationExplored,
  recordQuizCompletion,
  recordGameCompletion,
  resetAllProgress,
  AppProgressState,
} from './utils/storage.ts';

type ActiveView =
  | 'title'
  | 'menu'
  | 'materi'
  | 'simulasi'
  | 'latihan'
  | 'game'
  | 'pengembang'
  | 'referensi';

export default function App() {
  const [currentView, setCurrentView] = useState<ActiveView>('title');
  const [progress, setProgress] = useState<AppProgressState>(loadProgress);

  // Modals state
  const [isPetunjukOpen, setIsPetunjukOpen] = useState(false);
  const [isTentangOpen, setIsTentangOpen] = useState(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);

  // Check URL query parameters for ?autostart=1
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        setCurrentView('menu');
      }
    }
  }, []);

  // Update lesson completion
  const handleCompleteLesson = (lessonId: string) => {
    const updated = markLessonCompleted(lessonId);
    setProgress(updated);
  };

  // Update simulation exploration
  const handleExploreSimulation = (simId: string) => {
    const updated = markSimulationExplored(simId);
    setProgress(updated);
  };

  // Update quiz completion
  const handleCompleteQuiz = (score: number, answers: Record<number, string>) => {
    const updated = recordQuizCompletion(score, answers);
    setProgress(updated);
  };

  // Update game completion
  const handleCompleteGame = (gameId: string, score: number) => {
    const updated = recordGameCompletion(gameId, score);
    setProgress(updated);
  };

  // Reset all progress
  const handleResetProgress = () => {
    const fresh = resetAllProgress();
    setProgress(fresh);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Background Starry Atmosphere */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/30 via-slate-950 to-black pointer-events-none z-0" />

      {/* Universal Header Navbar */}
      <div className="relative z-20">
        <Navbar
          currentView={currentView}
          totalPoints={progress.totalPoints}
          completedLessonsCount={progress.completedLessons.length}
          completedGamesCount={progress.completedGames.length}
          onGoHome={() => setCurrentView('menu')}
          onOpenPetunjuk={() => setIsPetunjukOpen(true)}
          onOpenBadges={() => setIsBadgesOpen(true)}
        />
      </div>

      {/* Main View Area */}
      <main className="relative z-10 flex-1 px-3 sm:px-6 py-4 sm:py-6">
        {currentView === 'title' && (
          <TitleScreen
            onStartAdventure={() => setCurrentView('menu')}
            onOpenPetunjuk={() => setIsPetunjukOpen(true)}
            onOpenTentang={() => setIsTentangOpen(true)}
          />
        )}

        {currentView === 'menu' && (
          <MainMenuView
            progress={progress}
            totalPoints={progress.totalPoints}
            onNavigate={(view) => setCurrentView(view)}
            onOpenBadges={() => setIsBadgesOpen(true)}
          />
        )}

        {currentView === 'materi' && (
          <MateriView
            completedLessons={progress.completedLessons}
            onCompleteLesson={handleCompleteLesson}
            onBackToMenu={() => setCurrentView('menu')}
          />
        )}

        {currentView === 'simulasi' && (
          <SimulasiView
            exploredSimulations={progress.exploredSimulations}
            onExploreSimulation={handleExploreSimulation}
            onBackToMenu={() => setCurrentView('menu')}
          />
        )}

        {currentView === 'latihan' && (
          <LatihanSoalView
            onCompleteQuiz={handleCompleteQuiz}
            onBackToMenu={() => setCurrentView('menu')}
          />
        )}

        {currentView === 'game' && (
          <GameEdukasiView
            completedGames={progress.completedGames}
            gameHighScores={progress.gameHighScores}
            onCompleteGame={handleCompleteGame}
            onBackToMenu={() => setCurrentView('menu')}
          />
        )}

        {currentView === 'pengembang' && (
          <PengembangView onBackToMenu={() => setCurrentView('menu')} />
        )}

        {currentView === 'referensi' && (
          <ReferensiView onBackToMenu={() => setCurrentView('menu')} />
        )}
      </main>

      {/* Modals */}
      <PetunjukModal
        isOpen={isPetunjukOpen}
        onClose={() => setIsPetunjukOpen(false)}
      />

      <TentangModal
        isOpen={isTentangOpen}
        onClose={() => setIsTentangOpen(false)}
      />

      <BadgesModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
        progress={progress}
        totalPoints={progress.totalPoints}
        onResetProgress={handleResetProgress}
      />
    </div>
  );
}
