export type Gender = 'PUTRA' | 'PUTRI';

export type ParticipantStatus = 'TERDAFTAR' | 'TERVERIFIKASI' | 'SEDANG_TAMPIL' | 'SELESAI';

export interface ScoringCriterion {
  id: string;
  name: string;
  maxScore: number;
  description: string;
}

export interface CompetitionBranch {
  id: string;
  code: string; // e.g. "TLW", "QIR", "MHQ", "TFR", "MFQ", "MSQ", "MKQ", "MHD", "MIIQ"
  name: string;
  categoryType: 'INDIVIDUAL' | 'BEREGU';
  categories: string[]; // e.g. ["Tartil", "Anak-Anak", "Remaja", "Dewasa"]
  criteria: ScoringCriterion[];
  description: string;
}

export interface JudgeScore {
  judgeId: string;
  judgeName: string;
  scores: Record<string, number>; // criterionId -> score
  deduction: number;
  notes?: string;
  signedAt?: string;
}

export interface Participant {
  id: string;
  registrationNumber: string; // e.g. "MTQ-2026-001"
  participantCode: string; // e.g. "TLW-PA-01"
  fullName: string;
  nik: string;
  originKafilah: string; // Kabupaten/Kota/Provinsi
  gender: Gender;
  birthPlace: string;
  birthDate: string;
  phone: string;
  branchId: string; // ID of CompetitionBranch
  category: string; // Specific sub-category e.g. "Dewasa"
  teamMembers?: string[]; // For Beregu (e.g. Fahmil, Syarhil)
  status: ParticipantStatus;
  orderNumber: number; // Nomor urut undian tampil
  createdAt: string;
  judgeScores: JudgeScore[];
  finalScore?: number; // Calculated average
  rank?: number; // 1 = Juara 1, 2 = Juara 2, etc.
  awardTitle?: string; // "Juara I", "Juara II", "Juara III", "Harapan I", etc.
  certificateNumber?: string;
  certificateHash?: string;
  streamUrl?: string; // Live streaming video URL (YouTube live, HLS, or simulated arena camera)
  photoUrl?: string; // Base64 or URL of participant photo / attachment identity document
}

export interface SystemConfig {
  eventName: string;
  edition: string;
  hostLocation: string;
  activeKecamatanId?: string; // 'gerung' by default; supports 10 sub-districts in Lombok Barat
  year: number;
  chairmanName: string;
  chairmanTitle: string;
  chiefJudgeName: string;
  chiefJudgeTitle: string;
  startDate: string;
  endDate: string;
  announcementDate: string;
}

export interface RubricDeductionRule {
  ruleName: string;
  penaltyPoints: number; // e.g. 0.5, 1.0, 2.0
  description: string;
  categoryType: 'JALI' | 'KHAFI' | 'WAKTU' | 'ADAB' | 'TEKNIS';
}

export interface RubricCriterionDetail {
  id: string;
  name: string;
  weightPercent: number;
  maxScore: number;
  subComponents: {
    title: string;
    pointsRange: string;
    description: string;
    nationalStandardIndicators: string[];
  }[];
  deductionRules: RubricDeductionRule[];
  judgeTips: string;
}

export interface BranchNationalRubric {
  branchId: string;
  branchCode: string;
  branchName: string;
  legalBasis: string;
  generalRules: string[];
  bellRules?: {
    bellNumber: number;
    color: string;
    meaning: string;
    actionDescription: string;
  }[];
  criteriaDetails: RubricCriterionDetail[];
  scoringGuidanceSummary: string;
}

export type CommitteeRoleCategory = 
  | 'PENANGGUNG_JAWAB' 
  | 'DEWAN_HAKIM' 
  | 'PANITERA' 
  | 'PANITIA_INTI' 
  | 'SEKSI_MUSABAQAH' 
  | 'SEKSI_IT_MEDIA' 
  | 'SEKSI_ACARA' 
  | 'SEKSI_LOGISTIK' 
  | 'TIM_MEDIS' 
  | 'SEKSI_KEAMANAN';

export interface CommitteeMember {
  id: string;
  code: string; // e.g. "PAN-MTQ-01", "DHK-01"
  fullName: string;
  titleWithDegree: string; // e.g. "Drs. H. Syaiful Bahri, M.Pd.I"
  nipOrNik?: string;
  roleCategory: CommitteeRoleCategory;
  positionName: string; // e.g. "Ketua Dewan Hakim", "Koordinator IT & Siaran", "Ketua Panitia Pelaksana"
  division: string; // e.g. "Dewan Hakam / Dewan Juri", "Sekretariat & Pendaftaran", "Teknologi & Multimedia"
  institution: string; // e.g. "KUA Kecamatan Gerung", "Kantor Camat Gerung", "LPTQ Kabupaten Lombok Barat", "Puskesmas Gerung", "Polsek Gerung"
  accessArea: string; // e.g. "ALL ACCESS", "MIMBAR UTAMA", "MEJA DEWAN HAKIM", "RUANG OPERATOR & SERVER", "ARENA LOMBA"
  photoUrl?: string;
  phone?: string;
  gender: Gender;
}
