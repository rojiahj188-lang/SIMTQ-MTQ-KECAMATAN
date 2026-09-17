import { CompetitionBranch } from '../types';

export const OFFICIAL_BRANCHES: CompetitionBranch[] = [
  {
    id: 'tilawah',
    code: 'TLW',
    name: "Tilawah Al-Qur'an",
    categoryType: 'INDIVIDUAL',
    categories: [
      'Tartil Dasar',
      'Golongan Anak-Anak',
      'Golongan Remaja',
      'Golongan Dewasa',
      'Golongan Tuna Netra',
    ],
    description: "Seni membaca Al-Qur'an dengan menerapkan kaidah tajwid, fashahah, serta keindahan variasi irama dan lagu (Nagham).",
    criteria: [
      { id: 'tajwid', name: 'Tajwid (Makharijul Huruf, Sifatul Huruf, Ahkamul Mad)', maxScore: 30, description: 'Ketepatan hukum makhraj, sifat huruf, panjang pendek mad, dan ghunnah.' },
      { id: 'fashahah', name: 'Fashahah & Adab (Ahkamul Waqf wal Ibtida\')', maxScore: 30, description: 'Kerapian berhenti, memulai, kebersihan bacaan, dan adab tilawah.' },
      { id: 'irama', name: 'Irama & Variasi Lagu (Nagham: Bayati, Hijaz, Nahawand, Rast, Sika, Jiharkah)', maxScore: 25, description: 'Keindahan komposisi lagu, perpindahan maqam, dan keselarasan nada.' },
      { id: 'suara', name: 'Suara & Pengaturan Nafas', maxScore: 15, description: 'Keutuhan vokal, volume suara merdu, dan kestabilan nafas.' }
    ]
  },
  {
    id: 'qiraat',
    code: 'QIR',
    name: "Qira'at Al-Qur'an",
    categoryType: 'INDIVIDUAL',
    categories: [
      "Qira'at Mujawwad Dewasa",
      "Qira'at Murattal Remaja",
      "Qira'at Murattal Dewasa"
    ],
    description: "Membaca Al-Qur'an dengan riwayat qira'at sab'ah yang mutawatir (Imam Nafi', Ashim, Ibnu Katsir, Abu Amr, Ibnu Amir, Hamzah, Al-Kisa'i).",
    criteria: [
      { id: 'kaidah_qiraat', name: 'Kaidah Qira\'at & Tajwid Khusus Riwayat', maxScore: 35, description: 'Ketepatan ushul dan farsy huruf sesuai riwayat yang ditentukan.' },
      { id: 'fashahah', name: 'Fashahah & Waqaf Ibtida\'', maxScore: 25, description: 'Ketepatan berhenti, memulai, dan kejelasan fonetik.' },
      { id: 'lagu', name: 'Lagu & Irama (Nagham)', maxScore: 25, description: 'Ketukan murattal atau keindahan lagu mujawwad.' },
      { id: 'suara', name: 'Kejernihan Suara & Pengaturan Nafas', maxScore: 15, description: 'Kemurnian vokal dan ketenangan lantunan.' }
    ]
  },
  {
    id: 'hifzh',
    code: 'MHQ',
    name: 'Hifzh Al-Qur\'an',
    categoryType: 'INDIVIDUAL',
    categories: [
      'Golongan 1 Juz & Tilawah',
      'Golongan 5 Juz & Tilawah',
      'Golongan 10 Juz',
      'Golongan 20 Juz',
      'Golongan 30 Juz'
    ],
    description: "Musabaqah hafalan ayat-ayat suci Al-Qur'an dengan hafalan mutqin, ketepatan tajwid, dan kefasihan lafal.",
    criteria: [
      { id: 'kelancaran', name: 'Tahfizh / Kelancaran Hafalan (Tanpa Lupa/Tersendat)', maxScore: 50, description: 'Kelancaran menjawab pertanyaan tanpa jeda, lupa, atau bimbingan dewan hakim.' },
      { id: 'tajwid', name: 'Ketepatan Tajwid', maxScore: 25, description: 'Kaidah tajwid, makhraj, dan sifat huruf saat hafalan meluncur.' },
      { id: 'fashahah', name: 'Fashahah & Adab Tilawah', maxScore: 25, description: 'Kefasihan pengucapan ayat dan adab terhadap mushaf hafalan.' }
    ]
  },
  {
    id: 'tafsir',
    code: 'TFR',
    name: 'Tafsir Al-Qur\'an',
    categoryType: 'INDIVIDUAL',
    categories: [
      'Tafsir Bahasa Arab',
      'Tafsir Bahasa Indonesia',
      'Tafsir Bahasa Inggris'
    ],
    description: "Uji hafalan Al-Qur'an disertai penguasaan tafsir ayat, asbabun nuzul, munasabah ayat, dan argumentasi ilmiah.",
    criteria: [
      { id: 'hafalan_ayat', name: 'Hafalan Ayat Terkait (Tahfizh)', maxScore: 30, description: 'Ketepatan mengingat dan melantunkan ayat yang ditafsirkan.' },
      { id: 'pemahaman_tafsir', name: 'Kedalaman Pemahaman Isi & Konteks Tafsir', maxScore: 40, description: 'Ketajaman analisis makna ayat, munasabah, dan kitab tafsir rujukan (Ibnu Katsir, Thabari, dll).' },
      { id: 'bahasa_retorika', name: 'Penguasaan Bahasa & Retorika Penyampaian', maxScore: 30, description: 'Ketepatan gramatika bahasa yang dipilih (Arab/Indonesia/Inggris) dan kelugasan logika.' }
    ]
  },
  {
    id: 'fahmil',
    code: 'MFQ',
    name: 'Fahmil Qur\'an (Beregu)',
    categoryType: 'BEREGU',
    categories: [
      'Beregu Putra (3 Orang)',
      'Beregu Putri (3 Orang)'
    ],
    description: "Lomba cerdas cermat Al-Qur'an beregu mencakup pemahaman Al-Qur'an, Hadist, Fiqih, Aqidah, Sejarah Kebudayaan Islam, dan wawasan kebangsaan.",
    criteria: [
      { id: 'soal_paket', name: 'Nilai Soal Paket Regu', maxScore: 40, description: 'Ketepatan dan kecepatan menjawab pertanyaan paket regu sendiri.' },
      { id: 'soal_rebutan', name: 'Nilai Soal Rebutan & Ketepatan Dalil', maxScore: 40, description: 'Skor akumulasi babak rebutan cepat tepat antar regu.' },
      { id: 'kerjasama', name: 'Kekompakan & Penguasaan Dalil Referensi', maxScore: 20, description: 'Sinergi juru bicara dan pendamping dalam mengutip ayat Al-Qur\'an dan Hadist.' }
    ]
  },
  {
    id: 'syarhil',
    code: 'MSQ',
    name: 'Syarhil Qur\'an (Beregu)',
    categoryType: 'BEREGU',
    categories: [
      'Beregu Putra (Pensyarah, Qari, Sari Tilawah)',
      'Beregu Putri (Pensyarah, Qari, Sari Tilawah)'
    ],
    description: "Penyampaian pesan dan kandungan Al-Qur'an secara beregu melalui orasi pensyarah, lantunan tilawah qari, dan puitisasi sari tilawah.",
    criteria: [
      { id: 'penghayatan_retorika', name: 'Penghayatan, Retorika & Sistematika Orasi', maxScore: 40, description: 'Artikulasi pembicara, keselarasan gaya penyampaian, dan daya pikat retorika dakwah.' },
      { id: 'materi_terjemah', name: 'Kedalaman Materi, Analisis & Terjemahan', maxScore: 30, description: 'Bobot keilmuan, aktualitas tema kontemporer, dan keserasian dalil naqli.' },
      { id: 'tilawah_adab', name: 'Kualitas Tilawah, Harmonisasi & Adab', maxScore: 30, description: 'Kemerduan qari, kefasihan sari tilawah, serta kesantunan busana dan sikap panggung.' }
    ]
  },
  {
    id: 'khath',
    code: 'MKQ',
    name: 'Khath Al-Qur\'an (Kaligrafi)',
    categoryType: 'INDIVIDUAL',
    categories: [
      'Golongan Naskah',
      'Golongan Hiasan Mushaf',
      'Golongan Dekorasi',
      'Golongan Kontemporer'
    ],
    description: "Seni lukis kaligrafi Islam menuliskan ayat-ayat Al-Qur'an dengan kaidah khath (Tsuluts, Naskhi, Farisi, Riq'ah, Diwani, Kufi).",
    criteria: [
      { id: 'kaidah_khath', name: 'Kaidah Khath & Ketepatan Anatomi Huruf', maxScore: 45, description: 'Kebenaran nisbah bentuk huruf (mizan), jarak sambung, dan anatomi kaidah tulisan.' },
      { id: 'keindahan_tatawarna', name: 'Keindahan, Ornamen & Komposisi Warna', maxScore: 35, description: 'Harmoni warna, proporsi hiasan ornamen islamika, dan estetika visual karya.' },
      { id: 'kebersihan', name: 'Kerapian, Kebersihan & Keterbacaan', maxScore: 20, description: 'Kehalusan goresan kuas/pena, ketuntasan bidang media, dan kebersihan kanvas.' }
    ]
  },
  {
    id: 'hadist',
    code: 'MHD',
    name: 'Hadist Nabawi',
    categoryType: 'INDIVIDUAL',
    categories: [
      'Hafalan 100 Hadist dengan Sanad',
      'Hafalan 500 Hadist Tanpa Sanad',
      'Karya Tulis Ilmiah Hadist (KTIH)'
    ],
    description: "Hafalan teks dan sanad hadist Nabi Muhammad SAW dari Kutubut Tis'ah beserta pemahaman syarah dan takhrij ilmiah.",
    criteria: [
      { id: 'kelancaran_hafalan', name: 'Kelancaran Hafalan Matan & Sanad', maxScore: 50, description: 'Kelancaran pembacaan sanad rawi dan matan hadist tanpa keraguan.' },
      { id: 'tajwid_fashahah', name: 'Tajwid, Fashahah & Artikulasi Lafazh', maxScore: 25, description: 'Kefasihan bahasa Arab, makhraj, dan intonasi pembacaan sabda Rasulullah SAW.' },
      { id: 'pemahaman_takhrij', name: 'Pemahaman Syarah & Kedalaman Takhrij', maxScore: 25, description: 'Penjelasan kandungan hukum hadist, derajat riwayat, dan aplikasi tematik.' }
    ]
  },
  {
    id: 'makalah',
    code: 'MIIQ',
    name: 'Makalah Ilmiah Al-Qur\'an',
    categoryType: 'INDIVIDUAL',
    categories: [
      'Karya Tulis Ilmiah Al-Qur\'an Remaja',
      'Karya Tulis Ilmiah Al-Qur\'an Dewasa'
    ],
    description: "Penyusunan dan presentasi karya tulis ilmiah bersumber dari Al-Qur'an untuk menjawab problematika umat kontemporer.",
    criteria: [
      { id: 'bobot_materi', name: 'Bobot Materi, Kebaruan Ide & Metodologi', maxScore: 40, description: 'Ketajaman rumusan masalah, orisinalitas riset, dan ketepatan metodologi ilmiah.' },
      { id: 'presentasi', name: 'Presentasi, Retorika & Penguasaan Media', maxScore: 35, description: 'Kemampuan memaparkan gagasan secara sistematis, lugas, dan meyakinkan.' },
      { id: 'tanya_jawab', name: 'Penguasaan Referensi Ayat & Sesi Tanya Jawab', maxScore: 25, description: 'Kecepatan dan ketepatan menjawab sanggahan serta rujukan tafsir.' }
    ]
  }
];
