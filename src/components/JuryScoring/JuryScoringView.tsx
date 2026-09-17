import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Play, 
  Pause, 
  RotateCcw, 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Save, 
  UserCheck, 
  Mic, 
  Sliders, 
  CheckCheck,
  ChevronRight,
  ShieldCheck,
  Info,
  BookOpen,
  Scale,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { Participant, SystemConfig, JudgeScore } from '../../types';
import { OFFICIAL_BRANCHES } from '../../data/mtqBranches';
import { recalculateAllRankings } from '../../utils/storage';
import { NationalRubricModal } from './NationalRubricModal';

interface JuryScoringViewProps {
  participants: Participant[];
  onSaveParticipants: (updated: Participant[]) => void;
  config: SystemConfig;
  selectedParticipantId?: string;
}

const DEFAULT_JUDGES = [
  { id: 'j-1', name: 'KH. Abdullah Marzuki, SQ', role: 'Ketua Majelis Hakim' },
  { id: 'j-2', name: 'Dra. Hj. Siti Maimunah, M.Pd.I', role: 'Hakim Anggota 1' },
  { id: 'j-3', name: 'Drs. H. Anwar Sadat, M.Ag', role: 'Hakim Anggota 2' },
];

export const JuryScoringView: React.FC<JuryScoringViewProps> = ({
  participants,
  onSaveParticipants,
  config,
  selectedParticipantId
}) => {
  const [activeParticipantId, setActiveParticipantId] = useState<string>(
    selectedParticipantId || participants[0]?.id || ''
  );
  const [currentJudgeId, setCurrentJudgeId] = useState<string>(DEFAULT_JUDGES[0].id);

  // Live Timer states (Minutes : Seconds)
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [bellFeedback, setBellFeedback] = useState<string | null>(null);

  // Current participant object
  const participant = participants.find(p => p.id === activeParticipantId) || participants[0];
  const branch = OFFICIAL_BRANCHES.find(b => b.id === participant?.branchId) || OFFICIAL_BRANCHES[0];
  const currentJudge = DEFAULT_JUDGES.find(j => j.id === currentJudgeId) || DEFAULT_JUDGES[0];

  // Scores state for the active judge
  const [scores, setScores] = useState<Record<string, number>>({});
  const [deduction, setDeduction] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');
  const [notification, setNotification] = useState<string | null>(null);

  // National Rubric Reference Modal State
  const [isRubricModalOpen, setIsRubricModalOpen] = useState<boolean>(false);
  const [rubricModalBranchId, setRubricModalBranchId] = useState<string>(branch.id);

  const applyPenaltyShortcut = (amount: number, reason: string) => {
    setDeduction(prev => Math.min(20, Math.round((prev + amount) * 10) / 10));
    setNotes(prev => {
      const trimmed = prev.trim();
      if (!trimmed) return `Sanksi LPTQ: ${reason}`;
      return `${trimmed}; ${reason}`;
    });
  };

  // Load existing score if available for this judge
  useEffect(() => {
    if (!participant) return;
    const existing = participant.judgeScores?.find(js => js.judgeId === currentJudgeId);
    if (existing) {
      setScores({ ...existing.scores });
      setDeduction(existing.deduction || 0);
      setNotes(existing.notes || '');
    } else {
      // Default high baseline scores
      const initial: Record<string, number> = {};
      branch.criteria.forEach(crit => {
        initial[crit.id] = Math.round(crit.maxScore * 0.9 * 2) / 2; // default ~90%
      });
      setScores(initial);
      setDeduction(0);
      setNotes('');
    }
  }, [activeParticipantId, currentJudgeId, participant]);

  // Stopwatch interval
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleScoreChange = (criterionId: string, value: number, maxScore: number) => {
    const clamped = Math.max(0, Math.min(maxScore, value));
    setScores(prev => ({ ...prev, [criterionId]: clamped }));
  };

  const handleRingBell = (soundType: 1 | 2 | 3) => {
    let label = '';
    if (soundType === 1) label = '🔔 Bel 1: Mulai Membaca / Tampil';
    else if (soundType === 2) label = '🔔🔔 Bel 2: Peringatan (1 Menit Terakhir)';
    else label = '🔔🔔🔔 Bel 3: Waktu Habis / Berhenti';

    setBellFeedback(label);
    setTimeout(() => setBellFeedback(null), 3000);
  };

  const handleFormatTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Calculate total score for current judge
  const subtotalScore = branch.criteria.reduce((sum, crit) => sum + (scores[crit.id] || 0), 0);
  const totalJudgeScore = Math.max(0, subtotalScore - deduction);

  // Submit and lock score
  const handleSubmitScore = () => {
    if (!participant) return;

    const newJudgeScore: JudgeScore = {
      judgeId: currentJudge.id,
      judgeName: currentJudge.name,
      scores,
      deduction,
      notes,
      signedAt: new Date().toISOString()
    };

    const existingScores = participant.judgeScores || [];
    const filtered = existingScores.filter(s => s.judgeId !== currentJudge.id);
    const updatedJudgeScores = [...filtered, newJudgeScore];

    // Compute average final score across all judges who have scored
    const avgScore = updatedJudgeScores.reduce<number>((acc, js) => {
      const sSum: number = Object.values(js.scores).reduce<number>((a, b) => a + (typeof b === 'number' ? b : 0), 0);
      return acc + Math.max(0, sSum - (js.deduction || 0));
    }, 0) / updatedJudgeScores.length;

    const updatedParticipant: Participant = {
      ...participant,
      judgeScores: updatedJudgeScores,
      finalScore: Number(avgScore.toFixed(2)),
      status: 'SELESAI'
    };

    const updatedList = participants.map(p => p.id === participant.id ? updatedParticipant : p);
    
    // Automatically recalculate rankings across the category
    const rankedList = recalculateAllRankings(updatedList);
    onSaveParticipants(rankedList);

    setNotification(`Nilai dari ${currentJudge.name} berhasil disimpan & disahkan!`);
    setTimeout(() => setNotification(null), 4000);
  };

  if (!participant) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
        <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="font-bold text-slate-700">Belum ada data peserta</h3>
        <p className="text-xs text-slate-400 mt-1">Silakan tambahkan peserta di menu Pendaftaran terlebih dahulu.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200 mb-2">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            Panel Khusus Dewan Hakim MTQ
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Form Penilaian Resmi Dewan Hakim
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Penilaian standar LPTQ sesuai bidang keahlian, pengawasan waktu, pengurangan nilai, dan validasi tanda tangan digital.
          </p>
        </div>

        {/* Right Action: Open National Rubric & Judge Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setRubricModalBranchId(branch.id);
              setIsRubricModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-950 text-white hover:from-emerald-700 hover:to-emerald-900 border border-emerald-700 font-bold text-xs sm:text-sm shadow-sm transition"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Rubrik Nasional LPTQ</span>
          </button>

          {/* Judge switcher */}
          <div className="bg-slate-50 border border-slate-200 p-1.5 rounded-xl flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-700 ml-1.5" />
            <select
              value={currentJudgeId}
              onChange={e => setCurrentJudgeId(e.target.value)}
              className="text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {DEFAULT_JUDGES.map(j => (
                <option key={j.id} value={j.id}>
                  {j.role}: {j.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {notification && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl flex items-center gap-2 text-xs sm:text-sm font-semibold shadow-sm animate-in fade-in">
          <CheckCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Grid: Participant Selector + Stopwatch / Score Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Participant List & Timer */}
        <div className="space-y-6">
          {/* Participant Quick Select */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
              <span>Pilih Peserta Dinilai</span>
              <span className="text-emerald-700 font-semibold">{participants.length} Peserta</span>
            </h3>

            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {participants.map(p => {
                const b = OFFICIAL_BRANCHES.find(x => x.id === p.branchId);
                const isSelected = p.id === activeParticipantId;
                const hasCurrentJudgeScored = p.judgeScores?.some(js => js.judgeId === currentJudgeId);

                return (
                  <div
                    key={p.id}
                    onClick={() => setActiveParticipantId(p.id)}
                    className={`p-3 rounded-xl cursor-pointer border transition-all ${
                      isSelected
                        ? 'bg-emerald-900 text-white border-emerald-700 shadow-md'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-emerald-800 text-amber-300' : 'bg-white text-emerald-800 border border-slate-200'
                      }`}>
                        {p.participantCode}
                      </span>
                      {hasCurrentJudgeScored ? (
                        <span className={`text-[10px] font-bold flex items-center gap-1 ${isSelected ? 'text-emerald-300' : 'text-emerald-600'}`}>
                          <CheckCircle className="w-3 h-3" /> Dinilai
                        </span>
                      ) : (
                        <span className={`text-[10px] font-medium ${isSelected ? 'text-emerald-300' : 'text-slate-400'}`}>
                          Belum dinilai
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-xs sm:text-sm mt-1 truncate">
                      {p.fullName}
                    </div>
                    <div className={`text-[11px] truncate ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                      {b?.name} • {p.originKafilah}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Official Stage Bell & Stopwatch Timer */}
          <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 rounded-2xl p-5 text-white shadow-md border border-emerald-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5" /> Stopwatch Tampil
              </span>
              <span className="text-xs text-emerald-300 font-mono">Standar: 7-10 Menit</span>
            </div>

            {/* Timer Display */}
            <div className="text-center py-4 bg-emerald-900/60 rounded-xl border border-emerald-800 my-2">
              <div className="font-mono text-4xl font-extrabold tracking-widest text-amber-400">
                {handleFormatTime(timerSeconds)}
              </div>
              <div className="text-[11px] text-emerald-300 mt-1">
                {isTimerRunning ? 'Status: Peserta Sedang Melantunkan' : 'Status: Timer Siap / Jeda'}
              </div>
            </div>

            {/* Timer Buttons */}
            <div className="flex items-center justify-center gap-2 mt-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                  isTimerRunning
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isTimerRunning ? 'Pause' : 'Mulai Waktu'}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(0);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-800 hover:bg-emerald-700 text-emerald-200 border border-emerald-700 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            {/* Stage Bells */}
            <div className="mt-4 pt-3 border-t border-emerald-800/80">
              <div className="text-[11px] font-semibold text-emerald-300 mb-2 flex items-center justify-between">
                <span>Bel Tanda Panggung:</span>
                {bellFeedback && (
                  <span className="text-amber-300 font-bold animate-pulse text-[10px]">
                    {bellFeedback}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => handleRingBell(1)}
                  className="py-1.5 px-2 bg-emerald-900 hover:bg-emerald-800 border border-emerald-700 rounded-lg text-[10px] font-bold text-amber-300 text-center transition"
                >
                  Bel 1 (Mulai)
                </button>
                <button
                  onClick={() => handleRingBell(2)}
                  className="py-1.5 px-2 bg-emerald-900 hover:bg-emerald-800 border border-emerald-700 rounded-lg text-[10px] font-bold text-amber-300 text-center transition"
                >
                  Bel 2 (1 Mnt)
                </button>
                <button
                  onClick={() => handleRingBell(3)}
                  className="py-1.5 px-2 bg-emerald-900 hover:bg-emerald-800 border border-emerald-700 rounded-lg text-[10px] font-bold text-amber-300 text-center transition"
                >
                  Bel 3 (Habis)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Scoring Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            {/* Active Participant Info Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold bg-amber-400 text-emerald-950 px-2.5 py-0.5 rounded-full border border-amber-300">
                    {participant.participantCode}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900">
                    {participant.fullName}
                  </h3>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Kafilah: <strong className="text-slate-700">{participant.originKafilah}</strong> • Cabang: <strong className="text-slate-700">{branch.name}</strong> ({participant.category})
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400">Total Skor Juri Ini</div>
                <div className="text-2xl font-black text-emerald-700 font-mono">
                  {totalJudgeScore.toFixed(2)} <span className="text-xs font-medium text-slate-400">/ 100</span>
                </div>
              </div>
            </div>

            {/* Criteria Sliders / Inputs */}
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-emerald-600" />
                  Komponen Penilaian Cabang {branch.name}
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setRubricModalBranchId(branch.id);
                    setIsRubricModalOpen(true);
                  }}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 hover:underline"
                  title="Lihat rincian acuan & rubrik standar nasional LPTQ untuk cabang ini"
                >
                  <Scale className="w-3.5 h-3.5 text-amber-500" />
                  <span>Lihat Indikator Resmi LPTQ Cabang Ini</span>
                </button>
              </div>

              {branch.criteria.map(crit => {
                const val = scores[crit.id] !== undefined ? scores[crit.id] : Math.round(crit.maxScore * 0.9 * 2) / 2;
                return (
                  <div key={crit.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-slate-900">
                          {crit.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {crit.description}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step={0.5}
                          min={0}
                          max={crit.maxScore}
                          value={val}
                          onChange={e => handleScoreChange(crit.id, parseFloat(e.target.value) || 0, crit.maxScore)}
                          className="w-20 px-2 py-1 text-center font-mono font-bold text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                        <span className="text-xs text-slate-400 font-mono">/ {crit.maxScore}</span>
                      </div>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={crit.maxScore}
                      step={0.5}
                      value={val}
                      onChange={e => handleScoreChange(crit.id, parseFloat(e.target.value) || 0, crit.maxScore)}
                      className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>
                );
              })}

              {/* Deduction / Penalty Section */}
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-rose-900 font-bold text-xs sm:text-sm">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    Pengurangan Nilai / Penalty Standar LPTQ
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-rose-700 font-medium">Minus:</span>
                    <input
                      type="number"
                      step={0.5}
                      min={0}
                      max={20}
                      value={deduction}
                      onChange={e => setDeduction(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-20 px-2 py-1 text-center font-mono font-bold text-sm bg-white border border-rose-300 text-rose-700 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                    <span className="text-xs text-rose-400">Poin</span>
                  </div>
                </div>

                <div className="text-[11px] text-rose-800 leading-tight">
                  Terapkan sanksi pengurangan poin sesuai kaidah nasional (Kesalahan Jali, Khafi, Waktu, atau Adab):
                </div>

                {/* Quick Deduction Buttons */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => applyPenaltyShortcut(1.0, "Kesalahan Jali (-1.0)")}
                    className="px-2.5 py-1 bg-white hover:bg-rose-100 border border-rose-300 text-rose-800 rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-xs"
                    title="Potong 1 poin untuk kesalahan jali makhraj, harakat fatal, atau waqaf qabih"
                  >
                    <span>+ Jali (-1.0)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyPenaltyShortcut(0.5, "Kesalahan Khafi (-0.5)")}
                    className="px-2.5 py-1 bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-xs"
                    title="Potong 0.5 poin untuk kesalahan samar ghunnah, mad kurang, atau getaran qalqalah"
                  >
                    <span>+ Khafi (-0.5)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyPenaltyShortcut(1.0, "Pelanggaran Waktu/Bel (-1.0)")}
                    className="px-2.5 py-1 bg-white hover:bg-rose-100 border border-rose-300 text-rose-800 rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-xs"
                    title="Potong 1 poin untuk keterlambatan berhenti setelah bel ke-3"
                  >
                    <span>+ Terlambat Bel (-1.0)</span>
                  </button>

                  {(branch.id === 'hifzh' || branch.id === 'hadist') && (
                    <button
                      type="button"
                      onClick={() => applyPenaltyShortcut(2.0, "Fathul Hakim / Bimbingan Dewan Hakim (-2.0)")}
                      className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-xs"
                      title="Sanksi mutlak jika dibimbing dewan hakim setelah 2x bel tanbih"
                    >
                      <span>+ Fathul Hakim (-2.0)</span>
                    </button>
                  )}

                  {deduction > 0 && (
                    <button
                      type="button"
                      onClick={() => setDeduction(0)}
                      className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition"
                      title="Reset pengurangan nilai menjadi 0"
                    >
                      Reset (0)
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setRubricModalBranchId(branch.id);
                      setIsRubricModalOpen(true);
                    }}
                    className="px-2.5 py-1 bg-rose-100/70 hover:bg-rose-200 text-rose-800 rounded-lg text-xs font-medium ml-auto transition flex items-center gap-1"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>Panduan Sanksi</span>
                  </button>
                </div>
              </div>

              {/* Judge Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Catatan Evaluasi / Rekomendasi Dewan Hakim
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Catatan kelebihan tajwid, keindahan nagham bayati, atau evaluasi perbaikan..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Summary of all Judges for this participant */}
              {participant.judgeScores && participant.judgeScores.length > 0 && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>Rekap Penilaian Dewan Hakim Lainnya:</span>
                    <span className="text-emerald-700 font-semibold">
                      Rata-rata: {participant.finalScore?.toFixed(2) || '-'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    {participant.judgeScores.map((js, i) => {
                      const total: number = Object.values(js.scores).reduce<number>((a, b) => a + (typeof b === 'number' ? b : 0), 0) - (js.deduction || 0);
                      return (
                        <div key={i} className="p-2 bg-white rounded-lg border border-slate-200">
                          <div className="font-semibold text-slate-800 truncate">{js.judgeName}</div>
                          <div className="text-emerald-800 font-bold font-mono mt-0.5">{total.toFixed(2)} Poin</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Submit & Lock Score Button */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Dinilai oleh <strong>{currentJudge.name}</strong></span>
                </div>

                <button
                  type="button"
                  onClick={handleSubmitScore}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-700/20 transition"
                >
                  <Save className="w-4 h-4" />
                  Simpan & Sahkan Nilai
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* National Rubric Reference Modal for Dewan Hakam */}
      <NationalRubricModal
        isOpen={isRubricModalOpen}
        onClose={() => setIsRubricModalOpen(false)}
        initialBranchId={rubricModalBranchId}
        onApplyPenaltyToActiveJudge={(penaltyPoints, reason) => {
          applyPenaltyShortcut(penaltyPoints, reason);
          setIsRubricModalOpen(false);
          setNotification(`Sanksi diterapkan: ${reason}`);
          setTimeout(() => setNotification(null), 3500);
        }}
      />
    </div>
  );
};
