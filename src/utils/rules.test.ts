/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateQuizScore,
  checkShortAnswer,
  checkComplexAnswer,
  verifyPlanetOrder,
  determineEarnedBadges,
  CORRECT_PLANET_ORDER,
} from './rules.ts';

test('calculateQuizScore computes accurate 0-100 scores', () => {
  assert.equal(calculateQuizScore(10, 10), 100);
  assert.equal(calculateQuizScore(7, 10), 70);
  assert.equal(calculateQuizScore(0, 10), 0);
  assert.equal(calculateQuizScore(12, 10), 100); // clamped
  assert.equal(calculateQuizScore(-2, 10), 0); // clamped
});

test('checkShortAnswer matches case-insensitively with space trim', () => {
  const matahariAnswers = ['Matahari', 'matahari', 'sang surya', 'the sun'];
  assert.equal(checkShortAnswer('  Matahari  ', matahariAnswers), true);
  assert.equal(checkShortAnswer('MATAHARI', matahariAnswers), true);
  assert.equal(checkShortAnswer('matahari.', matahariAnswers), true);
  assert.equal(checkShortAnswer('Bulan', matahariAnswers), false);

  const rotasiAnswers = ['Rotasi', 'rotasi bumi', 'gerak rotasi'];
  assert.equal(checkShortAnswer('rotasi', rotasiAnswers), true);
  assert.equal(checkShortAnswer('revolusi', rotasiAnswers), false);
});

test('checkComplexAnswer verifies exact set of choices', () => {
  const correct = ['opt1', 'opt3'];
  assert.equal(checkComplexAnswer(['opt1', 'opt3'], correct), true);
  assert.equal(checkComplexAnswer(['opt3', 'opt1'], correct), true);
  assert.equal(checkComplexAnswer(['opt1'], correct), false);
  assert.equal(checkComplexAnswer(['opt1', 'opt2', 'opt3'], correct), false);
});

test('verifyPlanetOrder checks accurate 8-planet order from Sun', () => {
  const fullCorrect = [...CORRECT_PLANET_ORDER];
  const result = verifyPlanetOrder(fullCorrect);
  assert.equal(result.isAllCorrect, true);
  assert.equal(result.correctPositionsCount, 8);

  const swapped = ['venus', 'merkurius', 'bumi', 'mars', 'jupiter', 'saturnus', 'uranus', 'neptunus'];
  const swappedResult = verifyPlanetOrder(swapped);
  assert.equal(swappedResult.isAllCorrect, false);
  assert.equal(swappedResult.correctPositionsCount, 6);
});

test('determineEarnedBadges accurately computes unlocked achievements', () => {
  const initial = determineEarnedBadges({
    completedLessons: [],
    exploredSimulations: [],
    quizCompleted: false,
    quizScore: 0,
    completedGames: [],
  });
  assert.equal(initial[0].unlocked, false);
  assert.equal(initial[1].unlocked, false);
  assert.equal(initial[2].unlocked, false);

  const master = determineEarnedBadges({
    completedLessons: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'],
    exploredSimulations: ['orbit', 'daynight', 'eclipse'],
    quizCompleted: true,
    quizScore: 90,
    completedGames: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'],
  });
  assert.equal(master[0].unlocked, true);
  assert.equal(master[1].unlocked, true);
  assert.equal(master[2].unlocked, true);
});
