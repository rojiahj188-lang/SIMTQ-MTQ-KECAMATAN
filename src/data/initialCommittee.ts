import { CommitteeMember } from '../types';
import { PANITIA_FOTO_PRESETS } from '../utils/photoPresets';

export const INITIAL_COMMITTEE: CommitteeMember[] = [
  // 1. Penanggung Jawab & Pengarah
  {
    id: 'com-01',
    code: 'PENG-01',
    fullName: 'Syaefudin Sahril, S.Sos., M.Si',
    titleWithDegree: 'Syaefudin Sahril, S.Sos., M.Si',
    nipOrNik: '19740512 199803 1 005',
    roleCategory: 'PENANGGUNG_JAWAB',
    positionName: 'Penanggung Jawab Umum / Camat Gerung',
    division: 'Pimpinan Wilayah & Pembina LPTQ',
    institution: 'Kantor Camat Gerung, Kab. Lombok Barat',
    accessArea: 'ALL ACCESS & VIP PROTOKOLER',
    gender: 'PUTRA',
    phone: '0819-0711-2301',
    photoUrl: PANITIA_FOTO_PRESETS[0].dataUrl
  },
  {
    id: 'com-02',
    code: 'PENG-02',
    fullName: 'H. Muhammad Arsyad, S.Ag., M.H',
    titleWithDegree: 'H. Muhammad Arsyad, S.Ag., M.H',
    nipOrNik: '19760814 200212 1 003',
    roleCategory: 'PENANGGUNG_JAWAB',
    positionName: 'Ketua Pembina / Kepala KUA Gerung',
    division: 'Bimbingan Masyarakat Islam & Pembinaan Tilawah',
    institution: 'Kantor Urusan Agama (KUA) Kec. Gerung',
    accessArea: 'ALL ACCESS & VIP PROTOKOLER',
    gender: 'PUTRA',
    phone: '0818-0522-3344',
    photoUrl: PANITIA_FOTO_PRESETS[1].dataUrl
  },
  {
    id: 'com-03',
    code: 'PENG-03',
    fullName: 'Drs. H. Lalu Sabarudin',
    titleWithDegree: 'Drs. H. Lalu Sabarudin',
    nipOrNik: '19681120 199403 1 004',
    roleCategory: 'PENANGGUNG_JAWAB',
    positionName: 'Ketua Umum LPTQ Kecamatan Gerung',
    division: 'Pengurus Harian LPTQ',
    institution: 'LPTQ Kecamatan Gerung',
    accessArea: 'ALL ACCESS & DEWAN HAKIM',
    gender: 'PUTRA',
    phone: '0817-5788-9900',
    photoUrl: PANITIA_FOTO_PRESETS[0].dataUrl
  },

  // 2. Dewan Hakam / Dewan Hakim
  {
    id: 'com-04',
    code: 'DHK-01',
    fullName: 'TGH. Mukhlis Ibrahim, S.Q., M.Pd.I',
    titleWithDegree: 'TGH. Mukhlis Ibrahim, S.Q., M.Pd.I',
    nipOrNik: '19710315 199903 1 002',
    roleCategory: 'DEWAN_HAKIM',
    positionName: 'Ketua Dewan Hakim / Koordinator Cabang Tilawah',
    division: 'Majelis Dewan Hakam MTQ',
    institution: 'Kementerian Agama Kab. Lombok Barat',
    accessArea: 'MEJA DEWAN HAKIM & MIMBAR UTAMA',
    gender: 'PUTRA',
    phone: '0819-1723-4567',
    photoUrl: PANITIA_FOTO_PRESETS[0].dataUrl
  },
  {
    id: 'com-05',
    code: 'DHK-02',
    fullName: 'TGH. Ahmad Sanusi, Al-Hafizh',
    titleWithDegree: 'TGH. Ahmad Sanusi, Al-Hafizh',
    nipOrNik: '5201011808770002',
    roleCategory: 'DEWAN_HAKIM',
    positionName: 'Anggota Dewan Hakim - Cabang Hifzhil Qur\'an',
    division: 'Majelis Tahfizh Al-Qur\'an 1-30 Juz',
    institution: 'Pondok Pesantren Tahfizh Gerung',
    accessArea: 'MEJA DEWAN HAKIM & MIMBAR II',
    gender: 'PUTRA',
    phone: '0819-3344-5566',
    photoUrl: PANITIA_FOTO_PRESETS[0].dataUrl
  },
  {
    id: 'com-06',
    code: 'DHK-03',
    fullName: 'Dra. Hj. Nurhasanah, M.Ag',
    titleWithDegree: 'Dra. Hj. Nurhasanah, M.Ag',
    nipOrNik: '19690412 199403 2 001',
    roleCategory: 'DEWAN_HAKIM',
    positionName: 'Anggota Dewan Hakim - Cabang Fahmil & Syarhil',
    division: 'Majelis Fahmil & Syarhil Qur\'an',
    institution: 'UIN Mataram / Pengurus LPTQ Provinsi NTB',
    accessArea: 'MEJA DEWAN HAKIM & ARENA BEREGU',
    gender: 'PUTRI',
    phone: '0818-0367-8910',
    photoUrl: PANITIA_FOTO_PRESETS[2].dataUrl
  },
  {
    id: 'com-07',
    code: 'DHK-04',
    fullName: 'Ust. H. Muhammad Zaini, S.Ag',
    titleWithDegree: 'Ust. H. Muhammad Zaini, S.Ag',
    nipOrNik: '5201011504800003',
    roleCategory: 'DEWAN_HAKIM',
    positionName: 'Anggota Dewan Hakim - Cabang Khath / Kaligrafi',
    division: 'Majelis Seni Kaligrafi Al-Qur\'an',
    institution: 'Asosiasi Kaligrafer Al-Qur\'an (AKSES) NTB',
    accessArea: 'MEJA DEWAN HAKIM & ARENA KHATH',
    gender: 'PUTRA',
    phone: '0877-6543-2109',
    photoUrl: PANITIA_FOTO_PRESETS[1].dataUrl
  },
  {
    id: 'com-08',
    code: 'PAN-01',
    fullName: 'Ust. M. Rasyid Ridho, S.Pd.I',
    titleWithDegree: 'Ust. M. Rasyid Ridho, S.Pd.I',
    nipOrNik: '19850610 201101 1 012',
    roleCategory: 'PANITERA',
    positionName: 'Sekretaris & Panitera Dewan Hakim',
    division: 'Sekretariat Dewan Hakam',
    institution: 'KUA Kecamatan Gerung',
    accessArea: 'MEJA DEWAN HAKIM & RUANG SKORING',
    gender: 'PUTRA',
    phone: '0819-9988-7766',
    photoUrl: PANITIA_FOTO_PRESETS[1].dataUrl
  },

  // 3. Panitia Pelaksana Inti
  {
    id: 'com-09',
    code: 'PEL-01',
    fullName: 'H. Baiq Mas\'anah, S.Sos',
    titleWithDegree: 'H. Baiq Mas\'anah, S.Sos',
    nipOrNik: '19720914 199603 2 002',
    roleCategory: 'PANITIA_INTI',
    positionName: 'Ketua Panitia Pelaksana MTQ',
    division: 'Panitia Pelaksana Tingkat Kecamatan',
    institution: 'Kantor Camat Gerung',
    accessArea: 'ALL ACCESS KECAMATAN',
    gender: 'PUTRI',
    phone: '0819-1122-3344',
    photoUrl: PANITIA_FOTO_PRESETS[2].dataUrl
  },
  {
    id: 'com-10',
    code: 'PEL-02',
    fullName: 'Akhmad Fauzi, S.Pd.I',
    titleWithDegree: 'Akhmad Fauzi, S.Pd.I',
    nipOrNik: '19820415 200901 1 008',
    roleCategory: 'PANITIA_INTI',
    positionName: 'Sekretaris Panitia Pelaksana',
    division: 'Kesekretariatan & Administrasi LPTQ',
    institution: 'LPTQ Kecamatan Gerung',
    accessArea: 'ALL ACCESS & SEKRETARIAT',
    gender: 'PUTRA',
    phone: '0818-0567-1122',
    photoUrl: PANITIA_FOTO_PRESETS[1].dataUrl
  },
  {
    id: 'com-11',
    code: 'PEL-03',
    fullName: 'Siti Rahmawati, S.E',
    titleWithDegree: 'Siti Rahmawati, S.E',
    nipOrNik: '5201014502880004',
    roleCategory: 'PANITIA_INTI',
    positionName: 'Bendahara Panitia Pelaksana',
    division: 'Keuangan & Administrasi Anggaran',
    institution: 'LPTQ Kecamatan Gerung',
    accessArea: 'SEKRETARIAT & KEUANGAN',
    gender: 'PUTRI',
    phone: '0878-6543-0987',
    photoUrl: PANITIA_FOTO_PRESETS[2].dataUrl
  },

  // 4. Seksi IT, Sistem Digital & Multimedia (Pengembang SIMTQ)
  {
    id: 'com-12',
    code: 'IT-01',
    fullName: 'Husni, S.Kom.I',
    titleWithDegree: 'Husni, S.Kom.I',
    nipOrNik: '19870912 201403 1 003',
    roleCategory: 'SEKSI_IT_MEDIA',
    positionName: 'Koordinator IT, Sistem SIMTQ & Siaran Streaming',
    division: 'Teknologi Informasi, Multimedia & Live Broadcast',
    institution: 'Penyuluh Agama Islam KUA Kec. Gerung',
    accessArea: 'ALL ACCESS & RUANG SERVER IT',
    gender: 'PUTRA',
    phone: '0819-0712-3456',
    photoUrl: PANITIA_FOTO_PRESETS[1].dataUrl
  },
  {
    id: 'com-13',
    code: 'IT-02',
    fullName: 'M. Ihsan Wardani, S.Kom',
    titleWithDegree: 'M. Ihsan Wardani, S.Kom',
    nipOrNik: '5201011206950005',
    roleCategory: 'SEKSI_IT_MEDIA',
    positionName: 'Operator Live Score & Sistem Juri Digital',
    division: 'Operator Teknis Sistem & Live Streaming',
    institution: 'KUA Kecamatan Gerung',
    accessArea: 'RUANG SERVER IT & MEJA JURI',
    gender: 'PUTRA',
    phone: '0859-3321-4455',
    photoUrl: PANITIA_FOTO_PRESETS[0].dataUrl
  },

  // 5. Seksi Musabaqah, Pendaftaran & Verifikasi
  {
    id: 'com-14',
    code: 'MSB-01',
    fullName: 'H. M. Zainuddin, S.Pd',
    titleWithDegree: 'H. M. Zainuddin, S.Pd',
    nipOrNik: '19780210 200501 1 007',
    roleCategory: 'SEKSI_MUSABAQAH',
    positionName: 'Koordinator Seksi Musabaqah & Verifikasi Berkas',
    division: 'Verifikasi Peserta & Penjadwalan Tampil',
    institution: 'KUA Kecamatan Gerung',
    accessArea: 'MIMBAR UTAMA & REGISTRASI',
    gender: 'PUTRA',
    phone: '0818-0511-2233',
    photoUrl: PANITIA_FOTO_PRESETS[1].dataUrl
  },

  // 6. Tim Medis & Kesehatan
  {
    id: 'com-15',
    code: 'MED-01',
    fullName: 'dr. H. Lalu Budi Wirawan',
    titleWithDegree: 'dr. H. Lalu Budi Wirawan',
    nipOrNik: '19800618 200801 1 010',
    roleCategory: 'TIM_MEDIS',
    positionName: 'Koordinator Tim Kesehatan & Medis Darurat',
    division: 'Pelayanan Kesehatan & Ambulans Siaga',
    institution: 'Puskesmas Gerung, Lombok Barat',
    accessArea: 'POSKO KESEHATAN & ALL ARENA',
    gender: 'PUTRA',
    phone: '0819-0700-1199',
    photoUrl: PANITIA_FOTO_PRESETS[0].dataUrl
  },

  // 7. Seksi Keamanan & Ketertiban
  {
    id: 'com-16',
    code: 'SEC-01',
    fullName: 'Iptu I Ketut Sujana',
    titleWithDegree: 'Iptu I Ketut Sujana',
    nipOrNik: '76040212',
    roleCategory: 'SEKSI_KEAMANAN',
    positionName: 'Koordinator Pengamanan & Ketertiban',
    division: 'Pengamanan Arena, Parkir & VIP',
    institution: 'Polsek Gerung',
    accessArea: 'AREA PENGAMANAN & PINTU MASUK',
    gender: 'PUTRA',
    phone: '0812-3456-7890',
    photoUrl: PANITIA_FOTO_PRESETS[0].dataUrl
  }
];
