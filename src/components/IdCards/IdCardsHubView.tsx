import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Printer, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  Info, 
  FileSpreadsheet, 
  Award, 
  CheckCircle2, 
  Sparkles,
  Camera,
  Layers,
  FileCheck
} from 'lucide-react';
import { Participant, CommitteeMember, SystemConfig, CommitteeRoleCategory } from '../../types';
import { OFFICIAL_BRANCHES } from '../../data/mtqBranches';
import { ALL_GERUNG_KAFILAH, GERUNG_DESA, GERUNG_KELURAHAN } from '../../data/gerungVillages';
import { getKecamatanById, getAllKecamatan } from '../../data/lombokBaratKecamatan';
import { INITIAL_COMMITTEE } from '../../data/initialCommittee';
import { LOGO_MTQ_NATIONAL, LOGO_LOMBOK_BARAT } from '../../assets/logo';
import { ParticipantIdCardModal } from '../Registration/ParticipantIdCardModal';
import { CommitteeIdCardModal } from './CommitteeIdCardModal';
import { CommitteeManagementModal } from './CommitteeManagementModal';
import { BatchIdCardsModal } from './BatchIdCardsModal';

interface IdCardsHubViewProps {
  participants: Participant[];
  committee: CommitteeMember[];
  onSaveCommittee: (updated: CommitteeMember[]) => void;
  config: SystemConfig;
}

export const IdCardsHubView: React.FC<IdCardsHubViewProps> = ({
  participants,
  committee,
  onSaveCommittee,
  config
}) => {
  const activeKecamatan = getKecamatanById(config.activeKecamatanId || 'gerung');
  const activeVillages = activeKecamatan.villages;
  const activeDesa = activeVillages.filter(v => v.type === 'DESA');
  const activeKelurahan = activeVillages.filter(v => v.type === 'KELURAHAN');
  const allKecamatanList = getAllKecamatan();

  const [activeSubTab, setActiveSubTab] = useState<'PARTICIPANTS' | 'COMMITTEE' | 'GUIDE'>('PARTICIPANTS');

  // Participants filter state
  const [participantSearch, setParticipantSearch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('ALL');
  const [selectedKafilah, setSelectedKafilah] = useState<string>('ALL');
  const [selectedGender, setSelectedGender] = useState<string>('ALL');

  // Committee filter state
  const [committeeSearch, setCommitteeSearch] = useState('');
  const [selectedRoleCategory, setSelectedRoleCategory] = useState<string>('ALL');

  // Modals state
  const [selectedParticipantForCard, setSelectedParticipantForCard] = useState<Participant | null>(null);
  const [selectedCommitteeForCard, setSelectedCommitteeForCard] = useState<CommitteeMember | null>(null);
  const [isCommitteeFormOpen, setIsCommitteeFormOpen] = useState(false);
  const [editingCommitteeMember, setEditingCommitteeMember] = useState<CommitteeMember | null>(null);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [batchMode, setBatchMode] = useState<'PARTICIPANTS' | 'COMMITTEE'>('PARTICIPANTS');

  // Filter participants
  const filteredParticipants = participants.filter(p => {
    if (participantSearch.trim()) {
      const q = participantSearch.toLowerCase();
      const matchName = p.fullName.toLowerCase().includes(q);
      const matchCode = p.participantCode.toLowerCase().includes(q);
      const matchReg = p.registrationNumber.toLowerCase().includes(q);
      const matchKafilah = p.originKafilah.toLowerCase().includes(q);
      if (!matchName && !matchCode && !matchReg && !matchKafilah) return false;
    }
    if (selectedBranch !== 'ALL' && p.branchId !== selectedBranch) return false;
    if (selectedKafilah !== 'ALL' && !p.originKafilah.toLowerCase().includes(selectedKafilah.toLowerCase())) return false;
    if (selectedGender !== 'ALL' && p.gender !== selectedGender) return false;
    return true;
  });

  // Filter committee
  const filteredCommittee = committee.filter(c => {
    if (committeeSearch.trim()) {
      const q = committeeSearch.toLowerCase();
      const matchName = c.fullName.toLowerCase().includes(q);
      const matchCode = c.code.toLowerCase().includes(q);
      const matchPos = c.positionName.toLowerCase().includes(q);
      const matchDiv = c.division.toLowerCase().includes(q);
      const matchInst = c.institution.toLowerCase().includes(q);
      if (!matchName && !matchCode && !matchPos && !matchDiv && !matchInst) return false;
    }
    if (selectedRoleCategory !== 'ALL' && c.roleCategory !== selectedRoleCategory) return false;
    return true;
  });

  // Committee handlers
  const handleSaveMember = (saved: CommitteeMember) => {
    const exists = committee.some(c => c.id === saved.id);
    let updated: CommitteeMember[];
    if (exists) {
      updated = committee.map(c => c.id === saved.id ? saved : c);
    } else {
      updated = [saved, ...committee];
    }
    onSaveCommittee(updated);
  };

  const handleDeleteMember = (id: string, name: string) => {
    if (window.confirm(`Hapus data panitia "${name}" dari sistem?`)) {
      const updated = committee.filter(c => c.id !== id);
      onSaveCommittee(updated);
    }
  };

  const handleResetCommittee = () => {
    if (window.confirm(`Kembalikan daftar panitia ke data bawaan resmi MTQ Kecamatan ${activeKecamatan.name}?`)) {
      onSaveCommittee(INITIAL_COMMITTEE);
    }
  };

  // Stats
  const participantsWithPhoto = participants.filter(p => !!p.photoUrl).length;
  const judgesCount = committee.filter(c => c.roleCategory === 'DEWAN_HAKIM' || c.roleCategory === 'PANITERA').length;
  const itCount = committee.filter(c => c.roleCategory === 'SEKSI_IT_MEDIA').length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 rounded-2xl p-6 text-white shadow-xl border border-emerald-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-white p-1 flex items-center justify-center border-2 border-amber-400 shadow-md" title="Pemerintah Kabupaten Lombok Barat">
                <img
                  src={LOGO_LOMBOK_BARAT}
                  alt="Logo Kabupaten Lombok Barat"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white p-1 flex items-center justify-center border-2 border-emerald-500 shadow-md" title="LPTQ / MTQ Nasional">
                <img
                  src={LOGO_MTQ_NATIONAL}
                  alt="Logo MTQ Nasional"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Pusat Kartu Tanda Pengenal & Badge Resmi MTQ</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
                ID Card Panitia & Peserta MTQ
              </h1>
              <p className="text-emerald-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Penerbitan kartu identitas resmi untuk Dewan Hakim, Panitia Pelaksana, Tim IT, Tenaga Medis, 
                serta seluruh Peserta Kafilah MTQ {config.edition} di {config.hostLocation}.
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setBatchMode('PARTICIPANTS');
                setIsBatchModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 text-emerald-950 shadow-md transition"
            >
              <Printer className="w-4 h-4 text-emerald-950" />
              <span>Cetak Masal Peserta</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setBatchMode('COMMITTEE');
                setIsBatchModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-emerald-600/60 transition"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Cetak Masal Panitia</span>
            </button>
          </div>
        </div>

        {/* Sub-Tab Navigation Switcher */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-emerald-800/80">
          <button
            type="button"
            onClick={() => setActiveSubTab('PARTICIPANTS')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeSubTab === 'PARTICIPANTS'
                ? 'bg-white text-emerald-950 shadow-lg'
                : 'text-emerald-200 hover:bg-emerald-800/60 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Kartu Peserta MTQ</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${
              activeSubTab === 'PARTICIPANTS' ? 'bg-emerald-900 text-white' : 'bg-emerald-800 text-emerald-200'
            }`}>
              {participants.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('COMMITTEE')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeSubTab === 'COMMITTEE'
                ? 'bg-white text-emerald-950 shadow-lg'
                : 'text-emerald-200 hover:bg-emerald-800/60 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Kartu Panitia & Dewan Hakim</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${
              activeSubTab === 'COMMITTEE' ? 'bg-emerald-900 text-white' : 'bg-emerald-800 text-emerald-200'
            }`}>
              {committee.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('GUIDE')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeSubTab === 'GUIDE'
                ? 'bg-white text-emerald-950 shadow-lg'
                : 'text-emerald-200 hover:bg-emerald-800/60 hover:text-white'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Panduan & Ukuran Kartu</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: KARTU PESERTA */}
      {/* ========================================================================= */}
      {activeSubTab === 'PARTICIPANTS' && (
        <div className="space-y-6">
          {/* Quick Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5">
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Total Peserta</div>
                <div className="text-xl font-bold text-slate-900">{participants.length}</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5">
              <div className="p-3 bg-blue-100 text-blue-800 rounded-xl">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Memiliki Pas Foto</div>
                <div className="text-xl font-bold text-blue-900">{participantsWithPhoto}</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Cabang Lomba</div>
                <div className="text-xl font-bold text-amber-900">9 Cabang Resmi</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5">
              <div className="p-3 bg-teal-100 text-teal-800 rounded-xl">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Kafilah Kec. {activeKecamatan.name}</div>
                <div className="text-xl font-bold text-teal-900">{activeVillages.length} Wilayah</div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={participantSearch}
                  onChange={e => setParticipantSearch(e.target.value)}
                  placeholder="Cari nama, NIK, kode peserta..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                />
              </div>

              {/* Branch Filter */}
              <select
                value={selectedBranch}
                onChange={e => setSelectedBranch(e.target.value)}
                className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="ALL">Semua Cabang (9)</option>
                {OFFICIAL_BRANCHES.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.code} - {b.name}
                  </option>
                ))}
              </select>

              {/* Kafilah Filter */}
              <select
                value={selectedKafilah}
                onChange={e => setSelectedKafilah(e.target.value)}
                className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 max-w-[170px]"
              >
                <option value="ALL">Semua Kafilah ({activeVillages.length})</option>
                {activeKelurahan.length > 0 && (
                  <optgroup label={`${activeKelurahan.length} Kel. Kec. ${activeKecamatan.name}`}>
                    {activeKelurahan.map(k => (
                      <option key={k.id} value={k.name}>
                        Kel. {k.name}
                      </option>
                    ))}
                  </optgroup>
                )}
                <optgroup label={`${activeDesa.length} Desa Kec. ${activeKecamatan.name}`}>
                  {activeDesa.map(d => (
                    <option key={d.id} value={d.name}>
                      Desa {d.name}
                    </option>
                  ))}
                </optgroup>
                {allKecamatanList.filter(k => k.id !== activeKecamatan.id).map(otherKec => (
                  <optgroup key={otherKec.id} label={`Kec. ${otherKec.name}`}>
                    {otherKec.villages.map(v => (
                      <option key={v.id} value={v.name}>
                        {v.type === 'KELURAHAN' ? 'Kel.' : 'Desa'} {v.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>

              {/* Gender Filter */}
              <select
                value={selectedGender}
                onChange={e => setSelectedGender(e.target.value)}
                className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="ALL">Semua Gender</option>
                <option value="PUTRA">Putra</option>
                <option value="PUTRI">Putri</option>
              </select>
            </div>

            {/* Print Batch Button */}
            <button
              type="button"
              onClick={() => {
                setBatchMode('PARTICIPANTS');
                setIsBatchModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow transition shrink-0 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Lembar A4 ({filteredParticipants.length} Kartu)</span>
            </button>
          </div>

          {/* Cards Grid */}
          {filteredParticipants.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-2">
              <Users className="w-10 h-10 mx-auto text-slate-300" />
              <div className="font-bold text-slate-700">Tidak ada peserta ditemukan</div>
              <p className="text-xs text-slate-400">Coba ubah kata kunci pencarian atau filter cabang lomba.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredParticipants.map(p => {
                const branch = OFFICIAL_BRANCHES.find(b => b.id === p.branchId);
                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl border-2 border-emerald-600/50 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between group"
                  >
                    {/* Header Mini Badge */}
                    <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white p-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <div className="w-5 h-5 rounded-full bg-white p-0.5 shrink-0" title="Kabupaten Lombok Barat">
                            <img
                              src={LOGO_LOMBOK_BARAT}
                              alt="Lombok Barat"
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="w-5 h-5 rounded-full bg-white p-0.5 shrink-0" title="MTQ Nasional">
                            <img
                              src={LOGO_MTQ_NATIONAL}
                              alt="MTQ"
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                          KARTU PESERTA
                        </span>
                      </div>
                      <span className="bg-amber-400 text-emerald-950 text-[10px] font-mono font-black px-2 py-0.5 rounded shadow-sm">
                        {p.participantCode}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex gap-3 items-center">
                      {/* Photo Thumbnail */}
                      <div className="relative w-16 h-22 rounded-xl overflow-hidden border-2 border-emerald-600 bg-slate-100 shrink-0 shadow-sm flex items-center justify-center">
                        {p.photoUrl ? (
                          <img
                            src={p.photoUrl}
                            alt={p.fullName}
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="text-center p-1">
                            <span className="text-xl font-bold text-emerald-800">
                              {p.fullName.charAt(0)}
                            </span>
                            <span className="text-[7.5px] block font-semibold text-emerald-600 uppercase">
                              {p.gender}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Participant Info */}
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <h4 className="font-extrabold text-slate-900 text-xs leading-snug truncate" title={p.fullName}>
                          {p.fullName}
                        </h4>
                        <div className="text-[11px] font-bold text-emerald-800 truncate">
                          {p.originKafilah}
                        </div>
                        <div className="text-[10px] text-slate-600 truncate">
                          {branch?.name || p.branchId}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Gol: <span className="font-semibold text-slate-700">{p.category}</span>
                        </div>
                        <div className="text-[10px] text-amber-700 font-bold">
                          No. Undian: #{p.orderNumber}
                        </div>
                      </div>
                    </div>

                    {/* Actions Footer */}
                    <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-slate-400 font-mono">
                        {p.registrationNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedParticipantForCard(p)}
                        className="flex items-center gap-1 px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-[11px] shadow-sm transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Cetak / Lihat</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: KARTU PANITIA & DEWAN HAKIM */}
      {/* ========================================================================= */}
      {activeSubTab === 'COMMITTEE' && (
        <div className="space-y-6">
          {/* Quick Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5">
              <div className="p-3 bg-amber-100 text-amber-900 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Total Panitia</div>
                <div className="text-xl font-bold text-slate-900">{committee.length}</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5">
              <div className="p-3 bg-rose-100 text-rose-900 rounded-xl">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Dewan Hakim & Panitera</div>
                <div className="text-xl font-bold text-rose-900">{judgesCount} Personel</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5">
              <div className="p-3 bg-blue-100 text-blue-900 rounded-xl">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Tim IT & Siaran</div>
                <div className="text-xl font-bold text-blue-900">{itCount} Operator</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5">
              <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Legalitas SK</div>
                <div className="text-sm font-bold text-emerald-800">LPTQ Kec. {activeKecamatan.name}</div>
              </div>
            </div>
          </div>

          {/* Filter & Action Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={committeeSearch}
                  onChange={e => setCommitteeSearch(e.target.value)}
                  placeholder="Cari nama panitia, jabatan, instansi..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                />
              </div>

              {/* Role Category Filter */}
              <select
                value={selectedRoleCategory}
                onChange={e => setSelectedRoleCategory(e.target.value)}
                className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="ALL">Semua Kategori ({committee.length})</option>
                <option value="DEWAN_HAKIM">Dewan Hakam / Hakim</option>
                <option value="PANITERA">Panitera Hakim</option>
                <option value="PANITIA_INTI">Panitia Pelaksana Inti</option>
                <option value="SEKSI_IT_MEDIA">Seksi IT & Streaming</option>
                <option value="SEKSI_MUSABAQAH">Seksi Musabaqah & Registrasi</option>
                <option value="TIM_MEDIS">Tim Medis & Kesehatan</option>
                <option value="SEKSI_KEAMANAN">Seksi Keamanan</option>
                <option value="PENANGGUNG_JAWAB">Penanggung Jawab / Camat</option>
              </select>
            </div>

            {/* Actions: Add Member, Print Batch, Reset */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setEditingCommitteeMember(null);
                  setIsCommitteeFormOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Panitia</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setBatchMode('COMMITTEE');
                  setIsBatchModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-emerald-950 shadow-sm transition"
              >
                <Printer className="w-4 h-4 text-emerald-950" />
                <span>Cetak Masal A4</span>
              </button>

              <button
                type="button"
                onClick={handleResetCommittee}
                className="p-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 transition"
                title={`Reset ke Panitia Bawaan Kec. ${activeKecamatan.name}`}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Committee Badges Grid */}
          {filteredCommittee.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-2">
              <ShieldCheck className="w-10 h-10 mx-auto text-slate-300" />
              <div className="font-bold text-slate-700">Tidak ada panitia yang sesuai</div>
              <p className="text-xs text-slate-400">Coba sesuaikan kata kunci pencarian atau filter divisi.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCommittee.map(c => {
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
                    className="bg-white rounded-2xl border-2 border-emerald-600/50 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between group"
                  >
                    {/* Header Mini Badge */}
                    <div className={`bg-gradient-to-r ${headerClass} text-white p-2.5 flex items-center justify-between`}>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <div className="w-5 h-5 rounded-full bg-white p-0.5 shrink-0" title="Kabupaten Lombok Barat">
                            <img
                              src={LOGO_LOMBOK_BARAT}
                              alt="Lombok Barat"
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="w-5 h-5 rounded-full bg-white p-0.5 shrink-0" title="MTQ Nasional">
                            <img
                              src={LOGO_MTQ_NATIONAL}
                              alt="MTQ"
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                          {isJudge ? 'DEWAN HAKIM' : 'PANITIA MTQ'}
                        </span>
                      </div>
                      <span className="bg-slate-900 text-amber-300 text-[10px] font-mono font-black px-2 py-0.5 rounded shadow-sm border border-amber-400/40">
                        {c.code}
                      </span>
                    </div>

                    {/* Role ribbon */}
                    <div className={`py-0.5 px-3 text-center text-[10px] font-black uppercase tracking-wider truncate ${ribbonClass}`}>
                      {c.positionName}
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex gap-3 items-center">
                      {/* Photo Thumbnail */}
                      <div className="relative w-16 h-22 rounded-xl overflow-hidden border-2 border-emerald-600 bg-slate-100 shrink-0 shadow-sm flex items-center justify-center">
                        {c.photoUrl ? (
                          <img
                            src={c.photoUrl}
                            alt={c.fullName}
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="text-center p-1">
                            <span className="text-xl font-bold text-emerald-800">
                              {c.fullName.charAt(0)}
                            </span>
                            <span className="text-[7.5px] block font-semibold text-emerald-600 uppercase">
                              PANITIA
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <h4 className="font-extrabold text-slate-900 text-xs leading-snug truncate" title={c.titleWithDegree || c.fullName}>
                          {c.titleWithDegree || c.fullName}
                        </h4>
                        <div className="text-[10px] font-semibold text-emerald-800 truncate">
                          {c.division}
                        </div>
                        <div className="text-[9.5px] text-slate-500 truncate">
                          {c.institution}
                        </div>
                        <div className="pt-1">
                          <span className="inline-block bg-slate-900 text-amber-300 text-[8.5px] font-mono font-bold px-1.5 py-0.5 rounded">
                            {c.accessArea}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions Footer */}
                    <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCommitteeMember(c);
                            setIsCommitteeFormOpen(true);
                          }}
                          className="p-1 rounded text-slate-500 hover:text-emerald-700 hover:bg-slate-200 transition"
                          title="Edit Data Panitia"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteMember(c.id, c.fullName)}
                          className="p-1 rounded text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Hapus Panitia"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedCommitteeForCard(c)}
                        className="flex items-center gap-1 px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-[11px] shadow-sm transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Cetak / Lihat</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: SPESIFIKASI & PANDUAN CETAK */}
      {/* ========================================================================= */}
      {activeSubTab === 'GUIDE' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-emerald-700" />
              Spesifikasi Teknis & Panduan Produksi ID Card MTQ Resmi
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Petunjuk pencetakan tanda pengenal sesuai standarisasi LPTQ Nasional dan Keputusan Bersama Panitia Kecamatan {activeKecamatan.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1: Ukuran */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center font-mono">1</span>
                Ukuran & Dimensi Standar
              </div>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong className="text-slate-800">Format Lembar A4 Masal:</strong> 210 x 297 mm (berisi 4 ID Card per lembar dilengkapi crop marks potong).</li>
                <li><strong className="text-slate-800">Ukuran Standar ID Card (B2):</strong> 82 x 126 mm (cocok untuk wadah plastik mika B2).</li>
                <li><strong className="text-slate-800">Ukuran Alternatif (B3):</strong> 95 x 124 mm untuk kontingen beregu / official.</li>
                <li><strong className="text-slate-800">Slot Lanyard:</strong> Lubang oval di bagian atas tengah berjarak 5 mm dari tepi atas.</li>
              </ul>
            </div>

            {/* Box 2: Bahan */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center font-mono">2</span>
                Rekomendasi Bahan Kertas
              </div>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong className="text-slate-800">Kertas Utama:</strong> Art Paper 260 gsm atau 310 gsm (tebal & tidak mudah melengkung).</li>
                <li><strong className="text-slate-800">Finishing:</strong> Laminasi Panas Glossy atau Doff (tahan air & keringat arena).</li>
                <li><strong className="text-slate-800">Opsi Premium:</strong> Bahan PVC Instant Card (seperti kartu ATM) untuk Dewan Hakim & VIP.</li>
                <li><strong className="text-slate-800">Wadah & Gantungan:</strong> Plastik ID Case Mika B2 tebal 0.20 mm + Tali Lanyard MTQ 2 cm.</li>
              </ul>
            </div>

            {/* Box 3: Kode Warna */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center font-mono">3</span>
                Pita Kode Warna Peran
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                  <span className="font-semibold text-slate-800">Emas / Burgundy:</span> Dewan Hakim & Panitera
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-800">Hijau Zamrud:</span> Panitia Pelaksana Inti
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
                  <span className="font-semibold text-slate-800">Biru Elektrik:</span> Tim IT, Streaming & Multimedia
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-600 shrink-0" />
                  <span className="font-semibold text-slate-800">Merah Maroon:</span> Tim Medis & Kesehatan
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-800 shrink-0" />
                  <span className="font-semibold text-slate-800">Navy / Hitam:</span> Seksi Keamanan & Ketertiban
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0" />
                  <span className="font-semibold text-slate-800">Kuning Kunyit:</span> Kartu Tanda Peserta Musabaqah
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}
      {/* Individual Participant ID Card Modal */}
      {selectedParticipantForCard && (
        <ParticipantIdCardModal
          participant={selectedParticipantForCard}
          config={config}
          onClose={() => setSelectedParticipantForCard(null)}
        />
      )}

      {/* Individual Committee ID Card Modal */}
      {selectedCommitteeForCard && (
        <CommitteeIdCardModal
          member={selectedCommitteeForCard}
          config={config}
          onClose={() => setSelectedCommitteeForCard(null)}
        />
      )}

      {/* Committee Management Modal (Add/Edit) */}
      {isCommitteeFormOpen && (
        <CommitteeManagementModal
          member={editingCommitteeMember}
          isOpen={isCommitteeFormOpen}
          onClose={() => {
            setIsCommitteeFormOpen(false);
            setEditingCommitteeMember(null);
          }}
          onSave={handleSaveMember}
          existingCount={committee.length}
        />
      )}

      {/* Batch A4 Print Modal */}
      {isBatchModalOpen && (
        <BatchIdCardsModal
          isOpen={isBatchModalOpen}
          onClose={() => setIsBatchModalOpen(false)}
          config={config}
          initialMode={batchMode}
          participants={participants}
          committee={committee}
        />
      )}
    </div>
  );
};
