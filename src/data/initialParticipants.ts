import { Participant, SystemConfig } from '../types';
import { PAS_FOTO_PRESETS } from '../utils/photoPresets';

export const DEFAULT_SYSTEM_CONFIG: SystemConfig = {
  eventName: "MUSABAQAH TILAWATIL QUR'AN (MTQ) KE-XXXII",
  edition: 'MTQ KE-XXXII TINGKAT KECAMATAN GERUNG',
  hostLocation: 'Kecamatan Gerung, Kabupaten Lombok Barat, NTB',
  activeKecamatanId: 'gerung',
  year: 2026,
  chairmanName: "H. Syafi'i, S.Sos., M.M.",
  chairmanTitle: 'Ketua LPTQ Kec. Gerung / Camat Gerung',
  chiefJudgeName: 'TGH. Ahmad Muammar, M.Q.',
  chiefJudgeTitle: 'Ketua Dewan Hakim MTQ Kec. Gerung',
  startDate: '2026-09-15',
  endDate: '2026-09-21',
  announcementDate: '2026-09-20'
};

export const INITIAL_PARTICIPANTS: Participant[] = [
  {
    id: 'p-1',
    registrationNumber: 'REG-MTQ-2026-001',
    participantCode: 'TLW-PA-01',
    fullName: 'Muhammad Farhan Al-Hafidz',
    nik: '5201011234560001',
    originKafilah: 'Kelurahan Gerung Selatan, Kec. Gerung',
    gender: 'PUTRA',
    birthPlace: 'Gerung',
    birthDate: '1998-04-12',
    phone: '081234567890',
    branchId: 'tilawah',
    category: 'Golongan Dewasa',
    status: 'SELESAI',
    orderNumber: 1,
    photoUrl: PAS_FOTO_PRESETS[0].dataUrl,
    createdAt: '2026-09-10T08:30:00Z',
    judgeScores: [
      {
        judgeId: 'j-1',
        judgeName: 'TGH. Ahmad Muammar, M.Q.',
        scores: { tajwid: 29.5, fashahah: 29.0, irama: 24.5, suara: 14.5 },
        deduction: 0,
        signedAt: '2026-09-16T09:45:00Z'
      },
      {
        judgeId: 'j-2',
        judgeName: 'Ustazah Hj. Siti Maryam, S.Pd.I',
        scores: { tajwid: 29.0, fashahah: 28.5, irama: 24.0, suara: 14.5 },
        deduction: 0,
        signedAt: '2026-09-16T09:46:00Z'
      },
      {
        judgeId: 'j-3',
        judgeName: 'Ust. H. Lalu Anwar Sadat, M.Ag',
        scores: { tajwid: 29.5, fashahah: 29.0, irama: 25.0, suara: 14.0 },
        deduction: 0,
        signedAt: '2026-09-16T09:46:30Z'
      }
    ],
    finalScore: 97.17,
    rank: 1,
    awardTitle: 'Juara I',
    certificateNumber: 'PIAGAM/MTQ-XXXII/LPTQ-GRG/2026/TLW-001',
    certificateHash: 'E9B3A74C81FD92E8'
  },
  {
    id: 'p-2',
    registrationNumber: 'REG-MTQ-2026-002',
    participantCode: 'TLW-PA-02',
    fullName: 'Ahmad Raihan Rabbani',
    nik: '5201011234560002',
    originKafilah: 'Desa Babussalam, Kec. Gerung',
    gender: 'PUTRA',
    birthPlace: 'Babussalam',
    birthDate: '1999-07-22',
    phone: '081298765432',
    branchId: 'tilawah',
    category: 'Golongan Dewasa',
    status: 'SELESAI',
    orderNumber: 2,
    photoUrl: PAS_FOTO_PRESETS[1].dataUrl,
    createdAt: '2026-09-10T09:00:00Z',
    judgeScores: [
      {
        judgeId: 'j-1',
        judgeName: 'TGH. Ahmad Muammar, M.Q.',
        scores: { tajwid: 28.5, fashahah: 28.0, irama: 24.0, suara: 14.0 },
        deduction: 0.5,
        signedAt: '2026-09-16T10:15:00Z'
      },
      {
        judgeId: 'j-2',
        judgeName: 'Ustazah Hj. Siti Maryam, S.Pd.I',
        scores: { tajwid: 28.5, fashahah: 28.5, irama: 23.5, suara: 14.0 },
        deduction: 0.5,
        signedAt: '2026-09-16T10:16:00Z'
      },
      {
        judgeId: 'j-3',
        judgeName: 'Ust. H. Lalu Anwar Sadat, M.Ag',
        scores: { tajwid: 28.0, fashahah: 28.0, irama: 24.0, suara: 13.5 },
        deduction: 0.5,
        signedAt: '2026-09-16T10:16:30Z'
      }
    ],
    finalScore: 93.83,
    rank: 2,
    awardTitle: 'Juara II',
    certificateNumber: 'PIAGAM/MTQ-XXXII/LPTQ-GRG/2026/TLW-002',
    certificateHash: '4C7D8F19B6AE2035'
  },
  {
    id: 'p-3',
    registrationNumber: 'REG-MTQ-2026-003',
    participantCode: 'TLW-PI-01',
    fullName: 'Nurul Aini Khairunnisa',
    nik: '5201011234560003',
    originKafilah: 'Kelurahan Gerung Utara, Kec. Gerung',
    gender: 'PUTRI',
    birthPlace: 'Gerung',
    birthDate: '2001-01-15',
    phone: '081345678901',
    branchId: 'tilawah',
    category: 'Golongan Dewasa',
    status: 'SELESAI',
    orderNumber: 3,
    photoUrl: PAS_FOTO_PRESETS[2].dataUrl,
    createdAt: '2026-09-10T10:00:00Z',
    judgeScores: [
      {
        judgeId: 'j-1',
        judgeName: 'TGH. Ahmad Muammar, M.Q.',
        scores: { tajwid: 29.0, fashahah: 29.0, irama: 24.5, suara: 14.5 },
        deduction: 0,
        signedAt: '2026-09-16T11:00:00Z'
      },
      {
        judgeId: 'j-2',
        judgeName: 'Ustazah Hj. Siti Maryam, S.Pd.I',
        scores: { tajwid: 29.5, fashahah: 29.0, irama: 25.0, suara: 14.5 },
        deduction: 0,
        signedAt: '2026-09-16T11:01:00Z'
      },
      {
        judgeId: 'j-3',
        judgeName: 'Ust. H. Lalu Anwar Sadat, M.Ag',
        scores: { tajwid: 29.0, fashahah: 28.5, irama: 24.0, suara: 14.0 },
        deduction: 0,
        signedAt: '2026-09-16T11:01:30Z'
      }
    ],
    finalScore: 96.50,
    rank: 1,
    awardTitle: 'Juara I',
    certificateNumber: 'PIAGAM/MTQ-XXXII/LPTQ-GRG/2026/TLW-003',
    certificateHash: 'A5F90D328C117B4E'
  },
  {
    id: 'p-4',
    registrationNumber: 'REG-MTQ-2026-004',
    participantCode: 'MHQ-PA-01',
    fullName: 'Zaidan Al-Mubarok',
    nik: '5201011234560004',
    originKafilah: 'Desa Dasan Tapen, Kec. Gerung',
    gender: 'PUTRA',
    birthPlace: 'Dasan Tapen',
    birthDate: '2004-11-03',
    phone: '081356789012',
    branchId: 'hifzh',
    category: 'Golongan 30 Juz',
    status: 'SELESAI',
    orderNumber: 1,
    createdAt: '2026-09-10T11:15:00Z',
    judgeScores: [
      {
        judgeId: 'j-1',
        judgeName: 'TGH. Ahmad Muammar, M.Q.',
        scores: { kelancaran: 49.5, tajwid: 24.5, fashahah: 24.5 },
        deduction: 0,
        signedAt: '2026-09-16T13:30:00Z'
      },
      {
        judgeId: 'j-2',
        judgeName: 'Ust. H. Lalu Anwar Sadat, M.Ag',
        scores: { kelancaran: 49.0, tajwid: 25.0, fashahah: 24.0 },
        deduction: 0,
        signedAt: '2026-09-16T13:31:00Z'
      }
    ],
    finalScore: 98.25,
    rank: 1,
    awardTitle: 'Juara I',
    certificateNumber: 'PIAGAM/MTQ-XXXII/LPTQ-GRG/2026/MHQ-001',
    certificateHash: '73DE58BC901FAA62'
  },
  {
    id: 'p-5',
    registrationNumber: 'REG-MTQ-2026-005',
    participantCode: 'MHQ-PA-02',
    fullName: 'Bilal Habibi Ramadhan',
    nik: '5201011234560005',
    originKafilah: 'Desa Beleka, Kec. Gerung',
    gender: 'PUTRA',
    birthPlace: 'Beleka',
    birthDate: '2005-03-29',
    phone: '081367890123',
    branchId: 'hifzh',
    category: 'Golongan 30 Juz',
    status: 'SELESAI',
    orderNumber: 2,
    createdAt: '2026-09-10T12:00:00Z',
    judgeScores: [
      {
        judgeId: 'j-1',
        judgeName: 'TGH. Ahmad Muammar, M.Q.',
        scores: { kelancaran: 48.0, tajwid: 24.0, fashahah: 23.5 },
        deduction: 0,
        signedAt: '2026-09-16T14:15:00Z'
      },
      {
        judgeId: 'j-2',
        judgeName: 'Ust. H. Lalu Anwar Sadat, M.Ag',
        scores: { kelancaran: 48.5, tajwid: 23.5, fashahah: 24.0 },
        deduction: 0,
        signedAt: '2026-09-16T14:16:00Z'
      }
    ],
    finalScore: 95.50,
    rank: 2,
    awardTitle: 'Juara II',
    certificateNumber: 'PIAGAM/MTQ-XXXII/LPTQ-GRG/2026/MHQ-002',
    certificateHash: '61BA947FE28C01D3'
  },
  {
    id: 'p-6',
    registrationNumber: 'REG-MTQ-2026-006',
    participantCode: 'MSQ-PA-01',
    fullName: 'Regu Syarhil Al-Furqan',
    nik: '5201011234560006',
    originKafilah: 'Desa Banyu Urip, Kec. Gerung',
    gender: 'PUTRA',
    birthPlace: 'Banyu Urip',
    birthDate: '2003-08-17',
    phone: '081378901234',
    branchId: 'syarhil',
    category: 'Beregu Putra (Pensyarah, Qari, Sari Tilawah)',
    teamMembers: ['Ilham Syakir (Pensyarah)', 'Faqih Rabbani (Qari\')', 'Haris Al-Amin (Sari Tilawah)'],
    status: 'SELESAI',
    orderNumber: 1,
    createdAt: '2026-09-10T13:10:00Z',
    judgeScores: [
      {
        judgeId: 'j-1',
        judgeName: 'Ustazah Hj. Siti Maryam, S.Pd.I',
        scores: { penghayatan_retorika: 38.5, materi_terjemah: 28.5, tilawah_adab: 28.5 },
        deduction: 0,
        signedAt: '2026-09-16T15:00:00Z'
      },
      {
        judgeId: 'j-2',
        judgeName: 'Ust. H. Lalu Anwar Sadat, M.Ag',
        scores: { penghayatan_retorika: 39.0, materi_terjemah: 29.0, tilawah_adab: 29.0 },
        deduction: 0,
        signedAt: '2026-09-16T15:02:00Z'
      }
    ],
    finalScore: 97.00,
    rank: 1,
    awardTitle: 'Juara I',
    certificateNumber: 'PIAGAM/MTQ-XXXII/LPTQ-GRG/2026/MSQ-001',
    certificateHash: '8DFE472A991C63B0'
  },
  {
    id: 'p-7',
    registrationNumber: 'REG-MTQ-2026-007',
    participantCode: 'MKQ-PI-01',
    fullName: 'Fatimatuzzahra Al-Khattathah',
    nik: '5201011234560007',
    originKafilah: 'Desa Kebon Ayu, Kec. Gerung',
    gender: 'PUTRI',
    birthPlace: 'Kebon Ayu',
    birthDate: '2000-05-10',
    phone: '081389012345',
    branchId: 'khath',
    category: 'Golongan Hiasan Mushaf',
    status: 'SELESAI',
    orderNumber: 1,
    createdAt: '2026-09-10T14:00:00Z',
    judgeScores: [
      {
        judgeId: 'j-1',
        judgeName: 'TGH. Ahmad Muammar, M.Q.',
        scores: { kaidah_khath: 44.0, keindahan_tatawarna: 34.5, kebersihan: 19.5 },
        deduction: 0,
        signedAt: '2026-09-16T16:00:00Z'
      }
    ],
    finalScore: 98.00,
    rank: 1,
    awardTitle: 'Juara I',
    certificateNumber: 'PIAGAM/MTQ-XXXII/LPTQ-GRG/2026/MKQ-001',
    certificateHash: '31F7B96D04CA85E2'
  },
  {
    id: 'p-8',
    registrationNumber: 'REG-MTQ-2026-008',
    participantCode: 'MHD-PA-01',
    fullName: 'Luqman Hakim Al-Muhaddits',
    nik: '5201011234560008',
    originKafilah: 'Desa Mesanggok, Kec. Gerung',
    gender: 'PUTRA',
    birthPlace: 'Mesanggok',
    birthDate: '2002-09-09',
    phone: '081390123456',
    branchId: 'hadist',
    category: 'Hafalan 100 Hadist dengan Sanad',
    status: 'SELESAI',
    orderNumber: 1,
    createdAt: '2026-09-10T15:20:00Z',
    judgeScores: [
      {
        judgeId: 'j-1',
        judgeName: 'TGH. Ahmad Muammar, M.Q.',
        scores: { kelancaran_hafalan: 49.0, tajwid_fashahah: 24.5, pemahaman_takhrij: 24.5 },
        deduction: 0,
        signedAt: '2026-09-16T16:40:00Z'
      }
    ],
    finalScore: 98.00,
    rank: 1,
    awardTitle: 'Juara I',
    certificateNumber: 'PIAGAM/MTQ-XXXII/LPTQ-GRG/2026/MHD-001',
    certificateHash: '9CA02F6831BE745D'
  },
  {
    id: 'p-9',
    registrationNumber: 'REG-MTQ-2026-009',
    participantCode: 'MFQ-PA-01',
    fullName: 'Regu Fahmil Al-Hikmah',
    nik: '5201011234560009',
    originKafilah: 'Desa Tempos, Kec. Gerung',
    gender: 'PUTRA',
    birthPlace: 'Tempos',
    birthDate: '2004-02-14',
    phone: '081301234567',
    branchId: 'fahmil',
    category: 'Beregu Putra (3 Orang)',
    teamMembers: ['Rizki Maulana (Jurubicara)', 'Daffa Arkan (Pendamping 1)', 'Faris Fikri (Pendamping 2)'],
    status: 'SEDANG_TAMPIL',
    orderNumber: 2,
    createdAt: '2026-09-10T16:00:00Z',
    judgeScores: []
  },
  {
    id: 'p-10',
    registrationNumber: 'REG-MTQ-2026-010',
    participantCode: 'TLW-PA-03',
    fullName: 'Ghazali Ar-Rumi',
    nik: '5201011234560010',
    originKafilah: 'Desa Gapuk, Kec. Gerung',
    gender: 'PUTRA',
    birthPlace: 'Gapuk',
    birthDate: '2000-12-05',
    phone: '081312345678',
    branchId: 'tilawah',
    category: 'Golongan Dewasa',
    status: 'TERVERIFIKASI',
    orderNumber: 4,
    createdAt: '2026-09-11T09:00:00Z',
    judgeScores: []
  },
  {
    id: 'p-11',
    registrationNumber: 'REG-MTQ-2026-011',
    participantCode: 'TLW-PI-02',
    fullName: 'Siti Sarah Mardhatillah',
    nik: '5201011234560011',
    originKafilah: 'Desa Taman Ayu, Kec. Gerung',
    gender: 'PUTRI',
    birthPlace: 'Taman Ayu',
    birthDate: '2001-08-19',
    phone: '081323456789',
    branchId: 'tilawah',
    category: 'Golongan Dewasa',
    status: 'SELESAI',
    orderNumber: 2,
    createdAt: '2026-09-11T10:00:00Z',
    judgeScores: [
      {
        judgeId: 'j-1',
        judgeName: 'TGH. Ahmad Muammar, M.Q.',
        scores: { tajwid: 28.5, fashahah: 28.5, irama: 23.5, suara: 14.0 },
        deduction: 0,
        signedAt: '2026-09-16T11:30:00Z'
      }
    ],
    finalScore: 94.50,
    rank: 2,
    awardTitle: 'Juara II',
    certificateNumber: 'PIAGAM/MTQ-XXXII/LPTQ-GRG/2026/TLW-011',
    certificateHash: '5B29D4E810C73FA1'
  },
  {
    id: 'p-12',
    registrationNumber: 'REG-MTQ-2026-012',
    participantCode: 'MHQ-PI-01',
    fullName: 'Aisyah Humaira Qanitah',
    nik: '5201011234560012',
    originKafilah: 'Kelurahan Dasan Geres, Kec. Gerung',
    gender: 'PUTRI',
    birthPlace: 'Dasan Geres',
    birthDate: '2006-04-10',
    phone: '081334567890',
    branchId: 'hifzh',
    category: 'Golongan 10 Juz',
    status: 'SELESAI',
    orderNumber: 1,
    createdAt: '2026-09-11T11:00:00Z',
    judgeScores: [
      {
        judgeId: 'j-1',
        judgeName: 'TGH. Ahmad Muammar, M.Q.',
        scores: { kelancaran: 49.0, tajwid: 24.5, fashahah: 24.0 },
        deduction: 0,
        signedAt: '2026-09-16T14:45:00Z'
      }
    ],
    finalScore: 97.50,
    rank: 1,
    awardTitle: 'Juara I',
    certificateNumber: 'PIAGAM/MTQ-XXXII/LPTQ-GRG/2026/MHQ-012',
    certificateHash: '8E4A1C0F73B92D65'
  },
  {
    id: 'p-13',
    registrationNumber: 'REG-MTQ-2026-013',
    participantCode: 'MFQ-PI-01',
    fullName: 'Regu Fahmil Annur',
    nik: '5201011234560013',
    originKafilah: 'Desa Suka Makmur, Kec. Gerung',
    gender: 'PUTRI',
    birthPlace: 'Suka Makmur',
    birthDate: '2005-06-20',
    phone: '081345678902',
    branchId: 'fahmil',
    category: 'Beregu Putri (3 Orang)',
    teamMembers: ['Naila Rahmah', 'Zahra Maulida', 'Hafizhah Khairiyah'],
    status: 'TERVERIFIKASI',
    orderNumber: 1,
    createdAt: '2026-09-11T13:00:00Z',
    judgeScores: []
  },
  {
    id: 'p-14',
    registrationNumber: 'REG-MTQ-2026-014',
    participantCode: 'MKQ-PA-01',
    fullName: 'Zulfa Ilham Khatib',
    nik: '5201011234560014',
    originKafilah: 'Desa Giri Tembesi, Kec. Gerung',
    gender: 'PUTRA',
    birthPlace: 'Giri Tembesi',
    birthDate: '2001-10-11',
    phone: '081356789013',
    branchId: 'khath',
    category: 'Golongan Naskah',
    status: 'SELESAI',
    orderNumber: 1,
    createdAt: '2026-09-11T14:30:00Z',
    judgeScores: [
      {
        judgeId: 'j-1',
        judgeName: 'TGH. Ahmad Muammar, M.Q.',
        scores: { kaidah_khath: 43.5, keindahan_tatawarna: 34.0, kebersihan: 19.0 },
        deduction: 0,
        signedAt: '2026-09-16T16:30:00Z'
      }
    ],
    finalScore: 96.50,
    rank: 2,
    awardTitle: 'Juara II',
    certificateNumber: 'PIAGAM/MTQ-XXXII/LPTQ-GRG/2026/MKQ-014',
    certificateHash: 'C2A90F4D88EB137A'
  }
];
