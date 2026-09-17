import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  CheckCircle, 
  Award, 
  Sparkles, 
  ListTree,
  ChevronRight,
  ShieldCheck,
  FileText,
  Scale
} from 'lucide-react';
import { OFFICIAL_BRANCHES } from '../../data/mtqBranches';
import { Participant } from '../../types';
import { NationalRubricModal } from '../JuryScoring/NationalRubricModal';

interface BranchCodesViewProps {
  participants: Participant[];
  onSelectBranchFilter?: (branchId: string) => void;
}

export const BranchCodesView: React.FC<BranchCodesViewProps> = ({
  participants,
  onSelectBranchFilter
}) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string>(OFFICIAL_BRANCHES[0].id);
  const [isRubricModalOpen, setIsRubricModalOpen] = useState<boolean>(false);
  const [rubricModalBranchId, setRubricModalBranchId] = useState<string>(OFFICIAL_BRANCHES[0].id);

  const activeBranch = OFFICIAL_BRANCHES.find(b => b.id === selectedBranchId) || OFFICIAL_BRANCHES[0];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
            <ListTree className="w-3.5 h-3.5 text-emerald-700" />
            Buku Panduan Teknis & Kode Mata Lomba MTQ
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            9 Cabang Musabaqah & Standar Kodefikasi
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Daftar resmi 9 cabang lomba MTQ Nasional/Daerah (Putra & Putri) sesuai pedoman LPTQ beserta bobot penilaian dewan hakim.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setRubricModalBranchId(activeBranch.id);
              setIsRubricModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-950 text-white hover:from-emerald-700 hover:to-emerald-900 border border-emerald-700 font-bold text-xs sm:text-sm shadow-sm transition"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Acuan & Rubrik Nasional LPTQ</span>
          </button>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Format: <strong>[KODE]-[PA/PI]-[NO]</strong></span>
          </div>
        </div>
      </div>

      {/* Grid of 9 Branches Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {OFFICIAL_BRANCHES.map((b, idx) => {
          const count = participants.filter(p => p.branchId === b.id).length;
          const isSelected = b.id === selectedBranchId;
          return (
            <div
              key={b.id}
              onClick={() => setSelectedBranchId(b.id)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-emerald-900 text-white border-emerald-700 shadow-lg scale-[1.01]'
                  : 'bg-white hover:bg-emerald-50/40 text-slate-900 border-slate-200 shadow-sm'
              }`}
            >
              {/* Top Row: Number & Code */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${
                      isSelected
                        ? 'bg-amber-400 text-emerald-950 font-black'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span
                    className={`font-mono font-bold text-xs px-2.5 py-1 rounded-md tracking-wider ${
                      isSelected
                        ? 'bg-emerald-800 text-amber-300 border border-emerald-700'
                        : 'bg-slate-100 text-slate-800 border border-slate-200'
                    }`}
                  >
                    KODE: {b.code}
                  </span>
                </div>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-emerald-800 text-emerald-200' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count} Peserta
                </span>
              </div>

              {/* Title */}
              <h3 className={`font-bold text-base leading-snug mb-2 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                {b.name}
              </h3>

              {/* Categories badge preview */}
              <div className="flex flex-wrap gap-1 mb-3">
                {b.categories.slice(0, 2).map((c, i) => (
                  <span
                    key={i}
                    className={`text-[10px] px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-emerald-800/80 text-emerald-200'
                        : 'bg-slate-50 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {c}
                  </span>
                ))}
                {b.categories.length > 2 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? 'text-emerald-300' : 'text-slate-400'}`}>
                    +{b.categories.length - 2} lagi
                  </span>
                )}
              </div>

              {/* Category type tag */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100/20 text-xs">
                <span className={`font-medium ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                  {b.categoryType === 'BEREGU' ? 'Beregu Putra/Putri' : 'Perorangan Putra/Putri'}
                </span>
                <span className={`flex items-center gap-0.5 font-bold text-xs ${isSelected ? 'text-amber-400' : 'text-emerald-700'}`}>
                  Detail Rubrik <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Rubric & Category Specifications for Selected Branch */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-300">
                KODE: {activeBranch.code}
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Cabang {activeBranch.name}
              </h3>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {activeBranch.description}
            </p>
          </div>

          <div className="text-xs text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
            Contoh Kode Peserta: <strong className="text-emerald-800 font-mono">{activeBranch.code}-PA-01</strong> (Putra) / <strong className="text-emerald-800 font-mono">{activeBranch.code}-PI-01</strong> (Putri)
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Golongan / Kategori List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-600" />
              Golongan yang Dimusabaqahkan ({activeBranch.categories.length})
            </h4>
            <div className="space-y-2">
              {activeBranch.categories.map((cat, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span>{cat}</span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Putra & Putri
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scoring Rubric (Pedoman Penilaian Dewan Hakim) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                Kriteria & Bobot Penilaian (Total 100 Poin)
              </h4>
              <button
                type="button"
                onClick={() => {
                  setRubricModalBranchId(activeBranch.id);
                  setIsRubricModalOpen(true);
                }}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
              >
                <Scale className="w-3.5 h-3.5 text-amber-500" />
                <span>Rincian Rubrik LPTQ</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {activeBranch.criteria.map((crit) => (
                <div key={crit.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-slate-900">
                      {crit.name}
                    </span>
                    <span className="font-mono font-bold text-xs bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300">
                      Maks {crit.maxScore} Poin
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {crit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* National Rubric Modal */}
      <NationalRubricModal
        isOpen={isRubricModalOpen}
        onClose={() => setIsRubricModalOpen(false)}
        initialBranchId={rubricModalBranchId}
      />
    </div>
  );
};
