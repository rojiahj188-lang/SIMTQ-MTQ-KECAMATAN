import React, { useState } from 'react';
import { X, Printer, CheckSquare, Square, Filter, Users, ShieldCheck } from 'lucide-react';
import { Participant, CommitteeMember, SystemConfig } from '../../types';
import { OFFICIAL_BRANCHES } from '../../data/mtqBranches';
import { LOGO_MTQ_NATIONAL, LOGO_LOMBOK_BARAT } from '../../assets/logo';

interface BatchIdCardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SystemConfig;
  initialMode: 'PARTICIPANTS' | 'COMMITTEE';
  participants: Participant[];
  committee: CommitteeMember[];
}

export const BatchIdCardsModal: React.FC<BatchIdCardsModalProps> = ({
  isOpen,
  onClose,
  config,
  initialMode,
  participants,
  committee
}) => {
  const [mode, setMode] = useState<'PARTICIPANTS' | 'COMMITTEE'>(initialMode);
  
  // Participant filter & selections
  const [selectedBranch, setSelectedBranch] = useState<string>('ALL');
  const [selectedParticipantIds, setSelectedParticipantIds] = useState<Set<string>>(() => {
    return new Set(participants.map(p => p.id));
  });

  // Committee filter & selections
  const [selectedRoleCategory, setSelectedRoleCategory] = useState<string>('ALL');
  const [selectedCommitteeIds, setSelectedCommitteeIds] = useState<Set<string>>(() => {
    return new Set(committee.map(c => c.id));
  });

  if (!isOpen) return null;

  // Filtered lists
  const filteredParticipants = participants.filter(p => {
    if (selectedBranch !== 'ALL' && p.branchId !== selectedBranch) return false;
    return true;
  });

  const filteredCommittee = committee.filter(c => {
    if (selectedRoleCategory !== 'ALL' && c.roleCategory !== selectedRoleCategory) return false;
    return true;
  });

  // Toggle selection
  const toggleParticipant = (id: string) => {
    const next = new Set(selectedParticipantIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedParticipantIds(next);
  };

  const toggleAllParticipants = () => {
    if (selectedParticipantIds.size === filteredParticipants.length) {
      setSelectedParticipantIds(new Set());
    } else {
      setSelectedParticipantIds(new Set(filteredParticipants.map(p => p.id)));
    }
  };

  const toggleCommittee = (id: string) => {
    const next = new Set(selectedCommitteeIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedCommitteeIds(next);
  };

  const toggleAllCommittee = () => {
    if (selectedCommitteeIds.size === filteredCommittee.length) {
      setSelectedCommitteeIds(new Set());
    } else {
      setSelectedCommitteeIds(new Set(filteredCommittee.map(c => c.id)));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Selected items to print
  const printableParticipants = filteredParticipants.filter(p => selectedParticipantIds.has(p.id));
  const printableCommittee = filteredCommittee.filter(c => selectedCommitteeIds.has(c.id));

  // Chunk array into groups of 4 for A4 pages (2x2 grid)
  function chunkArray<T>(arr: T[], size: number): T[][] {
    const res: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  }

  const participantPages: Participant[][] = chunkArray<Participant>(printableParticipants, 4);
  const committeePages: CommitteeMember[][] = chunkArray<CommitteeMember>(printableCommittee, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-2 sm:p-4 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      {/* Print Styles injected for A4 layout */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #printable-batch-area, #printable-batch-area * {
              visibility: visible;
            }
            #printable-batch-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0;
              padding: 0;
              background: #ffffff !important;
            }
            .a4-print-page {
              page-break-after: always;
              width: 210mm;
              min-height: 297mm;
              padding: 8mm;
              margin: 0 auto;
              box-sizing: border-box;
              display: grid !important;
              grid-template-columns: repeat(2, 1fr) !important;
              grid-gap: 8mm !important;
              align-content: start !important;
            }
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>

      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[94vh] flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Top Modal Bar (no-print) */}
        <div className="no-print px-6 py-4 bg-emerald-950 text-white flex flex-wrap items-center justify-between gap-3 border-b border-emerald-800">
          <div className="flex items-center gap-2.5">
            <Printer className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-sm sm:text-base">
                Cetak Masal ID Card MTQ (Lembar A4)
              </h3>
              <p className="text-[11px] text-emerald-300">
                Format 4 kartu per lembar A4 siap gunting / laminating resmi
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-emerald-900/90 p-1 rounded-xl border border-emerald-700/60">
            <button
              type="button"
              onClick={() => setMode('PARTICIPANTS')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                mode === 'PARTICIPANTS'
                  ? 'bg-amber-400 text-emerald-950 shadow'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Kartu Peserta ({participants.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('COMMITTEE')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                mode === 'COMMITTEE'
                  ? 'bg-amber-400 text-emerald-950 shadow'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Kartu Panitia ({committee.length})</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Selection Bar (no-print) */}
        <div className="no-print bg-slate-50 px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {mode === 'PARTICIPANTS' ? (
              <>
                <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <Filter className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Cabang:</span>
                  <select
                    value={selectedBranch}
                    onChange={e => setSelectedBranch(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="ALL">Semua Cabang ({participants.length})</option>
                    {OFFICIAL_BRANCHES.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.code} - {b.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={toggleAllParticipants}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 font-semibold text-slate-700 transition"
                >
                  {selectedParticipantIds.size === filteredParticipants.length ? (
                    <>
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Hapus Semua</span>
                    </>
                  ) : (
                    <>
                      <Square className="w-3.5 h-3.5 text-slate-400" />
                      <span>Pilih Semua ({filteredParticipants.length})</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <Filter className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Kategori Peran:</span>
                  <select
                    value={selectedRoleCategory}
                    onChange={e => setSelectedRoleCategory(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="ALL">Semua Divisi & Hakim ({committee.length})</option>
                    <option value="DEWAN_HAKIM">Dewan Hakam / Juri</option>
                    <option value="PANITIA_INTI">Panitia Pelaksana Inti</option>
                    <option value="SEKSI_IT_MEDIA">Seksi IT & Streaming</option>
                    <option value="SEKSI_MUSABAQAH">Seksi Musabaqah & Registrasi</option>
                    <option value="TIM_MEDIS">Tim Medis & Kesehatan</option>
                    <option value="SEKSI_KEAMANAN">Seksi Keamanan</option>
                    <option value="PENANGGUNG_JAWAB">Penanggung Jawab / Camat</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={toggleAllCommittee}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 font-semibold text-slate-700 transition"
                >
                  {selectedCommitteeIds.size === filteredCommittee.length ? (
                    <>
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Hapus Semua</span>
                    </>
                  ) : (
                    <>
                      <Square className="w-3.5 h-3.5 text-slate-400" />
                      <span>Pilih Semua ({filteredCommittee.length})</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-600">
              {mode === 'PARTICIPANTS' ? (
                <>
                  <strong className="text-emerald-700">{printableParticipants.length}</strong> kartu peserta dipilih ({participantPages.length} lembar A4)
                </>
              ) : (
                <>
                  <strong className="text-emerald-700">{printableCommittee.length}</strong> kartu panitia dipilih ({committeePages.length} lembar A4)
                </>
              )}
            </span>
            <button
              type="button"
              onClick={handlePrint}
              disabled={mode === 'PARTICIPANTS' ? printableParticipants.length === 0 : printableCommittee.length === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md transition disabled:opacity-50 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Sekarang (A4 Grid)</span>
            </button>
          </div>
        </div>

        {/* Preview & Printable Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-200/80">
          <div id="printable-batch-area" className="max-w-4xl mx-auto space-y-6">
            {mode === 'PARTICIPANTS' ? (
              printableParticipants.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl text-center text-slate-500 shadow-sm border border-slate-200">
                  Tidak ada kartu peserta yang dipilih. Silakan pilih peserta dari filter di atas.
                </div>
              ) : (
                participantPages.map((pageGroup, pageIdx) => (
                  <div
                    key={`p-page-${pageIdx}`}
                    className="a4-print-page bg-white p-6 rounded-2xl shadow-md border border-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-4 relative"
                  >
                    {/* Header sheet label (visible on screen only) */}
                    <div className="no-print col-span-full pb-2 border-b border-slate-200 flex justify-between items-center text-xs text-slate-500">
                      <span className="font-bold text-emerald-900">
                        Halaman Lembar A4 ke-{pageIdx + 1} dari {participantPages.length} (Isi {pageGroup.length} Kartu)
                      </span>
                      <span className="font-mono text-[10px]">Tingkat Kecamatan Gerung</span>
                    </div>

                    {pageGroup.map(p => {
                      const branch = OFFICIAL_BRANCHES.find(b => b.id === p.branchId);
                      return (
                        <div
                          key={p.id}
                          className="border-2 border-dashed border-slate-400/80 rounded-2xl p-2.5 bg-white relative flex flex-col justify-between"
                          style={{ minHeight: '340px' }}
                        >
                          {/* Inner Card Frame */}
                          <div className="border-2 border-emerald-700 rounded-xl overflow-hidden flex flex-col h-full bg-white shadow-sm">
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white p-2 text-center flex items-center justify-between gap-1.5">
                              <div className="w-8 h-8 rounded-full bg-white p-0.5 shrink-0 border border-amber-300" title="Kabupaten Lombok Barat">
                                <img
                                  src={LOGO_LOMBOK_BARAT}
                                  alt="Logo Lombok Barat"
                                  className="w-full h-full object-contain"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div className="flex-1 text-center">
                                <div className="text-[7px] uppercase font-bold text-amber-300 tracking-wider">
                                  KARTU TANDA PESERTA RESMI
                                </div>
                                <div className="text-[9px] font-serif font-extrabold uppercase leading-tight">
                                  {config.edition}
                                </div>
                                <div className="text-[7.5px] text-emerald-200">
                                  {config.hostLocation}
                                </div>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-white p-0.5 shrink-0 border border-amber-300" title="MTQ Nasional">
                                <img
                                  src={LOGO_MTQ_NATIONAL}
                                  alt="Logo MTQ"
                                  className="w-full h-full object-contain"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            </div>

                            {/* Participant Code Banner */}
                            <div className="bg-amber-400 py-1 text-center font-black text-xs text-emerald-950 tracking-wider shadow-inner">
                              {p.participantCode}
                            </div>

                            {/* Card Body */}
                            <div className="p-3 flex items-center gap-3 flex-1">
                              {/* Photo */}
                              <div className="w-20 h-26 rounded-lg overflow-hidden border-2 border-emerald-600 bg-emerald-50 shrink-0 flex items-center justify-center shadow-sm">
                                {p.photoUrl ? (
                                  <img
                                    src={p.photoUrl}
                                    alt={p.fullName}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                ) : (
                                  <div className="text-center p-1">
                                    <span className="text-xl font-bold text-emerald-800">
                                      {p.fullName.charAt(0)}
                                    </span>
                                    <span className="text-[8px] block uppercase font-semibold text-emerald-600 mt-0.5">
                                      {p.gender}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Details */}
                              <div className="flex-1 min-w-0 space-y-0.5">
                                <h4 className="font-extrabold text-slate-900 text-xs truncate">
                                  {p.fullName}
                                </h4>
                                <div className="text-[10px] font-bold text-emerald-800">
                                  {p.originKafilah}
                                </div>
                                <div className="text-[9px] text-slate-600 truncate">
                                  Cabang: <strong className="text-slate-800">{branch?.code || p.branchId}</strong>
                                </div>
                                <div className="text-[9px] text-slate-600 truncate">
                                  Golongan: <span className="font-medium text-slate-800">{p.category}</span>
                                </div>
                                <div className="text-[9px] text-amber-700 font-bold">
                                  No. Undian: #{p.orderNumber}
                                </div>
                                <div className="text-[8px] text-slate-400 font-mono">
                                  NIK: {p.nik}
                                </div>
                              </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-emerald-950 text-white text-[7.5px] text-center py-1 px-2 border-t border-emerald-800 flex justify-between items-center">
                              <span>Reg: {p.registrationNumber}</span>
                              <span className="font-semibold text-amber-300">LPTQ Gerung 2026</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))
              )
            ) : (
              printableCommittee.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl text-center text-slate-500 shadow-sm border border-slate-200">
                  Tidak ada kartu panitia yang dipilih. Silakan pilih panitia dari filter di atas.
                </div>
              ) : (
                committeePages.map((pageGroup, pageIdx) => (
                  <div
                    key={`c-page-${pageIdx}`}
                    className="a4-print-page bg-white p-6 rounded-2xl shadow-md border border-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-4 relative"
                  >
                    {/* Header sheet label */}
                    <div className="no-print col-span-full pb-2 border-b border-slate-200 flex justify-between items-center text-xs text-slate-500">
                      <span className="font-bold text-emerald-900">
                        Halaman Lembar A4 ke-{pageIdx + 1} dari {committeePages.length} (Isi {pageGroup.length} Kartu Panitia)
                      </span>
                      <span className="font-mono text-[10px]">Tingkat Kecamatan Gerung</span>
                    </div>

                    {pageGroup.map(c => {
                      const isJudge = c.roleCategory === 'DEWAN_HAKIM' || c.roleCategory === 'PANITERA';
                      const isIT = c.roleCategory === 'SEKSI_IT_MEDIA';
                      const isMedis = c.roleCategory === 'TIM_MEDIS';
                      const isKeamanan = c.roleCategory === 'SEKSI_KEAMANAN';

                      const headerClass = isJudge
                        ? 'from-amber-700 to-amber-900'
                        : isIT
                        ? 'from-blue-700 to-indigo-900'
                        : isMedis
                        ? 'from-red-700 to-rose-900'
                        : isKeamanan
                        ? 'from-slate-800 to-slate-950'
                        : 'from-emerald-800 to-teal-950';

                      const ribbonClass = isJudge
                        ? 'bg-amber-500 text-amber-950'
                        : isIT
                        ? 'bg-blue-600 text-white'
                        : isMedis
                        ? 'bg-rose-600 text-white'
                        : isKeamanan
                        ? 'bg-slate-800 text-white'
                        : 'bg-emerald-600 text-white';

                      return (
                        <div
                          key={c.id}
                          className="border-2 border-dashed border-slate-400/80 rounded-2xl p-2.5 bg-white relative flex flex-col justify-between"
                          style={{ minHeight: '340px' }}
                        >
                          {/* Inner Card Frame */}
                          <div className="border-2 border-emerald-700 rounded-xl overflow-hidden flex flex-col h-full bg-white shadow-sm">
                            {/* Card Header */}
                            <div className={`bg-gradient-to-r ${headerClass} text-white p-2 text-center flex items-center justify-between gap-1.5`}>
                              <div className="w-8 h-8 rounded-full bg-white p-0.5 shrink-0 border border-amber-300" title="Kabupaten Lombok Barat">
                                <img
                                  src={LOGO_LOMBOK_BARAT}
                                  alt="Logo Lombok Barat"
                                  className="w-full h-full object-contain"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div className="flex-1 text-center">
                                <div className="text-[7px] uppercase font-bold text-amber-300 tracking-wider">
                                  {isJudge ? 'DEWAN HAKAM / JURI MTQ' : 'PANITIA PELAKSANA MTQ'}
                                </div>
                                <div className="text-[9px] font-serif font-extrabold uppercase leading-tight">
                                  {config.edition}
                                </div>
                                <div className="text-[7.5px] text-emerald-200">
                                  Kecamatan Gerung • Lombok Barat
                                </div>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-white p-0.5 shrink-0 border border-amber-300" title="MTQ Nasional">
                                <img
                                  src={LOGO_MTQ_NATIONAL}
                                  alt="Logo MTQ"
                                  className="w-full h-full object-contain"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            </div>

                            {/* Role Banner */}
                            <div className={`py-1 text-center font-black text-[10px] uppercase tracking-wider ${ribbonClass}`}>
                              {c.positionName}
                            </div>

                            {/* Card Body */}
                            <div className="p-3 flex items-center gap-3 flex-1">
                              {/* Photo */}
                              <div className="w-20 h-26 rounded-lg overflow-hidden border-2 border-emerald-600 bg-emerald-50 shrink-0 flex items-center justify-center shadow-sm">
                                {c.photoUrl ? (
                                  <img
                                    src={c.photoUrl}
                                    alt={c.fullName}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                ) : (
                                  <div className="text-center p-1">
                                    <span className="text-xl font-bold text-emerald-800">
                                      {c.fullName.charAt(0)}
                                    </span>
                                    <span className="text-[8px] block uppercase font-semibold text-emerald-600 mt-0.5">
                                      PANITIA
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Details */}
                              <div className="flex-1 min-w-0 space-y-0.5">
                                <h4 className="font-extrabold text-slate-900 text-xs truncate leading-snug">
                                  {c.titleWithDegree || c.fullName}
                                </h4>
                                <div className="text-[10px] font-semibold text-emerald-800">
                                  {c.division}
                                </div>
                                <div className="text-[9px] text-slate-500 truncate">
                                  {c.institution}
                                </div>
                                <div className="pt-1">
                                  <span className="inline-block bg-slate-900 text-amber-300 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded">
                                    {c.accessArea}
                                  </span>
                                </div>
                                <div className="text-[8px] text-slate-400 font-mono">
                                  ID: {c.code}
                                </div>
                              </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-emerald-950 text-white text-[7.5px] text-center py-1 px-2 border-t border-emerald-800 flex justify-between items-center">
                              <span>Validasi Resmi LPTQ</span>
                              <span className="font-semibold text-amber-300">Kecamatan Gerung 2026</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))
              )
            )}
          </div>
        </div>

        {/* Bottom Actions Bar (no-print) */}
        <div className="no-print px-6 py-3.5 bg-white border-t border-slate-200 flex justify-between items-center text-xs">
          <span className="text-slate-500">
            Tip: Gunakan opsi printer "Save as PDF" jika ingin mengekspor seluruh lembar kartu ke dokumen PDF siap cetak.
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-5 py-2 font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Cetak Semua Kartu Terpilih (A4)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
