/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Logic calculations and validation rules for Ekspedisi Antariksa MPI
 */

/**
 * Calculates quiz score based on correct answers count.
 * Total questions: 10, each worth 10 points. Maximum: 100.
 */
export function calculateQuizScore(correctCount: number, totalQuestions: number = 10): number {
  if (totalQuestions <= 0) return 0;
  const clamped = Math.max(0, Math.min(correctCount, totalQuestions));
  return Math.round((clamped / totalQuestions) * 100);
}

/**
 * Validates short answer inputs with case-insensitivity, extra spaces stripped,
 * and accepted alternative spellings in Indonesian.
 */
export function checkShortAnswer(input: string, acceptedAnswers: string[]): boolean {
  if (!input) return false;
  const cleanInput = input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');

  return acceptedAnswers.some((ans) => {
    const cleanAns = ans
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
    return cleanInput === cleanAns;
  });
}

/**
 * Checks complex multiple choice answer:
 * User selections must exactly match the set of correct option IDs.
 */
export function checkComplexAnswer(selectedIds: string[], correctIds: string[]): boolean {
  if (selectedIds.length !== correctIds.length) return false;
  const sortedSelected = [...selectedIds].sort();
  const sortedCorrect = [...correctIds].sort();
  return sortedSelected.every((id, idx) => id === sortedCorrect[idx]);
}

/**
 * Verifies if user-ordered planet IDs match correct sequence from Sun (1 to 8):
 * 1. Merkurius, 2. Venus, 3. Bumi, 4. Mars, 5. Jupiter, 6. Saturnus, 7. Uranus, 8. Neptunus
 */
export const CORRECT_PLANET_ORDER = [
  'merkurius',
  'venus',
  'bumi',
  'mars',
  'jupiter',
  'saturnus',
  'uranus',
  'neptunus',
];

export function verifyPlanetOrder(order: string[]): {
  isAllCorrect: boolean;
  correctPositionsCount: number;
} {
  let correctPositionsCount = 0;
  for (let i = 0; i < CORRECT_PLANET_ORDER.length; i++) {
    if (order[i] && order[i].toLowerCase() === CORRECT_PLANET_ORDER[i]) {
      correctPositionsCount++;
    }
  }
  return {
    isAllCorrect: correctPositionsCount === CORRECT_PLANET_ORDER.length,
    correctPositionsCount,
  };
}

/**
 * Determines earned badges based on user activities:
 * - Penjelajah Pemula: visited at least 1 lesson
 * - Penjelajah Ahli: finished all 6 lessons and tested all 3 simulations
 * - Ahli Tata Surya: quiz score >= 80 and played all 6 games
 */
export interface UserProgressData {
  completedLessons: string[];
  exploredSimulations: string[];
  quizCompleted: boolean;
  quizScore: number;
  completedGames: string[];
}

export function determineEarnedBadges(progress: UserProgressData): {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
}[] {
  const pemulaUnlocked = progress.completedLessons.length >= 1;
  const ahliUnlocked =
    progress.completedLessons.length >= 6 &&
    progress.exploredSimulations.length >= 3;
  const pakarUnlocked =
    progress.quizCompleted &&
    progress.quizScore >= 80 &&
    progress.completedGames.length >= 6;

  return [
    {
      id: 'pemula',
      name: 'Penjelajah Pemula',
      description: 'Memulai petualangan dan menyelesaikan materi pengenalan.',
      unlocked: pemulaUnlocked,
      icon: '🚀',
    },
    {
      id: 'ahli',
      name: 'Penjelajah Ahli',
      description: 'Menyelesaikan seluruh 6 materi dan mengeksplorasi virtual lab antariksa.',
      unlocked: ahliUnlocked,
      icon: '🪐',
    },
    {
      id: 'pakar',
      name: 'Ahli Tata Surya',
      description: 'Meraih skor latihan soal minimal 80 dan menuntaskan 6 game edukasi antariksa.',
      unlocked: pakarUnlocked,
      icon: '👑',
    },
  ];
}
