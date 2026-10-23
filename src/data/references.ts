/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * References and Official Educational Citations for IPAS SD
 */

export interface ReferenceItem {
  id: string;
  title: string;
  institutionOrAuthor: string;
  year?: string;
  url: string;
  description: string;
  category: 'Buku Resmi' | 'Portal Sains Dunia' | 'Media Edukasi';
}

export const REFERENCES_LIST: ReferenceItem[] = [
  {
    id: 'ref-1',
    title: 'Buku Panduan Guru & Siswa Ilmu Pengetahuan Alam dan Sosial (IPAS) Kelas VI SD',
    institutionOrAuthor: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia',
    year: '2022',
    url: 'https://buku.kemdikbud.go.id/',
    description: 'Buku teks utama Kurikulum Merdeka Fase C Kelas 6 Bab 5: Menjelajahi Bumi dan Antariksa. Membahas sistem tata surya, rotasi-revolusi, serta gerhana.',
    category: 'Buku Resmi',
  },
  {
    id: 'ref-2',
    title: 'NASA Solar System Exploration: Our Solar System Overview',
    institutionOrAuthor: 'National Aeronautics and Space Administration (NASA)',
    year: '2024',
    url: 'https://science.nasa.gov/solar-system/',
    description: 'Pusat eksplorasi data ilmiah NASA mengenai ukuran relatif, atmosfer, satelit alami, dan orbit planet-planet tata surya.',
    category: 'Portal Sains Dunia',
  },
  {
    id: 'ref-3',
    title: 'NASA Space Place: Explore Earth and Space for Kids',
    institutionOrAuthor: 'NASA Science Mission Directorate',
    year: '2024',
    url: 'https://spaceplace.nasa.gov/',
    description: 'Portal edukasi sains luar angkasa anak-anak dengan fakta, simulasi gerhana, orbit, dan informasi ramah anak usia sekolah dasar.',
    category: 'Portal Sains Dunia',
  },
  {
    id: 'ref-4',
    title: 'Portal Rumah Belajar & Sumber Belajar Kemdikbud',
    institutionOrAuthor: 'Pusdatin Kemendikbudristek RI',
    year: '2023',
    url: 'https://belajar.kemdikbud.go.id/',
    description: 'Koleksi materi multimedia pembelajaran interaktif, video sains kebumian dan antariksa untuk jenjang Sekolah Dasar.',
    category: 'Media Edukasi',
  },
];
