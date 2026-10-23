/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Developer profile information
 */

export interface DeveloperProfile {
  name: string;
  institution: string;
  city: string;
  role: string;
  subject: string;
  targetAudience: string;
  bio: string;
  acknowledgments: string[];
}

export const DEVELOPER_INFO: DeveloperProfile = {
  name: 'Ridwan Djabar',
  institution: 'SMAN 8 Gorontalo',
  city: 'Kota Gorontalo, Provinsi Gorontalo',
  role: 'Pengembang Multimedia Pembelajaran Digital',
  subject: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
  targetAudience: 'Peserta Didik Kelas VI Sekolah Dasar (Usia 11–12 Tahun)',
  bio: 'Pendidik dan pengembang multimedia pembelajaran interaktif yang berdedikasi menciptakan media edukasi sains modern, menyenangkan, dan berpusat pada peserta didik guna mewujudkan pembelajaran bermakna dalam implementasi Kurikulum Merdeka.',
  acknowledgments: [
    'Keluarga besar SMAN 8 Gorontalo atas dukungan sarana dan ruang kreasi inovasi pembelajaran digital.',
    'Bapak dan Ibu Guru Pengampu IPAS Sekolah Dasar yang senantiasa menginspirasi penyajian media ramah anak.',
    'Seluruh peserta didik kelas VI SD generasi penerus bangsa: teruslah penasaran, bermimpi tinggi, dan jelajahi cakrawala sains antariksa!',
    'Kementerian Pendidikan Dasar dan Menengah RI atas pedoman kurikulum dan capaian pembelajaran IPAS Fase C.',
  ],
};
