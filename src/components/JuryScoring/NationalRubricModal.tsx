import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Scale, 
  Award, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Sliders, 
  FileText, 
  Sparkles,
  ChevronRight,
  Bell,
  Printer
} from 'lucide-react';
import { ALL_NATIONAL_RUBRICS, NATIONAL_JUDGING_ETHICS } from '../../data/nationalRubrics';
import { BranchNationalRubric } from '../../types';
import { LOGO_MTQ_NATIONAL } from '../../assets/logo';

interface NationalRubricModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBranchId?: string;
  onApplyPenaltyToActiveJudge?: (penaltyPoints: number, reason: string) => void;
}

export const NationalRubricModal: React.FC<NationalRubricModalProps> = ({
  isOpen,
  onClose,
  initialBranchId = 'tilawah',
  onApplyPenaltyToActiveJudge
}) => {
  const [activeBranchId, setActiveBranchId] = useState<string>(initialBranchId);
  const [activeTab, setActiveTab] = useState<'rubric' | 'ethics' | 'bell'>('rubric');

  if (!isOpen) return null;

  const currentRubric: BranchNationalRubric = 
    ALL_NATIONAL_RUBRICS.find(r => r.branchId === activeBranchId) || ALL_NATIONAL_RUBRICS[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-5xl w-full border border-slate-200 my-auto max-h-[92vh] flex flex-col">
        {/* Header with National Islamic Branding */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-5 sm:p-6 border-b border-emerald-800 shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white p-1.5 flex items-center justify-center border-2 border-amber-400 shadow-md shrink-0">
                <img
                  src={LOGO_MTQ_NATIONAL}
                  alt="Logo MTQ Nasional"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-emerald-950 uppercase tracking-wider">
                    Pedoman Resmi LPTQ Nasional
                  </span>
                  <span className="text-xs text-emerald-300 font-mono hidden sm:inline">
                    Kemenag RI • Majelis Dewan Hakam
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-white mt-0.5 flex items-center gap-2">
                  Acuan & Rubrik Penilaian Standar Nasional
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-emerald-100 transition"
                title="Cetak Rubrik"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition"
                title="Tutup Modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Top Sub Navigation (Rubrik Mata Lomba / Kode Etik Dewan Hakam / Standar Bel) */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-emerald-800/80 overflow-x-auto text-xs no-scrollbar">
            <button
              onClick={() => setActiveTab('rubric')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold transition shrink-0 ${
                activeTab === 'rubric'
                  ? 'bg-amber-400 text-emerald-950 shadow-sm'
                  : 'bg-emerald-800/60 hover:bg-emerald-800 text-emerald-200'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              Rubrik 9 Mata Lomba
            </button>
            <button
              onClick={() => setActiveTab('ethics')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold transition shrink-0 ${
                activeTab === 'ethics'
                  ? 'bg-amber-400 text-emerald-950 shadow-sm'
                  : 'bg-emerald-800/60 hover:bg-emerald-800 text-emerald-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Kode Etik & Sumpah Hakim
            </button>
            <button
              onClick={() => setActiveTab('bell')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold transition shrink-0 ${
                activeTab === 'bell'
                  ? 'bg-amber-400 text-emerald-950 shadow-sm'
                  : 'bg-emerald-800/60 hover:bg-emerald-800 text-emerald-200'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              Sistem Bel Panggung & Sanksi
            </button>
          </div>
        </div>

        {/* Modal Body with smooth scrolling */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 bg-slate-50">
          {activeTab === 'rubric' && (
            <>
              {/* Branch Selector Pills (All 9 Branches) */}
              <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                  <span>Pilih Cabang Mata Lomba:</span>
                  <span className="text-emerald-700 font-semibold">{ALL_NATIONAL_RUBRICS.length} Cabang Tersedia</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_NATIONAL_RUBRICS.map((rubric) => {
                    const isSelected = rubric.branchId === activeBranchId;
                    return (
                      <button
                        key={rubric.branchId}
                        onClick={() => setActiveBranchId(rubric.branchId)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                          isSelected
                            ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-amber-400 text-emerald-950' : 'bg-slate-200 text-slate-800'
                        }`}>
                          {rubric.branchCode}
                        </span>
                        <span>{rubric.branchName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Branch Header Card */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 bg-amber-400 text-emerald-950 rounded-lg">
                        {currentRubric.branchCode}
                      </span>
                      <h4 className="text-lg sm:text-xl font-extrabold text-slate-900">
                        Cabang {currentRubric.branchName}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                      Landasan: {currentRubric.legalBasis}
                    </p>
                  </div>

                  <div className="bg-emerald-50 text-emerald-900 px-4 py-2 rounded-xl text-xs font-medium border border-emerald-200">
                    <span className="block text-[10px] font-bold uppercase text-emerald-700">Formula Nilai Akhir</span>
                    <strong>Skor Maksimal: 100 Poin</strong>
                  </div>
                </div>

                {/* General Rules Bullet Points */}
                <div>
                  <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Ketentuan Teknis Musabaqah LPTQ:
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600">
                    {currentRubric.generalRules.map((rule, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Criteria Detailed Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-emerald-600" />
                    Rincian Komponen & Rubrik Penilaian Cabang {currentRubric.branchName}
                  </h4>
                  <span className="text-xs text-slate-500 font-medium">
                    Total: {currentRubric.criteriaDetails.reduce((a, c) => a + c.maxScore, 0)} Poin
                  </span>
                </div>

                {currentRubric.criteriaDetails.map((crit, cIdx) => (
                  <div key={crit.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
                    {/* Criterion Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 font-black text-sm flex items-center justify-center">
                          {cIdx + 1}
                        </span>
                        <div>
                          <h5 className="text-base font-extrabold text-slate-900">
                            {crit.name}
                          </h5>
                          <div className="text-xs text-slate-500">
                            Bobot Nilai: <strong className="text-emerald-700">{crit.weightPercent}%</strong> ({crit.maxScore} Poin Maksimal)
                          </div>
                        </div>
                      </div>

                      <div className="px-3 py-1 bg-amber-50 text-amber-900 rounded-lg text-xs font-bold border border-amber-200 font-mono">
                        Maks. {crit.maxScore} Poin
                      </div>
                    </div>

                    {/* Subcomponents Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {crit.subComponents.map((sub, sIdx) => (
                        <div key={sIdx} className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-2">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-xs text-slate-800">
                              {sub.title}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold shrink-0">
                              {sub.pointsRange}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            {sub.description}
                          </p>
                          <div className="pt-2 border-t border-slate-200/60">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                              Indikator Penilaian:
                            </div>
                            <ul className="space-y-1 text-[11px] text-slate-700">
                              {sub.nationalStandardIndicators.map((ind, iIdx) => (
                                <li key={iIdx} className="flex items-start gap-1.5">
                                  <span className="text-emerald-600 font-bold">•</span>
                                  <span>{ind}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Deductions / Penalties Table */}
                    {crit.deductionRules && crit.deductionRules.length > 0 && (
                      <div className="bg-rose-50/50 rounded-xl p-3.5 border border-rose-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                            Pedoman Pengurangan Nilai Baku (Sanksi & Potongan):
                          </div>
                          <span className="text-[10px] text-rose-600 font-semibold">Standar Kemenag RI</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {crit.deductionRules.map((ded, dIdx) => (
                            <div key={dIdx} className="bg-white p-2.5 rounded-lg border border-rose-200 flex items-center justify-between gap-2 shadow-xs">
                              <div>
                                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                                    ded.categoryType === 'JALI' 
                                      ? 'bg-rose-600 text-white' 
                                      : ded.categoryType === 'KHAFI'
                                      ? 'bg-amber-500 text-emerald-950'
                                      : 'bg-slate-200 text-slate-800'
                                  }`}>
                                    {ded.categoryType}
                                  </span>
                                  <span>{ded.ruleName}</span>
                                </div>
                                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                  {ded.description}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <span className="font-mono font-black text-rose-600 text-xs px-2 py-0.5 bg-rose-100 rounded">
                                  -{ded.penaltyPoints}
                                </span>
                                {onApplyPenaltyToActiveJudge && (
                                  <button
                                    onClick={() => onApplyPenaltyToActiveJudge(ded.penaltyPoints, `${ded.ruleName} (-${ded.penaltyPoints})`)}
                                    className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded text-[10px] transition"
                                    title="Terapkan penalti ini ke form penilaian juri aktif"
                                  >
                                    Terapkan
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Judge Tips */}
                    <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Tips & Rekomendasi Majelis Hakim: </strong>
                        <span className="text-amber-900">{crit.judgeTips}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* TAB 2: KODE ETIK & SUMPAH DEWAN HAKAM */}
          {activeTab === 'ethics' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-extrabold text-slate-900">
                      {NATIONAL_JUDGING_ETHICS.title}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Rujukan Resmi: {NATIONAL_JUDGING_ETHICS.legalBasis}
                    </p>
                  </div>
                </div>

                {/* Sumpah Dewan Hakim Card */}
                <div className="bg-emerald-950 text-white p-5 rounded-2xl space-y-3 border border-emerald-800 shadow-md">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    Lafadz Sumpah / Bai'at Dewan Hakim MTQ Nasional
                  </div>
                  <blockquote className="text-xs sm:text-sm text-emerald-100 italic leading-relaxed border-l-2 border-amber-400 pl-4">
                    "Demi Allah saya bersumpah/berjanji, bahwa saya dalam melaksanakan tugas sebagai Dewan Hakim Musabaqah Tilawatil Qur’an akan berlaku adil, jujur, dan bertanggung jawab semata-mata karena Allah SWT, dengan berpedoman teguh pada kaidah-kaidah ilmu Al-Qur'an dan ketentuan peraturan yang berlaku tanpa terpengaruh oleh rasa primordialisme, kepentingan pribadi, maupun tekanan pihak mana pun."
                  </blockquote>
                </div>

                {/* 4 Core Principles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {NATIONAL_JUDGING_ETHICS.principles.map((p, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <h5 className="font-bold text-sm text-slate-900">
                          {p.title}
                        </h5>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-8">
                        {p.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Standard Grading Predicate Scale */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Skala Predikat Nilai Standar Nasional LPTQ
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-4 py-2.5 rounded-l-lg">Rentang Skor</th>
                        <th className="px-4 py-2.5">Predikat Mutu</th>
                        <th className="px-4 py-2.5 rounded-r-lg">Karakteristik Penilaian</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {NATIONAL_JUDGING_ETHICS.standardGradeScale.map((grade, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition">
                          <td className="px-4 py-3 font-mono font-bold text-emerald-800">
                            {grade.range}
                          </td>
                          <td className="px-4 py-3 font-bold text-slate-900">
                            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block">
                              {grade.predicate}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {grade.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SISTEM BEL PANGGUNG & SANKSI */}
          {activeTab === 'bell' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-extrabold text-slate-900">
                      Ketentuan Bunyi Bel & Sinyal Panggung Musabaqah
                    </h4>
                    <p className="text-xs text-slate-500">
                      Kode komunikasi audio resmi dari meja Panitera / Ketua Majelis Hakim ke peserta mimbar.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
                      1x
                    </div>
                    <h5 className="font-bold text-sm text-emerald-950">
                      Bel 1x (Bunyi Pertama)
                    </h5>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      Sinyal dimulainya penampilan peserta atau berpindah ke maqra' soal berikutnya pada cabang tahfizh. Peserta mulai membaca ta'awwudz.
                    </p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-emerald-950 font-black flex items-center justify-center text-sm shadow-sm">
                      2x
                    </div>
                    <h5 className="font-bold text-sm text-amber-950">
                      Bel 2x (Peringatan / Tanbih)
                    </h5>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Pada cabang Tilawah: Peringatan waktu tersisa 1 menit lagi. Pada cabang Tahfizh: Tanda terdapat kesalahan hafalan/tajwid (peserta wajib mengoreksi).
                    </p>
                  </div>

                  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-rose-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
                      3x
                    </div>
                    <h5 className="font-bold text-sm text-rose-950">
                      Bel 3x (Waktu Habis / Tuntas)
                    </h5>
                    <p className="text-xs text-rose-800 leading-relaxed">
                      Waktu tampil peserta telah habis. Peserta wajib segera menutup dengan kalimat tashdiq (shadaqallahul 'adzim) dan salam.
                    </p>
                  </div>
                </div>

                {/* Sanksi Keterlambatan Berhenti */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    Sanksi Pelanggaran Sinyal Bel:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    <li>Peserta yang tidak berhenti membaca setelah bel 3x dibunyikan dikenakan pemotongan nilai waktu (-1.0 s/d -2.0 poin).</li>
                    <li>Pada cabang Tahfizh, apabila peserta dibunyikan bel tanbih (2x) berturut-turut sebanyak 2 kali dan gagal membetulkan, hakim akan memberikan <strong>Fathul Hakim</strong> (bimbingan lafal) dengan pemotongan mutlak -2.0 poin.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-white p-4 sm:p-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Dokumen ini sesuai Keputusan Dewan Pembina LPTQ Nasional & Kemenag RI.</span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-sm transition"
          >
            Tutup Rubrik Penilaian
          </button>
        </div>
      </div>
    </div>
  );
};
