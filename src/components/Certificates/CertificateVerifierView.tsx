import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Award, 
  QrCode, 
  Calendar, 
  Building,
  UserCheck
} from 'lucide-react';
import { Participant, SystemConfig } from '../../types';
import { OFFICIAL_BRANCHES } from '../../data/mtqBranches';
import { formatDateIndonesian } from '../../utils/certificateUtils';
import { LOGO_MTQ_NATIONAL } from '../../assets/logo';

interface CertificateVerifierViewProps {
  participants: Participant[];
  config: SystemConfig;
  initialQuery?: string;
}

export const CertificateVerifierView: React.FC<CertificateVerifierViewProps> = ({
  participants,
  config,
  initialQuery = ''
}) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [hasSearched, setHasSearched] = useState<boolean>(!!initialQuery);

  const cleanQuery = query.trim().toUpperCase();

  // Find matching participant by certificate number, hash, or registration number
  const matchedParticipant = participants.find(p => {
    if (!p.certificateNumber && !p.certificateHash) return false;
    return (
      (p.certificateNumber && p.certificateNumber.toUpperCase().includes(cleanQuery)) ||
      (p.certificateHash && p.certificateHash.toUpperCase() === cleanQuery) ||
      (p.participantCode && p.participantCode.toUpperCase() === cleanQuery)
    );
  });

  const branch = matchedParticipant 
    ? OFFICIAL_BRANCHES.find(b => b.id === matchedParticipant.branchId) 
    : null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  const sampleCertificates = participants.filter(p => p.certificateNumber).slice(0, 3);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center space-y-2">
        <div className="w-16 h-16 mx-auto rounded-2xl border-2 border-amber-400 p-1 bg-emerald-50/50 shadow-sm flex items-center justify-center mb-1">
          <img
            src={LOGO_MTQ_NATIONAL}
            alt="Logo MTQ Nasional"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          Sistem Verifikasi Sertifikat & Piagam Digital LPTQ
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Cek Keaslian & Validasi Piagam MTQ
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Masukkan Nomor Piagam Penghargaan atau Kode Hash Digital untuk memverifikasi keabsahan dokumen dalam pangkalan data resmi MTQ.
        </p>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="pt-3 max-w-xl mx-auto">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setHasSearched(false);
                }}
                placeholder="Contoh: PIAGAM/MTQ-XXXII/LPTQ-GRG/2026/TLW-001 atau E9B3A74C81FD92E8"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition whitespace-nowrap"
            >
              Verifikasi Dokumen
            </button>
          </div>
        </form>

        {/* Quick Sample Links */}
        {sampleCertificates.length > 0 && (
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span>Uji Coba Nomor Sertifikat:</span>
            {sampleCertificates.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setQuery(p.certificateNumber || '');
                  setHasSearched(true);
                }}
                className="font-mono text-[11px] px-2 py-0.5 bg-slate-100 hover:bg-emerald-100 text-emerald-900 rounded border border-slate-200 transition"
              >
                {p.certificateNumber}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Result Card */}
      {hasSearched && (
        <div className="animate-in fade-in zoom-in-95 duration-200">
          {matchedParticipant ? (
            <div className="bg-white rounded-2xl border-2 border-emerald-600 shadow-xl overflow-hidden">
              {/* Verified Header */}
              <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 text-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600/60 border-2 border-emerald-400 flex items-center justify-center text-white">
                    <CheckCircle2 className="w-7 h-7 text-emerald-300" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      STATUS DOKUMEN: VALID & TERSERTIFIKASI RESMI
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                      Piagam Terdaftar Sah di Database LPTQ
                    </h3>
                  </div>
                </div>

                <div className="bg-emerald-950/70 border border-emerald-600 px-3.5 py-1.5 rounded-xl font-mono text-xs text-amber-300 font-bold">
                  HASH: {matchedParticipant.certificateHash}
                </div>
              </div>

              {/* Verified Details Grid */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Name */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-slate-500 font-medium block mb-1">Nama Pemenang</span>
                    <strong className="text-base text-slate-900 block">{matchedParticipant.fullName}</strong>
                    <span className="text-xs text-emerald-800 font-semibold">{matchedParticipant.originKafilah}</span>
                  </div>

                  {/* Award Title */}
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                    <span className="text-[11px] text-amber-800 font-medium block mb-1">Gelar Prestasi</span>
                    <strong className="text-base text-amber-950 block">{matchedParticipant.awardTitle || 'Juara Terbaik'}</strong>
                    <span className="text-xs font-mono font-bold text-amber-800">Nilai Akhir: {matchedParticipant.finalScore?.toFixed(2)} / 100</span>
                  </div>

                  {/* Branch */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-slate-500 font-medium block mb-1">Cabang & Golongan</span>
                    <strong className="text-sm text-slate-900 block">{branch?.name || matchedParticipant.branchId}</strong>
                    <span className="text-xs text-slate-600">{matchedParticipant.category} ({matchedParticipant.gender})</span>
                  </div>
                </div>

                {/* Additional metadata */}
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-2 text-slate-700">
                  <div className="flex justify-between border-b border-emerald-100 pb-2">
                    <span className="text-slate-500">Nomor Registrasi Piagam:</span>
                    <span className="font-mono font-bold text-emerald-950">{matchedParticipant.certificateNumber}</span>
                  </div>
                  <div className="flex justify-between border-b border-emerald-100 pb-2">
                    <span className="text-slate-500">Penyelenggara / Event:</span>
                    <span className="font-semibold text-slate-800">{config.edition} • {config.hostLocation}</span>
                  </div>
                  <div className="flex justify-between border-b border-emerald-100 pb-2">
                    <span className="text-slate-500">Ketua Umum LPTQ:</span>
                    <span className="font-semibold text-slate-800">{config.chairmanName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ketua Dewan Hakim:</span>
                    <span className="font-semibold text-slate-800">{config.chiefJudgeName}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-rose-300 p-8 text-center shadow-lg space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <XCircle className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-rose-900">
                Dokumen Tidak Ditemukan atau Tidak Valid
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Nomor piagam atau hash <strong className="font-mono text-slate-700">"{query}"</strong> tidak terdaftar dalam database penyelenggaraan MTQ ini. Mohon periksa kembali ejaan nomor piagam.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
