import { Participant, SystemConfig, CommitteeMember } from '../types';
import { INITIAL_PARTICIPANTS, DEFAULT_SYSTEM_CONFIG } from '../data/initialParticipants';
import { INITIAL_COMMITTEE } from '../data/initialCommittee';

const STORAGE_KEY_PARTICIPANTS = 'simtq_participants_v3';
const STORAGE_KEY_CONFIG = 'simtq_config_v3';
const STORAGE_KEY_COMMITTEE = 'simtq_committee_v1';

export function getStoredConfig(): SystemConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return {
          ...DEFAULT_SYSTEM_CONFIG,
          ...parsed,
          activeKecamatanId: parsed.activeKecamatanId || 'gerung'
        };
      }
    }
  } catch (err) {
    console.error('Failed to read config from localStorage', err);
  }
  return DEFAULT_SYSTEM_CONFIG;
}

export function saveStoredConfig(config: SystemConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save config to localStorage', err);
  }
}

export function getStoredParticipants(): Participant[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PARTICIPANTS);
    if (raw) {
      const parsed = JSON.parse(raw) as Participant[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(p => ({
          ...p,
          originKafilah: (p.originKafilah || '')
            .replace(/Desa Beleke/gi, 'Desa Beleka')
            .replace(/Desa Kebun Ayu/gi, 'Desa Kebon Ayu')
            .replace(/Desa Dasan Geres/gi, 'Kelurahan Dasan Geres')
        }));
      }
    }
  } catch (err) {
    console.error('Failed to read participants from localStorage', err);
  }
  return INITIAL_PARTICIPANTS;
}

export function saveStoredParticipants(participants: Participant[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_PARTICIPANTS, JSON.stringify(participants));
    window.dispatchEvent(new Event('simtq_participants_updated'));
  } catch (err) {
    console.error('Failed to save participants to localStorage', err);
  }
}

export function getStoredCommittee(): CommitteeMember[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COMMITTEE);
    if (raw) {
      const parsed = JSON.parse(raw) as CommitteeMember[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to read committee from localStorage', err);
  }
  return INITIAL_COMMITTEE;
}

export function saveStoredCommittee(committee: CommitteeMember[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_COMMITTEE, JSON.stringify(committee));
    window.dispatchEvent(new Event('simtq_committee_updated'));
  } catch (err) {
    console.error('Failed to save committee to localStorage', err);
  }
}

/**
 * Generate a hash for digital certificate verification
 */
export function generateCertificateHash(participantId: string, finalScore: number, dateStr: string): string {
  const combined = `${participantId}-${finalScore}-${dateStr}-LPTQ-OFFICIAL-SECRET`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
  const randomSuffix = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');
  return `${hex}${randomSuffix}`.slice(0, 16);
}

/**
 * Recalculate rankings for all participants per branch & category
 */
export function recalculateAllRankings(participants: Participant[]): Participant[] {
  // Group participants by branchId and category
  const groups: Record<string, Participant[]> = {};
  participants.forEach(p => {
    const key = `${p.branchId}___${p.category}___${p.gender}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  });

  const updatedMap = new Map<string, Participant>();

  Object.values(groups).forEach(group => {
    // Only participants with finalScore or judgeScores
    group.forEach(p => {
      let finalScore = p.finalScore;
      if (p.judgeScores && p.judgeScores.length > 0) {
        const total = p.judgeScores.reduce<number>((sum, js) => {
          const scoreSum: number = Object.values(js.scores).reduce<number>((s, v) => s + (typeof v === 'number' ? v : 0), 0);
          return sum + Math.max(0, scoreSum - (js.deduction || 0));
        }, 0);
        finalScore = Number((total / p.judgeScores.length).toFixed(2));
      }

      p.finalScore = finalScore;
      if (finalScore !== undefined && finalScore > 0) {
        p.status = 'SELESAI';
      }
    });

    // Sort by finalScore descending
    const sorted = [...group].sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0));

    sorted.forEach((p, idx) => {
      if (p.finalScore && p.finalScore > 0) {
        const rank = idx + 1;
        p.rank = rank;
        if (rank === 1) p.awardTitle = 'Juara I';
        else if (rank === 2) p.awardTitle = 'Juara II';
        else if (rank === 3) p.awardTitle = 'Juara III';
        else if (rank === 4) p.awardTitle = 'Harapan I';
        else if (rank === 5) p.awardTitle = 'Harapan II';
        else if (rank === 6) p.awardTitle = 'Harapan III';
        else p.awardTitle = `Peringkat ${rank}`;

        // Ensure certificate number & hash exist
        if (!p.certificateNumber) {
          const branchCode = p.participantCode.split('-')[0] || 'MTQ';
          p.certificateNumber = `PIAGAM/MTQ-XXXII/LPTQ-GRG/2026/${branchCode}-${p.orderNumber.toString().padStart(3, '0')}`;
        }
        if (!p.certificateHash) {
          p.certificateHash = generateCertificateHash(p.id, p.finalScore, new Date().toISOString());
        }
      }
      updatedMap.set(p.id, p);
    });
  });

  return participants.map(p => updatedMap.get(p.id) || p);
}
