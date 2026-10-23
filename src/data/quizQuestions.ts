/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 10 Official Multiple Choice Practice Questions for IPAS Kelas VI SD - Tata Surya
 */

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctKey: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Benda langit yang menjadi pusat tata surya adalah ...',
    options: [
      { key: 'A', text: 'Bumi' },
      { key: 'B', text: 'Bulan' },
      { key: 'C', text: 'Matahari' },
      { key: 'D', text: 'Jupiter' },
    ],
    correctKey: 'C',
    explanation:
      'Matahari adalah bintang raksasa bercahaya sendiri yang berada di pusat sistem tata surya kita. Gravitasi Matahari yang sangat besar mengikat seluruh planet, asteroid, dan komet agar tetap mengorbit mengitarinya.',
  },
  {
    id: 2,
    question: 'Planet yang paling dekat dengan Matahari adalah ...',
    options: [
      { key: 'A', text: 'Venus' },
      { key: 'B', text: 'Merkurius' },
      { key: 'C', text: 'Mars' },
      { key: 'D', text: 'Bumi' },
    ],
    correctKey: 'B',
    explanation:
      'Merkurius merupakan planet urutan pertama dalam tata surya dengan jarak rata-rata sekitar 57,9 juta kilometer dari Matahari, menjadikannya planet yang letaknya paling dekat dengan sang surya.',
  },
  {
    id: 3,
    question: 'Planet terbesar dalam tata surya adalah ...',
    options: [
      { key: 'A', text: 'Saturnus' },
      { key: 'B', text: 'Neptunus' },
      { key: 'C', text: 'Bumi' },
      { key: 'D', text: 'Jupiter' },
    ],
    correctKey: 'D',
    explanation:
      'Jupiter adalah planet terbesar di seluruh tata surya. Diameternya mencapai 139.820 km dan volumenya sangat besar sehingga mampu memuat lebih dari 1.300 planet sebesar Bumi di dalamnya.',
  },
  {
    id: 4,
    question: 'Planet yang dikenal sebagai planet merah adalah ...',
    options: [
      { key: 'A', text: 'Mars' },
      { key: 'B', text: 'Venus' },
      { key: 'C', text: 'Uranus' },
      { key: 'D', text: 'Merkurius' },
    ],
    correctKey: 'A',
    explanation:
      'Mars dijuluki "Planet Merah" karena permukaannya banyak diselimuti debu dan bebatuan yang mengandung besi oksida (karat besi), sehingga tampak berwarna merah kemerahan dari kejauhan.',
  },
  {
    id: 5,
    question: 'Planet yang memiliki sistem cincin sangat menonjol adalah ...',
    options: [
      { key: 'A', text: 'Bumi' },
      { key: 'B', text: 'Saturnus' },
      { key: 'C', text: 'Mars' },
      { key: 'D', text: 'Merkurius' },
    ],
    correctKey: 'B',
    explanation:
      'Saturnus terkenal dengan sistem cincinnya yang sangat indah, megah, dan menonjol. Cincin tersebut tersusun atas miliaran bongkahan es, debu, dan partikel batuan kosmik.',
  },
  {
    id: 6,
    question: 'Gerak Bumi berputar pada sumbunya disebut ...',
    options: [
      { key: 'A', text: 'Revolusi' },
      { key: 'B', text: 'Rotasi' },
      { key: 'C', text: 'Orbit' },
      { key: 'D', text: 'Gravitasi' },
    ],
    correctKey: 'B',
    explanation:
      'Gerak perputaran planet (termasuk Bumi) pada poros atau sumbunya sendiri disebut Rotasi. Bumi memerlukan waktu sekitar 24 jam untuk melakukan satu kali rotasi penuh.',
  },
  {
    id: 7,
    question: 'Pergantian siang dan malam di Bumi terutama disebabkan oleh ...',
    options: [
      { key: 'A', text: 'Rotasi Bumi' },
      { key: 'B', text: 'Revolusi Bulan' },
      { key: 'C', text: 'Gerak Matahari mengelilingi Bumi' },
      { key: 'D', text: 'Perubahan ukuran Matahari' },
    ],
    correctKey: 'A',
    explanation:
      'Rotasi Bumi menyebabkan bagian permukaan Bumi secara bergantian menghadap ke arah Matahari (mengalami siang yang terang) dan membelakangi Matahari (mengalami malam yang gelap).',
  },
  {
    id: 8,
    question: 'Planet yang berada di antara Venus dan Mars adalah ...',
    options: [
      { key: 'A', text: 'Merkurius' },
      { key: 'B', text: 'Jupiter' },
      { key: 'C', text: 'Bumi' },
      { key: 'D', text: 'Saturnus' },
    ],
    correctKey: 'C',
    explanation:
      'Urutan planet dari Matahari adalah Merkurius (1), Venus (2), Bumi (3), dan Mars (4). Dengan demikian, planet yang terletak persis di antara Venus dan Mars adalah Bumi tercinta.',
  },
  {
    id: 9,
    question: 'Gerhana Matahari terjadi ketika ...',
    options: [
      { key: 'A', text: 'Bumi berada di antara Matahari dan Bulan' },
      { key: 'B', text: 'Bulan berada di antara Matahari dan Bumi' },
      { key: 'C', text: 'Matahari berada di antara Bumi dan Bulan' },
      { key: 'D', text: 'Mars berada di antara Bumi dan Matahari' },
    ],
    correctKey: 'B',
    explanation:
      'Gerhana Matahari terjadi saat posisi Bulan berada di tengah-tengah antara Matahari dan Bumi pada satu garis lurus. Bayangan Bulan menutupi permukaan Bumi sehingga cahaya Matahari terhalang.',
  },
  {
    id: 10,
    question: 'Planet kedelapan dan terjauh dari Matahari adalah ...',
    options: [
      { key: 'A', text: 'Uranus' },
      { key: 'B', text: 'Saturnus' },
      { key: 'C', text: 'Jupiter' },
      { key: 'D', text: 'Neptunus' },
    ],
    correctKey: 'D',
    explanation:
      'Neptunus adalah planet urutan kedelapan sekaligus planet yang jaraknya paling jauh dari Matahari (sekitar 4,5 miliar km). Neptunus juga dikenal memiliki angin badai tercepat di tata surya.',
  },
];
