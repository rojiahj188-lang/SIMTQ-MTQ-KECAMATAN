import { BranchNationalRubric } from '../types';

export const NATIONAL_JUDGING_ETHICS = {
  title: "Kode Etik & Pedoman Umum Dewan Hakam MTQ Nasional",
  legalBasis: "Keputusan Menteri Agama (KMA) RI & Buku Pedoman Musabaqah Tilawatil Qur'an LPTQ Nasional",
  principles: [
    {
      title: "Independensi & Kejujuran (Amanah)",
      description: "Dewan Hakam wajib menjunjung tinggi independensi mutlak, bebas dari intervensi kafilah daerah asal, primordialisme, atau kepentingan kelompok mana pun."
    },
    {
      title: "Objektivitas Berdasarkan Kaidah Syar'i & Teknis",
      description: "Penilaian semata-mata disandarkan pada performa langsung peserta di atas mimbar musabaqah sesuai rubrik indikator baku, bukan atas nama besar atau rekam jejak masa lalu."
    },
    {
      title: "Kolektif-Kolegial Majelis Hakim",
      description: "Skor akhir merupakan kompilasi dan rerata terukur seluruh anggota majelis hakim dengan penghapusan deviasi ekstrim jika disyaratkan oleh tata tertib sidang pleno."
    },
    {
      title: "Kerahasiaan Berkas & Nilai",
      description: "Nilai yang dimasukkan bersifat rahasia resmi negara dan tidak boleh dibocorkan sebelum pengumuman resmi Surat Keputusan (SK) Dewan Hakim."
    }
  ],
  standardGradeScale: [
    { range: "95.00 - 100.00", predicate: "Mumtaz Murtadi' (Istimewa Sempurna)", description: "Memenuhi seluruh kaidah tanpa cacat jali dan minim sekali kekhilafan khafi." },
    { range: "90.00 - 94.99", predicate: "Mumtaz (Sangat Baik / Unggul)", description: "Kaidah sangat matang, artikulasi prima, nagham/hafalan sangat teratur." },
    { range: "80.00 - 89.99", predicate: "Jayyid Jiddan (Baik Sekali)", description: "Memenuhi standar musabaqah nasional dengan sedikit catatan minor." },
    { range: "70.00 - 79.99", predicate: "Jayyid (Cukup / Standar)", description: "Memenuhi kaidah dasar namun memiliki beberapa kesalahan teknis." },
    { range: "< 70.00", predicate: "Dha'if (Kurang)", description: "Banyak terdapat kesalahan kaidah, tawaqquf berulang, atau pelanggaran waktu." }
  ]
};

export const ALL_NATIONAL_RUBRICS: BranchNationalRubric[] = [
  // 1. TILAWAH AL-QUR'AN
  {
    branchId: 'tilawah',
    branchCode: 'TLW',
    branchName: "Tilawah Al-Qur'an",
    legalBasis: "Pedoman Musabaqah Tilawatil Qur'an Nasional Bidang Seni Baca Al-Qur'an",
    generalRules: [
      "Waktu tampil 7 - 10 menit (Anak-anak & Remaja 7-8 menit, Dewasa 9-10 menit).",
      "Membawakan minimal 4-5 jenis maqam/lagu dengan Bayati sebagai pembuka dan penutup.",
      "Membaca mushaf cetak standar Kementerian Agama RI tanpa hiasan catatan tajwid.",
      "Peserta wajib mematuhi sinyal bel mimbar (Bel 1: Mulai, Bel 2: Sisa 1 Menit, Bel 3: Selesai)."
    ],
    bellRules: [
      { bellNumber: 1, color: "bg-emerald-500", meaning: "Bel 1x (Kuning)", actionDescription: "Tanda mulai membaca ta'awwudz dan basmalah." },
      { bellNumber: 2, color: "bg-amber-500", meaning: "Bel 2x (Kuning)", actionDescription: "Peringatan waktu tinggal 1 menit lagi, persiapan menutup bacaan." },
      { bellNumber: 3, color: "bg-rose-500", meaning: "Bel 3x (Merah)", actionDescription: "Waktu habis, peserta wajib membaca tashdiq (shadaqallahul 'adzim)." }
    ],
    scoringGuidanceSummary: "Bobot total 100 poin terdiri atas Tajwid (30%), Fashahah & Adab (30%), Nagham/Lagu (25%), dan Suara/Nafas (15%).",
    criteriaDetails: [
      {
        id: 'tajwid',
        name: "Tajwid (Makhraj, Sifat, Ahkamul Mad & Huruf)",
        weightPercent: 30,
        maxScore: 30,
        subComponents: [
          {
            title: "Makharijul Huruf & Sifatul Huruf",
            pointsRange: "10 - 12 Poin",
            description: "Kebenaran tempat keluarnya huruf dan sifat-sifat lazimah maupun 'aridhah (hams, jahr, istila', qalqalah, tafkhim/tarqiq).",
            nationalStandardIndicators: [
              "Ketepatan makhraj huruf halqiyyah (ع, غ, ح, خ, هـ, ء)",
              "Ketepatan istila' dan ithbaq (ص, ض, ط, ظ)",
              "Tafkhim dan tarqiq pada lafal jalalah dan ra' (ر)"
            ]
          },
          {
            title: "Ahkamul Mad wal Qashr",
            pointsRange: "10 - 12 Poin",
            description: "Ketepatan kadar harakat mad thabi'i (2 harakat), mad wajib muttashil (4-5 harakat), mad jaiz munfashil (4-5 harakat), dan mad lazim (6 harakat).",
            nationalStandardIndicators: [
              "Konsistensi tempo mad thabi'i pada seluruh bacaan",
              "Keseragaman kadar mad 'aridh lissukun (2, 4, atau 6 harakat)",
              "Ketepatan panjang mad badal dan mad shilah"
            ]
          },
          {
            title: "Ahkamul Huruf (Nun/Mim Sukun & Ghunnah)",
            pointsRange: "6 - 8 Poin",
            description: "Hukum idzhar, idgham bighunnah/bilaghunnah, iqlab, ikhfa haqiqi, dan ghunnah musyaddadah.",
            nationalStandardIndicators: [
              "Kadar ketukan dengung ghunnah (2 harakat sempurna)",
              "Kejelasan idzhar halqi tanpa saktah berlebihan",
              "Kerapian ikhfa sesuai martabat aqrab, ausath, atau ab'ad"
            ]
          }
        ],
        deductionRules: [
          { ruleName: "Kesalahan Jali (Fatal)", penaltyPoints: 1.0, description: "Tertukar makhraj huruf (cth: س menjadi ص), salah harakat (dhammah jadi fathah), atau menggugurkan tasydid.", categoryType: 'JALI' },
          { ruleName: "Kesalahan Khafi (Samar)", penaltyPoints: 0.5, description: "Kurang kadar ghunnah, mad kurang pas 1/2 harakat, atau getaran qalqalah kurang proporsional.", categoryType: 'KHAFI' }
        ],
        judgeTips: "Fokus pada konsistensi mad dan keaslian makhraj. Nilai awal tajwid ideal dimulai dari 28-30 kemudian dikurangi tiap menemukan kekhilafan."
      },
      {
        id: 'fashahah',
        name: "Fashahah & Adab (Waqaf Ibtida' & Kesantunan)",
        weightPercent: 30,
        maxScore: 30,
        subComponents: [
          {
            title: "Ahkamul Waqf wal Ibtida'",
            pointsRange: "12 - 14 Poin",
            description: "Kecakapan memilih titik berhenti (waqaf tam, kafi, hasan) dan memulai kembali (ibtida') tanpa merusak makna ayat Al-Qur'an.",
            nationalStandardIndicators: [
              "Menghindari waqaf qabih (berhenti pada makna terpotong/rusak)",
              "Ibtida' yang fasih dan mencerminkan pemahaman kalamullah",
              "Penggunaan tanda waqaf lazim (م), jaiz (ج), dan washal awla (صلى)"
            ]
          },
          {
            title: "Mura'atul Kalimah wal Harakat",
            pointsRange: "8 - 10 Poin",
            description: "Keutuhan susunan kata, tamamul harakah (vokal a, i, u bulat sempurna), dan kelancaran artikulasi bahasa Arab.",
            nationalStandardIndicators: [
              "Tidak terjadi imalah liar pada vokal fathah",
              "Kejelasan tasydid dan tanwin saat washal",
              "Ketiadaan saktah yang tidak pada tempatnya"
            ]
          },
          {
            title: "Adabut Tilawah & Sikap Mimbar",
            pointsRange: "6 - 8 Poin",
            description: "Ketenangan di atas mimbar, kesopanan berpakaian muslim/nusantara, dan khusyu' menghadap mushaf.",
            nationalStandardIndicators: [
              "Adab ta'awwudz, basmalah, dan tashdiq",
              "Ketenangan postur tubuh saat melantunkan nada tinggi",
              "Kepatuhan terhadap tata tertib panggung"
            ]
          }
        ],
        deductionRules: [
          { ruleName: "Waqaf Qabih / Rusak Makna", penaltyPoints: 1.0, description: "Berhenti pada kalimat yang merusak aqidah/makna ayat tanpa diulang.", categoryType: 'JALI' },
          { ruleName: "Ibtida' Hasan tapi Tidak Tuntas", penaltyPoints: 0.5, description: "Memulai dari kata yang kurang sempurna namun makna ayat masih tertangkap.", categoryType: 'KHAFI' },
          { ruleName: "Pelanggaran Sikap Mimbar", penaltyPoints: 0.5, description: "Gerakan berlebihan yang mengurangi kehormatan mimbar tilawah.", categoryType: 'ADAB' }
        ],
        judgeTips: "Perhatikan apakah peserta bernafas di tengah kalimat tanpa mengulang kalimat sebelumnya saat menyambung (ibtida')."
      },
      {
        id: 'irama',
        name: "Lagu & Variasi Nagham (Maqamat)",
        weightPercent: 25,
        maxScore: 25,
        subComponents: [
          {
            title: "Komposisi Maqamat (Bayati, Shaba, Hijaz, Nahawand, Rast, Sika, Jiharkah)",
            pointsRange: "10 - 12 Poin",
            description: "Penguasaan minimal 4 maqam standar seni baca Al-Qur'an dengan transisi yang harmonis.",
            nationalStandardIndicators: [
              "Lagu 1 wajib: Bayati (Qarar, Nawa, Jawab, Jawabul Jawab)",
              "Transisi maqam mengalir alami tanpa jeda canggung",
              "Penutupan kembali ke maqam Bayati / Rast yang anggun"
            ]
          },
          {
            title: "Variasi & Improvisasi Cengkok (Wushlah)",
            pointsRange: "8 - 9 Poin",
            description: "Kekayaan variasi qith'ah, kushlah, dan keselarasan tangga nada dengan harakat ayat.",
            nationalStandardIndicators: [
              "Cengkok orisinal yang tidak berlebihan hingga merusak tajwid",
              "Keseimbangan tempo lambat-sedang (irama mujawwad klasik)"
            ]
          },
          {
            title: "Keutuhan Irama & Tempo",
            pointsRange: "4 - 5 Poin",
            description: "Konsistensi ketukan dari awal hingga akhir penampilan.",
            nationalStandardIndicators: [
              "Tempo stabil tidak terburu-buru atau terseret lambat"
            ]
          }
        ],
        deductionRules: [
          { ruleName: "Fals / Sumbang Tangga Nada", penaltyPoints: 1.0, description: "Penyimpangan nada yang nyata saat perpindahan tingkatan maqam.", categoryType: 'TEKNIS' },
          { ruleName: "Kurang dari 4 Maqam Lagu", penaltyPoints: 1.5, description: "Menampilkan kurang dari batas minimal maqam yang disyaratkan LPTQ.", categoryType: 'TEKNIS' },
          { ruleName: "Cengkok Berlebihan Mengorbankan Tajwid", penaltyPoints: 1.0, description: "Lagu meliuk panjang hingga melewati batas ketukan mad lazim/thabi'i.", categoryType: 'TEKNIS' }
        ],
        judgeTips: "Nilai kehalusan transisi dari Hijaz ke Nahawand atau Rast. Lagu tidak boleh mengubah hak-hak tajwid."
      },
      {
        id: 'suara',
        name: "Suara & Ketahanan Nafas",
        weightPercent: 15,
        maxScore: 15,
        subComponents: [
          {
            title: "Keutuhan Vokal & Kemerduan",
            pointsRange: "7 - 8 Poin",
            description: "Kejernihan suara, tidak serak/parau, kemantapan vokal pada tingkatan qarar hingga jawabul jawab.",
            nationalStandardIndicators: [
              "Kemerduan alami vokal dan resonansi rongga dada/kepala",
              "Kekuatan vokal menjangkau nada tinggi tanpa berteriak"
            ]
          },
          {
            title: "Kestabilan & Ketahanan Nafas",
            pointsRange: "6 - 7 Poin",
            description: "Pengaturan sirkulasi nafas yang efisien, tidak terengah-engah, dan mampu menyelesaikan waqaf panjang.",
            nationalStandardIndicators: [
              "Ujung kalimat tidak terputus karena kehabisan nafas",
              "Ketenangan mengambil nafas diafragma"
            ]
          }
        ],
        deductionRules: [
          { ruleName: "Suara Pecah / Tercekat", penaltyPoints: 1.0, description: "Vokal pecah di nada tinggi yang mengganggu kenikmatan mendengarkan.", categoryType: 'TEKNIS' },
          { ruleName: "Kehabisan Nafas di Tengah Kata", penaltyPoints: 0.5, description: "Suara mendadak hilang sebelum kata selesai diucapkan.", categoryType: 'TEKNIS' }
        ],
        judgeTips: "Bandingkan kemerduan nada lembut dan tenaga nada tinggi. Suara yang baik terdengar bulat dan nyaman di telinga."
      }
    ]
  },

  // 2. QIRA'AT AL-QUR'AN
  {
    branchId: 'qiraat',
    branchCode: 'QIR',
    branchName: "Qira'at Al-Qur'an (Mujawwad & Murattal)",
    legalBasis: "Standar Penjurian Qira'at Sab'ah / 'Asyrah LPTQ Nasional",
    generalRules: [
      "Mengacu pada riwayat qira'at yang telah diundi (Warsy 'an Nafi', Qalun, Ibnu Katsir, Abu 'Amr, Syu'bah 'an 'Ashim, Hamzah, Al-Kisa'i).",
      "Kategori Murattal: Membaca secara tartil, ritmis berketukan rapi, fokus keotentikan ushul dan farsy riwayat.",
      "Kategori Mujawwad: Membaca dengan seni lagu nagham MTQ sesuai ketentuan riwayat.",
      "Waktu tampil 8 - 10 menit."
    ],
    bellRules: [
      { bellNumber: 1, color: "bg-emerald-500", meaning: "Bel 1x", actionDescription: "Mulai membaca riwayat yang ditentukan." },
      { bellNumber: 2, color: "bg-amber-500", meaning: "Bel 2x", actionDescription: "Peringatan 1 menit terakhir." },
      { bellNumber: 3, color: "bg-rose-500", meaning: "Bel 3x", actionDescription: "Waktu selesai." }
    ],
    scoringGuidanceSummary: "Bobot: Kaidah Ushul & Farsy Khusus Riwayat (35%), Fashahah & Waqaf (25%), Lagu & Irama (25%), Suara/Nafas (15%).",
    criteriaDetails: [
      {
        id: 'kaidah_qiraat',
        name: "Kaidah Ushul & Farsy Khusus Riwayat",
        weightPercent: 35,
        maxScore: 35,
        subComponents: [
          {
            title: "Penerapan Ushul Riwayat",
            pointsRange: "18 - 20 Poin",
            description: "Kaidah umum riwayat: Imalah (kubra/shughra), Tashil hamzah, Ibdal, Naql, Silah mim jamak, Saktah, Idgham kabir.",
            nationalStandardIndicators: [
              "Ketepatan imalah pada Riwayat Al-Kisa'i atau Warsy",
              "Penerapan tashil baina-baina pada hamzataini min kalimah",
              "Konsistensi bacaan silah atau sukun pada mim jamak"
            ]
          },
          {
            title: "Farsyul Huruf",
            pointsRange: "13 - 15 Poin",
            description: "Perbedaan bacaan pada kata-kata khusus pada surat yang dibaca sesuai jalur thariq Asy-Syathibiyyah.",
            nationalStandardIndicators: [
              "Ketepatan melafalkan kata spesifik riwayat tanpa tercampur riwayat Hafsh",
              "Ketiadaan tasykik (keraguan melafalkan farsy)"
            ]
          }
        ],
        deductionRules: [
          { ruleName: "Percampuran Riwayat (Khalthur Riwayat)", penaltyPoints: 2.0, description: "Membaca kaidah riwayat lain yang tidak sesuai dengan yang diundi.", categoryType: 'JALI' },
          { ruleName: "Kekhilafan Kaidah Ushul", penaltyPoints: 1.0, description: "Lupa menerapkan kaidah ushul (cth: tidak imalah padahal wajib imalah).", categoryType: 'JALI' }
        ],
        judgeTips: "Pastikan peserta tidak melompat kembali ke riwayat Hafsh saat fokus pada irama atau nada tinggi."
      },
      {
        id: 'fashahah',
        name: "Fashahah & Ahkamul Waqf wal Ibtida'",
        weightPercent: 25,
        maxScore: 25,
        subComponents: [
          {
            title: "Waqaf Ibtida' Sesuai Thariq Riwayat",
            pointsRange: "13 - 15 Poin",
            description: "Pemilihan waqaf yang tepat dengan memperhatikan kekhususan riwayat (seperti waqaf pada hamzah bagi Hamzah).",
            nationalStandardIndicators: [
              "Waqaf hasan dan tam yang menjaga kesucian makna ayat"
            ]
          },
          {
            title: "Kefasihan Fonetik & Kebersihan Lafal",
            pointsRange: "10 Poin",
            description: "Kejelasan vokal fonetik dialek qira'at yang dibawakan.",
            nationalStandardIndicators: ["Artikulasi yang terang dan tajam"]
          }
        ],
        deductionRules: [
          { ruleName: "Kesalahan Waqaf Ibtida' Fatal", penaltyPoints: 1.0, description: "Waqaf pada kalimat yang merusak makna.", categoryType: 'JALI' }
        ],
        judgeTips: "Cermati waqaf pada kalimat yang mengandung hamzah atau ibdal."
      },
      {
        id: 'lagu',
        name: "Lagu & Irama (Mujawwad / Murattal)",
        weightPercent: 25,
        maxScore: 25,
        subComponents: [
          {
            title: "Keserasian Maqamat / Irama Tartil",
            pointsRange: "25 Poin",
            description: "Keindahan lagu mujawwad atau kemantapan ketukan murattal qira'at.",
            nationalStandardIndicators: ["Kelembutan irama khas qira'at sab'ah"]
          }
        ],
        deductionRules: [
          { ruleName: "Lagu Menghilangkan Kaidah Riwayat", penaltyPoints: 1.0, description: "Irama membuat kaidah ushul menjadi samar.", categoryType: 'TEKNIS' }
        ],
        judgeTips: "Murattal dinilai dari kestabilan tempo; Mujawwad dinilai dari variasi dan perpindahan maqam."
      },
      {
        id: 'suara',
        name: "Kejernihan Suara & Nafas",
        weightPercent: 15,
        maxScore: 15,
        subComponents: [
          {
            title: "Kejernihan Vokal & Pengaturan Nafas",
            pointsRange: "15 Poin",
            description: "Kemerduan dan ketahanan nafas peserta.",
            nationalStandardIndicators: ["Vokal bersih dan jernih"]
          }
        ],
        deductionRules: [
          { ruleName: "Kehabisan Nafas", penaltyPoints: 0.5, description: "Terputus sebelum titik waqaf.", categoryType: 'TEKNIS' }
        ],
        judgeTips: "Nilai keutuhan nada dari awal sampai salam penutup."
      }
    ]
  },

  // 3. HIFZH AL-QUR'AN (MHQ)
  {
    branchId: 'hifzh',
    branchCode: 'MHQ',
    branchName: "Hifzh Al-Qur'an (1, 5, 10, 20, 30 Juz)",
    legalBasis: "Pedoman Musabaqah Hifzhil Qur'an (MHQ) LPTQ Nasional & Standar Pengujian Tahfizh Kemenag",
    generalRules: [
      "Setiap peserta diuji dengan 3 - 4 maqra' soal berupa potongan awal/tengah ayat.",
      "Peserta menyambung ayat minimal 1 - 2 halaman mushaf per soal.",
      "Dewan Hakim menggunakan sistem kode bel resmi (Bel 1x: Pindah soal/Mulai, Bel 2x: Peringatan salah/tanbih, Bel 3x: Selesai).",
      "Sanksi Fathul Hakim: Jika setelah bel peringatan 2x peserta belum mampu mengoreksi, majelis hakim memberikan fath/bimbingan lafal (-2 poin)."
    ],
    bellRules: [
      { bellNumber: 1, color: "bg-emerald-500", meaning: "Tung 1x (Bel Mulai/Pindah)", actionDescription: "Tanda mulai membaca atau tanda berpindah ke soal berikutnya." },
      { bellNumber: 2, color: "bg-amber-500", meaning: "Tung-Tung 2x (Bel Peringatan / Tanbih)", actionDescription: "Peringatan ada kekhilafan hafalan/tajwid; peserta wajib mengulang atau mengoreksi." },
      { bellNumber: 3, color: "bg-rose-500", meaning: "Tung-Tung-Tung 3x (Bel Tuntas)", actionDescription: "Tanda soal telah selesai dijawab atau waktu musabaqah tuntas." }
    ],
    scoringGuidanceSummary: "Bobot: Tahfizh/Kelancaran (50%), Tajwid (25%), Fashahah & Adab (25%). Nilai awal Tahfizh adalah 50 poin penuh dan berkurang tiap terjadi kesalahan.",
    criteriaDetails: [
      {
        id: 'kelancaran',
        name: "Bidang Tahfizh (Kelancaran Hafalan Mutqin)",
        weightPercent: 50,
        maxScore: 50,
        subComponents: [
          {
            title: "Kelancaran Menyambung Ayat",
            pointsRange: "Maksimal 50 Poin (Sistem Potong Nilai)",
            description: "Kekuatan hafalan menyambung ayat tanpa jeda ragu, tanpa salah huruf, tanpa salah baris, dan tanpa bimbingan.",
            nationalStandardIndicators: [
              "Langsung menyambung begitu dewan hakim membacakan maqra'",
              "Mutqin dalam mutasyabihat (ayat-ayat serupa)",
              "Kecepatan tempo sedang (hadr atau tadwir teratur)"
            ]
          }
        ],
        deductionRules: [
          { ruleName: "Tardid (Ragu / Mengulang Kata)", penaltyPoints: 0.5, description: "Mengulang kata atau frasa lebih dari sekali karena keraguan hafalan.", categoryType: 'KHAFI' },
          { ruleName: "Tawaqquf (Tersendat / Terdiam)", penaltyPoints: 1.0, description: "Berhenti dan terdiam lama karena lupa ayat berikutnya.", categoryType: 'JALI' },
          { ruleName: "Fathul Hakim (Bimbingan Dewan Hakim)", penaltyPoints: 2.0, description: "Hakim membacakan kelanjutan ayat setelah peserta 2x dibunyikan bel tanbih namun tidak dapat melanjutkan.", categoryType: 'JALI' },
          { ruleName: "Melompati / Menukar Ayat (Tarkul Ayah)", penaltyPoints: 2.0, description: "Melompati satu ayat atau masuk ke ayat dari surat lain.", categoryType: 'JALI' }
        ],
        judgeTips: "Catat jumlah bel tanbih dan fathul hakim secara teliti. Setiap fath bernilai minus 2.0 mutlak dari modal 50 poin."
      },
      {
        id: 'tajwid',
        name: "Bidang Tajwid Saat Melantunkan Hafalan",
        weightPercent: 25,
        maxScore: 25,
        subComponents: [
          {
            title: "Kaidah Tajwid dalam Hifzh",
            pointsRange: "25 Poin",
            description: "Kebenaran makhraj, sifat huruf, mad, ghunnah, dan tafkhim/tarqiq saat hafalan meluncur deras.",
            nationalStandardIndicators: [
              "Hafalan cepat tidak boleh merusak kadar mad thabi'i",
              "Ghunnah tetap terjaga 2 harakat",
              "Makharijul huruf tetap presisi"
            ]
          }
        ],
        deductionRules: [
          { ruleName: "Kesalahan Tajwid Jali", penaltyPoints: 1.0, description: "Tertukar makhraj atau mengganti harakat saat melafalkan hafalan.", categoryType: 'JALI' },
          { ruleName: "Kesalahan Tajwid Khafi", penaltyPoints: 0.5, description: "Ghunnah berkurang atau mad kurang pas harakatnya.", categoryType: 'KHAFI' }
        ],
        judgeTips: "Perhatikan bahwa hafalan yang sangat lancar kerap memotong hak-hak mad dan ghunnah."
      },
      {
        id: 'fashahah',
        name: "Bidang Fashahah & Adab Tilawah",
        weightPercent: 25,
        maxScore: 25,
        subComponents: [
          {
            title: "Waqaf Ibtida' & Kefasihan Lafal",
            pointsRange: "25 Poin",
            description: "Ketepatan waqaf ibtida' saat bernafas dan adab terhadap majelis dewan hakim.",
            nationalStandardIndicators: [
              "Berhenti di waqaf yang tepat",
              "Adab santun saat menerima maqra' soal"
            ]
          }
        ],
        deductionRules: [
          { ruleName: "Waqaf Qabih / Tercekat", penaltyPoints: 0.5, description: "Berhenti di tempat terlarang karena kehabisan nafas mendadak.", categoryType: 'ADAB' }
        ],
        judgeTips: "Nilai kebersihan pengucapan huruf dan ketenangan peserta di atas kursi musabaqah."
      }
    ]
  },

  // 4. TAFSIR AL-QUR'AN
  {
    branchId: 'tafsir',
    branchCode: 'TFR',
    branchName: "Tafsir Al-Qur'an (Arab, Indonesia, Inggris)",
    legalBasis: "Buku Pedoman Musabaqah Tafsir Al-Qur'an LPTQ Nasional",
    generalRules: [
      "Menguji hafalan ayat (tahfizh materi) dan kedalaman analisis tafsir.",
      "Tafsir Bahasa Arab: Hafalan 30 juz + Tafsir Juz yang ditentukan dalam Bahasa Arab fushah.",
      "Tafsir Bahasa Indonesia & Inggris: Hafalan materi juz tertentu + presentasi analisis tafsir dalam bahasa terpilih.",
      "Rujukan utama: Tafsir Ibnu Katsir, At-Thabari, Al-Qurthubi, As-Sa'di, dan Tafsir Kemenag RI."
    ],
    scoringGuidanceSummary: "Bobot: Hafalan Ayat (30%), Pemahaman Tafsir & Konteks (40%), Penguasaan Bahasa & Retorika (30%).",
    criteriaDetails: [
      {
        id: 'hafalan_ayat',
        name: "Hafalan Ayat Terkait (Tahfizh & Tajwid)",
        weightPercent: 30,
        maxScore: 30,
        subComponents: [
          {
            title: "Ketepatan Melantunkan Ayat yang Ditafsirkan",
            pointsRange: "30 Poin",
            description: "Kelancaran hafalan ayat bersangkutan beserta ketepatan kaidah tajwid.",
            nationalStandardIndicators: ["Lancar tanpa tawaqquf", "Tajwid sempurna"]
          }
        ],
        deductionRules: [
          { ruleName: "Lupa Ayat", penaltyPoints: 1.0, description: "Tersendat saat melafalkan ayat yang ditafsirkan.", categoryType: 'JALI' }
        ],
        judgeTips: "Pastikan peserta hafal teks ayat dan nomor ayat/surat yang ditanyakan."
      },
      {
        id: 'pemahaman_tafsir',
        name: "Kedalaman Pemahaman Isi, Asbabun Nuzul & Munasabah",
        weightPercent: 40,
        maxScore: 40,
        subComponents: [
          {
            title: "Analisis Makna Mufradat & Asbabun Nuzul",
            pointsRange: "20 Poin",
            description: "Penjelasan kosa kata gharib, latar belakang turunnya ayat (asbabun nuzul), dan korelasi antar ayat (munasabah).",
            nationalStandardIndicators: [
              "Mengutip riwayat asbabun nuzul yang shahih",
              "Mengurai makna leksikal dan terminologis",
              "Korelasi ayat dengan problematika kekinian"
            ]
          },
          {
            title: "Rujukan Kitab Tafsir Mu'tabarah",
            pointsRange: "20 Poin",
            description: "Penyebutan pendapat ulama salaf dan khalaf dari kitab tafsir rujukan.",
            nationalStandardIndicators: ["Menyebutkan pandangan Ibnu Katsir, Thabari, dll"]
          }
        ],
        deductionRules: [
          { ruleName: "Salah Memahami Maksud Ayat", penaltyPoints: 2.0, description: "Penafsiran keliru yang bertentangan dengan ijma' ulama tafsir.", categoryType: 'JALI' },
          { ruleName: "Ketidaktepatan Mengutip Riwayat", penaltyPoints: 1.0, description: "Menyandarkan hadits maudhu' atau salah nama perawi asbabun nuzul.", categoryType: 'KHAFI' }
        ],
        judgeTips: "Uji peserta dengan pertanyaan 'Bagaimana relevansi ayat ini dengan moderasi beragama dan kehidupan berbangsa?'"
      },
      {
        id: 'bahasa_retorika',
        name: "Penguasaan Bahasa & Retorika Ilmiah",
        weightPercent: 30,
        maxScore: 30,
        subComponents: [
          {
            title: "Gramatika Bahasa (Nahwu/Sharaf / English Grammar)",
            pointsRange: "15 Poin",
            description: "Ketepatan tata bahasa asing/Indonesia yang digunakan tanpa kesalahan i'rab.",
            nationalStandardIndicators: ["Bahasa Arab fushah fasih", "Kelancaran English phrasing"]
          },
          {
            title: "Retorika & Kelugasan Argumentasi",
            pointsRange: "15 Poin",
            description: "Sistematika penyampaian gagasan secara ilmiah dan meyakinkan.",
            nationalStandardIndicators: ["Sistematis, percaya diri, dan logis"]
          }
        ],
        deductionRules: [
          { ruleName: "Kesalahan I'rab / Fatal Grammar", penaltyPoints: 1.0, description: "Salah harakat gramatika yang merusak struktur kalimat.", categoryType: 'JALI' }
        ],
        judgeTips: "Dengarkan ketepatan struktur kalimat dan diksi ilmiah yang dipakai."
      }
    ]
  },

  // 5. FAHMIL QUR'AN (MFQ)
  {
    branchId: 'fahmil',
    branchCode: 'MFQ',
    branchName: "Fahmil Qur'an (MFQ - Beregu)",
    legalBasis: "Panduan Musabaqah Fahmil Qur'an LPTQ Tingkat Nasional",
    generalRules: [
      "Setiap regu terdiri dari 3 orang (1 juru bicara di tengah dan 2 pendamping).",
      "Babak 1: Soal Paket Regu (10-12 soal untuk masing-masing regu). Benar = 100 poin, sebagian benar = 25-75 poin, salah = 0 (dapat dilempar ke regu lain).",
      "Babak 2: Soal Rebutan (10-15 soal terbuka dengan sistem bel cepat tepat). Menjawab BENAR = +100 poin, menjawab SALAH = -100 poin!",
      "Materi soal meliputi: Ulumul Qur'an, Hadist, Fiqih/Ushul Fiqih, Sejarah Peradaban Islam (SKI), Bahasa Arab/Inggris, Wawasan Kebangsaan, dan Penerjemahan Ayat."
    ],
    scoringGuidanceSummary: "Bobot: Soal Paket Regu (40%), Soal Rebutan & Penguasaan Dalil (40%), Kekompakan & Sinergi (20%). Sistem skor bersifat matematis kuantitatif.",
    criteriaDetails: [
      {
        id: 'soal_paket',
        name: "Skor Soal Paket Regu Sendiri",
        weightPercent: 40,
        maxScore: 40,
        subComponents: [
          {
            title: "Ketepatan Jawaban Soal Paket",
            pointsRange: "0 - 40 Poin",
            description: "Akurasi menjawab pertanyaan wajib regu dalam durasi 5-10 detik setelah soal dibacakan tuntas.",
            nationalStandardIndicators: [
              "Jawaban langsung tepat sasaran",
              "Kutipan dalil surat dan nomor ayat tepat"
            ]
          }
        ],
        deductionRules: [
          { ruleName: "Jawaban Kurang Lengkap", penaltyPoints: 1.0, description: "Hanya menjawab sebagian dari pertanyaan bertingkat.", categoryType: 'KHAFI' }
        ],
        judgeTips: "Berikan nilai 100 jika sempurna, atau 50 jika hanya terjawab separuh unsur pertanyaan."
      },
      {
        id: 'soal_rebutan',
        name: "Skor Soal Rebutan (Cepat Tepat)",
        weightPercent: 40,
        maxScore: 40,
        subComponents: [
          {
            title: "Kecepatan Bel & Ketepatan Jawaban Rebutan",
            pointsRange: "0 - 40 Poin",
            description: "Kemampuan menekan bel lebih dahulu dan menjawab benar tanpa ragu.",
            nationalStandardIndicators: [
              "Kecepatan menekan bel setelah dipersilakan dewan hakim",
              "Jawaban tegas dan akurat"
            ]
          }
        ],
        deductionRules: [
          { ruleName: "Salah Jawab Rebutan", penaltyPoints: 2.0, description: "Jawaban salah di babak rebutan dikenakan sanksi pengurangan nilai mutlak -100 poin.", categoryType: 'JALI' },
          { ruleName: "Menjawab Sebelum Dipersilakan", penaltyPoints: 1.0, description: "Menjawab sebelum dewan hakim menyebut nomor regu penekan bel tercepat.", categoryType: 'ADAB' }
        ],
        judgeTips: "Sanksi pengurangan nilai pada babak rebutan harus diterapkan tegas untuk menjaga disiplin musabaqah."
      },
      {
        id: 'kerjasama',
        name: "Kekompakan & Sinergi Beregu",
        weightPercent: 20,
        maxScore: 20,
        subComponents: [
          {
            title: "Sinergi Juru Bicara & Pendamping",
            pointsRange: "20 Poin",
            description: "Kerjasama efektif dalam regu dalam waktu singkat sebelum juru bicara memberikan jawaban akhir.",
            nationalStandardIndicators: ["Sinergi kompak dan tenang"]
          }
        ],
        deductionRules: [
          { ruleName: "Kegaduhan Beregu", penaltyPoints: 0.5, description: "Perdebatan internal regu yang mengganggu jalannya musabaqah.", categoryType: 'ADAB' }
        ],
        judgeTips: "Nilai kesigapan pendamping dalam membisikkan data rujukan nomor surat atau riwayat hadist."
      }
    ]
  },

  // 6. SYARHIL QUR'AN (MSQ)
  {
    branchId: 'syarhil',
    branchCode: 'MSQ',
    branchName: "Syarhil Qur'an (MSQ - Beregu)",
    legalBasis: "Buku Pedoman Musabaqah Syarhil Qur'an LPTQ Nasional",
    generalRules: [
      "Musabaqah beregu terdiri dari 3 orang: Pensyarah (orator), Qari/Qari'ah (pelantun ayat), dan Sari Tilawah (puitisasi terjemahan).",
      "Waktu tampil 15 - 20 menit (ideal 17 menit).",
      "Tema syarahan ditentukan dari tema resmi LPTQ (cth: Penguatan Moderasi Beragama, Transformasi Digital Berkeberadaban, Ketahanan Keluarga Sakinah, dll).",
      "Tidak diperkenankan membawa teks naskah ke atas mimbar (tampil hafalan/improvisasi orasi)."
    ],
    scoringGuidanceSummary: "Bobot: Penghayatan & Retorika (40%), Materi & Terjemah (30%), Tilawah & Harmonisasi (30%).",
    criteriaDetails: [
      {
        id: 'penghayatan_retorika',
        name: "Penghayatan, Retorika & Orasi Pensyarah",
        weightPercent: 40,
        maxScore: 40,
        subComponents: [
          {
            title: "Vokal, Artikulasi & Modulasi Orator",
            pointsRange: "18 - 20 Poin",
            description: "Daya pikat orasi, volume suara lantang berwibawa, modulasi nada persuasif, dan artikulasi bahasa Indonesia yang jelas.",
            nationalStandardIndicators: [
              "Vokal bertenaga tanpa berteriak kasar",
              "Diksi bahasa yang kaya dan menyentuh kalbu",
              "Penggunaan bahasa tubuh dan kontak mata yang wajar"
            ]
          },
          {
            title: "Ketepatan Waktu & Sistematika Pidato",
            pointsRange: "18 - 20 Poin",
            description: "Sistematika pengantar, pembahasan inti, argumentasi, dan kesimpulan dalam rentang 15-20 menit.",
            nationalStandardIndicators: [
              "Tepat waktu (tidak kurang dari 15 mnt, tidak lebih dari 20 mnt)",
              "Struktur logika dakwah tertata apik"
            ]
          }
        ],
        deductionRules: [
          { ruleName: "Kelebihan / Kekurangan Waktu", penaltyPoints: 1.0, description: "Tampil melebihi 20 menit atau kurang dari 15 menit.", categoryType: 'WAKTU' },
          { ruleName: "Membawa Catatan Teks Naskah", penaltyPoints: 2.0, description: "Pensyarah membawa contekan kertas naskah.", categoryType: 'ADAB' }
        ],
        judgeTips: "Nilai daya sentuh orasi terhadap audiens dan dewan hakim. Apakah pesan Al-Qur'an tersampaikan dengan hikmah?"
      },
      {
        id: 'materi_terjemah',
        name: "Kedalaman Materi, Analisis & Terjemahan",
        weightPercent: 30,
        maxScore: 30,
        subComponents: [
          {
            title: "Bobot Ilmiah & Kesesuaian Dalil Naqli",
            pointsRange: "15 Poin",
            description: "Kedalaman telaah ayat Al-Qur'an dan Hadist yang diintegrasikan dengan data empiris dan problematika bangsa.",
            nationalStandardIndicators: [
              "Kutipan ayat relevan dengan tema",
              "Analisis komprehensif berlandaskan tafsir muktabar"
            ]
          },
          {
            title: "Kualitas Sari Tilawah & Puitisasi",
            pointsRange: "15 Poin",
            description: "Penyampaian terjemah ayat secara puitis, mendalam, dan menghanyutkan oleh sari tilawah.",
            nationalStandardIndicators: [
              "Intonasi sari tilawah menggetarkan jiwa",
              "Terjemahan akurat sesuai kaidah tafsir Kemenag RI"
            ]
          }
        ],
        deductionRules: [
          { ruleName: "Salah Terjemahan Ayat", penaltyPoints: 1.0, description: "Terjemahan keliru atau melompat kata dari teks asli.", categoryType: 'JALI' }
        ],
        judgeTips: "Perhatikan apakah dalil ayat yang dikutip dibahas tuntas oleh pensyarah atau hanya dijadikan hiasan semata."
      },
      {
        id: 'tilawah_adab',
        name: "Kualitas Tilawah Qari & Harmonisasi Regu",
        weightPercent: 30,
        maxScore: 30,
        subComponents: [
          {
            title: "Kualitas Lagu Nagham & Tajwid Qari",
            pointsRange: "15 Poin",
            description: "Kemerduan lantunan ayat pembuka dan penjelas oleh qari/qari'ah dengan kaidah tajwid dan nagham yang indah.",
            nationalStandardIndicators: [
              "Tajwid dan fashahah qari terjaga sempurna",
              "Irama lagu menyatu dengan suasana tema"
            ]
          },
          {
            title: "Kekompakan & Busana Panggung",
            pointsRange: "15 Poin",
            description: "Keseragaman busana adat/islami, transisi mulus antara qari, sari tilawah, dan pensyarah.",
            nationalStandardIndicators: [
              "Transisi tanpa jeda canggung",
              "Kerapian tata panggung mimbar"
            ]
          }
        ],
        deductionRules: [
          { ruleName: "Kesalahan Tajwid Qari", penaltyPoints: 1.0, description: "Kesalahan jali pada lantunan qari pengiring.", categoryType: 'JALI' }
        ],
        judgeTips: "Sinergi 3 personil adalah kunci MSQ: qari membaca ayat, sari tilawah menyambung maknanya, dan pensyarah mengupas hikmahnya."
      }
    ]
  },

  // 7. KHATH AL-QUR'AN (MKQ / KALIGRAFI)
  {
    branchId: 'khath',
    branchCode: 'MKQ',
    branchName: "Khath Al-Qur'an (Kaligrafi Islam)",
    legalBasis: "Standar Penjurian Seni Kaligrafi Islam LPTQ Nasional & Lembaga Kaligrafi Al-Qur'an (LEMKA)",
    generalRules: [
      "Golongan: Naskah, Hiasan Mushaf, Dekorasi, dan Kaligrafi Kontemporer.",
      "Waktu pembuatan karya: 7 - 8 jam di ruang lomba steril tanpa bantuan gawai.",
      "Karya dibuat langsung di hadapan dewan hakim pengawas di atas media yang disediakan/diverifikasi panitia.",
      "Memenuhi kaidah baku khattatiin (Mizan Huruf) untuk kaligrafi murni."
    ],
    scoringGuidanceSummary: "Bobot: Kaidah Khath & Anatomi Huruf (45%), Keindahan Ornamen & Tata Warna (35%), Kebersihan & Kerapian (20%).",
    criteriaDetails: [
      {
        id: 'kaidah_khath',
        name: "Kaidah Khath & Ketepatan Anatomi Huruf",
        weightPercent: 45,
        maxScore: 45,
        subComponents: [
          {
            title: "Kebenaran Bentuk & Proporsi Huruf (Mizan)",
            pointsRange: "25 Poin",
            description: "Kepatuhan terhadap ukuran titik (nuqthah) pada jenis khath yang dipilih (Tsuluts, Naskhi, Riq'ah, Diwani, Farisi, Kufi).",
            nationalStandardIndicators: [
              "Bentuk kepala, badan, dan ekor huruf sempurna",
              "Tebal tipis goresan pena sesuai sudut kemiringan khath"
            ]
          },
          {
            title: "Ketepatan Kaidah Sambung & Susunan Baris",
            pointsRange: "20 Poin",
            description: "Jarak spasi antar huruf dan keharmonisan susunan kalimat tanpa menumpuk huruf secara terlarang.",
            nationalStandardIndicators: [
              "Tarkib (komposisi susun) yang proporsional",
              "Ketiadaan huruf atau harakat yang tertinggal"
            ]
          }
        ],
        deductionRules: [
          { ruleName: "Kekurangan Huruf / Kata Ayat", penaltyPoints: 5.0, description: "Tertinggalnya huruf atau kata Al-Qur'an pada kanvas karya.", categoryType: 'JALI' },
          { ruleName: "Penyimpangan Kaidah Anatomi Huruf", penaltyPoints: 1.0, description: "Bentuk huruf melenceng dari kaidah mizan klasik.", categoryType: 'TEKNIS' }
        ],
        judgeTips: "Gunakan penggaris ukur mizan titik. Pastikan teks ayat suci tidak ada yang salah harakat atau tertinggal hurufnya."
      },
      {
        id: 'keindahan_tatawarna',
        name: "Keindahan, Ornamen & Komposisi Warna",
        weightPercent: 35,
        maxScore: 35,
        subComponents: [
          {
            title: "Kekayaan Ornamen Islamika (Zakhrafah)",
            pointsRange: "20 Poin",
            description: "Motif nabati/geometris islami yang memperindah bidang kaligrafi tanpa menenggelamkan teks ayat utama.",
            nationalStandardIndicators: [
              "Ornamen simetris dan berimbang",
              "Karakter hiasan mushaf nusantara yang luhur"
            ]
          },
          {
            title: "Harmoni & Gradasi Warna",
            pointsRange: "15 Poin",
            description: "Kombinasi warna primer, sekunder, dan aksen emas (prada) yang serasi dan berestetika tinggi.",
            nationalStandardIndicators: ["Pencampuran warna bersih tanpa bercak kotor"]
          }
        ],
        deductionRules: [
          { ruleName: "Ornamen Menutupi Tulisan Khath", penaltyPoints: 1.0, description: "Hiasan terlalu dominan hingga menyulitkan pembacaan ayat.", categoryType: 'TEKNIS' }
        ],
        judgeTips: "Nilai kontras antara warna latar belakang (background) dan tulisan utama (foreground)."
      },
      {
        id: 'kebersihan',
        name: "Kerapian, Kebersihan & Keterbacaan",
        weightPercent: 20,
        maxScore: 20,
        subComponents: [
          {
            title: "Ketuntasan & Kebersihan Bidang Karya",
            pointsRange: "20 Poin",
            description: "Kehalusan sapuan kuas, ketiadaan coretan koreksi yang kasar, ketajaman garis tepi (outline), dan keterbacaan ayat.",
            nationalStandardIndicators: [
              "Kanvas bersih dari noda sidik jari atau tumpahan cat",
              "Bidang kerja diselesaikan secara tuntas 100%"
            ]
          }
        ],
        deductionRules: [
          { ruleName: "Karya Belum Tuntas Saat Waktu Habis", penaltyPoints: 3.0, description: "Bidang kanvas masih kosong atau ornamen belum diwarnai.", categoryType: 'WAKTU' }
        ],
        judgeTips: "Karya yang bersih dan tuntas mencerminkan adab pelukis kaligrafi terhadap firman Allah SWT."
      }
    ]
  },

  // 8. HADIST NABAWI (MHD)
  {
    branchId: 'hadist',
    branchCode: 'MHD',
    branchName: "Musabaqah Hadist Nabawi (MHD)",
    legalBasis: "Buku Panduan Musabaqah Hadist Seleksi Tilawatil Qur'an dan Hadist (STQH) Nasional",
    generalRules: [
      "Golongan 100 Hadist dengan Sanad: Menghafal 100 hadist pilihan dari Kutubus Sittah lengkap dengan seluruh rantai sanadnya.",
      "Golongan 500 Hadist Tanpa Sanad: Menghafal 500 hadist dari Shahih Bukhari & Muslim beserta pemahaman kandungannya.",
      "Karya Tulis Ilmiah Hadist (KTIH): Penelitian takhrij dan kontekstualisasi hadist Rasulullah SAW.",
      "Pengujian menggunakan maqra' pertanyaan sambung hadist dan takhrij riwayat."
    ],
    scoringGuidanceSummary: "Bobot: Kelancaran Hafalan Matan & Sanad (50%), Tajwid & Fashahah (25%), Pemahaman Syarah & Takhrij (25%).",
    criteriaDetails: [
      {
        id: 'kelancaran_hafalan',
        name: "Kelancaran Hafalan Matan & Rantai Sanad",
        weightPercent: 50,
        maxScore: 50,
        subComponents: [
          {
            title: "Ketepatan Melafalkan Rantai Rawi & Matan",
            pointsRange: "50 Poin (Sistem Potong)",
            description: "Kelancaran hafalan nama-nama perawi (sanad) dari sahabat hingga mukharrij hadist tanpa tertukar.",
            nationalStandardIndicators: [
              "Menyebutkan shighat tahammul (haddatsana, akhbarana, anba'ana) dengan benar",
              "Matan hadist lancar tanpa terhenti"
            ]
          }
        ],
        deductionRules: [
          { ruleName: "Tertukar Nama Rawi Sanad", penaltyPoints: 2.0, description: "Salah menyebut nama perawi dalam sanad hadist.", categoryType: 'JALI' },
          { ruleName: "Tawaqquf / Tersendat di Matan Hadist", penaltyPoints: 1.0, description: "Terdiam lama karena lupa kelanjutan sabda Nabi.", categoryType: 'JALI' }
        ],
        judgeTips: "Hafalan sanad adalah mahkota musabaqah hadist. Nilai awal 50 dikurangi tiap kali ada kekeliruan nama rawi."
      },
      {
        id: 'tajwid_fashahah',
        name: "Tajwid, Fashahah & Artikulasi Lafazh Hadist",
        weightPercent: 25,
        maxScore: 25,
        subComponents: [
          {
            title: "Kefasihan Bahasa Arab & Harakat",
            pointsRange: "25 Poin",
            description: "Ketepatan melafalkan teks hadist sesuai kaidah tata bahasa Arab dan makhraj huruf.",
            nationalStandardIndicators: ["Kefasihan lafal dan intonasi"]
          }
        ],
        deductionRules: [
          { ruleName: "Salah I'rab Harakat Matan Hadist", penaltyPoints: 1.0, description: "Salah baca harakat yang mengubah kedudukan gramatikal.", categoryType: 'JALI' }
        ],
        judgeTips: "Perhatikan harakat akhir kata dan kejelasan tasydid."
      },
      {
        id: 'pemahaman_takhrij',
        name: "Pemahaman Syarah & Kedalaman Takhrij",
        weightPercent: 25,
        maxScore: 25,
        subComponents: [
          {
            title: "Penjelasan Faedah Hukum & Derajat Hadist",
            pointsRange: "25 Poin",
            description: "Penjelasan kandungan fiqih hadist dan kitab mukharrijnya.",
            nationalStandardIndicators: ["Paham asbabul wurud dan hukum"]
          }
        ],
        deductionRules: [
          { ruleName: "Salah Menjelaskan Faedah Hadist", penaltyPoints: 1.0, description: "Penjelasan melenceng dari syarah muktabar.", categoryType: 'KHAFI' }
        ],
        judgeTips: "Tanyakan hikmah dan istimbath hukum dari hadist yang baru dihafalkan."
      }
    ]
  },

  // 9. MAKALAH ILMIAH AL-QUR'AN (MIIQ)
  {
    branchId: 'makalah',
    branchCode: 'MIIQ',
    branchName: "Makalah Ilmiah Al-Qur'an (MIIQ)",
    legalBasis: "Panduan Penulisan & Penjurian Karya Ilmiah Al-Qur'an LPTQ Nasional",
    generalRules: [
      "Penulisan karya tulis ilmiah secara langsung selama 8 jam di ruang komputer terawasi dan terkunci akses internetnya.",
      "Karya ilmiah menggunakan metode Tafsir Maudhu'i (Tematik) dengan merujuk mushaf Al-Qur'an dan literatur tafsir/jurnal terindeks.",
      "Babak Final: Presentasi di hadapan Majelis Dewan Hakam (15 menit presentasi + 20 menit sesi tanya jawab dan sanggahan).",
      "Karya diuji orisinalitasnya menggunakan software anti-plagiarisme (Turnitin / sejenis, toleransi kemiripan < 20%)."
    ],
    scoringGuidanceSummary: "Bobot: Bobot Materi & Metodologi (40%), Presentasi & Retorika Ilmiah (35%), Sesi Tanya Jawab & Pertahanan Argumentasi (25%).",
    criteriaDetails: [
      {
        id: 'bobot_materi',
        name: "Bobot Materi, Kebaruan Ide & Metodologi",
        weightPercent: 40,
        maxScore: 40,
        subComponents: [
          {
            title: "Orisinalitas Gagasan & Signifikansi Masalah",
            pointsRange: "20 Poin",
            description: "Kebaruan pendekatan dalam membedah isu bangsa kontemporer menggunakan perspektif wahyu Al-Qur'an.",
            nationalStandardIndicators: [
              "Solusi solutif dan aplikatif",
              "Kekayaan data dan landasan teoritis"
            ]
          },
          {
            title: "Metodologi Tafsir Maudhu'i & Kaidah Ilmiah",
            pointsRange: "20 Poin",
            description: "Ketepatan penelusuran ayat tematik, klasifikasi asbabun nuzul, munasabah, dan penarikan kesimpulan ilmiah.",
            nationalStandardIndicators: [
              "Sistematika penulisan karya ilmiah baku",
              "Sitasi rujukan yang dapat dipertanggungjawabkan"
            ]
          }
        ],
        deductionRules: [
          { ruleName: "Indikasi Plagiarisme Tinggi", penaltyPoints: 10.0, description: "Ditemukan kesamaan verbatim tanpa rujukan sitasi resmi.", categoryType: 'JALI' },
          { ruleName: "Kelemahan Metodologi Tafsir", penaltyPoints: 2.0, description: "Ayat yang dikutip tidak relevan dengan rumusan masalah.", categoryType: 'TEKNIS' }
        ],
        judgeTips: "Periksa apakah analisis ayat mendalam atau hanya sekadar tempelan di akhir paragraf."
      },
      {
        id: 'presentasi',
        name: "Presentasi, Retorika & Penguasaan Media",
        weightPercent: 35,
        maxScore: 35,
        subComponents: [
          {
            title: "Kejelasan Penyampaian & Daya Tarik Presentasi",
            pointsRange: "20 Poin",
            description: "Kemampuan memaparkan inti gagasan secara ringkas, lugas, dan terstruktur dalam batas waktu 15 menit.",
            nationalStandardIndicators: [
              "Bahasa Indonesia baku dan komunikatif",
              "Penggunaan media slide presentasi yang efektif"
            ]
          },
          {
            title: "Kepercayaan Diri & Sikap Akademik",
            pointsRange: "15 Poin",
            description: "Sikap rendah hati namun kokoh mempertahankan gagasan ilmiah di hadapan guru besar dewan hakim.",
            nationalStandardIndicators: ["Sikap santun dan ilmiah"]
          }
        ],
        deductionRules: [
          { ruleName: "Melebihi Waktu Presentasi", penaltyPoints: 1.0, description: "Melewati batas waktu 15 menit yang ditentukan moderator.", categoryType: 'WAKTU' }
        ],
        judgeTips: "Nilai kejelasan alur berpikir: Dari Latar Belakang -> Rumusan Masalah -> Analisis Al-Qur'an -> Solusi Rekomendatif."
      },
      {
        id: 'tanya_jawab',
        name: "Penguasaan Referensi Ayat & Sesi Tanya Jawab",
        weightPercent: 25,
        maxScore: 25,
        subComponents: [
          {
            title: "Ketepatan & Kecepatan Menjawab Sanggahan",
            pointsRange: "25 Poin",
            description: "Kemampuan menjawab pertanyaan kritis majelis hakim dengan menyertakan dalil naqli dan rujukan kitab tafsir.",
            nationalStandardIndicators: [
              "Mampu membaca dan melafalkan ayat Al-Qur'an yang dikutip secara fasih",
              "Argumentasi ilmiah yang runtut dan tidak emosional"
            ]
          }
        ],
        deductionRules: [
          { ruleName: "Tidak Mampu Menjawab Pertanyaan Hakim", penaltyPoints: 2.0, description: "Gagal merespon pertanyaan mendasar terkait ayat yang ditulis.", categoryType: 'JALI' }
        ],
        judgeTips: "Minta peserta melafalkan langsung salah satu ayat yang ia kutip di dalam naskah makalahnya."
      }
    ]
  }
];
