/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * LocalStorage state and progress tracking for Ekspedisi Antariksa MPI
 */

import { UserProgressData } from './rules.ts';

const STORAGE_KEY = 'ekspedisi_antariksa_progress_v1';
const TEACHER_AVATAR_KEY = 'ekspedisi_teacher_avatar_v1';

export interface AppProgressState extends UserProgressData {
  studentName: string;
  totalPoints: number;
  gameHighScores: Record<string, number>;
  quizAnswers: Record<number, string>;
  quizFinishedDate?: string;
}

const defaultState: AppProgressState = {
  studentName: 'Siswa Penjelajah',
  completedLessons: [],
  exploredSimulations: [],
  quizCompleted: false,
  quizScore: 0,
  completedGames: [],
  totalPoints: 0,
  gameHighScores: {},
  quizAnswers: {},
};

export function loadProgress(): AppProgressState {
  if (typeof window === 'undefined') return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

export function saveProgress(state: Partial<AppProgressState>): AppProgressState {
  const current = loadProgress();
  const updated: AppProgressState = { ...current, ...state };
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage quota or private mode fallback
    }
  }
  return updated;
}

export function markLessonCompleted(lessonId: string): AppProgressState {
  const current = loadProgress();
  if (!current.completedLessons.includes(lessonId)) {
    const updatedLessons = [...current.completedLessons, lessonId];
    return saveProgress({
      completedLessons: updatedLessons,
      totalPoints: current.totalPoints + 20, // 20 points per lesson
    });
  }
  return current;
}

export function markSimulationExplored(simId: string): AppProgressState {
  const current = loadProgress();
  if (!current.exploredSimulations.includes(simId)) {
    const updated = [...current.exploredSimulations, simId];
    return saveProgress({
      exploredSimulations: updated,
      totalPoints: current.totalPoints + 25, // 25 points per virtual lab simulation
    });
  }
  return current;
}

export function recordQuizCompletion(score: number, answers: Record<number, string>): AppProgressState {
  const current = loadProgress();
  return saveProgress({
    quizCompleted: true,
    quizScore: score,
    quizAnswers: answers,
    totalPoints: current.totalPoints + score,
    quizFinishedDate: new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  });
}

export function recordGameCompletion(gameId: string, pointsEarned: number): AppProgressState {
  const current = loadProgress();
  const completedGames = current.completedGames.includes(gameId)
    ? current.completedGames
    : [...current.completedGames, gameId];

  const currentHigh = current.gameHighScores[gameId] || 0;
  const newHigh = Math.max(currentHigh, pointsEarned);

  return saveProgress({
    completedGames,
    gameHighScores: {
      ...current.gameHighScores,
      [gameId]: newHigh,
    },
    totalPoints: current.totalPoints + Math.max(0, pointsEarned - currentHigh),
  });
}

export function resetAllProgress(): AppProgressState {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return defaultState;
}

export function loadTeacherAvatar(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TEACHER_AVATAR_KEY);
}

export function saveTeacherAvatar(dataUrl: string): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(TEACHER_AVATAR_KEY, dataUrl);
    } catch {
      // safe catch
    }
  }
}
