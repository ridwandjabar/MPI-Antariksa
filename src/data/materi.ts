/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Learning modules data for IPAS Kelas VI SD - Tata Surya
 */

export interface QuickQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MateriSubbab {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  summary: string;
  textSections: {
    heading: string;
    content: string[];
    callout?: string;
  }[];
  narrationFullText: string;
  quickCheck: QuickQuestion;
  interactiveActivityTitle: string;
  interactiveActivityType: 'identify_members' | 'sun_energy' | 'inner_outer_compare' | 'rotation_revolution_widget' | 'eclipse_explorer' | 'classify_celestial';
  videoResource: {
    title: string;
    channelOrSource: string;
    description: string;
    embedUrl?: string; // YouTube educational link or fallback player
  };
}

export const MATERI_LIST: MateriSubbab[] = [
  {
    id: 'materi-1',
    order: 1,
    title: 'Mengenal Tata Surya',
    subtitle: 'Keluarga Besar Benda Langit yang Dipimpin Matahari',
    badge: 'Subbab 1',
    icon: '🌌',
    summary: 'Tata surya adalah susunan benda-benda langit yang terdiri atas Matahari sebagai pusatnya, delapan planet, satelit alami, planet kerdil, asteroid, komet, dan meteoroid yang semuanya terikat oleh gaya gravitasi Matahari.',
    textSections: [
      {
        heading: 'Apa itu Tata Surya?',
        content: [
          'Bayangkan sebuah keluarga raksasa yang berada di ruang angkasa luas. Keluarga itu disebut Tata Surya!',
          'Tata surya kita berada di dalam galaksi spiral megah bernama Galaksi Bima Sakti (Milky Way). Pusat dari tata surya adalah sebuah bintang berpijar yang sangat besar, yaitu Matahari.',
          'Semua benda langit di tata surya berputar mengelilingi Matahari karena tarikan gaya gravitasi Matahari yang sangat kuat dan perkasa.',
        ],
        callout: '💡 Tahukah Kamu? Gaya gravitasi adalah gaya tarik-menarik antara dua benda bermassa. Karena Matahari bermassa sangat besar, dialah yang menahan planet-planet agar tidak melayang bebas tak menentu!',
      },
      {
        heading: 'Siapa Saja Anggota Tata Surya?',
        content: [
          '1. Matahari: Bintang raksasa bercahaya sendiri yang menjadi pusat tata surya.',
          '2. Delapan Planet: Benda langit pengembara yang mengitari Matahari pada lintasan elips yang disebut orbit.',
          '3. Satelit Alami: Benda langit yang mengitari planet, seperti Bulan yang setia mengelilingi Bumi.',
          '4. Planet Kerdil: Benda bulat yang mengitari Matahari namun belum bisa membersihkan lingkungan orbitnya, seperti Pluto dan Ceres.',
          '5. Asteroid: Bebatuan luar angkasa yang banyak berkumpul di Sabuk Asteroid antara Mars dan Jupiter.',
          '6. Komet: Bola salju dan debu antariksa yang memiliki ekor bercahaya saat mendekati Matahari.',
          '7. Meteoroid: Pecahan kecil batu atau logam luar angkasa.',
        ],
      },
    ],
    narrationFullText:
      'Halo penjelajah cilik antariksa! Tata surya adalah susunan benda-benda langit yang terdiri atas Matahari sebagai pusat, delapan planet yang mengelilinginya, satelit alami seperti Bulan, planet kerdil, jutaan asteroid, komet berekor, dan pecahan meteoroid. Seluruh anggota tata surya ini bergerak harmonis karena diikat oleh gaya gravitasi Matahari yang sangat kuat.',
    quickCheck: {
      question: 'Benda langit apakah yang menjadi pusat gravitasi dari seluruh anggota tata surya?',
      options: ['Bulan', 'Bumi', 'Matahari', 'Jupiter'],
      correctIndex: 2,
      explanation: 'Benar sekali! Matahari adalah pusat tata surya kita karena memiliki massa dan gravitasi terbesar.',
    },
    interactiveActivityTitle: 'Identifikasi Anggota Tata Surya',
    interactiveActivityType: 'identify_members',
    videoResource: {
      title: 'Mengenal Tata Surya - Sumber Belajar Kemendikbud',
      channelOrSource: 'Pusdatin Kemendikbudristek & NASA Kids',
      description: 'Animasi edukasi resmi pengenalan anggota sistem tata surya untuk siswa SD.',
      embedUrl: 'https://www.youtube.com/embed/libKBY5-V28',
    },
  },
  {
    id: 'materi-2',
    order: 2,
    title: 'Matahari: Sang Bintang Pusat',
    subtitle: 'Sumber Cahaya dan Energi Utama bagi Kehidupan di Bumi',
    badge: 'Subbab 2',
    icon: '☀️',
    summary: 'Matahari adalah bintang terdekat dari Bumi berupa bola gas hidrogen dan helium berpijar raksasa yang menghasilkan cahaya dan panas melalui reaksi fusi nuklir.',
    textSections: [
      {
        heading: 'Matahari Adalah Bintang!',
        content: [
          'Matahari bukan planet, melainkan sebuah bintang! Bintang adalah benda langit yang dapat memancarkan cahayanya sendiri.',
          'Matahari terlihat jauh lebih besar dan silau daripada bintang-bintang lain di malam hari karena jaraknya paling dekat dengan Bumi kita (sekitar 150 juta km).',
          'Suhu di permukaan Matahari mencapai sekitar 5.500 derajat Celsius, sedangkan suhu di bagian intinya mencapai 15 juta derajat Celsius!',
        ],
        callout: '🔥 Reaksi Fusi Nuklir: Di inti Matahari, gas hidrogen terus-menerus bergabung menjadi gas helium, menghasilkan letupan energi cahaya dan panas yang tidak pernah padam selama miliaran tahun.',
      },
      {
        heading: 'Peran Vital Matahari bagi Bumi',
        content: [
          '1. Menghangatkan Bumi: Membuat suhu permukaan Bumi cocok untuk ditinggali tanaman, hewan, dan manusia.',
          '2. Fotosintesis Tumbuhan: Tanaman membutuhkan cahaya Matahari untuk memasak makanannya sendiri dan menghasilkan oksigen untuk kita bernapas.',
          '3. Memicu Daur Air: Panas Matahari menguapkan air laut menjadi awan dan turun menjadi hujan yang menyuburkan tanah.',
          '4. Sumber Energi Terbarukan: Cahaya Matahari dapat diubah menjadi listrik bersih melalui panel surya (solar cell).',
        ],
      },
    ],
    narrationFullText:
      'Matahari adalah bintang pijar raksasa yang menjadi jantung tata surya. Di dalamnya terjadi reaksi fusi hidrogen yang memancarkan panas dan sinar tanpa henti. Tanpa Matahari, Bumi akan beku, gelap gulita, dan tidak akan ada kehidupan, tumbuhan tidak bisa berfotosintesis, dan daur air tidak akan berjalan.',
    quickCheck: {
      question: 'Mengapa Matahari tampak paling besar dan terang dibandingkan bintang-bintang lain di langit malam?',
      options: [
        'Karena Matahari terbuat dari batu permata',
        'Karena jarak Matahari paling dekat dengan Bumi',
        'Karena Matahari tidak memiliki gravitasi',
        'Karena Matahari adalah satu-satunya bintang di alam semesta',
      ],
      correctIndex: 1,
      explanation: 'Tepat sekali! Matahari adalah bintang yang paling dekat jaraknya dengan Bumi sehingga cahayanya mendominasi siang hari kita.',
    },
    interactiveActivityTitle: 'Eksplorasi Lapisan & Energi Matahari',
    interactiveActivityType: 'sun_energy',
    videoResource: {
      title: 'Matahari: Karakteristik dan Peranannya bagi Kehidupan',
      channelOrSource: 'Rumah Belajar Kemdikbud',
      description: 'Penjelasan interaktif mengenai fusi nuklir, fotosfer, dan manfaat energi surya bagi makhluk hidup.',
      embedUrl: 'https://www.youtube.com/embed/VkW54j82e9U',
    },
  },
  {
    id: 'materi-3',
    order: 3,
    title: 'Delapan Planet Tata Surya',
    subtitle: 'Urutan, Planet Dalam, Planet Luar, dan Karakteristik Uniknya',
    badge: 'Subbab 3',
    icon: '🪐',
    summary: 'Delapan planet mengitari Matahari berurutan: Merkurius, Venus, Bumi, Mars (Planet Dalam berbatu) serta Jupiter, Saturnus, Uranus, Neptunus (Planet Luar gas & es raksasa).',
    textSections: [
      {
        heading: 'Urutan Delapan Planet dari yang Terdekat',
        content: [
          'Agar mudah diingat, hafalkan singkatan asyik ini: "Meva Bima JuSaUn"!',
          '1. Merkurius: Planet terdekat dari Matahari, tanpa atmosfer tebal, bertekstur kawah mirip Bulan.',
          '2. Venus: Planet terpanas di tata surya akibat efek rumah kaca ekstrem, sering dijuluki Bintang Kejora.',
          '3. Bumi: Planet tempat tinggal kita yang kaya air cair, kaya oksigen, dan memiliki satu Bulan.',
          '4. Mars: Planet merah berdebu besi oksida dengan gunung terbesar Olympus Mons.',
          '5. Jupiter: Planet terbesar se-tata surya dengan badai abadi Bintik Merah Raksasa.',
          '6. Saturnus: Planet terindah dengan cincin spektakuler yang menonjol dari pecahan es dan batu.',
          '7. Uranus: Planet raksasa es berwarna biru kehijauan pastel yang sumbu rotasinya merebah miring 98 derajat.',
          '8. Neptunus: Planet kedelapan dan paling jauh dari Matahari, tempat berhembusnya angin supersonik tercepat.',
        ],
        callout: '🚀 Mengapa Pluto Bukan Planet Utama Lagi? Pada tahun 2006, persatuan astronom internasional menetapkan bahwa planet harus mampu membersihkan lintasan orbitnya. Pluto belum mampu, sehingga dikelompokkan sebagai Planet Kerdil (Dwarf Planet).',
      },
      {
        heading: 'Perbedaan Planet Dalam dan Planet Luar',
        content: [
          'Sabuk Asteroid (kumpulan batuan antariksa) membagi delapan planet menjadi dua kelompok besar:',
          '• Planet Dalam (Merkurius, Venus, Bumi, Mars): Berada di sebelah dalam sabuk asteroid, berukuran relatif kecil, berpermukaan padat berbatu, memiliki sedikit atau tanpa satelit alami, dan tidak memiliki cincin.',
          '• Planet Luar (Jupiter, Saturnus, Uranus, Neptunus): Berada di sebelah luar sabuk asteroid, berukuran raksasa, tersusun atas gas dan cairan es, memiliki banyak sekali satelit alami, dan semuanya memiliki sistem cincin.',
        ],
      },
    ],
    narrationFullText:
      'Delapan planet berbaris rapi mengitari Matahari. Empat planet pertama yaitu Merkurius, Venus, Bumi, dan Mars adalah Planet Dalam yang berpermukaan padat berbatu. Dipisahkan oleh Sabuk Asteroid, terdapat empat Planet Luar yaitu Jupiter, Saturnus, Uranus, dan Neptunus yang berukuran raksasa gas dan es dengan cincin serta puluhan satelit pengiring.',
    quickCheck: {
      question: 'Benda apakah yang membatasi antara kelompok Planet Dalam dan Planet Luar?',
      options: ['Sabuk Asteroid', 'Cincin Saturnus', 'Awan Oort', 'Bulan Bumi'],
      correctIndex: 0,
      explanation: 'Hebat! Sabuk Asteroid yang terletak di antara orbit Mars dan Jupiter adalah batas pemisah planet dalam dan planet luar.',
    },
    interactiveActivityTitle: 'Analisis Perbandingan Planet Dalam vs Luar',
    interactiveActivityType: 'inner_outer_compare',
    videoResource: {
      title: 'Mengenal Delapan Planet dan Karakteristiknya',
      channelOrSource: 'Sains Kreatif IPAS SD',
      description: 'Menjelajahi karakteristik unik kedelapan planet dari Merkurius hingga Neptunus.',
      embedUrl: 'https://www.youtube.com/embed/Qd6nLM2QlWw',
    },
  },
  {
    id: 'materi-4',
    order: 4,
    title: 'Rotasi dan Revolusi Bumi',
    subtitle: 'Perputaran pada Poros dan Perjalanan Mengitari Matahari',
    badge: 'Subbab 4',
    icon: '🌍',
    summary: 'Rotasi Bumi adalah perputaran Bumi pada sumbunya yang menyebabkan terjadinya siang dan malam. Revolusi Bumi bersama kemiringan sumbunya menyebabkan pergantian musim sepanjang tahun.',
    textSections: [
      {
        heading: '1. Rotasi Bumi dan Akibatnya',
        content: [
          'Rotasi adalah gerak Bumi berputar pada sumbu atau porosnya sendiri dari arah barat ke timur.',
          'Waktu yang dibutuhkan Bumi untuk satu kali berputar penuh adalah 24 jam (1 hari).',
          'Dampak penting dari Rotasi Bumi:',
          'a. Terjadinya pergantian Siang dan Malam: Bagian Bumi yang menghadap Matahari menjadi terang (siang), sedangkan bagian yang membelakangi Matahari menjadi gelap (malam).',
          'b. Gerak semu harian Matahari: Matahari seolah-olah terbit di timur dan terbenam di barat, padahal Bumilah yang berputar!',
          'c. Perbedaan waktu di berbagai wilayah Bumi (misalnya di Indonesia ada WIB, WITA, dan WIT).',
        ],
        callout: '🌓 Siang dan Malam: Bumi berputar tanpa henti seperti gasing raksasa. Wilayah Indonesia sedang siang saat belahan Bumi di benua Amerika sedang terlelap tidur di malam hari!',
      },
      {
        heading: '2. Revolusi Bumi dan Akibatnya',
        content: [
          'Revolusi adalah gerak Bumi beredar mengelilingi Matahari pada lintasan orbitnya.',
          'Waktu yang dibutuhkan untuk satu putaran penuh adalah 365,25 hari (1 tahun surya).',
          'Karena poros Bumi miring sebesar 23,5 derajat saat berevolusi, sinar Matahari jatuh dengan kemiringan berbeda di belahan utara dan selatan.',
          'Dampak penting dari Revolusi Bumi:',
          'a. Pergantian musim (musim semi, panas, gugur, dingin di wilayah subtropis; serta kemarau dan hujan di wilayah tropis seperti Indonesia).',
          'b. Perbedaan lamanya siang dan malam di berbagai belahan bumi.',
          'c. Gerak semu tahunan Matahari.',
          'd. Perubahan kenampakan rasi bintang.',
        ],
      },
    ],
    narrationFullText:
      'Bumi kita melakukan dua gerakan sekaligus. Pertama adalah Rotasi, yaitu berputar pada porosnya selama 24 jam yang menyebabkan pergantian siang dan malam serta gerak semu harian Matahari. Kedua adalah Revolusi, yaitu beredar mengelilingi Matahari selama setahun penuh. Bersama kemiringan poros Bumi 23,5 derajat, revolusi menyebabkan pergantian musim yang berbeda di seluruh dunia.',
    quickCheck: {
      question: 'Fenomena apa yang terutama disebabkan oleh peristiwa rotasi Bumi pada porosnya?',
      options: [
        'Pergantian musim dingin dan panas',
        'Terjadinya siang dan malam hari',
        'Terjadinya pasang surut air laut',
        'Perubahan kalender tahun kabisat',
      ],
      correctIndex: 1,
      explanation: 'Tepat sekali! Rotasi Bumi membuat bagian Bumi bergantian terkena cahaya Matahari sehingga terjadilah siang dan malam.',
    },
    interactiveActivityTitle: 'Simulasi Rotasi & Siang Malam',
    interactiveActivityType: 'rotation_revolution_widget',
    videoResource: {
      title: 'Gerak Rotasi dan Revolusi Bumi Beserta Dampaknya',
      channelOrSource: 'Edukasi Sains TVRI & Kemdikbud',
      description: 'Animasi visual penjelasan mengapa ada siang, malam, dan pergantian musim sepanjang tahun.',
      embedUrl: 'https://www.youtube.com/embed/cDed5eXm2R4',
    },
  },
  {
    id: 'materi-5',
    order: 5,
    title: 'Gerhana Matahari & Gerhana Bulan',
    subtitle: 'Fenomena Bayangan Langit Ketika Tiga Benda Sejajar',
    badge: 'Subbab 5',
    icon: '🌘',
    summary: 'Gerhana adalah peristiwa terhalangnya cahaya Matahari karena Bulan berada di antara Matahari dan Bumi (Gerhana Matahari), atau Bumi berada di antara Matahari dan Bulan (Gerhana Bulan).',
    textSections: [
      {
        heading: 'Mengenal Umbra dan Penumbra',
        content: [
          'Saat sebuah benda terhalang cahaya, akan terbentuk dua macam bayangan:',
          '1. Umbra: Daerah bayangan inti yang sangat gelap di mana cahaya terhalang seluruhnya.',
          '2. Penumbra: Daerah bayangan kabur di sekitar umbra di mana cahaya hanya terhalang sebagian.',
        ],
      },
      {
        heading: 'Gerhana Matahari (Matahari – Bulan – Bumi)',
        content: [
          'Terjadi pada siang hari saat fase Bulan Baru (Bulan Mati).',
          'Bulan berada di tengah-tengah antara Matahari dan Bumi dalam satu garis lurus.',
          'Bayangan Bulan jatuh ke permukaan Bumi sehingga sinar Matahari ke sebagian wilayah Bumi tertutup.',
          'Daerah yang terkena bayangan Umbra Bulan akan mengalami Gerhana Matahari Total (langit siang berubah menjadi gelap sesaat!), sedangkan yang terkena Penumbra mengalami Gerhana Matahari Sebagian.',
        ],
        callout: '⚠️ Peringatan Keselamatan: Jangan pernah menatap Gerhana Matahari secara langsung dengan mata telanjang tanpa kacamata filter khusus matahari, karena radiasi cahayanya dapat merusak penglihatan!',
      },
      {
        heading: 'Gerhana Bulan (Matahari – Bumi – Bulan)',
        content: [
          'Terjadi pada malam hari saat fase Bulan Purnama.',
          'Bumi berada di tengah-tengah antara Matahari dan Bulan dalam satu garis lurus.',
          'Bulan masuk ke dalam bayangan gelap Bumi.',
          'Saat Gerhana Bulan Total, Bulan tidak menghilang sepenuhnya melainkan tampak berwarna merah tembaga (Blood Moon) karena sisa cahaya matahari yang dibiaskan oleh atmosfer Bumi.',
        ],
      },
      {
        heading: 'Mengapa Gerhana Tidak Terjadi Setiap Bulan?',
        content: [
          'Meskipun Bulan mengelilingi Bumi setiap bulan, gerhana tidak terjadi setiap bulan karena bidang orbit Bulan tidak sejajar persis dengan bidang orbit Bumi, melainkan miring sekitar 5 derajat.',
          'Gerhana hanya dapat terjadi jika Bulan berada tepat di titik perpotongan kedua bidang orbit tersebut saat posisi sejajar.',
        ],
      },
    ],
    narrationFullText:
      'Gerhana terjadi saat Matahari, Bumi, dan Bulan berada dalam satu garis lurus. Jika Bulan berada di antara Matahari dan Bumi, terjadilah Gerhana Matahari di siang hari. Jika Bumi berada di tengah antara Matahari dan Bulan, terjadilah Gerhana Bulan di malam hari. Karena bidang orbit Bulan miring sekitar 5 derajat, gerhana tidak terjadi setiap bulan melainkan hanya pada saat-saat tertentu.',
    quickCheck: {
      question: 'Bagaimanakah urutan posisi benda langit saat terjadi Gerhana Matahari?',
      options: [
        'Matahari — Bumi — Bulan',
        'Matahari — Bulan — Bumi',
        'Bulan — Matahari — Bumi',
        'Bumi — Matahari — Bulan',
      ],
      correctIndex: 1,
      explanation: 'Sempurna! Pada Gerhana Matahari, Bulan berada di tengah-tengah menghalangi cahaya Matahari menuju Bumi (Matahari - Bulan - Bumi).',
    },
    interactiveActivityTitle: 'Laboratorium Sudut Cahaya Gerhana',
    interactiveActivityType: 'eclipse_explorer',
    videoResource: {
      title: 'Simulasi Gerhana Matahari dan Bulan Lengkap',
      channelOrSource: 'Pusat Kurikulum & IPAS Edukasi',
      description: 'Menjelaskan umbra, penumbra, gerhana matahari cincin, dan bulan merah darah secara visual.',
      embedUrl: 'https://www.youtube.com/embed/rVE8PFYlwSM',
    },
  },
  {
    id: 'materi-6',
    order: 6,
    title: 'Benda Langit Lainnya',
    subtitle: 'Satelit, Planet Kerdil, Asteroid, Komet, dan Meteoroid',
    badge: 'Subbab 6',
    icon: '☄️',
    summary: 'Selain Matahari dan 8 planet, tata surya dipenuhi benda langit pengembara menarik: satelit alami pengiring planet, planet kerdil bulat, asteroid batuan raksasa, komet es berekor, dan meteoroid si penjelajah antariksa.',
    textSections: [
      {
        heading: '1. Satelit Alami',
        content: [
          'Satelit alami adalah benda angkasa yang mengorbit mengitari suatu planet.',
          'Bumi memiliki 1 satelit alami yaitu Bulan. Planet Jupiter memiliki 95 satelit (Ganymede adalah yang terbesar di tata surya), sedangkan Saturnus memiliki 146 satelit (termasuk Titan yang memiliki atmosfer tebal).',
        ],
      },
      {
        heading: '2. Planet Kerdil (Dwarf Planet)',
        content: [
          'Planet kerdil adalah benda langit bulat mirip planet biasa yang mengelilingi Matahari, namun belum mampu membersihkan lingkungan orbitnya dari benda-benda lain.',
          'Contoh: Pluto (dulunya dianggap planet ke-9), Ceres (terletak di Sabuk Asteroid), Eris, Haumea, dan Makemake.',
        ],
      },
      {
        heading: '3. Asteroid: Bebatuan Luar Angkasa',
        content: [
          'Asteroid adalah pecahan bebatuan dan logam purba berukuran kecil hingga ratusan kilometer.',
          'Sebagian besar asteroid berkumpul berputar bersama di antara orbit planet Mars dan Jupiter dalam wilayah yang disebut Sabuk Asteroid (Asteroid Belt).',
        ],
      },
      {
        heading: '4. Komet: Bola Es Berselimut Debu',
        content: [
          'Komet sering dijuluki "bintang berekor", padahal komet bukanlah bintang sama sekali!',
          'Komet terbuat dari gumpalan es padat, gas beku, dan debu yang berasal dari ujung terluar tata surya (Sabuk Kuiper atau Awan Oort).',
          'Ketika melintas mendekati Matahari, panas Matahari menguapkan esnya sehingga membentuk kabut bercahaya dan ekor gas panjang yang selalu menjauhi arah Matahari!',
          'Contoh komet terkenal: Komet Halley yang melintas dekat Bumi setiap 76 tahun sekali.',
        ],
      },
      {
        heading: '5. Bedakan: Meteoroid, Meteor, dan Meteorit!',
        content: [
          'Banyak orang sering tertukar, ini cara mudah membedakannya:',
          '• Meteoroid: Pecahan batu atau logam kecil yang masih melayang-layang bebas di ruang angkasa.',
          '• Meteor: Meteoroid yang tertarik gravitasi Bumi dan bergesekan membara dengan atmosfer Bumi hingga menghasilkan pijaran kilat cahaya di langit malam (sering disebut bintang jatuh).',
          '• Meteorit: Sisa batu meteor yang tidak habis terbakar di atmosfer dan berhasil jatuh menumbuk permukaan tanah Bumi.',
        ],
        callout: '🌠 Tips Ingat Kilat: Meteoroid = di angkasa luar; Meteor = melintas bercahaya di atmosfer; Meteorit = telah menyentuh tanah Bumi!',
      },
    ],
    narrationFullText:
      'Di samping Matahari dan delapan planet, tata surya menyimpan pengembara antariksa yang menakjubkan. Ada satelit alami pengiring planet seperti Bulan, planet kerdil seperti Pluto dan Ceres, jutaan asteroid di antara Mars dan Jupiter, komet es berekor indah, serta serpihan meteoroid yang bisa menyala menjadi meteor saat menembus atmosfer Bumi.',
    quickCheck: {
      question: 'Apakah sebutan bagi batu luar angkasa yang terbakar dan menghasilkan pijaran garis cahaya di langit malam saat menembus atmosfer Bumi?',
      options: ['Asteroid', 'Komet', 'Meteor', 'Satelit'],
      correctIndex: 2,
      explanation: 'Benar sekali! Gesekan meteoroid dengan udara atmosfer menghasilkan kilatan cahaya indah yang disebut Meteor (atau bintang jatuh).',
    },
    interactiveActivityTitle: 'Game Klasifikasi Benda Langit',
    interactiveActivityType: 'classify_celestial',
    videoResource: {
      title: 'Mengenal Komet, Asteroid, dan Meteoroid',
      channelOrSource: 'Pusat Sumber Belajar Sains SD',
      description: 'Mengetahui perbedaan bentuk komet berdebu es dan bebatuan asteroid serta cara membedakan meteor.',
      embedUrl: 'https://www.youtube.com/embed/g2qJ_g2wP1M',
    },
  },
];
