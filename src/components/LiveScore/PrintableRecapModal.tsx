import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  Award, 
  FileText, 
  Trophy, 
  ShieldCheck,
  Building2,
  Sparkles
} from 'lucide-react';
import { Participant, SystemConfig } from '../../types';
import { OFFICIAL_BRANCHES } from '../../data/mtqBranches';
import { formatDateIndonesian } from '../../utils/certificateUtils';
import { LOGO_MTQ_NATIONAL, LOGO_LOMBOK_BARAT } from '../../assets/logo';
import { ALL_GERUNG_KAFILAH } from '../../data/gerungVillages';
import { getKecamatanById } from '../../data/lombokBaratKecamatan';

interface PrintableRecapModalProps {
  participants: Participant[];
  config: SystemConfig;
  currentBranchId: string;
  currentGender: string;
  onClose: () => void;
}

type RecapViewType = 'current_branch' | 'all_branches' | 'kafilah_standings' | 'berita_acara';

export const PrintableRecapModal: React.FC<PrintableRecapModalProps> = ({
  participants,
  config,
  currentBranchId,
  currentGender,
  onClose
}) => {
  const activeKecamatan = getKecamatanById(config.activeKecamatanId || 'gerung');
  const activeVillages = activeKecamatan.villages;

  const [viewType, setViewType] = useState<RecapViewType>('current_branch');

  const activeBranch = OFFICIAL_BRANCHES.find(b => b.id === currentBranchId) || OFFICIAL_BRANCHES[0];

  // Filter for current branch
  const currentBranchParticipants = participants
    .filter(p => p.branchId === currentBranchId && p.gender === currentGender)
    .sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0));

  // All completed or scored participants sorted by branch then rank
  const allScoredParticipants = [...participants]
    .sort((a, b) => {
      if (a.branchId !== b.branchId) return a.branchId.localeCompare(b.branchId);
      if (a.gender !== b.gender) return a.gender.localeCompare(b.gender);
      return (b.finalScore || 0) - (a.finalScore || 0);
    });

  // Pre-seed all official villages of active Kecamatan
  const kafilahMap = new Map<string, { name: string; type: 'DESA' | 'KELURAHAN'; gold: number; silver: number; bronze: number; points: number; totalJuara: number }>();

  activeVillages.forEach(k => {
    kafilahMap.set(k.fullName, { 
      name: k.name, 
      type: k.type, 
      gold: 0, 
      silver: 0, 
      bronze: 0, 
      points: 0, 
      totalJuara: 0 
    });
  });

  participants.forEach(p => {
    if (!p.awardTitle) return;
    const kafilahStr = p.originKafilah || 'Umum';
    
    // Match with one of the active Kecamatan official wilayah if possible
    let targetKey = kafilahStr;
    for (const k of activeVillages) {
      if (kafilahStr.toLowerCase().includes(k.name.toLowerCase())) {
        targetKey = k.fullName;
        break;
      }
    }

    if (!kafilahMap.has(targetKey)) {
      kafilahMap.set(targetKey, { 
        name: kafilahStr, 
        type: 'DESA', 
        gold: 0, 
        silver: 0, 
        bronze: 0, 
        points: 0, 
        totalJuara: 0 
      });
    }

    const stat = kafilahMap.get(targetKey)!;
    if (p.awardTitle.includes('Juara I') && !p.awardTitle.includes('Harapan')) {
      stat.gold += 1;
      stat.points += 5;
      stat.totalJuara += 1;
    } else if (p.awardTitle.includes('Juara II') && !p.awardTitle.includes('Harapan')) {
      stat.silver += 1;
      stat.points += 3;
      stat.totalJuara += 1;
    } else if (p.awardTitle.includes('Juara III') && !p.awardTitle.includes('Harapan')) {
      stat.bronze += 1;
      stat.points += 1;
      stat.totalJuara += 1;
    }
  });

  const kafilahStandings = Array.from(kafilahMap.entries())
    .map(([fullName, stats]) => ({ fullName, ...stats }))
    .sort((a, b) => b.points - a.points || b.gold - a.gold || b.silver - a.silver || a.name.localeCompare(b.name));

  // Trigger Print Directly
  const handlePrint = () => {
    window.print();
  };

  // Export CSV
  const handleExportCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    
    if (viewType === 'kafilah_standings') {
      csvContent += 'Peringkat,Kafilah Desa/Kelurahan,Status Wilayah,Emas (Juara I),Perak (Juara II),Perunggu (Juara III),Total Poin\n';
      kafilahStandings.forEach((k, idx) => {
        csvContent += `${idx + 1},"${k.fullName}","${k.type}",${k.gold},${k.silver},${k.bronze},${k.points}\n`;
      });
    } else {
      const dataToExport = viewType === 'current_branch' ? currentBranchParticipants : allScoredParticipants;
      csvContent += 'Peringkat,Kode Peserta,Nama Lengkap,Kafilah,Cabang,Golongan,Kategori,Nilai Akhir,Gelar Juara\n';
      dataToExport.forEach((p, idx) => {
        const branchName = OFFICIAL_BRANCHES.find(b => b.id === p.branchId)?.name || p.branchId;
        csvContent += `${p.rank || idx + 1},"${p.participantCode}","${p.fullName}","${p.originKafilah}","${branchName}","${p.category}","${p.gender}",${p.finalScore || 0},"${p.awardTitle || '-'}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_${config.edition.replace(/\s+/g, '_')}_Kec_${activeKecamatan.name}_${viewType}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-2 sm:p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-100 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[96vh] flex flex-col overflow-hidden border border-slate-300 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Control Bar (Hidden on Print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 bg-emerald-950 text-white border-b border-emerald-800">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                Cetak Rekapitulasi Nilai & Keputusan Dewan Hakim
              </h3>
              <p className="text-[11px] text-emerald-200">
                {config.edition} • {config.hostLocation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-900 hover:bg-emerald-800 text-emerald-200 border border-emerald-700 transition"
              title="Unduh file format CSV (Excel)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor CSV</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-500 text-emerald-950 shadow-md transition"
              title="Cetak Langsung atau Simpan sebagai PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Cetak PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800 transition ml-2"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Options Selector (Hidden on Print) */}
        <div className="px-6 py-2.5 bg-emerald-900/60 border-b border-emerald-800/80 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-emerald-200 font-semibold mr-1">Format Rekap:</span>
          
          <button
            onClick={() => setViewType('current_branch')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              viewType === 'current_branch'
                ? 'bg-amber-400 text-emerald-950 font-bold shadow-sm'
                : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-800'
            }`}
          >
            Cabang Aktif ({activeBranch.name} - {currentGender})
          </button>

          <button
            onClick={() => setViewType('all_branches')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              viewType === 'all_branches'
                ? 'bg-amber-400 text-emerald-950 font-bold shadow-sm'
                : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-800'
            }`}
          >
            Seluruh Cabang Musabaqah
          </button>

          <button
            onClick={() => setViewType('kafilah_standings')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              viewType === 'kafilah_standings'
                ? 'bg-amber-400 text-emerald-950 font-bold shadow-sm'
                : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-800'
            }`}
          >
            Klasemen Medali Desa/Kelurahan
          </button>

          <button
            onClick={() => setViewType('berita_acara')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              viewType === 'berita_acara'
                ? 'bg-amber-400 text-emerald-950 font-bold shadow-sm'
                : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-800'
            }`}
          >
            Surat Keputusan Dewan Hakim
          </button>
        </div>

        {/* The Printable Paper Container (id="printable-recap") */}
        <div className="flex-1 p-4 sm:p-8 overflow-y-auto bg-slate-200/70 flex justify-center">
          <div
            id="printable-recap"
            className="w-full max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-xl text-slate-900 border border-slate-300 font-serif"
          >
            {/* Kop Surat Resmi */}
            <div className="border-b-4 border-double border-slate-900 pb-4 text-center relative">
              {/* Emblem / Logo */}
              <div className="flex items-center justify-between mb-2">
                <div className="w-16 h-16 rounded-xl border border-amber-400 p-1 bg-white shadow-sm flex items-center justify-center shrink-0" title="Pemerintah Kabupaten Lombok Barat">
                  <img
                    src={LOGO_LOMBOK_BARAT}
                    alt="Logo Kabupaten Lombok Barat"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 px-4">
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 font-sans">
                    LEMBAGA PENGEMBANGAN TILAWATIL QUR'AN (LPTQ) KECAMATAN {activeKecamatan.name.toUpperCase()}
                  </h4>
                  <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-emerald-950 font-sans">
                    KANTOR URUSAN AGAMA (KUA) KECAMATAN {activeKecamatan.name.toUpperCase()}
                  </h3>
                  <h2 className="text-base sm:text-lg font-black uppercase text-slate-900 font-serif">
                    DEWAN HAKIM {config.edition.toUpperCase()}
                  </h2>
                  <p className="text-[11px] text-slate-600 font-sans">
                    Sekretariat: Kantor Camat & KUA Kecamatan {activeKecamatan.name}, Kabupaten Lombok Barat, NTB
                  </p>
                </div>

                <div className="w-16 h-16 rounded-xl border border-amber-400 p-1 bg-white shadow-sm flex items-center justify-center shrink-0" title="LPTQ / MTQ Nasional">
                  <img
                    src={LOGO_MTQ_NATIONAL}
                    alt="Logo MTQ Nasional"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Document Title */}
            <div className="py-4 text-center space-y-1">
              <h2 className="text-base sm:text-lg font-bold uppercase underline tracking-wide text-slate-950">
                {viewType === 'kafilah_standings'
                  ? 'DAFTAR PEROLEHAN MEDALI & KLASEMEN JUARA UMUM'
                  : viewType === 'berita_acara'
                  ? 'SURAT KEPUTUSAN DEWAN HAKIM TENTANG PENETAPAN JUARA'
                  : 'REKAPITULASI HASIL PENILAIAN RESMI DEWAN HAKIM'}
              </h2>
              <div className="text-xs sm:text-sm font-sans font-bold text-emerald-950">
                {config.edition} KABUPATEN LOMBOK BARAT NTB
              </div>
              <div className="text-xs text-slate-600 font-sans">
                Tahun 1448 H / 2026 M • Lokasi: {config.hostLocation}
              </div>
              {viewType === 'current_branch' && (
                <div className="inline-block mt-2 px-3 py-1 bg-emerald-50 border border-emerald-300 rounded text-xs font-sans font-bold text-emerald-950 uppercase">
                  Cabang: {activeBranch.name} • Golongan: {currentBranchParticipants[0]?.category || 'Semua Golongan'} ({currentGender})
                </div>
              )}
            </div>

            {/* View 1: Current Branch Scored Table */}
            {viewType === 'current_branch' && (
              <div className="my-4">
                <table className="w-full text-left border-collapse border border-slate-400 text-xs font-sans">
                  <thead>
                    <tr className="bg-slate-100 text-slate-900 border-b border-slate-400 font-bold">
                      <th className="border border-slate-400 p-2 text-center w-10">No</th>
                      <th className="border border-slate-400 p-2 text-center w-24">No. Peserta</th>
                      <th className="border border-slate-400 p-2">Nama Lengkap Peserta</th>
                      <th className="border border-slate-400 p-2">Asal Kafilah Desa/Kelurahan</th>
                      <th className="border border-slate-400 p-2 text-center w-20">Nilai Akhir</th>
                      <th className="border border-slate-400 p-2 text-center w-16">Peringkat</th>
                      <th className="border border-slate-400 p-2 text-center w-24">Gelar Juara</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBranchParticipants.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="border border-slate-400 p-4 text-center text-slate-500 italic">
                          Belum ada peserta dinilai pada cabang ini.
                        </td>
                      </tr>
                    ) : (
                      currentBranchParticipants.map((p, index) => (
                        <tr key={p.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                          <td className="border border-slate-400 p-2 text-center font-bold">{index + 1}</td>
                          <td className="border border-slate-400 p-2 text-center font-mono font-bold text-slate-800">
                            {p.participantCode}
                          </td>
                          <td className="border border-slate-400 p-2 font-bold text-slate-900">
                            {p.fullName}
                          </td>
                          <td className="border border-slate-400 p-2 text-slate-700">
                            {p.originKafilah}
                          </td>
                          <td className="border border-slate-400 p-2 text-center font-mono font-black text-emerald-950">
                            {p.finalScore ? p.finalScore.toFixed(2) : '-'}
                          </td>
                          <td className="border border-slate-400 p-2 text-center font-bold">
                            {p.rank || index + 1}
                          </td>
                          <td className="border border-slate-400 p-2 text-center font-bold text-amber-800">
                            {p.awardTitle || '-'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* View 2: All Branches Scored Table */}
            {viewType === 'all_branches' && (
              <div className="my-4">
                <table className="w-full text-left border-collapse border border-slate-400 text-xs font-sans">
                  <thead>
                    <tr className="bg-slate-100 text-slate-900 border-b border-slate-400 font-bold">
                      <th className="border border-slate-400 p-2 text-center w-10">No</th>
                      <th className="border border-slate-400 p-2 text-center w-24">No. Peserta</th>
                      <th className="border border-slate-400 p-2">Nama Peserta</th>
                      <th className="border border-slate-400 p-2">Asal Kafilah</th>
                      <th className="border border-slate-400 p-2">Cabang & Golongan</th>
                      <th className="border border-slate-400 p-2 text-center w-16">Nilai</th>
                      <th className="border border-slate-400 p-2 text-center w-24">Gelar Juara</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allScoredParticipants.map((p, index) => {
                      const bName = OFFICIAL_BRANCHES.find(b => b.id === p.branchId)?.name || p.branchId;
                      return (
                        <tr key={p.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                          <td className="border border-slate-400 p-2 text-center">{index + 1}</td>
                          <td className="border border-slate-400 p-2 text-center font-mono font-bold">
                            {p.participantCode}
                          </td>
                          <td className="border border-slate-400 p-2 font-bold">{p.fullName}</td>
                          <td className="border border-slate-400 p-2 text-slate-700">{p.originKafilah}</td>
                          <td className="border border-slate-400 p-2 text-slate-700">
                            {bName} ({p.gender})
                          </td>
                          <td className="border border-slate-400 p-2 text-center font-mono font-bold text-emerald-950">
                            {p.finalScore ? p.finalScore.toFixed(2) : '-'}
                          </td>
                          <td className="border border-slate-400 p-2 text-center font-bold text-amber-800">
                            {p.awardTitle || '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* View 3: Kafilah Standings (Desa / Kelurahan se-Kec. Gerung) */}
            {viewType === 'kafilah_standings' && (
              <div className="my-4 space-y-4">
                <p className="text-xs text-slate-700 font-sans leading-relaxed">
                  Perhitungan perolehan poin Juara Umum berdasarkan pedoman LPTQ: Juara I = 5 Poin, Juara II = 3 Poin, dan Juara III = 1 Poin.
                </p>

                <table className="w-full text-left border-collapse border border-slate-400 text-xs font-sans">
                  <thead>
                    <tr className="bg-slate-100 text-slate-900 border-b border-slate-400 font-bold">
                      <th className="border border-slate-400 p-2 text-center w-12">Peringkat</th>
                      <th className="border border-slate-400 p-2">Kafilah Desa / Kelurahan</th>
                      <th className="border border-slate-400 p-2 text-center w-20">Emas (I)</th>
                      <th className="border border-slate-400 p-2 text-center w-20">Perak (II)</th>
                      <th className="border border-slate-400 p-2 text-center w-20">Perunggu (III)</th>
                      <th className="border border-slate-400 p-2 text-center w-24">Total Poin</th>
                      <th className="border border-slate-400 p-2 text-center w-28">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kafilahStandings.map((k, index) => (
                      <tr key={k.fullName} className={index === 0 ? 'bg-amber-50/80 font-bold' : index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                        <td className="border border-slate-400 p-2 text-center font-black">
                          {index + 1}
                        </td>
                        <td className="border border-slate-400 p-2 font-bold text-slate-900">
                          <div className="flex items-center justify-between gap-2">
                            <span>{k.fullName}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                              k.type === 'KELURAHAN' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {k.type}
                            </span>
                          </div>
                        </td>
                        <td className="border border-slate-400 p-2 text-center font-bold text-amber-600">
                          {k.gold}
                        </td>
                        <td className="border border-slate-400 p-2 text-center font-bold text-slate-500">
                          {k.silver}
                        </td>
                        <td className="border border-slate-400 p-2 text-center font-bold text-amber-800">
                          {k.bronze}
                        </td>
                        <td className="border border-slate-400 p-2 text-center font-mono font-black text-emerald-950 text-sm">
                          {k.points}
                        </td>
                        <td className="border border-slate-400 p-2 text-center font-bold text-emerald-900">
                          {index === 0 ? '🏆 JUARA UMUM' : index < 3 ? `Peringkat ${index + 1}` : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* View 4: Berita Acara / Surat Keputusan */}
            {viewType === 'berita_acara' && (
              <div className="my-4 space-y-3 text-xs sm:text-sm font-serif leading-relaxed text-slate-800">
                <div className="text-center font-bold uppercase mb-2">
                  SURAT KEPUTUSAN DEWAN HAKIM {config.edition.toUpperCase()}<br />
                  Nomor: 01/DH-MTQ/{activeKecamatan.id.toUpperCase().slice(0, 3)}/2026<br />
                  TENTANG PENETAPAN JUARA UMUM DAN PESERTA TERBAIK
                </div>
                <p>
                  Pada hari ini, <strong>{formatDateIndonesian(config.announcementDate)}</strong>, bertempat di <strong>{config.hostLocation}</strong>, Dewan Hakim {config.edition} Tingkat Kecamatan {activeKecamatan.name} Kabupaten Lombok Barat setelah:
                </p>
                <div className="pl-4 space-y-1 font-sans text-xs">
                  <div><strong>MENIMBANG:</strong> Hasil perolehan nilai murni dari seluruh majelis hakim untuk seluruh cabang lomba musabaqah yang telah diteliti dan diverifikasi secara seksama.</div>
                  <div><strong>MENGINGAT:</strong> Pedoman Penyelenggaraan Musabaqah Tilawatil Qur'an Lembaga Pengembangan Tilawatil Qur'an (LPTQ).</div>
                  <div><strong>MEMUTUSKAN:</strong> Menetapkan nama-nama peserta terbaik I, II, dan III serta Juara Umum {config.edition} Tingkat Kecamatan {activeKecamatan.name} sebagaimana tercantum dalam lampiran rekapitulasi penilaian ini.</div>
                </div>
                <p className="pt-2">
                  Keputusan ini bersifat final, mengikat, dan tidak dapat diganggu gugat.
                </p>
              </div>
            )}

            {/* Official Signatures (Kecamatan Dynamic, Lombok Barat) */}
            <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs font-serif break-inside-avoid">
              <div className="space-y-1">
                <div>Mengetahui,</div>
                <div className="font-bold">{config.chairmanTitle || `Ketua LPTQ / Camat ${activeKecamatan.name}`}</div>
                <div className="h-16 flex items-center justify-center">
                  <span className="italic font-bold text-slate-800 text-lg sm:text-xl font-serif">
                    {config.chairmanName?.split(',')[0] || config.chairmanName}
                  </span>
                </div>
                <div className="font-bold underline text-slate-950 font-serif">
                  {config.chairmanName}
                </div>
                <div className="text-[10px] text-slate-600 font-sans">
                  NIP. 19720415 199803 1 005
                </div>
              </div>

              <div className="space-y-1">
                <div>Ditetapkan di: {config.hostLocation || `${activeKecamatan.name}, Lombok Barat`}</div>
                <div>Pada tanggal: {formatDateIndonesian(config.announcementDate)}</div>
                <div className="font-bold">{config.chiefJudgeTitle || `Ketua Dewan Hakim MTQ Kec. ${activeKecamatan.name}`}</div>
                <div className="h-16 flex items-center justify-center">
                  <span className="italic font-bold text-slate-800 text-lg sm:text-xl font-serif">
                    {config.chiefJudgeName?.split(',')[0] || config.chiefJudgeName}
                  </span>
                </div>
                <div className="font-bold underline text-slate-950 font-serif">
                  {config.chiefJudgeName}
                </div>
                <div className="text-[10px] text-slate-600 font-sans">
                  NIP. 19780512 200312 1 003
                </div>
              </div>
            </div>

            {/* Official Footer Credits with Developer Attribution */}
            <div className="mt-8 pt-4 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500 font-sans">
              <div className="flex items-center gap-1.5 text-emerald-950 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Dokumen Resmi SIMTQ LPTQ Kecamatan {activeKecamatan.name}, Kab. Lombok Barat, NTB</span>
              </div>
              <div className="text-right">
                <span>Pengembang Aplikasi: </span>
                <strong className="text-slate-800 font-bold">Husni, S.Kom.I</strong>
                <span> (Penyuluh Agama Islam KUA Kec. Gerung / Wilker Lombok Barat)</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
