export interface WilayahKafilah {
  id: string;
  name: string;
  fullName: string;
  type: 'DESA' | 'KELURAHAN';
  kecamatanId: string;
  kecamatanName: string;
}

export interface KecamatanLombokBarat {
  id: string;
  name: string;
  fullName: string;
  capitalVillage: string;
  camatTitle: string;
  defaultChairman: string;
  defaultChiefJudge: string;
  defaultVenue: string;
  postalCode: string;
  totalDesa: number;
  totalKelurahan: number;
  villages: WilayahKafilah[];
}

export const LOMBOK_BARAT_KECAMATAN: KecamatanLombokBarat[] = [
  {
    id: 'gerung',
    name: 'Gerung',
    fullName: 'Kecamatan Gerung',
    capitalVillage: 'Dasan Geres',
    camatTitle: 'Ketua LPTQ Kec. Gerung / Camat Gerung',
    defaultChairman: "H. Syafi'i, S.Sos., M.M.",
    defaultChiefJudge: 'TGH. Ahmad Muammar, M.Q.',
    defaultVenue: 'Arena Utama Kantor Camat Gerung, Kabupaten Lombok Barat',
    postalCode: '83363',
    totalDesa: 11,
    totalKelurahan: 3,
    villages: [
      // 3 Kelurahan
      { id: 'dasan-geres', name: 'Dasan Geres', fullName: 'Kelurahan Dasan Geres, Kec. Gerung', type: 'KELURAHAN', kecamatanId: 'gerung', kecamatanName: 'Gerung' },
      { id: 'gerung-utara', name: 'Gerung Utara', fullName: 'Kelurahan Gerung Utara, Kec. Gerung', type: 'KELURAHAN', kecamatanId: 'gerung', kecamatanName: 'Gerung' },
      { id: 'gerung-selatan', name: 'Gerung Selatan', fullName: 'Kelurahan Gerung Selatan, Kec. Gerung', type: 'KELURAHAN', kecamatanId: 'gerung', kecamatanName: 'Gerung' },
      // 11 Desa
      { id: 'babussalam', name: 'Babussalam', fullName: 'Desa Babussalam, Kec. Gerung', type: 'DESA', kecamatanId: 'gerung', kecamatanName: 'Gerung' },
      { id: 'dasan-tapen', name: 'Dasan Tapen', fullName: 'Desa Dasan Tapen, Kec. Gerung', type: 'DESA', kecamatanId: 'gerung', kecamatanName: 'Gerung' },
      { id: 'beleka', name: 'Beleka', fullName: 'Desa Beleka, Kec. Gerung', type: 'DESA', kecamatanId: 'gerung', kecamatanName: 'Gerung' },
      { id: 'gapuk', name: 'Gapuk', fullName: 'Desa Gapuk, Kec. Gerung', type: 'DESA', kecamatanId: 'gerung', kecamatanName: 'Gerung' },
      { id: 'mesanggok', name: 'Mesanggok', fullName: 'Desa Mesanggok, Kec. Gerung', type: 'DESA', kecamatanId: 'gerung', kecamatanName: 'Gerung' },
      { id: 'suka-makmur', name: 'Suka Makmur', fullName: 'Desa Suka Makmur, Kec. Gerung', type: 'DESA', kecamatanId: 'gerung', kecamatanName: 'Gerung' },
      { id: 'kebon-ayu', name: 'Kebon Ayu', fullName: 'Desa Kebon Ayu, Kec. Gerung', type: 'DESA', kecamatanId: 'gerung', kecamatanName: 'Gerung' },
      { id: 'taman-ayu', name: 'Taman Ayu', fullName: 'Desa Taman Ayu, Kec. Gerung', type: 'DESA', kecamatanId: 'gerung', kecamatanName: 'Gerung' },
      { id: 'giri-tembesi', name: 'Giri Tembesi', fullName: 'Desa Giri Tembesi, Kec. Gerung', type: 'DESA', kecamatanId: 'gerung', kecamatanName: 'Gerung' },
      { id: 'banyu-urip', name: 'Banyu Urip', fullName: 'Desa Banyu Urip, Kec. Gerung', type: 'DESA', kecamatanId: 'gerung', kecamatanName: 'Gerung' },
      { id: 'tempos', name: 'Tempos', fullName: 'Desa Tempos, Kec. Gerung', type: 'DESA', kecamatanId: 'gerung', kecamatanName: 'Gerung' }
    ]
  },
  {
    id: 'batulayar',
    name: 'Batulayar',
    fullName: 'Kecamatan Batulayar',
    capitalVillage: 'Meninting',
    camatTitle: 'Ketua LPTQ Kec. Batulayar / Camat Batulayar',
    defaultChairman: 'Afgan Kusuma Negara, S.STP.',
    defaultChiefJudge: "TGH. Lalu Mas'ud, M.Pd.",
    defaultVenue: 'Halaman Kantor Camat Batulayar / Arena Wisata Senggigi, Lombok Barat',
    postalCode: '83355',
    totalDesa: 9,
    totalKelurahan: 0,
    villages: [
      { id: 'batu-layar', name: 'Batu Layar', fullName: 'Desa Batu Layar, Kec. Batulayar', type: 'DESA', kecamatanId: 'batulayar', kecamatanName: 'Batulayar' },
      { id: 'batu-layar-barat', name: 'Batu Layar Barat', fullName: 'Desa Batu Layar Barat, Kec. Batulayar', type: 'DESA', kecamatanId: 'batulayar', kecamatanName: 'Batulayar' },
      { id: 'bengkaung', name: 'Bengkaung', fullName: 'Desa Bengkaung, Kec. Batulayar', type: 'DESA', kecamatanId: 'batulayar', kecamatanName: 'Batulayar' },
      { id: 'lembah-sari', name: 'Lembah Sari', fullName: 'Desa Lembah Sari, Kec. Batulayar', type: 'DESA', kecamatanId: 'batulayar', kecamatanName: 'Batulayar' },
      { id: 'meninting', name: 'Meninting', fullName: 'Desa Meninting, Kec. Batulayar', type: 'DESA', kecamatanId: 'batulayar', kecamatanName: 'Batulayar' },
      { id: 'pusuk-lestari', name: 'Pusuk Lestari', fullName: 'Desa Pusuk Lestari, Kec. Batulayar', type: 'DESA', kecamatanId: 'batulayar', kecamatanName: 'Batulayar' },
      { id: 'sandik', name: 'Sandik', fullName: 'Desa Sandik, Kec. Batulayar', type: 'DESA', kecamatanId: 'batulayar', kecamatanName: 'Batulayar' },
      { id: 'senggigi', name: 'Senggigi', fullName: 'Desa Senggigi, Kec. Batulayar', type: 'DESA', kecamatanId: 'batulayar', kecamatanName: 'Batulayar' },
      { id: 'senteluk', name: 'Senteluk', fullName: 'Desa Senteluk, Kec. Batulayar', type: 'DESA', kecamatanId: 'batulayar', kecamatanName: 'Batulayar' }
    ]
  },
  {
    id: 'gunungsari',
    name: 'Gunungsari',
    fullName: 'Kecamatan Gunungsari',
    capitalVillage: 'Gunung Sari',
    camatTitle: 'Ketua LPTQ Kec. Gunungsari / Camat Gunungsari',
    defaultChairman: 'H. Muhammad Mudasir, S.Sos.',
    defaultChiefJudge: 'TGH. Munawir Haris, Lc.',
    defaultVenue: 'Lapangan Utama Gunungsari, Kabupaten Lombok Barat',
    postalCode: '83351',
    totalDesa: 16,
    totalKelurahan: 0,
    villages: [
      { id: 'bukit-tinggi', name: 'Bukit Tinggi', fullName: 'Desa Bukit Tinggi, Kec. Gunungsari', type: 'DESA', kecamatanId: 'gunungsari', kecamatanName: 'Gunungsari' },
      { id: 'dopang', name: 'Dopang', fullName: 'Desa Dopang, Kec. Gunungsari', type: 'DESA', kecamatanId: 'gunungsari', kecamatanName: 'Gunungsari' },
      { id: 'gelangsar', name: 'Gelangsar', fullName: 'Desa Gelangsar, Kec. Gunungsari', type: 'DESA', kecamatanId: 'gunungsari', kecamatanName: 'Gunungsari' },
      { id: 'guntur-macan', name: 'Guntur Macan', fullName: 'Desa Guntur Macan, Kec. Gunungsari', type: 'DESA', kecamatanId: 'gunungsari', kecamatanName: 'Gunungsari' },
      { id: 'gunung-sari', name: 'Gunung Sari', fullName: 'Desa Gunung Sari, Kec. Gunungsari', type: 'DESA', kecamatanId: 'gunungsari', kecamatanName: 'Gunungsari' },
      { id: 'jatisela', name: 'Jatisela', fullName: 'Desa Jatisela, Kec. Gunungsari', type: 'DESA', kecamatanId: 'gunungsari', kecamatanName: 'Gunungsari' },
      { id: 'jeringo', name: 'Jeringo', fullName: 'Desa Jeringo, Kec. Gunungsari', type: 'DESA', kecamatanId: 'gunungsari', kecamatanName: 'Gunungsari' },
      { id: 'kekait', name: 'Kekait', fullName: 'Desa Kekait, Kec. Gunungsari', type: 'DESA', kecamatanId: 'gunungsari', kecamatanName: 'Gunungsari' },
      { id: 'kekeri', name: 'Kekeri', fullName: 'Desa Kekeri, Kec. Gunungsari', type: 'DESA', kecamatanId: 'gunungsari', kecamatanName: 'Gunungsari' },
      { id: 'mambalan', name: 'Mambalan', fullName: 'Desa Mambalan, Kec. Gunungsari', type: 'DESA', kecamatanId: 'gunungsari', kecamatanName: 'Gunungsari' },
      { id: 'mekarsari-gs', name: 'Mekarsari', fullName: 'Desa Mekarsari, Kec. Gunungsari', type: 'DESA', kecamatanId: 'gunungsari', kecamatanName: 'Gunungsari' },
      { id: 'midang', name: 'Midang', fullName: 'Desa Midang, Kec. Gunungsari', type: 'DESA', kecamatanId: 'gunungsari', kecamatanName: 'Gunungsari' },
      { id: 'penimbung', name: 'Penimbung', fullName: 'Desa Penimbung, Kec. Gunungsari', type: 'DESA', kecamatanId: 'gunungsari', kecamatanName: 'Gunungsari' },
      { id: 'ranjok', name: 'Ranjok', fullName: 'Desa Ranjok, Kec. Gunungsari', type: 'DESA', kecamatanId: 'gunungsari', kecamatanName: 'Gunungsari' },
      { id: 'sesela', name: 'Sesela', fullName: 'Desa Sesela, Kec. Gunungsari', type: 'DESA', kecamatanId: 'gunungsari', kecamatanName: 'Gunungsari' },
      { id: 'taman-sari-gs', name: 'Taman Sari', fullName: 'Desa Taman Sari, Kec. Gunungsari', type: 'DESA', kecamatanId: 'gunungsari', kecamatanName: 'Gunungsari' }
    ]
  },
  {
    id: 'kediri',
    name: 'Kediri',
    fullName: 'Kecamatan Kediri',
    capitalVillage: 'Kediri',
    camatTitle: 'Ketua LPTQ Kec. Kediri / Camat Kediri',
    defaultChairman: 'H. Iswarta Mahmuluddin, S.Pd., M.Pd.',
    defaultChiefJudge: 'TGH. Fathurrahman, S.Pd.I',
    defaultVenue: 'Alun-Alun Kediri / Halaman Ponpes Kediri, Lombok Barat',
    postalCode: '83362',
    totalDesa: 10,
    totalKelurahan: 0,
    villages: [
      { id: 'banyumulek', name: 'Banyumulek', fullName: 'Desa Banyumulek, Kec. Kediri', type: 'DESA', kecamatanId: 'kediri', kecamatanName: 'Kediri' },
      { id: 'dasan-baru', name: 'Dasan Baru', fullName: 'Desa Dasan Baru, Kec. Kediri', type: 'DESA', kecamatanId: 'kediri', kecamatanName: 'Kediri' },
      { id: 'gelogor', name: 'Gelogor', fullName: 'Desa Gelogor, Kec. Kediri', type: 'DESA', kecamatanId: 'kediri', kecamatanName: 'Kediri' },
      { id: 'jagaraga-indah', name: 'Jagaraga Indah', fullName: 'Desa Jagaraga Indah, Kec. Kediri', type: 'DESA', kecamatanId: 'kediri', kecamatanName: 'Kediri' },
      { id: 'kediri', name: 'Kediri', fullName: 'Desa Kediri, Kec. Kediri', type: 'DESA', kecamatanId: 'kediri', kecamatanName: 'Kediri' },
      { id: 'kediri-selatan', name: 'Kediri Selatan', fullName: 'Desa Kediri Selatan, Kec. Kediri', type: 'DESA', kecamatanId: 'kediri', kecamatanName: 'Kediri' },
      { id: 'lelede', name: 'Lelede', fullName: 'Desa Lelede, Kec. Kediri', type: 'DESA', kecamatanId: 'kediri', kecamatanName: 'Kediri' },
      { id: 'montong-are', name: 'Montong Are', fullName: 'Desa Montong Are, Kec. Kediri', type: 'DESA', kecamatanId: 'kediri', kecamatanName: 'Kediri' },
      { id: 'ombe-baru', name: 'Ombe Baru', fullName: 'Desa Ombe Baru, Kec. Kediri', type: 'DESA', kecamatanId: 'kediri', kecamatanName: 'Kediri' },
      { id: 'rumak-kdr', name: 'Rumak', fullName: 'Desa Rumak, Kec. Kediri', type: 'DESA', kecamatanId: 'kediri', kecamatanName: 'Kediri' }
    ]
  },
  {
    id: 'kuripan',
    name: 'Kuripan',
    fullName: 'Kecamatan Kuripan',
    capitalVillage: 'Kuripan',
    camatTitle: 'Ketua LPTQ Kec. Kuripan / Camat Kuripan',
    defaultChairman: 'Iskandar, S.Sos.',
    defaultChiefJudge: 'TGH. Abdullah Syukri, M.Q.',
    defaultVenue: 'Halaman Kantor Camat Kuripan, Kabupaten Lombok Barat',
    postalCode: '83362',
    totalDesa: 6,
    totalKelurahan: 0,
    villages: [
      { id: 'giri-sasak', name: 'Giri Sasak', fullName: 'Desa Giri Sasak, Kec. Kuripan', type: 'DESA', kecamatanId: 'kuripan', kecamatanName: 'Kuripan' },
      { id: 'jagaraga-krp', name: 'Jagaraga', fullName: 'Desa Jagaraga, Kec. Kuripan', type: 'DESA', kecamatanId: 'kuripan', kecamatanName: 'Kuripan' },
      { id: 'kuripan', name: 'Kuripan', fullName: 'Desa Kuripan, Kec. Kuripan', type: 'DESA', kecamatanId: 'kuripan', kecamatanName: 'Kuripan' },
      { id: 'kuripan-selatan', name: 'Kuripan Selatan', fullName: 'Desa Kuripan Selatan, Kec. Kuripan', type: 'DESA', kecamatanId: 'kuripan', kecamatanName: 'Kuripan' },
      { id: 'kuripan-timur', name: 'Kuripan Timur', fullName: 'Desa Kuripan Timur, Kec. Kuripan', type: 'DESA', kecamatanId: 'kuripan', kecamatanName: 'Kuripan' },
      { id: 'kuripan-utara', name: 'Kuripan Utara', fullName: 'Desa Kuripan Utara, Kec. Kuripan', type: 'DESA', kecamatanId: 'kuripan', kecamatanName: 'Kuripan' }
    ]
  },
  {
    id: 'labuapi',
    name: 'Labuapi',
    fullName: 'Kecamatan Labuapi',
    capitalVillage: 'Labuapi',
    camatTitle: 'Ketua LPTQ Kec. Labuapi / Camat Labuapi',
    defaultChairman: 'Lalu Mahsun, S.STP.',
    defaultChiefJudge: 'TGH. Mahsun Ridwan, M.A.',
    defaultVenue: 'Lapangan Olahraga Kecamatan Labuapi, Lombok Barat',
    postalCode: '83361',
    totalDesa: 12,
    totalKelurahan: 0,
    villages: [
      { id: 'bagik-polak', name: 'Bagik Polak', fullName: 'Desa Bagik Polak, Kec. Labuapi', type: 'DESA', kecamatanId: 'labuapi', kecamatanName: 'Labuapi' },
      { id: 'bagik-polak-barat', name: 'Bagik Polak Barat', fullName: 'Desa Bagik Polak Barat, Kec. Labuapi', type: 'DESA', kecamatanId: 'labuapi', kecamatanName: 'Labuapi' },
      { id: 'bajur', name: 'Bajur', fullName: 'Desa Bajur, Kec. Labuapi', type: 'DESA', kecamatanId: 'labuapi', kecamatanName: 'Labuapi' },
      { id: 'bengkel', name: 'Bengkel', fullName: 'Desa Bengkel, Kec. Labuapi', type: 'DESA', kecamatanId: 'labuapi', kecamatanName: 'Labuapi' },
      { id: 'karang-bongkot', name: 'Karang Bongkot', fullName: 'Desa Karang Bongkot, Kec. Labuapi', type: 'DESA', kecamatanId: 'labuapi', kecamatanName: 'Labuapi' },
      { id: 'kuranji', name: 'Kuranji', fullName: 'Desa Kuranji, Kec. Labuapi', type: 'DESA', kecamatanId: 'labuapi', kecamatanName: 'Labuapi' },
      { id: 'kuranji-dalang', name: 'Kuranji Dalang', fullName: 'Desa Kuranji Dalang, Kec. Labuapi', type: 'DESA', kecamatanId: 'labuapi', kecamatanName: 'Labuapi' },
      { id: 'labuapi', name: 'Labuapi', fullName: 'Desa Labuapi, Kec. Labuapi', type: 'DESA', kecamatanId: 'labuapi', kecamatanName: 'Labuapi' },
      { id: 'merembu', name: 'Merembu', fullName: 'Desa Merembu, Kec. Labuapi', type: 'DESA', kecamatanId: 'labuapi', kecamatanName: 'Labuapi' },
      { id: 'perampuan', name: 'Perampuan', fullName: 'Desa Perampuan, Kec. Labuapi', type: 'DESA', kecamatanId: 'labuapi', kecamatanName: 'Labuapi' },
      { id: 'rumak-lbp', name: 'Rumak', fullName: 'Desa Rumak, Kec. Labuapi', type: 'DESA', kecamatanId: 'labuapi', kecamatanName: 'Labuapi' },
      { id: 'terong-tawah', name: 'Terong Tawah', fullName: 'Desa Terong Tawah, Kec. Labuapi', type: 'DESA', kecamatanId: 'labuapi', kecamatanName: 'Labuapi' }
    ]
  },
  {
    id: 'lembar',
    name: 'Lembar',
    fullName: 'Kecamatan Lembar',
    capitalVillage: 'Lembar',
    camatTitle: 'Ketua LPTQ Kec. Lembar / Camat Lembar',
    defaultChairman: 'Agus Sutrisno, S.E.',
    defaultChiefJudge: 'TGH. Zainal Arifin, M.Pd.I',
    defaultVenue: 'Gedung Serbaguna Lembar / Halaman Pelabuhan Lembar, Lombok Barat',
    postalCode: '83364',
    totalDesa: 10,
    totalKelurahan: 0,
    villages: [
      { id: 'eyat-mayang', name: 'Eyat Mayang', fullName: 'Desa Eyat Mayang, Kec. Lembar', type: 'DESA', kecamatanId: 'lembar', kecamatanName: 'Lembar' },
      { id: 'jembatan-gantung', name: 'Jembatan Gantung', fullName: 'Desa Jembatan Gantung, Kec. Lembar', type: 'DESA', kecamatanId: 'lembar', kecamatanName: 'Lembar' },
      { id: 'jembatan-kembar', name: 'Jembatan Kembar', fullName: 'Desa Jembatan Kembar, Kec. Lembar', type: 'DESA', kecamatanId: 'lembar', kecamatanName: 'Lembar' },
      { id: 'jembatan-kembar-timur', name: 'Jembatan Kembar Timur', fullName: 'Desa Jembatan Kembar Timur, Kec. Lembar', type: 'DESA', kecamatanId: 'lembar', kecamatanName: 'Lembar' },
      { id: 'labuan-tereng', name: 'Labuan Tereng', fullName: 'Desa Labuan Tereng, Kec. Lembar', type: 'DESA', kecamatanId: 'lembar', kecamatanName: 'Lembar' },
      { id: 'lembar', name: 'Lembar', fullName: 'Desa Lembar, Kec. Lembar', type: 'DESA', kecamatanId: 'lembar', kecamatanName: 'Lembar' },
      { id: 'lembar-selatan', name: 'Lembar Selatan', fullName: 'Desa Lembar Selatan, Kec. Lembar', type: 'DESA', kecamatanId: 'lembar', kecamatanName: 'Lembar' },
      { id: 'mareje', name: 'Mareje', fullName: 'Desa Mareje, Kec. Lembar', type: 'DESA', kecamatanId: 'lembar', kecamatanName: 'Lembar' },
      { id: 'mareje-timur', name: 'Mareje Timur', fullName: 'Desa Mareje Timur, Kec. Lembar', type: 'DESA', kecamatanId: 'lembar', kecamatanName: 'Lembar' },
      { id: 'sekotong-timur-lmb', name: 'Sekotong Timur', fullName: 'Desa Sekotong Timur, Kec. Lembar', type: 'DESA', kecamatanId: 'lembar', kecamatanName: 'Lembar' }
    ]
  },
  {
    id: 'lingsar',
    name: 'Lingsar',
    fullName: 'Kecamatan Lingsar',
    capitalVillage: 'Lingsar',
    camatTitle: 'Ketua LPTQ Kec. Lingsar / Camat Lingsar',
    defaultChairman: 'Marzuqi, S.AP.',
    defaultChiefJudge: 'TGH. Muzakkir Walad, M.Pd.',
    defaultVenue: 'Arena Budaya Kemakmuran Lingsar, Kabupaten Lombok Barat',
    postalCode: '83371',
    totalDesa: 12,
    totalKelurahan: 0,
    villages: [
      { id: 'batu-kumbung', name: 'Batu Kumbung', fullName: 'Desa Batu Kumbung, Kec. Lingsar', type: 'DESA', kecamatanId: 'lingsar', kecamatanName: 'Lingsar' },
      { id: 'batu-mekar', name: 'Batu Mekar', fullName: 'Desa Batu Mekar, Kec. Lingsar', type: 'DESA', kecamatanId: 'lingsar', kecamatanName: 'Lingsar' },
      { id: 'bug-bug', name: 'Bug-Bug', fullName: 'Desa Bug-Bug, Kec. Lingsar', type: 'DESA', kecamatanId: 'lingsar', kecamatanName: 'Lingsar' },
      { id: 'duman', name: 'Duman', fullName: 'Desa Duman, Kec. Lingsar', type: 'DESA', kecamatanId: 'lingsar', kecamatanName: 'Lingsar' },
      { id: 'gegelang', name: 'Gegelang', fullName: 'Desa Gegelang, Kec. Lingsar', type: 'DESA', kecamatanId: 'lingsar', kecamatanName: 'Lingsar' },
      { id: 'gegerung', name: 'Gegerung', fullName: 'Desa Gegerung, Kec. Lingsar', type: 'DESA', kecamatanId: 'lingsar', kecamatanName: 'Lingsar' },
      { id: 'gontoran', name: 'Gontoran', fullName: 'Desa Gontoran, Kec. Lingsar', type: 'DESA', kecamatanId: 'lingsar', kecamatanName: 'Lingsar' },
      { id: 'karang-bayan', name: 'Karang Bayan', fullName: 'Desa Karang Bayan, Kec. Lingsar', type: 'DESA', kecamatanId: 'lingsar', kecamatanName: 'Lingsar' },
      { id: 'langko', name: 'Langko', fullName: 'Desa Langko, Kec. Lingsar', type: 'DESA', kecamatanId: 'lingsar', kecamatanName: 'Lingsar' },
      { id: 'lingsar', name: 'Lingsar', fullName: 'Desa Lingsar, Kec. Lingsar', type: 'DESA', kecamatanId: 'lingsar', kecamatanName: 'Lingsar' },
      { id: 'peteluan-indah', name: 'Peteluan Indah', fullName: 'Desa Peteluan Indah, Kec. Lingsar', type: 'DESA', kecamatanId: 'lingsar', kecamatanName: 'Lingsar' },
      { id: 'sigerongan', name: 'Sigerongan', fullName: 'Desa Sigerongan, Kec. Lingsar', type: 'DESA', kecamatanId: 'lingsar', kecamatanName: 'Lingsar' }
    ]
  },
  {
    id: 'narmada',
    name: 'Narmada',
    fullName: 'Kecamatan Narmada',
    capitalVillage: 'Lembuak',
    camatTitle: 'Ketua LPTQ Kec. Narmada / Camat Narmada',
    defaultChairman: 'M. Busyairi, S.Sos.',
    defaultChiefJudge: 'TGH. Subki Sasaki, M.A.',
    defaultVenue: 'Lapangan H. Lalu Anggrat Narmada, Kabupaten Lombok Barat',
    postalCode: '83371',
    totalDesa: 21,
    totalKelurahan: 0,
    villages: [
      { id: 'badrain', name: 'Badrain', fullName: 'Desa Badrain, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'batu-kuta', name: 'Batu Kuta', fullName: 'Desa Batu Kuta, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'buwun-sejati', name: 'Buwun Sejati', fullName: 'Desa Buwun Sejati, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'dasan-tereng', name: 'Dasan Tereng', fullName: 'Desa Dasan Tereng, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'gerimak-indah', name: 'Gerimak Indah', fullName: 'Desa Gerimak Indah, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'golong', name: 'Golong', fullName: 'Desa Golong, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'krama-jaya', name: 'Krama Jaya', fullName: 'Desa Krama Jaya, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'lebah-sempaga', name: 'Lebah Sempaga', fullName: 'Desa Lebah Sempaga, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'lembuak', name: 'Lembuak', fullName: 'Desa Lembuak, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'mekarsari-nmd', name: 'Mekarsari', fullName: 'Desa Mekarsari, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'narmada', name: 'Narmada', fullName: 'Desa Narmada, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'nyur-lembang', name: 'Nyur Lembang', fullName: 'Desa Nyur Lembang, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'pakuan', name: 'Pakuan', fullName: 'Desa Pakuan, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'peresak', name: 'Peresak', fullName: 'Desa Peresak, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'peru', name: 'Peru', fullName: 'Desa Peru, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'sedau', name: 'Sedau', fullName: 'Desa Sedau, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'selat', name: 'Selat', fullName: 'Desa Selat, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'sembung', name: 'Sembung', fullName: 'Desa Sembung, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'sesaot', name: 'Sesaot', fullName: 'Desa Sesaot, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'suranadi', name: 'Suranadi', fullName: 'Desa Suranadi, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' },
      { id: 'tanak-beak', name: 'Tanak Beak', fullName: 'Desa Tanak Beak, Kec. Narmada', type: 'DESA', kecamatanId: 'narmada', kecamatanName: 'Narmada' }
    ]
  },
  {
    id: 'sekotong',
    name: 'Sekotong',
    fullName: 'Kecamatan Sekotong',
    capitalVillage: 'Sekotong Tengah',
    camatTitle: 'Ketua LPTQ Kec. Sekotong / Camat Sekotong',
    defaultChairman: 'Lalu Pardita Utama, S.E.',
    defaultChiefJudge: 'TGH. Muhammad Syakir, S.Ag.',
    defaultVenue: 'Lapangan Wisata Sekotong Tengah, Kabupaten Lombok Barat',
    postalCode: '83365',
    totalDesa: 9,
    totalKelurahan: 0,
    villages: [
      { id: 'batu-putih', name: 'Batu Putih', fullName: 'Desa Batu Putih, Kec. Sekotong', type: 'DESA', kecamatanId: 'sekotong', kecamatanName: 'Sekotong' },
      { id: 'buwun-mas', name: 'Buwun Mas', fullName: 'Desa Buwun Mas, Kec. Sekotong', type: 'DESA', kecamatanId: 'sekotong', kecamatanName: 'Sekotong' },
      { id: 'cendi-manik', name: 'Cendi Manik', fullName: 'Desa Cendi Manik, Kec. Sekotong', type: 'DESA', kecamatanId: 'sekotong', kecamatanName: 'Sekotong' },
      { id: 'gili-gede-indah', name: 'Gili Gede Indah', fullName: 'Desa Gili Gede Indah, Kec. Sekotong', type: 'DESA', kecamatanId: 'sekotong', kecamatanName: 'Sekotong' },
      { id: 'kedaro', name: 'Kedaro', fullName: 'Desa Kedaro, Kec. Sekotong', type: 'DESA', kecamatanId: 'sekotong', kecamatanName: 'Sekotong' },
      { id: 'pelangan', name: 'Pelangan', fullName: 'Desa Pelangan, Kec. Sekotong', type: 'DESA', kecamatanId: 'sekotong', kecamatanName: 'Sekotong' },
      { id: 'sekotong-barat', name: 'Sekotong Barat', fullName: 'Desa Sekotong Barat, Kec. Sekotong', type: 'DESA', kecamatanId: 'sekotong', kecamatanName: 'Sekotong' },
      { id: 'sekotong-tengah', name: 'Sekotong Tengah', fullName: 'Desa Sekotong Tengah, Kec. Sekotong', type: 'DESA', kecamatanId: 'sekotong', kecamatanName: 'Sekotong' },
      { id: 'taman-baru-skt', name: 'Taman Baru', fullName: 'Desa Taman Baru, Kec. Sekotong', type: 'DESA', kecamatanId: 'sekotong', kecamatanName: 'Sekotong' }
    ]
  }
];

export const DEFAULT_KECAMATAN_ID = 'gerung';

export function getAllKecamatan(): KecamatanLombokBarat[] {
  return LOMBOK_BARAT_KECAMATAN;
}

export function getKecamatanById(id?: string): KecamatanLombokBarat {
  const found = LOMBOK_BARAT_KECAMATAN.find(k => k.id === id);
  return found || LOMBOK_BARAT_KECAMATAN[0]; // Gerung is default
}

export function getVillagesByKecamatan(kecamatanId: string): WilayahKafilah[] {
  const kec = getKecamatanById(kecamatanId);
  return kec.villages;
}

export function getAllLombokBaratVillages(): WilayahKafilah[] {
  return LOMBOK_BARAT_KECAMATAN.flatMap(k => k.villages);
}
