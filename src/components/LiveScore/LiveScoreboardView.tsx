import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Tv, 
  Sparkles, 
  Download, 
  Maximize2, 
  Minimize2, 
  RefreshCw, 
  Medal, 
  Award, 
  Filter,
  Layers,
  Crown,
  Printer,
  Radio
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Participant, SystemConfig } from '../../types';
import { OFFICIAL_BRANCHES } from '../../data/mtqBranches';
import { PrintableRecapModal } from './PrintableRecapModal';
import { LOGO_MTQ_NATIONAL, LOGO_LOMBOK_BARAT } from '../../assets/logo';

interface LiveScoreboardViewProps {
  participants: Participant[];
  config: SystemConfig;
  onNavigateToCertificate?: (participantId: string) => void;
  onNavigateToStreaming?: () => void;
}

export const LiveScoreboardView: React.FC<LiveScoreboardViewProps> = ({
  participants,
  config,
  onNavigateToCertificate,
  onNavigateToStreaming
}) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string>('tilawah');
  const [selectedGender, setSelectedGender] = useState<string>('PUTRA');
  const [isProjectorMode, setIsProjectorMode] = useState<boolean>(false);
  const [isRecapModalOpen, setIsRecapModalOpen] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const activeBranch = OFFICIAL_BRANCHES.find(b => b.id === selectedBranchId) || OFFICIAL_BRANCHES[0];

  // Filter participants for this branch and gender
  const branchParticipants = participants
    .filter(p => p.branchId === selectedBranchId && p.gender === selectedGender)
    .sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0));

  const topThree = branchParticipants.slice(0, 3);
  const others = branchParticipants.slice(3);

  // Trigger confetti celebration
  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#047857', '#d97706', '#f59e0b', '#10b981', '#fbbf24']
    });
  };

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className={`space-y-6 ${isProjectorMode ? 'fixed inset-0 z-50 bg-emerald-950 text-white p-6 overflow-y-auto' : ''}`}>
      {/* Top Banner / Controls */}
      <div className={`${isProjectorMode ? 'bg-emerald-900 border-emerald-800' : 'bg-white border-slate-200'} rounded-2xl p-6 shadow-sm border flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
        <div className="flex items-start gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-amber-400 p-1 flex items-center justify-center shadow-md ${
              isProjectorMode ? 'bg-emerald-950' : 'bg-white'
            }`} title="Pemerintah Kabupaten Lombok Barat">
              <img
                src={LOGO_LOMBOK_BARAT}
                alt="Logo Kabupaten Lombok Barat"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-emerald-500 p-1 flex items-center justify-center shadow-md ${
              isProjectorMode ? 'bg-emerald-950' : 'bg-white'
            }`} title="LPTQ / MTQ Nasional">
              <img
                src={LOGO_MTQ_NATIONAL}
                alt="Logo MTQ Nasional"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400 text-emerald-950 font-bold mb-1.5">
              <Trophy className="w-3.5 h-3.5 text-emerald-950" />
              Live Scoreboard Real-Time & Pengumuman Hasil
            </div>
            <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${isProjectorMode ? 'text-white' : 'text-slate-900'}`}>
              Papan Peringkat & Perolehan Nilai Terkini
            </h2>
            <p className={`text-xs sm:text-sm mt-0.5 ${isProjectorMode ? 'text-amber-300 font-semibold' : 'text-emerald-800 font-semibold'}`}>
              {config.edition} • {config.hostLocation}
            </p>
            <p className={`text-xs mt-0.5 ${isProjectorMode ? 'text-emerald-200' : 'text-slate-500'}`}>
              14 Kafilah (11 Desa & 3 Kelurahan) • Kalkulasi otomatis ranking Dewan Hakim.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onNavigateToStreaming && (
            <button
              onClick={onNavigateToStreaming}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition ${
                isProjectorMode
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
              }`}
            >
              <Radio className="w-4 h-4" />
              Tonton Live Streaming
            </button>
          )}

          <button
            onClick={triggerConfetti}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-emerald-950 shadow-md transition"
          >
            <Sparkles className="w-4 h-4" />
            Rayakan Juara 🎉
          </button>

          <button
            onClick={() => setIsProjectorMode(!isProjectorMode)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition ${
              isProjectorMode
                ? 'bg-emerald-800 text-white border-emerald-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
          >
            {isProjectorMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            {isProjectorMode ? 'Keluar Mode Layar' : 'Layar Proyektor Panggung'}
          </button>

          <button
            onClick={() => setIsRecapModalOpen(true)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition ${
              isProjectorMode
                ? 'bg-amber-400 text-emerald-950 border-amber-300 shadow-md'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-600 shadow-sm'
            }`}
            title="Buka Dokumen Resmi Rekapitulasi & Cetak Nilai"
          >
            <Printer className="w-4 h-4" />
            Cetak Rekap Nilai & SK
          </button>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className={`${isProjectorMode ? 'bg-emerald-900 border-emerald-800' : 'bg-white border-slate-200'} rounded-2xl p-4 shadow-sm border`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Branch Select */}
          <div className="flex items-center gap-2 flex-1 min-w-[240px]">
            <Filter className={`w-4 h-4 ${isProjectorMode ? 'text-amber-400' : 'text-slate-400'}`} />
            <select
              value={selectedBranchId}
              onChange={e => setSelectedBranchId(e.target.value)}
              className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border font-bold ${
                isProjectorMode
                  ? 'bg-emerald-950 text-white border-emerald-700'
                  : 'bg-slate-50 text-slate-800 border-slate-200 focus:bg-white'
              }`}
            >
              {OFFICIAL_BRANCHES.map(b => (
                <option key={b.id} value={b.id}>
                  [{b.code}] {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedGender('PUTRA')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedGender === 'PUTRA'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : isProjectorMode ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Kategori Putra (Qari / Hafizh)
            </button>
            <button
              onClick={() => setSelectedGender('PUTRI')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedGender === 'PUTRI'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : isProjectorMode ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Kategori Putri (Qari'ah / Hafizhah)
            </button>
          </div>
        </div>
      </div>

      {/* Top 3 Podium (Visual Showcase) */}
      {topThree.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-4">
          {/* 2nd Place */}
          {topThree[1] && (
            <div className={`order-2 md:order-1 rounded-2xl p-6 border shadow-md relative overflow-hidden text-center transition ${
              isProjectorMode
                ? 'bg-emerald-900/90 border-slate-400'
                : 'bg-white border-slate-200'
            }`}>
              <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-700 font-extrabold text-lg flex items-center justify-center mx-auto mb-2 border-2 border-slate-400">
                🥈 2
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Juara II (Perak)
              </span>
              <h3 className={`font-extrabold text-base mt-1 truncate ${isProjectorMode ? 'text-white' : 'text-slate-900'}`}>
                {topThree[1].fullName}
              </h3>
              <p className={`text-xs ${isProjectorMode ? 'text-emerald-200' : 'text-slate-500'}`}>
                {topThree[1].originKafilah}
              </p>
              <div className="mt-3 py-1.5 px-3 bg-slate-100 dark:bg-emerald-950/60 rounded-xl inline-block font-mono font-black text-xl text-emerald-800">
                {topThree[1].finalScore?.toFixed(2) || '-'} Poin
              </div>
              <div className="mt-1 font-mono text-[10px] text-slate-400">
                Kode: {topThree[1].participantCode}
              </div>
            </div>
          )}

          {/* 1st Place (Winner - Center, Elevated) */}
          {topThree[0] && (
            <div className={`order-1 md:order-2 rounded-2xl p-7 border-2 shadow-xl relative overflow-hidden text-center scale-105 transition ${
              isProjectorMode
                ? 'bg-gradient-to-b from-amber-900/60 to-emerald-900 border-amber-400'
                : 'bg-gradient-to-b from-amber-50 to-white border-amber-400'
            }`}>
              <div className="absolute top-2 right-2 text-amber-500 animate-bounce">
                <Crown className="w-6 h-6" />
              </div>
              <div className="w-16 h-16 rounded-full bg-amber-400 text-emerald-950 font-black text-2xl flex items-center justify-center mx-auto mb-2 shadow-lg border-2 border-amber-300">
                🥇 1
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-0.5 rounded-full">
                Juara I (Emas Terbaik)
              </span>
              <h3 className={`font-black text-lg mt-2 ${isProjectorMode ? 'text-white' : 'text-slate-950'}`}>
                {topThree[0].fullName}
              </h3>
              <p className={`text-xs font-semibold ${isProjectorMode ? 'text-amber-200' : 'text-emerald-800'}`}>
                {topThree[0].originKafilah}
              </p>
              <div className="mt-3 py-2 px-4 bg-amber-400 text-emerald-950 rounded-xl inline-block font-mono font-black text-2xl shadow-sm">
                {topThree[0].finalScore?.toFixed(2) || '-'} Poin
              </div>
              <div className="mt-2 font-mono text-[11px] font-bold text-amber-600">
                Kode: {topThree[0].participantCode}
              </div>
              {onNavigateToCertificate && (
                <button
                  onClick={() => onNavigateToCertificate(topThree[0].id)}
                  className="mt-3 text-xs font-bold text-emerald-800 hover:text-emerald-900 underline block mx-auto"
                >
                  Buka Piagam Tersertifikasi →
                </button>
              )}
            </div>
          )}

          {/* 3rd Place */}
          {topThree[2] && (
            <div className={`order-3 rounded-2xl p-6 border shadow-md relative overflow-hidden text-center transition ${
              isProjectorMode
                ? 'bg-emerald-900/90 border-amber-700'
                : 'bg-white border-slate-200'
            }`}>
              <div className="w-12 h-12 rounded-full bg-amber-700 text-white font-extrabold text-lg flex items-center justify-center mx-auto mb-2 border-2 border-amber-600">
                🥉 3
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                Juara III (Perunggu)
              </span>
              <h3 className={`font-extrabold text-base mt-1 truncate ${isProjectorMode ? 'text-white' : 'text-slate-900'}`}>
                {topThree[2].fullName}
              </h3>
              <p className={`text-xs ${isProjectorMode ? 'text-emerald-200' : 'text-slate-500'}`}>
                {topThree[2].originKafilah}
              </p>
              <div className="mt-3 py-1.5 px-3 bg-slate-100 dark:bg-emerald-950/60 rounded-xl inline-block font-mono font-black text-xl text-emerald-800">
                {topThree[2].finalScore?.toFixed(2) || '-'} Poin
              </div>
              <div className="mt-1 font-mono text-[10px] text-slate-400">
                Kode: {topThree[2].participantCode}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Leaderboard Table of All Participants in Branch */}
      <div className={`${isProjectorMode ? 'bg-emerald-900 border-emerald-800' : 'bg-white border-slate-200'} rounded-2xl shadow-sm border overflow-hidden`}>
        <div className="px-6 py-4 border-b border-slate-100/20 flex items-center justify-between">
          <div className="font-bold text-sm sm:text-base flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Klasemen Lengkap: {activeBranch.name} ({selectedGender})</span>
          </div>
          <span className="text-xs text-slate-400">
            Total {branchParticipants.length} Peserta
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className={`${isProjectorMode ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-50 text-slate-600'} font-semibold border-b`}>
                <th className="py-3 px-4 text-center">Peringkat</th>
                <th className="py-3 px-4">Kode & No. Undian</th>
                <th className="py-3 px-4">Nama Peserta & Kafilah</th>
                <th className="py-3 px-4">Golongan</th>
                <th className="py-3 px-4 text-center">Gelar Juara</th>
                <th className="py-3 px-4 text-center">Nilai Akhir</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/20">
              {branchParticipants.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Belum ada peserta terdaftar di cabang & kategori ini.
                  </td>
                </tr>
              ) : (
                branchParticipants.map((p, index) => {
                  const rank = index + 1;
                  const isTop = rank <= 3;
                  return (
                    <tr 
                      key={p.id} 
                      className={`transition ${
                        isTop 
                          ? isProjectorMode ? 'bg-emerald-800/60' : 'bg-amber-50/40' 
                          : isProjectorMode ? 'hover:bg-emerald-800/40' : 'hover:bg-slate-50'
                      }`}
                    >
                      {/* Rank badge */}
                      <td className="py-3 px-4 text-center font-bold">
                        {rank === 1 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-emerald-950 font-black text-sm shadow">
                            1
                          </span>
                        ) : rank === 2 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-300 text-slate-800 font-bold text-sm shadow">
                            2
                          </span>
                        ) : rank === 3 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-600 text-white font-bold text-sm shadow">
                            3
                          </span>
                        ) : (
                          <span className="text-slate-400 font-mono">#{rank}</span>
                        )}
                      </td>

                      {/* Code */}
                      <td className="py-3 px-4 font-mono font-bold whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-950 text-xs">
                          {p.participantCode}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5">Urut #{p.orderNumber}</div>
                      </td>

                      {/* Name & Kafilah */}
                      <td className="py-3 px-4">
                        <div className="font-extrabold text-sm">{p.fullName}</div>
                        <div className={`text-xs ${isProjectorMode ? 'text-emerald-200' : 'text-slate-500'}`}>
                          {p.originKafilah}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 text-xs font-medium">
                        {p.category}
                      </td>

                      {/* Award Title */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        {p.awardTitle ? (
                          <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                            p.rank === 1
                              ? 'bg-amber-400 text-emerald-950 shadow-sm'
                              : p.rank === 2
                              ? 'bg-slate-200 text-slate-800'
                              : p.rank === 3
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {p.awardTitle}
                          </span>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>

                      {/* Score */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        {p.finalScore !== undefined && p.finalScore > 0 ? (
                          <span className="font-mono font-black text-sm text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                            {p.finalScore.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs font-mono">Belum dinilai</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.status === 'SELESAI'
                            ? 'bg-emerald-100 text-emerald-800'
                            : p.status === 'SEDANG_TAMPIL'
                            ? 'bg-amber-400 text-emerald-950 animate-pulse font-extrabold'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Recap & SK Modal */}
      {isRecapModalOpen && (
        <PrintableRecapModal
          participants={participants}
          config={config}
          currentBranchId={selectedBranchId}
          currentGender={selectedGender}
          onClose={() => setIsRecapModalOpen(false)}
        />
      )}
    </div>
  );
};
