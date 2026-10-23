/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Educational Games Dataset for Ekspedisi Antariksa
 */

// Game 1: Pilihan Ganda Cepat
export interface GameQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const GAME_1_QUESTIONS: GameQuizQuestion[] = [
  {
    id: 'g1_1',
    question: 'Bintang apakah yang paling dekat dengan planet Bumi?',
    options: ['Proxima Centauri', 'Matahari', 'Sirius', 'Polaris'],
    correctIndex: 1,
    explanation: 'Matahari adalah bintang yang paling dekat dengan Bumi kita dengan jarak sekitar 150 juta km.',
  },
  {
    id: 'g1_2',
    question: 'Waktu yang dibutuhkan Bumi untuk satu kali mengitari Matahari (revolusi) adalah ...',
    options: ['24 jam', '30 hari', '365,25 hari', '12 jam'],
    correctIndex: 2,
    explanation: 'Revolusi Bumi berlangsung selama 365,25 hari atau 1 tahun kalender.',
  },
  {
    id: 'g1_3',
    question: 'Planet yang dijuluki sebagai Bintang Fajar atau Bintang Kejora adalah ...',
    options: ['Mars', 'Venus', 'Merkurius', 'Jupiter'],
    correctIndex: 1,
    explanation: 'Venus memantulkan cahaya matahari sangat terang sehingga tampak berkilau indah menjelang fajar atau senja.',
  },
  {
    id: 'g1_4',
    question: 'Satelit alami yang setia menemani dan mengelilingi planet Bumi adalah ...',
    options: ['Titan', 'Phobos', 'Bulan', 'Europa'],
    correctIndex: 2,
    explanation: 'Bulan adalah satu-satunya satelit alami milik planet Bumi.',
  },
  {
    id: 'g1_5',
    question: 'Kumpulan bebatuan luar angkasa yang berada di antara planet Mars dan Jupiter disebut ...',
    options: ['Sabuk Asteroid', 'Awan Oort', 'Sabuk Kuiper', 'Cincin Saturnus'],
    correctIndex: 0,
    explanation: 'Sabuk Asteroid terletak di antara orbit Mars dan Jupiter, menjadi pembatas planet dalam dan luar.',
  },
];

// Game 2: Pilihan Ganda Kompleks (Multi-Select)
export interface ComplexQuizQuestion {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctIds: string[];
  explanation: string;
}

export const GAME_2_QUESTIONS: ComplexQuizQuestion[] = [
  {
    id: 'g2_1',
    question: 'Pilihlah SEMUA pernyataan yang BENAR mengenai sistem tata surya kita!',
    options: [
      { id: 'a', text: 'Jupiter adalah planet terbesar di tata surya.' },
      { id: 'b', text: 'Matahari merupakan sebuah planet kebumian.' },
      { id: 'c', text: 'Mars dikenal sebagai planet merah.' },
      { id: 'd', text: 'Bumi adalah planet yang paling dekat dari Matahari.' },
    ],
    correctIds: ['a', 'c'],
    explanation: 'Pernyataan yang benar: Jupiter adalah planet terbesar dan Mars dikenal sebagai planet merah. Matahari adalah bintang (bukan planet), dan planet terdekat adalah Merkurius (bukan Bumi).',
  },
  {
    id: 'g2_2',
    question: 'Manakah di bawah ini yang tergolong ke dalam kelompok PLANET DALAM?',
    options: [
      { id: 'a', text: 'Merkurius' },
      { id: 'b', text: 'Jupiter' },
      { id: 'c', text: 'Venus' },
      { id: 'd', text: 'Saturnus' },
    ],
    correctIds: ['a', 'c'],
    explanation: 'Planet Dalam terdiri atas empat planet berbatu: Merkurius, Venus, Bumi, dan Mars. Jupiter dan Saturnus adalah Planet Luar.',
  },
  {
    id: 'g2_3',
    question: 'Pilih peristiwa-peristiwa yang disebabkan oleh ROTASI BUMI pada porosnya:',
    options: [
      { id: 'a', text: 'Terjadinya siang dan malam' },
      { id: 'b', text: 'Gerak semu harian Matahari (terbit timur, tenggelam barat)' },
      { id: 'c', text: 'Pergantian musim di berbagai belahan bumi' },
      { id: 'd', text: 'Perbedaan zona waktu (WIB, WITA, WIT)' },
    ],
    correctIds: ['a', 'b', 'd'],
    explanation: 'Rotasi Bumi menyebabkan terjadinya siang-malam, gerak semu harian matahari, dan perbedaan waktu. Pergantian musim disebabkan oleh revolusi Bumi bersama kemiringan sumbunya.',
  },
  {
    id: 'g2_4',
    question: 'Pilih fakta yang BENAR mengenai fenomena GERHANA MATAHARI:',
    options: [
      { id: 'a', text: 'Bulan berada di antara Matahari dan Bumi' },
      { id: 'b', text: 'Terjadi pada malam hari saat bulan purnama' },
      { id: 'c', text: 'Terjadi pada siang hari saat fase bulan baru' },
      { id: 'd', text: 'Bayangan Bulan jatuh menutupi sebagian wilayah Bumi' },
    ],
    correctIds: ['a', 'c', 'd'],
    explanation: 'Gerhana Matahari terjadi di siang hari saat posisi Matahari - Bulan - Bumi sejajar. Jika terjadi di malam hari saat purnama, itu adalah Gerhana Bulan.',
  },
  {
    id: 'g2_5',
    question: 'Pilihlah benda langit yang BUKAN merupakan delapan planet utama tata surya:',
    options: [
      { id: 'a', text: 'Komet Halley' },
      { id: 'b', text: 'Planet Uranus' },
      { id: 'c', text: 'Pluto (Planet Kerdil)' },
      { id: 'd', text: 'Asteroid Ceres' },
    ],
    correctIds: ['a', 'c', 'd'],
    explanation: 'Komet Halley, Pluto (planet kerdil), dan Asteroid Ceres adalah benda langit pengembara, bukan anggota dari 8 planet utama.',
  },
];

// Game 3: Benar atau Salah (True or False)
export interface TrueFalseQuestion {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export const GAME_3_STATEMENTS: TrueFalseQuestion[] = [
  {
    id: 'g3_1',
    statement: 'Matahari adalah bintang yang mampu menghasilkan cahaya dan energi panasnya sendiri.',
    isTrue: true,
    explanation: 'BENAR! Matahari adalah bintang karena menghasilkan energi sendiri melalui reaksi fusi hidrogen di intinya.',
  },
  {
    id: 'g3_2',
    statement: 'Planet Saturnus memiliki massa jenis (kepadatan) yang lebih padat daripada batu besi Bumi.',
    isTrue: false,
    explanation: 'SALAH! Saturnus sebagian besar tersusun atas gas hidrogen dan helium yang sangat renggang, sehingga kepadatan rata-ratanya bahkan lebih ringan daripada air.',
  },
  {
    id: 'g3_3',
    statement: 'Gerhana matahari tidak terjadi setiap bulan karena bidang orbit Bulan miring sekitar 5 derajat terhadap bidang orbit Bumi.',
    isTrue: true,
    explanation: 'BENAR! Karena kemiringan orbit 5 derajat tersebut, bayangan Bulan sering kali melintas di atas atau di bawah Bumi tanpa menciptakan gerhana.',
  },
  {
    id: 'g3_4',
    statement: 'Meteorit adalah batu luar angkasa yang telah berhasil lolos melewati atmosfer dan jatuh menyentuh permukaan tanah Bumi.',
    isTrue: true,
    explanation: 'BENAR! Meteoroid yang belum terbakar habis di atmosfer dan mendarat di tanah disebut meteorit.',
  },
  {
    id: 'g3_5',
    statement: 'Revolusi Bumi pada porosnya membutuhkan waktu 24 jam.',
    isTrue: false,
    explanation: 'SALAH! Gerak Bumi pada porosnya disebut ROTASI (24 jam). Sedangkan REVOLUSI adalah gerak mengitari Matahari selama 365,25 hari.',
  },
];

// Game 4: Menjodohkan (Matching Pairs)
export interface MatchPair {
  id: string;
  planetName: string;
  characteristic: string;
  icon: string;
}

export const GAME_4_PAIRS: MatchPair[] = [
  { id: 'pair_1', planetName: 'Mars', characteristic: 'Planet merah kaya zat besi oksida', icon: '🔴' },
  { id: 'pair_2', planetName: 'Jupiter', characteristic: 'Planet terbesar dengan Bintik Merah Raksasa', icon: '🟠' },
  { id: 'pair_3', planetName: 'Saturnus', characteristic: 'Memiliki sistem cincin es spektakuler yang menonjol', icon: '🪐' },
  { id: 'pair_4', planetName: 'Bumi', characteristic: 'Planet tempat kita hidup dengan limpahan air cair', icon: '🌍' },
  { id: 'pair_5', planetName: 'Merkurius', characteristic: 'Planet terdekat dari Matahari tanpa atmosfer tebal', icon: '⚪' },
];

// Game 5: Drag and Drop (Susun 8 Planet dari Matahari)
export interface PlanetSortCard {
  id: string;
  name: string;
  correctSlot: number; // 1 to 8
  color: string;
  hint: string;
}

export const GAME_5_PLANETS: PlanetSortCard[] = [
  { id: 'merkurius', name: 'Merkurius', correctSlot: 1, color: '#94a3b8', hint: 'Paling dekat dengan Matahari' },
  { id: 'venus', name: 'Venus', correctSlot: 2, color: '#fbbf24', hint: 'Planet terpanas, Bintang Kejora' },
  { id: 'bumi', name: 'Bumi', correctSlot: 3, color: '#38bdf8', hint: 'Planet biru tempat kita hidup' },
  { id: 'mars', name: 'Mars', correctSlot: 4, color: '#ef4444', hint: 'Planet merah dekat sabuk asteroid' },
  { id: 'jupiter', name: 'Jupiter', correctSlot: 5, color: '#f97316', hint: 'Planet raksasa gas nomor 1 terbesar' },
  { id: 'saturnus', name: 'Saturnus', correctSlot: 6, color: '#fde047', hint: 'Planet dengan cincin paling megah' },
  { id: 'uranus', name: 'Uranus', correctSlot: 7, color: '#2dd4bf', hint: 'Raksasa es dengan sumbu rotasi rebah' },
  { id: 'neptunus', name: 'Neptunus', correctSlot: 8, color: '#3b82f6', hint: 'Planet kedelapan dan paling jauh' },
];

// Game 6: Isian Singkat
export interface ShortAnswerQuestion {
  id: string;
  number: number;
  question: string;
  canonicalAnswer: string;
  acceptedAnswers: string[];
  hint: string;
}

export const GAME_6_QUESTIONS: ShortAnswerQuestion[] = [
  {
    id: 'sa_1',
    number: 1,
    question: 'Apa nama bintang yang menjadi pusat tata surya kita?',
    canonicalAnswer: 'Matahari',
    acceptedAnswers: ['Matahari', 'matahari', 'sang surya', 'the sun'],
    hint: 'Bintang pemancar cahaya dan panas utama di siang hari.',
  },
  {
    id: 'sa_2',
    number: 2,
    question: 'Apa nama planet terbesar di seluruh tata surya?',
    canonicalAnswer: 'Jupiter',
    acceptedAnswers: ['Jupiter', 'jupiter', 'Yupiter', 'yupiter'],
    hint: 'Planet gas urutan kelima yang memiliki badai Bintik Merah Raksasa.',
  },
  {
    id: 'sa_3',
    number: 3,
    question: 'Apa sebutan untuk gerak Bumi berputar pada sumbunya sendiri?',
    canonicalAnswer: 'Rotasi',
    acceptedAnswers: ['Rotasi', 'rotasi', 'gerak rotasi', 'rotasi bumi'],
    hint: 'Berlangsung selama 24 jam dan menyebabkan siang dan malam.',
  },
  {
    id: 'sa_4',
    number: 4,
    question: 'Apa nama planet tempat tinggal kita yang kaya air dan oksigen?',
    canonicalAnswer: 'Bumi',
    acceptedAnswers: ['Bumi', 'bumi', 'earth'],
    hint: 'Planet urutan ketiga dari Matahari yang dijuluki Planet Biru.',
  },
  {
    id: 'sa_5',
    number: 5,
    question: 'Apa nama planet kedelapan dan terjauh dari Matahari?',
    canonicalAnswer: 'Neptunus',
    acceptedAnswers: ['Neptunus', 'neptunus', 'neptune'],
    hint: 'Planet berwarna biru kobalt yang memiliki angin supersonik.',
  },
];
