export interface CircularLetterData {
  letterNumber: string;
  date: string;
  location: string;
  subject: string;
  recipient: string[];
  eventTitle: string;
  eventPlannedDate: string;
  eventHost: string;
  contingentBreakdown: {
    role: string;
    count: number;
    notes?: string;
  }[];
  totalPerKabKota: number;
  totalProvince: number;
  totalKabKota: number;
  branches: {
    number: number;
    name: string;
    categories: {
      title: string;
      ageLimit: string;
      quota?: string;
    }[];
  }[];
  signer: {
    institution: string;
    role: string;
    name: string;
  };
  copies: string[];
}

export interface FahmilQuestion {
  number: number;
  question: string;
  arabicText?: string;
  answer: string;
  category?: 'Al-Qur\'an' | 'Hadits' | 'Fiqih' | 'Tajwid' | 'Ulumul Qur\'an' | 'Tarikh/Kisah' | 'Bahasa Arab' | 'English' | 'Nagham' | 'Faraidh/Waris';
}

export interface FahmilQuestionPackage {
  id: string;
  code: string;
  title: string;
  round: 'Penyisihan' | 'Lontaran Penyisihan' | 'Semifinal' | 'Lontaran Semifinal' | 'Final' | 'Lontaran Final';
  questions: FahmilQuestion[];
}

export const LPTQ_NTB_SURAT_EDARAN: CircularLetterData = {
  letterNumber: '400.8.2/51/LPTQ-NTB/VII/2026',
  date: '16 Juli 2026',
  location: 'Mataram',
  subject: 'Persiapan MTQ XXXII Tingkat Provinsi NTB Tahun 2027',
  recipient: [
    'Bupati dan Wali Kota se-NTB',
    'Ketua LPTQ Kabupaten/Kota se-NTB'
  ],
  eventTitle: 'MTQ XXXII Tingkat Provinsi Nusa Tenggara Barat Tahun 2027',
  eventPlannedDate: 'Minggu IV bulan Maret 2027 atau Minggu I bulan April 2027',
  eventHost: 'Kabupaten Lombok Utara (KLU)',
  totalPerKabKota: 102,
  totalKabKota: 10,
  totalProvince: 1020,
  contingentBreakdown: [
    { role: 'Pimpinan Kafilah', count: 1 },
    { role: 'Official', count: 9 },
    { role: 'Pelatih', count: 20 },
    { role: 'Peserta Tampil', count: 62 },
    { role: 'Pendamping Peserta Cacat Netra', count: 2 },
    { role: 'Petugas Pawai Ta\'aruf', count: 4 },
    { role: 'Petugas Pameran dan Bazar', count: 4 }
  ],
  branches: [
    {
      number: 1,
      name: 'Cabang Tilawah Al-Qur\'an',
      categories: [
        { title: 'Golongan Tartil (Putra/Putri)', ageLimit: 'Umur maksimal 12 Tahun 11 Bulan 29 Hari' },
        { title: 'Golongan Anak-anak (Putra/Putri)', ageLimit: 'Umur maksimal 14 Tahun 11 Bulan 29 Hari' },
        { title: 'Golongan Remaja (Putra/Putri)', ageLimit: 'Umur maksimal 24 Tahun 11 Bulan 29 Hari' },
        { title: 'Golongan Dewasa (Putra/Putri)', ageLimit: 'Umur maksimal 40 Tahun 11 Bulan 29 Hari' },
        { title: 'Golongan Cacat Netra (Putra/Putri)', ageLimit: 'Umur maksimal 49 Tahun 11 Bulan 29 Hari' }
      ]
    },
    {
      number: 2,
      name: 'Cabang Qira\'at Al-Qur\'an',
      categories: [
        { title: 'Qira\'at As-Sab\'ah Murattal Remaja (Putra/Putri)', ageLimit: 'Umur maksimal 24 Tahun 11 Bulan 29 Hari' },
        { title: 'Qira\'at As-Sab\'ah Murattal Dewasa (Putra/Putri)', ageLimit: 'Umur maksimal 40 Tahun 11 Bulan 29 Hari' },
        { title: 'Qira\'at As-Sab\'ah Mujawwad Dewasa (Putra/Putri)', ageLimit: 'Umur maksimal 40 Tahun 11 Bulan 29 Hari' }
      ]
    },
    {
      number: 3,
      name: 'Cabang Hifzh Al-Qur\'an (Tahfizh)',
      categories: [
        { title: 'Golongan 1 Juz dan Tilawah (Putra/Putri)', ageLimit: 'Umur maksimal 15 Tahun 11 Bulan 29 Hari' },
        { title: 'Golongan 5 Juz dan Tilawah (Putra/Putri)', ageLimit: 'Umur maksimal 20 Tahun 11 Bulan 29 Hari' },
        { title: 'Golongan 10 Juz (Putra/Putri)', ageLimit: 'Umur maksimal 22 Tahun 11 Bulan 29 Hari' },
        { title: 'Golongan 20 Juz (Putra/Putri)', ageLimit: 'Umur maksimal 22 Tahun 11 Bulan 29 Hari' },
        { title: 'Golongan 30 Juz (Putra/Putri)', ageLimit: 'Umur maksimal 22 Tahun 11 Bulan 29 Hari' }
      ]
    },
    {
      number: 4,
      name: 'Cabang Tafsir Al-Qur\'an',
      categories: [
        { title: 'Golongan Tafsir Bahasa Arab (Putra/Putri)', ageLimit: 'Umur maksimal 22 Tahun 11 Bulan 29 Hari' },
        { title: 'Golongan Tafsir Bahasa Indonesia (Putra/Putri)', ageLimit: 'Umur maksimal 34 Tahun 11 Bulan 29 Hari' },
        { title: 'Golongan Tafsir Bahasa Inggris (Putra/Putri)', ageLimit: 'Umur maksimal 34 Tahun 11 Bulan 29 Hari' }
      ]
    },
    {
      number: 5,
      name: 'Cabang Fahmil Qur\'an (MFQ)',
      categories: [
        { title: 'Beregu Putra (1 Regu)', ageLimit: 'Umur maksimal 18 Tahun 11 Bulan 29 Hari', quota: '3 orang per regu' },
        { title: 'Beregu Putri (1 Regu)', ageLimit: 'Umur maksimal 18 Tahun 11 Bulan 29 Hari', quota: '3 orang per regu' }
      ]
    },
    {
      number: 6,
      name: 'Cabang Syarhil Qur\'an (MSQ)',
      categories: [
        { title: 'Beregu Putra (1 Regu)', ageLimit: 'Umur maksimal 18 Tahun 11 Bulan 29 Hari', quota: '3 orang per regu (Pensyarah, Qari/ah, Sari Tilawah)' },
        { title: 'Beregu Putri (1 Regu)', ageLimit: 'Umur maksimal 18 Tahun 11 Bulan 29 Hari', quota: '3 orang per regu (Pensyarah, Qari/ah, Sari Tilawah)' }
      ]
    },
    {
      number: 7,
      name: 'Cabang Khath Al-Qur\'an (Kaligrafi)',
      categories: [
        { title: 'Golongan Penulisan Naskah (Putra/Putri)', ageLimit: 'Umur maksimal 34 Tahun 11 Bulan 29 Hari' },
        { title: 'Golongan Mushaf (Putra/Putri)', ageLimit: 'Umur maksimal 34 Tahun 11 Bulan 29 Hari' },
        { title: 'Golongan Dekorasi (Putra/Putri)', ageLimit: 'Umur maksimal 34 Tahun 11 Bulan 29 Hari' },
        { title: 'Golongan Kaligrafi Kontemporer (Putra/Putri)', ageLimit: 'Umur maksimal 34 Tahun 11 Bulan 29 Hari' },
        { title: 'Golongan Kaligrafi Digital (Putra/Putri)', ageLimit: 'Umur maksimal 34 Tahun 11 Bulan 29 Hari' }
      ]
    },
    {
      number: 8,
      name: 'Cabang Makalah Ilmiah Al-Qur\'an (MIIQ)',
      categories: [
        { title: 'Golongan MIIQ (Putra/Putri)', ageLimit: 'Umur maksimal 24 Tahun 11 Bulan 29 Hari' }
      ]
    },
    {
      number: 9,
      name: 'Cabang Musabaqah Hadits',
      categories: [
        { title: 'Golongan 100 Hadits dengan Sanad (Putra/Putri)', ageLimit: 'Umur maksimal 22 Tahun 11 Bulan 29 Hari' },
        { title: 'Golongan 500 Hadits Tanpa Sanad (Putra/Putri)', ageLimit: 'Umur maksimal 22 Tahun 11 Bulan 29 Hari' },
        { title: 'Karya Tulis Ilmiah Hadits / KTIH (Putra/Putri)', ageLimit: 'Umur maksimal 22 Tahun 11 Bulan 29 Hari' }
      ]
    }
  ],
  signer: {
    institution: 'Lembaga Pengembangan Tilawatil Qur\'an (LPTQ) Provinsi Nusa Tenggara Barat',
    role: 'Ketua Harian',
    name: 'Dr. H. Sabarudin, M.Pd'
  },
  copies: [
    'Gubernur Nusa Tenggara Barat (sebagai laporan)',
    'Ketua DPRD Provinsi NTB',
    'Ketua DPRD Kabupaten/Kota se-NTB',
    'Kepala Kantor Wilayah Kementerian Agama Provinsi NTB',
    'Arsip LPTQ'
  ]
};

export const FAHMIL_PACKAGES_LIST: FahmilQuestionPackage[] = [
  {
    id: 'P01',
    code: 'P. 01',
    title: 'Paket Soal Regu Babak Penyisihan 01',
    round: 'Penyisihan',
    questions: [
      {
        number: 1,
        category: 'Al-Qur\'an',
        question: 'Dalam surah Al-Maidah dijelaskan bahwa memberikan kesaksian yang adil dan jujur merupakan sikap terpuji sekaligus wujud ketaqwaan diri kepada Allah SWT. Kesaksian yang adil dan jujur harus diberikan terhadap siapapun, baik terhadap muslim maupun orang kafir, terhadap orang yang dicintai maupun orang yang dibenci. Karena kebencian terhadap individu maupun kelompok tidak boleh mendorong seseorang untuk memberikan persaksian yang tidak adil dan tidak jujur. Bacakan ayat yang menjelaskan hal tersebut!',
        arabicText: 'يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُواْ كُونُواْ قَوَّٰمِينَ لِلَّهِ شُهَدَآءَ بِٱلۡقِسۡطِۖ وَلَا يَجۡرِمَنَّكُمۡ شَنَـَٔانُ قَوۡمٍ عَلَىٰٓ أَلَّا تَعۡدِلُواْۚ ٱعۡدِلُواْ هُوَ أَقۡرَبُ لِلتَّقۡوَىٰۖ وَٱتَّقُواْ ٱللَّهَۚ إِنَّ ٱللَّهَ خَبِيرُۢ بِمَا تَعۡمَلُونَ',
        answer: 'Surah Al-Ma\'idah ayat 8'
      },
      {
        number: 2,
        category: 'Fiqih',
        question: 'Jika seseorang menjalani perawatan medis di rumah sakit, menurut pendapat yang rajih maka ia dibolehkan menjamak dan mengqashar shalat. Benar atau salah? Apa alasannya!',
        answer: 'Salah, akan tetapi hanya dibolehkan menjamak shalat (tidak mengqashar, karena mengqashar hanya khusus bagi musafir).'
      },
      {
        number: 3,
        category: 'Ulumul Qur\'an',
        question: 'Sebutkan 2 macam ciri-ciri surah madaniyah!',
        answer: '1. Surahnya panjang-panjang, 2. Mengandung masalah hukum/syariat, 3. Terdapat kalimat "Ya ayyuhalladzina aamanu".'
      },
      {
        number: 4,
        category: 'Tajwid',
        question: 'Berdasarkan keadaan hurufnya (antara berharakat atau sukun), mutamatsilain dibagi menjadi berapa? Sebutkan!',
        answer: 'Menjadi tiga, yaitu shaghīr, kabīr, dan muthlaq.'
      },
      {
        number: 5,
        category: 'Al-Qur\'an',
        question: 'Sempurnakan ayat berikut ini: إِنَّآ أَوْحَيْنَآ إِلَيْكَ كَمَآ أَوْحَيْنَآ إِلَىٰ نُوحٍ وَٱلنَّبِيِّۦنَ مِنۢ بَعْدِهِۦۚ...',
        arabicText: 'إِنَّآ أَوْحَيْنَآ إِلَيْكَ كَمَآ أَوْحَيْنَآ إِلَىٰ نُوحٍ وَٱلنَّبِيِّۦنَ مِنۢ بَعْدِهِۦۚ وَأَوْحَيْنَآ إِلَىٰٓ إِبۡرَٰهِيمَ وَإِسۡمَٰعِيلَ وَإِسۡحَٰقَ وَيَعۡقُوبَ وَٱلۡأَسۡبَاطِ وَعِيسَىٰ وَأَيُّوبَ وَيُونُسَ وَهَٰرُونَ وَسُلَيۡمَٰنَۚ وَءَاتَيۡنَا دَاوُۥدَ زَبُورٗا',
        answer: 'QS. An-Nisa: 163'
      },
      {
        number: 6,
        category: 'Bahasa Arab',
        question: 'لماذا يكون جواب الشرط في الآية التالية مقترنا بالفاء ؟ (أُولَئِكَ الَّذِينَ لَعَنَهُمُ اللَّهُ وَمَنْ يَلْعَنِ اللَّهُ فَلَنْ تَجِدَ لَهُ نَصِيرًا - النساء: ٥٢)',
        answer: 'لأنه جملة فعلية مسبوقة بلن'
      },
      {
        number: 7,
        category: 'English',
        question: 'Properly read the ayah of the Holy Qur\'an which has the following translation: "The Day when mankind will stand before the Lord of the worlds?"',
        arabicText: 'يَوْمَ يَقُومُ ٱلنَّاسُ لِرَبِّ ٱلْعَٰلَمِينَ',
        answer: 'Q.S. Al-Muthaffifin: 6'
      },
      {
        number: 8,
        category: 'Nagham',
        question: 'Sebutkan nama lagu yang akan dibawakan oleh Qari/Qari\'ah kita berikut ini! (Memperdengarkan maqam tilawah)',
        answer: 'Ditentukan oleh Dewan Hakim penilai lagu (Bayyati / Shoba / Hijaz / Nahawand / Rast / Sikah / Jiharkah).'
      },
      {
        number: 9,
        category: 'Tafsir Al-Qur\'an' as any,
        question: 'Terjemahkan ayat berikut ini: أَفَمَنِ ٱتَّبَعَ رِضۡوَٰنَ ٱللَّهِ كَمَنۢ بَآءَ بِسَخَطٖ مِّنَ ٱللَّهِ وَمَأۡوَىٰهُ جَهَنَّمُۖ وَبِئۡسَ ٱلۡمَصِيرُ',
        answer: 'Apakah orang yang mengikuti (jalan) keridhaan Allah sama dengan orang yang kembali dengan membawa kemurkaan dari Allah dan tempatnya adalah (neraka) Jahanam? Itulah seburuk-buruk tempat kembali.'
      },
      {
        number: 10,
        category: 'Tarikh/Kisah',
        question: 'Berkenaan dengan siapa dan peristiwa apa yang terkait dengan ayat berikut ini? قَالَ رَبِّ أَنَّىٰ يَكُونُ لِي غُلَٰمٌ وَقَدۡ بَلَغَنِيَ ٱلۡكِبَرُ وَٱمۡرَأَتِي عَاقِرٌۖ قَالَ كَذَٰلِكَ ٱللَّهُ يَفۡعَلُ مَا يَشَآءُ (آل عمران: ٤٠)',
        answer: 'NABI ZAKARIYA AS yang keheranan dia bisa dikaruniai anak padahal ia sudah tua dan istrinya seorang yang mandul, lalu Allah berfirman: "Demikianlah, Allah berbuat apa yang dikehendaki-Nya."'
      }
    ]
  },
  {
    id: 'P02',
    code: 'P. 02',
    title: 'Paket Soal Regu Babak Penyisihan 02',
    round: 'Penyisihan',
    questions: [
      {
        number: 1,
        category: 'Al-Qur\'an',
        question: 'Dalam surah Al-Maidah diungkapkan salah satu kesesatan orang-orang Yahudi dan Nasrani adalah pernyataan mereka sebagai anak dan kekasih Allah. Allah SWT menjawab pernyataan mereka bahwa jika mereka benar-benar anak dan kekasih Allah niscaya Allah tidak akan menyiksa mereka lantaran dosa-dosa mereka, melainkan mereka adalah manusia biasa. Bacakan potongan ayat yang menjelaskan hal tersebut!',
        arabicText: 'وَقَالَتِ ٱلۡيَهُودُ وَٱلنَّصَٰرَىٰ نَحۡنُ أَبۡنَٰٓؤُاْ ٱللَّهِ وَأَحِبَّـٰٓؤُهُۥۚ قُلۡ فَلِمَ يُعَذِّبُكُم بِذُنُوبِكُمۖ بَلۡ أَنتُم بَشَرٞ مِّمَّنۡ خَلَقَۚ يَغۡفِرُ لِمَن يَشَآءُ وَيُعَذِّبُ مَن يَشَآءُۚ وَلِلَّهِ مُلۡكُ ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضِ وَمَا بَيۡنَهُمَاۖ وَإِلَيۡهِ ٱلۡمَصِيرُ',
        answer: 'QS. Al-Maidah: 18'
      },
      {
        number: 2,
        category: 'Fiqih',
        question: 'Bersentuhan kulit antara laki-laki dengan perempuan bukan mahram tidak membatalkan wudhu menurut mazhab Maliki, benar atau salah? Apa alasannya!',
        answer: 'Benar menurut mazhab Maliki jika tanpa syahwat (atau salah jika dimaknai batal secara mutlak, karena menurut Maliki batal hanya apabila disertai syahwat).'
      },
      {
        number: 3,
        category: 'Ulumul Qur\'an',
        question: 'Sebutkan 2 macam ciri-ciri surah makkiyah!',
        answer: '1. Ayat dan surahnya pendek-pendek, 2. Mengandung masalah keimanan/tauhid, 3. Terdapat kalimat "Ya ayyuhan-naas".'
      },
      {
        number: 4,
        category: 'Tajwid',
        question: 'Apa yang dimaksud dengan mutamātsilain shaghīr?',
        answer: 'Bertemunya dua huruf yang sama, huruf pertama sukun dan huruf kedua berharakat/mutaharrik. Seperti: يُدْرِككُّمُ المَوْت'
      },
      {
        number: 5,
        category: 'Al-Qur\'an',
        question: 'Sempurnakan ayat berikut ini: لَّٰكِنِ ٱلرَّٰسِخُونَ فِي ٱلۡعِلۡمِ مِنۡهُمۡ وَٱلۡمُؤۡمِنُونَ...',
        arabicText: 'لَّٰكِنِ ٱلرَّٰسِخُونَ فِي ٱلۡعِلۡمِ مِنۡهُمۡ وَٱلۡمُؤۡمِنُونَ يُؤۡمِنُونَ بِمَآ أُنزِلَ إِلَيۡكَ وَمَآ أُنزِلَ مِن قَبۡلِكَۚ وَٱلۡمُقِيمِينَ ٱلصَّلَوٰةَۚ وَٱلۡمُؤۡتُونَ ٱلزَّكَوٰةَ وَٱلۡمُؤۡمِنُونَ بِٱللَّهِ وَٱلۡيَوۡمِ ٱلۡأٓخِرِ أُوْلَٰٓئِكَ سَنُؤۡتِيهِمۡ أَجۡرًا عَظِيمًا',
        answer: 'QS. An-Nisa: 162'
      },
      {
        number: 6,
        category: 'Bahasa Arab',
        question: 'ما إعراب كلمة "ثُبَاتٍ" في الآية التالية؟ (يَا أَيُّهَا الَّذِينَ آمَنُوا خُذُوا حِذْرَكُمْ فَانْفِرُوا ثُبَاتٍ أَوِ انْفِرُوا جَمِيعًا - النساء: ٧١)',
        answer: 'حال ، منصوب ، وعلامة نصبه كسرة لأنه جمع المؤنث السالم'
      },
      {
        number: 7,
        category: 'English',
        question: 'Please read for us the ayah of the Holy Qur\'an that carries the following translation: "That over which they are in disagreement."',
        arabicText: 'ٱلَّذِي هُمۡ فِيهِ مُخۡتَلِفُونَ',
        answer: 'Q.S. An-Naba\': 3'
      },
      {
        number: 8,
        category: 'Nagham',
        question: 'Sebutkan nama lagu yang akan dibawakan oleh Qari/Qari\'ah kita berikut ini!',
        answer: 'Diputuskan oleh Dewan Hakim Maqamat.'
      },
      {
        number: 9,
        category: 'Al-Qur\'an',
        question: 'Terjemahkan ayat berikut ini: وَلَا تَحۡسَبَنَّ ٱلَّذِينَ قُتِلُواْ فِي سَبِيلِ ٱللَّهِ أَمۡوَٰتَۢاۚ بَلۡ أَحۡيَآءٌ عِندَ رَبِّهِمۡ يُرۡزَقُونَ',
        answer: 'Jangan sekali-kali kamu mengira bahwa orang-orang yang gugur di jalan Allah itu mati. Sebenarnya, mereka itu hidup dan dianugerahi rezeki di sisi Tuhannya.'
      },
      {
        number: 10,
        category: 'Tarikh/Kisah',
        question: 'Berkenaan dengan siapa dan peristiwa apa yang terkait dengan ayat berikut ini? قَالَتۡ رَبِّ أَنَّىٰ يَكُونُ لِي وَلَدٞ وَلَمۡ يَمۡسَسۡنِي بَشَرٞۖ قَالَ كَذَٰلِكِ ٱللَّهُ يَخۡلُقُ مَا يَشَآءُۚ إِذَا قَضَىٰٓ أَمۡرٗا فَإِنَّمَا يَقُولُ لَهُۥ كُن فَيَكُونُ (آل عمران: ٤٧)',
        answer: 'Berkenaan dengan SITI MARYAM yaitu keheranannya bagaimana ia bisa mendapatkan anak padahal dia belum pernah disentuh seorang laki-lakipun. Allah menjawab bahwa jika berkehendak sesuatu cukup berfirman "Kun fayakun".'
      }
    ]
  },
  {
    id: 'LP01',
    code: 'LP. 01',
    title: 'Paket Soal Lontaran Babak Penyisihan 01',
    round: 'Lontaran Penyisihan',
    questions: [
      {
        number: 1,
        category: 'Al-Qur\'an',
        question: 'Pada surat apa dan ayat berapa, ayat berikut ini: وَإِنَّهُۥ لَعِلۡمٞ لِّلسَّاعَةِ فَلَا تَمۡتَرُنَّ بِهَا وَٱتَّبِعُونِۚ هَٰذَا صِرَٰطٞ مُّسۡتَقِيمٞ',
        answer: 'Surat Az-Zukhruf ayat 61'
      },
      {
        number: 2,
        category: 'Al-Qur\'an',
        question: 'Pada surat apa dan ayat berapa, ayat berikut ini: فَتَنَٰزَعُوٓاْ أَمۡرَهُم بَيۡنَهُمۡ وَأَسَرُّواْ ٱلنَّجۡوَىٰ',
        answer: 'Surat Thaha (20) ayat 62'
      },
      {
        number: 3,
        category: 'Tafsir Al-Qur\'an' as any,
        question: 'Allah SWT berfirman: يَا أَيُّهَا النَّاسُ قَدْ جَاءَكُم بُرْهَانٌ مِّن رَّبِّكُمْ وَأَنزَلْنَا إِلَيْكُمْ نُورًا مُّبِينًا. Apa yang dimaksud dari kata "بُرْهَانٌ" yang terdapat pada ayat tersebut?',
        answer: 'Maksudnya adalah Nabi Muhammad SAW.'
      },
      {
        number: 4,
        category: 'Ulumul Qur\'an',
        question: 'Mafhum mukhalafah apakah yang terdapat pada ayat: فَإِن طَلَّقَهَا فَلَا تَحِلُّ لَهُۥ مِنۢ بَعۡدُ حَتَّىٰ تَنكِحَ زَوۡجًا غَيۡرَهُۥ',
        answer: 'Mafhum ghayah'
      },
      {
        number: 5,
        category: 'Nagham',
        question: 'Sebutkan nama lagu yang akan dibawakan oleh Qari/ah kita berikut ini!',
        answer: 'Ditentukan oleh Dewan Hakim'
      },
      {
        number: 6,
        category: 'Bahasa Arab',
        question: 'ما هي الكلمة التي تكون جوابا للشرط في الآية التالية؟ بَلَى إِنْ تَصْبِرُوا وَتَتَّقُوا وَيَأْتُوكُمْ مِنْ فَوْرِهِمْ هَذَا يُمْدِدْكُمْ رَبُّكُمْ بِخَمْسَةِ آلَافٍ مِنَ الْمَلَائِكَةِ مُسَوِّمِينَ (آل عمران: ١٢٥)',
        answer: 'يُمْدِدْكُمْ'
      },
      {
        number: 7,
        category: 'English',
        question: 'Listen the following Question carefully: "How many verses in Surah al-Lahab?"',
        answer: '5 Verses'
      },
      {
        number: 8,
        category: 'Tarikh/Kisah',
        question: 'Pada awalnya tulisan Al-Qur\'an belum bertitik dan berharakat. Sebutkan orang yang pertama kali memberikan tanda titik di setiap akhir kata atas perintah khalifah Ali bin Abi Thalib?',
        answer: 'Abul Aswad ad-Duali'
      },
      {
        number: 9,
        category: 'Al-Qur\'an',
        question: 'Ada tiga tokoh yang diceritakan pada ayat berikut ini, sebutkan! وَقَالَتۡ لِأُخۡتِهِۦ قُصِّيهِۖ (القصص: ١١)',
        answer: 'Nabi Musa, Ibunya, dan Saudarinya'
      },
      {
        number: 10,
        category: 'Faraidh/Waris',
        question: 'Seorang meninggal dunia dengan ahli waris: suami, dua orang anak perempuan, seorang cucu perempuan, dan saudara perempuan sebapak. Harta yang ditinggalkan sebanyak Rp. 48 juta. Berapa rupiah bagian suami?',
        answer: 'Rp 12 juta (1/4 bagian karena ada anak)'
      }
    ]
  },
  {
    id: 'SF01',
    code: 'SF. 01',
    title: 'Paket Soal Regu Babak Semi Final 01',
    round: 'Semifinal',
    questions: [
      {
        number: 1,
        category: 'Al-Qur\'an',
        question: 'Firman Allah dalam surah Al-Ma\'idah ayat 2: يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تُحِلُّوا شَعَائِرَ اللَّهِ وَلَا الشَّهْرَ الْحَرَامَ وَلَا الْهَدْيَ وَلَا الْقَلَائِدَ وَلَا آمِّينَ الْبَيْتَ الْحَرَامَ. Jelaskan 5 (lima) larangan pada ayat tersebut!',
        answer: '1. Larangan melanggar syiar-syiar Allah, 2. Larangan melanggar kehormatan bulan-bulan haram, 3. Larangan mengganggu al-hadyu, 4. Larangan mengganggu al-qala\'id, 5. Larangan mengganggu para pengunjung Baitullah.'
      },
      {
        number: 2,
        category: 'Al-Qur\'an',
        question: 'Ayat ini turun berkaitan dengan Abdullah bin Ummi Maktum yang berkecil hati dan mengadukan kebutaannya kepada Rasulullah SAW sehingga tidak dapat ikut berperang. Ayat ini menerangkan bahwa orang-orang yang memiliki uzur sehingga tidak bisa berperang di jalan Allah tetap akan ditinggikan derajatnya oleh Allah. Bacakan ayatnya!',
        arabicText: 'لَّا يَسۡتَوِي ٱلۡقَٰعِدُونَ مِنَ ٱلۡمُؤۡمِنِينَ غَيۡرُ أُوْلِي ٱلضَّرَرِ وَٱلۡمُجَٰهِدُونَ فِي سَبِيلِ ٱللَّهِ بِأَمۡوَٰلِهِمۡ وَأَنفُسِهِمۡۚ فَضَّلَ ٱللَّهُ ٱلۡمُجَٰهِدِينَ بِأَمۡوَٰلِهِمۡ وَأَنفُسِهِمۡ عَلَى ٱلۡقَٰعِدِينَ دَرَجَةٗۚ وَكُلّۭٗا وَعَدَ ٱللَّهُ ٱلۡحُسۡنَىٰۚ وَفَضَّلَ ٱللَّهُ ٱلۡمُجَٰهِدِينَ عَلَى ٱلۡقَٰعِدِينَ أَجۡرًا عَظِيمٗا',
        answer: 'Surah An-Nisa: 95'
      },
      {
        number: 3,
        category: 'Tafsir Al-Qur\'an' as any,
        question: 'Terjemahkan ayat berikut ini: مَثَلُ مَا يُنفِقُونَ فِي هَٰذِهِ ٱلۡحَيَوٰةِ ٱلدُّنۡيَا كَمَثَلِ رِيحٖ فِيهَا صِرٌّ أَصَابَتۡ حَرۡثَ قَوۡمٖ ظَلَمُوٓاْ أَنفُسَهُمۡ فَأَهۡلَكَتۡهُۚ وَمَا ظَلَمَهُمُ ٱللَّهُ وَلَٰكِنۡ أَنفُسَهُمۡ يَظۡلِمُونَ',
        answer: 'Perumpamaan harta yang mereka infakkan di dalam kehidupan dunia ini adalah ibarat angin yang mengandung hawa sangat dingin yang menimpa tanaman (milik) suatu kaum yang menzalimi diri sendiri, lalu (angin itu) merusaknya. Allah tidak menzalimi mereka, tetapi mereka yang menzalimi diri sendiri. (QS. Ali Imran: 117)'
      },
      {
        number: 4,
        category: 'Al-Qur\'an',
        question: 'Sempurnakan ayat berikut ini: وَعِندَهُۥ مَفَاتِحُ ٱلۡغَيۡبِ لَا يَعۡلَمُهَآ إِلَّا هُوَۚ...',
        arabicText: 'وَعِندَهُۥ مَفَاتِحُ ٱلۡغَيۡبِ لَا يَعۡلَمُهَآ إِلَّا هُوَۚ وَيَعۡلَمُ مَا فِي ٱلۡبَرِّ وَٱلۡبَحۡرِۚ وَمَا تَسۡقُطُ مِن وَرَقَةٍ إِلَّا يَعۡلَمُهَا وَلَا حَبَّةٖ فِي ظُلُمَٰتِ ٱلۡأَرۡضِ وَلَا رَطۡبٖ وَلَا يَابِسٍ إِلَّا فِي كِتَٰبٖ مُّبِينٖ',
        answer: 'Surah Al-An\'am: 59'
      },
      {
        number: 5,
        category: 'Hadits',
        question: 'Sempurnakan hadis berikut ini: عَنْ أُمِّ سَلَمَةَ رَضِيَ اللَّهُ عَنْهَا أَنَّ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ آلَى مِنْ نِسَائِهِ شَهْرًا...',
        answer: 'فَلَمَّا مَضَى تِسْعَةٌ وَعِشْرُونَ يَوْمًا غَدَا أَوْ رَاحَ فَقِيلَ لَهُ إِنَّكَ حَلَفْتَ أَنْ لَا تَدْخُلَ شَهْرًا فَقَالَ إِنَّ الشَّهْرَ يَكُونُ تِسْعَةً وَعِشْرِينَ يَوْمًا'
      },
      {
        number: 6,
        category: 'Ulumul Qur\'an',
        question: 'ما هي الآية التي انتهت باسم دولة عظيمة وقت نزول تلك الآية من القرآن؟',
        answer: 'هي الآية الثانية من سورة الروم وهي قوله تعالى : (الم (١) غُلِبَتِ الرُّومُ (٢))'
      },
      {
        number: 7,
        category: 'English',
        question: 'Listen the following verse attentively and translate it into English: فَلْيَنْظُرِ الْإِنْسَانُ إِلَى طَعَامِهِ',
        answer: 'Then let mankind look at his food - (Q.S. Abasa: 24)'
      },
      {
        number: 8,
        category: 'Nagham',
        question: 'Sebutkan nama lagu yang akan dibawakan oleh Qari/ah kita berikut ini!',
        answer: 'Ditentukan oleh Dewan Hakim penilai lagu.'
      },
      {
        number: 9,
        category: 'Ulumul Qur\'an',
        question: 'Sebutkan arkān al-qiraah (rukun qira\'at)!',
        answer: '1. Sesuaianya qiraah dengan rasm usmani (sekalipun secara ihtimal), 2. Sesuaianya qiraah dengan kaidah bahasa arab (sekalipun lemah), 3. Shihhat al-sanad (kesahihan sanad).'
      },
      {
        number: 10,
        category: 'Tarikh/Kisah',
        question: 'Berkenaan dengan siapa dan apa peristiwa yang terkait dengan ayat berikut ini? وَيَصۡنَعُ ٱلۡفُلۡكَ وَكُلَّمَا مَرَّ عَلَيۡهِ مَلَأٞ مِّن قَوۡمِهِۦ سَخِرُواْ مِنۡهُۚ قَالَ إِن تَسۡخَرُواْ مِنَّا فَإِنَّا نَسۡخَرُ مِنكُمۡ كَمَا تَسۡخَرُونَ (هود: ٣٨)',
        answer: 'Berkenaan dengan NABI NUH AS yang mulai membuat bahtera, dan setiap kali pemimpin kaumnya berjalan melewatinya mereka mengejeknya. Nabi Nuh menjawab: "Jika kamu mengejek kami, maka sesungguhnya kami pun nanti akan mengejekmu sebagaimana kamu sekalian mengejek kami."'
      }
    ]
  },
  {
    id: 'F01',
    code: 'F. 01',
    title: 'Paket Soal Regu Babak Final 01',
    round: 'Final',
    questions: [
      {
        number: 1,
        category: 'Al-Qur\'an',
        question: 'Umat Islam adalah umat pilihan dan terbaik karena sikap dan cara pandang yang moderat dalam beragama, sebagaimana ditegaskan dalam QS. Al-Baqarah: 143. Bacakan potongan ayat yang menjelaskan hal tersebut!',
        arabicText: 'وَكَذَٰلِكَ جَعَلۡنَٰكُمۡ أُمَّةٗ وَسَطٗا لِّتَكُونُواْ شُهَدَآءَ عَلَى ٱلنَّاسِ وَيَكُونَ ٱلرَّسُولُ عَلَيۡكُمۡ شَهِيدٗا',
        answer: 'QS. Al-Baqarah: 143'
      },
      {
        number: 2,
        category: 'Al-Qur\'an',
        question: 'Ayat ini turun berkaitan dengan Damrah bin Jundab yang ingin sekali berhijrah ke Madinah menyusul Nabi SAW. Meski sakit keras, ia tetap berangkat menuju Madinah hingga akhirnya wafat di tengah perjalanan. Bacakan ayatnya!',
        arabicText: 'وَمَن يُهَاجِرۡ فِي سَبِيلِ ٱللَّهِ يَجِدۡ فِي ٱلۡأَرۡضِ مُرَٰغَمٗا كَثِيرٗا وَسَعَةٗۚ وَمَن يَخۡرُجۡ مِنۢ بَيۡتِهِۦ مُهَاجِرًا إِلَى ٱللَّهِ وَرَسُولِهِۦ ثُمَّ يُدۡرِكۡهُ ٱلۡمَوۡتُ فَقَدۡ وَقَعَ أَجۡرُهُۥ عَلَى ٱللَّهِۗ وَكَانَ ٱللَّهُ غَفُورٗا رَّحِيمٗا',
        answer: 'QS. An-Nisa: 100'
      },
      {
        number: 3,
        category: 'Tafsir Al-Qur\'an' as any,
        question: 'Terjemahkan ayat berikut ini: وَٱعۡتَصِمُواْ بِحَبۡلِ ٱللَّهِ جَمِيعٗا وَلَا تَفَرَّقُواْۚ وَٱذۡكُرُواْ نِعۡمَتَ ٱللَّهِ عَلَيۡكُمۡ إِذۡ كُنتُمۡ أَعۡدَآءٗ فَأَلَّفَ بَيۡنَ قُلُوبِكُمۡ فَأَصۡبَحۡتُم بِنِعۡمَتِهِۦٓ إِخۡوَٰنٗا وَكُنتُمۡ عَلَىٰ شَفَا حُفۡرَةٖ مِّنَ ٱلنَّارِ فَأَنقَذَكُم مِّنۡهَاۗ كَذَٰلِكَ يُبَيِّنُ ٱللَّهُ لَكُمۡ ءَايَٰتِهِۦ لَعَلَّكُمۡ تَهۡتَدُونَ',
        answer: 'Berpegangteguhlah kamu semuanya pada tali (agama) Allah, janganlah bercerai berai, dan ingatlah nikmat Allah kepadamu ketika kamu dahulu bermusuhan, lalu Allah mempersatukan hatimu sehingga dengan karunia-Nya kamu menjadi bersaudara... (QS. Ali Imran: 103)'
      },
      {
        number: 4,
        category: 'Al-Qur\'an',
        question: 'Sempurnakan ayat berikut ini: وَذَرِ ٱلَّذِينَ ٱتَّخَذُواْ دِينَهُمۡ لَعِبٗا وَلَهۡوٗا وَغَرَّتۡهُمُ ٱلۡحَيَوٰةُ ٱلدُّنۡيَا...',
        arabicText: 'وَذَرِ ٱلَّذِينَ ٱتَّخَذُواْ دِينَهُمۡ لَعِبٗا وَلَهۡوٗا وَغَرَّتۡهُمُ ٱلۡحَيَوٰةُ ٱلدُّنۡيَاۚ وَذَكِّرۡ بِهِۦٓ أَن تُبۡسَلَ نَفۡسُۢ بِمَا كَسَبَتۡ لَيۡسَ لَهَا مِن دُونِ ٱللَّهِ وَلِيّٞ وَلَا شَفِيعٞ وَإِن تَعۡدِلۡ كُلَّ عَدۡلٖ لَّا يُؤۡخَذۡ مِنۡهَآۗ أُوْلَٰٓئِكَ ٱلَّذِينَ أُبۡسِلُواْ بِمَا كَسَبُواْۖ لَهُمۡ شَرَابٞ مِّنۡ حَمِيمٖ وَعَذَابٌ أَلِيمُۢ بِمَا كَانُواْ يَكۡفُرُونَ',
        answer: 'QS. Al-An\'am: 70'
      },
      {
        number: 5,
        category: 'Fiqih',
        question: 'Jelaskan ketentuan fiqh yang terdapat pada hadis berikut ini: البَيِّعَانِ بِالخِيَارِ مَا لَمْ يَتَفَرَّقَا',
        answer: 'Si penjual dan si pembeli boleh memilih antara meneruskan atau mengurungkan akad jual beli selama keduanya masih berada di tempat jual beli atau disebut khiyar Majelis.'
      },
      {
        number: 6,
        category: 'Ulumul Qur\'an',
        question: 'ما هي السورة التى بدأت بفعل الأمر وانتهت بفعل الأمر ؟؟',
        answer: 'سورة العلق: اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ (العلق: ١) كَلَّا لَا تُطِعْهُ وَاسْجُدْ وَاقْتَرِبْ (العلق: ١٩)'
      },
      {
        number: 7,
        category: 'English',
        question: 'Listen to the following Ayat attentively: نَزَلَ بِهِ ٱلرُّوحُ ٱلۡأَمِينُ عَلَىٰ قَلۡبِكَ لِتَكُونَ مِنَ ٱلۡمُنذِرِينَ. In many tafsir, the word "al-ruh al amin" refer to whose figure in this verse. Explain please!',
        answer: 'The term "ar-ruh al-amin" refers to angel of Gabriel (Jibril AS) because of his high rank and position before Allah.'
      },
      {
        number: 8,
        category: 'Nagham',
        question: 'Sebutkan nama lagu yang akan dibawakan oleh Qari/ah kita berikut ini!',
        answer: 'Ditentukan oleh Dewan Hakim Tilawah.'
      },
      {
        number: 9,
        category: 'Hadits',
        question: 'Sempurnakan hadis berikut ini: عَنْ ابْنِ عَبَّاسٍ رَضِيَ اللَّهُ عَنْهُمَا قَالَ قَدِمَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ الْمَدِينَةَ فَرَأَى الْيَهُودَ تَصُومُ يَوْمَ عَاشُورَاءَ...',
        answer: 'فَقَالَ مَا هَذَا قَالُوا هَذَا يَوْمٌ صَالِحٌ هَذَا يَوْمٌ نَجَّى اللَّهُ بَنِي إِسْرَائِيلَ مِنْ عَدُوِّهِمْ فَصَامَهُ مُوسَى قَالَ فَأَنَا أَحَقُّ بِمُوسَى مِنْكُمْ فَصَامَهُ وَأَمَرَ بِصِيَامِهِ'
      },
      {
        number: 10,
        category: 'Tarikh/Kisah',
        question: 'Berkenaan dengan siapa dan apa peristiwa yang terkait dengan ayat berikut ini? لَأُقَطِّعَنَّ أَيْدِيَكُمْ وَأَرْجُلَكُم مِّنْ خِلَافٍ ثُمَّ لَأُصَلِّبَنَّكُمْ أَجْمَعِينَ (الأعراف: ١٢٤)',
        answer: 'Berkenaan dengan FIR\'AUN dengan PARA PENYIHIR yang mau mengikuti agama Nabi Musa, fir\'aun mengancam mereka dengan mengatakan: "demi sesungguhnya aku akan memotong tangan dan kakimu dengan bersilang secara bertimbal balik, kemudian sungguh-sungguh aku akan menyalib kamu semuanya."'
      }
    ]
  },
  {
    id: 'LF01',
    code: 'LF. 01',
    title: 'Paket Soal Lontaran Babak Final 01',
    round: 'Lontaran Final',
    questions: [
      {
        number: 1,
        category: 'Al-Qur\'an',
        question: 'Pada surat apa dan ayat berapa, ayat berikut ini: وَشَدَدۡنَا مُلۡكَهُۥ وَءَاتَيۡنَٰهُ ٱلۡحِكۡمَةَ وَفَصۡلَ ٱلۡخِطَابِ',
        answer: 'Surat Shad (38) ayat 20'
      },
      {
        number: 2,
        category: 'Ulumul Qur\'an',
        question: 'Sifat wajib Allah yang manakah yang dapat dipahami dari ayat berikut ini: وَأَنَّهُۥ هُوَ أَمَاتَ وَأَحۡيَا',
        answer: 'Qudrah (Kuasa)'
      },
      {
        number: 3,
        category: 'Hadits',
        question: 'Sebuah kitab khusus yang memuat hadits mutawatir adalah Al Azhar al Mutanatsirah fi al Akhbar al Mutawatirah. Siapakah pengarang kitab tersebut?',
        answer: 'Imam Suyuthi (wafat 911 H)'
      },
      {
        number: 4,
        category: 'Ulumul Qur\'an',
        question: 'Berkaitan dengan kodifikasi Al-Qur\'an, siapakah sosok yang melontarkan pernyataan berikut ini: "وجدت آخر سورة التوبة مع أبي خزيمة الأنصاري، لم أجدها مع غيره"',
        answer: 'Zaid bin Tsabit'
      },
      {
        number: 5,
        category: 'Al-Qur\'an',
        question: 'Dalam surah Al-Maidah, Allah SWT memberikan garansi bagi siapapun yang menegakkan hukum sebagaimana tercantum dalam kitab Allah, baik Taurat, Injil, dan Al-Qur\'an, niscaya Dia akan menjamin kesejahteraan dan limpahan karunia-Nya dari berbagai sumber baik dari atas berupa air hujan maupun dari bawah kaki berupa tanaman dan tumbuh-tumbuhan. Namun disesalkan, sebagian besar umat manusia tidak menerapkannya. Bacakan ayat yang menjelaskan hal tersebut!',
        arabicText: 'وَلَوۡ أَنَّهُمۡ أَقَامُواْ ٱلتَّوۡرَىٰةَ وَٱلۡإِنجِيلَ وَمَآ أُنزِلَ إِلَيۡهِم مِّن رَّبِّهِمۡ لَأَكَلُواْ مِن فَوۡقِهِمۡ وَمِن تَحۡتِ أَرۡجُلِهِمۚ مِّنۡهُمۡ أُمَّةٞ مُّقۡتَصِدَةٞۖ وَكَثِيرٞ مِّنۡهُمۡ سَآءَ مَا يَعۡمَلُونَ',
        answer: 'QS. Al-Ma\'idah: 66'
      },
      {
        number: 6,
        category: 'Bahasa Arab',
        question: 'ما السورتان اللتان سميتا باسم وقت من أوقات الصلوات المفروضة ؟',
        answer: 'السورتان اللتان سميتا باسم وقت من أوقات الصلاة هما : سورتا الفجر والعصر'
      },
      {
        number: 7,
        category: 'English',
        question: 'What is the alternative to ablution, when either water is not available or there is a serious danger to health?',
        answer: 'Tayammum'
      },
      {
        number: 8,
        category: 'Nagham',
        question: 'Sebutkan nama lagu yang akan dibawakan oleh Qari/ah kita berikut ini!',
        answer: 'Ditentukan oleh Dewan Hakim Tilawah.'
      },
      {
        number: 9,
        category: 'Tarikh/Kisah',
        question: 'Pada tahun keberapakah ibadah haji disyariatkan bagi dalam Islam?',
        answer: 'Pada tahun keenam hijriyah (6 H)'
      },
      {
        number: 10,
        category: 'Faraidh/Waris',
        question: 'Ahli waris terdiri dari suami, ibu dan ayah. Berapa rupiah bagian ibu jika harta peninggalannya sebesar Rp. 360.000.000,-?',
        answer: 'Rp. 60.000.000,- (Masalah Gharawain: Suami 1/2 = 180 jt, sisa 180 jt dibagi Ibu 1/3 dari sisa = 60 jt, dan Ayah sisanya = 120 jt).'
      }
    ]
  }
];
