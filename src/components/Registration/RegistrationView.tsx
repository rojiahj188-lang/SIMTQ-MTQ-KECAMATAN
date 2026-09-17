import React, { useState, useRef } from 'react';
import { 
  UserPlus, 
  Search, 
  Filter, 
  Download, 
  QrCode, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Mic, 
  Award,
  Users,
  X,
  Radio,
  Tv,
  FileSpreadsheet,
  FileText,
  UploadCloud,
  ChevronDown,
  Camera,
  Image as ImageIcon,
  Eye,
  Maximize2
} from 'lucide-react';
import { Participant, SystemConfig, Gender, ParticipantStatus } from '../../types';
import { OFFICIAL_BRANCHES } from '../../data/mtqBranches';
import { ParticipantIdCardModal } from './ParticipantIdCardModal';
import { ALL_GERUNG_KAFILAH, GERUNG_DESA, GERUNG_KELURAHAN } from '../../data/gerungVillages';
import { getKecamatanById, getAllKecamatan } from '../../data/lombokBaratKecamatan';
import { LOGO_MTQ_NATIONAL, LOGO_LOMBOK_BARAT } from '../../assets/logo';
import { 
  exportParticipantsToExcel, 
  exportParticipantsToWord, 
  exportParticipantsToPdf 
} from '../../utils/participantExportImport';
import { ImportParticipantsModal } from './ImportParticipantsModal';
import { PAS_FOTO_PRESETS } from '../../utils/photoPresets';

interface RegistrationViewProps {
  participants: Participant[];
  onSaveParticipants: (updated: Participant[]) => void;
  config: SystemConfig;
  onNavigateToJudging?: (participantId: string) => void;
  onNavigateToStreaming?: () => void;
}

export const RegistrationView: React.FC<RegistrationViewProps> = ({
  participants,
  onSaveParticipants,
  config,
  onNavigateToJudging,
  onNavigateToStreaming
}) => {
  const activeKecamatan = getKecamatanById(config.activeKecamatanId || 'gerung');
  const activeVillages = activeKecamatan.villages;
  const activeDesa = activeVillages.filter(v => v.type === 'DESA');
  const activeKelurahan = activeVillages.filter(v => v.type === 'KELURAHAN');
  const allKecamatanList = getAllKecamatan();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('ALL');
  const [selectedGender, setSelectedGender] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedKafilah, setSelectedKafilah] = useState<string>('ALL');
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);
  const [cardParticipant, setCardParticipant] = useState<Participant | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<{ 
    url: string; 
    name: string; 
    code: string; 
    kafilah: string; 
    branch: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form inputs
  const [formData, setFormData] = useState({
    fullName: '',
    nik: '',
    originKafilah: '',
    gender: 'PUTRA' as Gender,
    birthPlace: '',
    birthDate: '2000-01-01',
    phone: '',
    branchId: OFFICIAL_BRANCHES[0].id,
    category: OFFICIAL_BRANCHES[0].categories[0],
    orderNumber: 1,
    streamUrl: '',
    photoUrl: '',
    teamMember1: '',
    teamMember2: '',
    teamMember3: ''
  });

  const selectedBranchObj = OFFICIAL_BRANCHES.find(b => b.id === formData.branchId) || OFFICIAL_BRANCHES[0];

  const handleOpenAdd = () => {
    setEditingParticipant(null);
    const nextOrder = participants.length + 1;
    setFormData({
      fullName: '',
      nik: '',
      originKafilah: '',
      gender: 'PUTRA',
      birthPlace: '',
      birthDate: '2000-01-01',
      phone: '',
      branchId: OFFICIAL_BRANCHES[0].id,
      category: OFFICIAL_BRANCHES[0].categories[0],
      orderNumber: nextOrder,
      streamUrl: '',
      photoUrl: '',
      teamMember1: '',
      teamMember2: '',
      teamMember3: ''
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (p: Participant) => {
    setEditingParticipant(p);
    setFormData({
      fullName: p.fullName,
      nik: p.nik,
      originKafilah: p.originKafilah,
      gender: p.gender,
      birthPlace: p.birthPlace || '',
      birthDate: p.birthDate || '2000-01-01',
      phone: p.phone || '',
      branchId: p.branchId,
      category: p.category,
      orderNumber: p.orderNumber,
      streamUrl: p.streamUrl || '',
      photoUrl: p.photoUrl || '',
      teamMember1: p.teamMembers?.[0] || '',
      teamMember2: p.teamMembers?.[1] || '',
      teamMember3: p.teamMembers?.[2] || ''
    });
    setIsFormOpen(true);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (JPG, PNG, atau WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        setFormData(prev => ({ ...prev, photoUrl: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBranchChange = (branchId: string) => {
    const branch = OFFICIAL_BRANCHES.find(b => b.id === branchId) || OFFICIAL_BRANCHES[0];
    setFormData(prev => ({
      ...prev,
      branchId,
      category: branch.categories[0]
    }));
  };

  const handleSaveParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    const branch = OFFICIAL_BRANCHES.find(b => b.id === formData.branchId) || OFFICIAL_BRANCHES[0];
    const genderSuffix = formData.gender === 'PUTRA' ? 'PA' : 'PI';
    const orderStr = formData.orderNumber.toString().padStart(2, '0');
    const participantCode = `${branch.code}-${genderSuffix}-${orderStr}`;

    const teamMembers: string[] = [];
    if (branch.categoryType === 'BEREGU') {
      if (formData.teamMember1.trim()) teamMembers.push(formData.teamMember1.trim());
      if (formData.teamMember2.trim()) teamMembers.push(formData.teamMember2.trim());
      if (formData.teamMember3.trim()) teamMembers.push(formData.teamMember3.trim());
    }

    if (editingParticipant) {
      const updated = participants.map(p => {
        if (p.id === editingParticipant.id) {
          return {
            ...p,
            fullName: formData.fullName,
            nik: formData.nik,
            originKafilah: formData.originKafilah,
            gender: formData.gender,
            birthPlace: formData.birthPlace,
            birthDate: formData.birthDate,
            phone: formData.phone,
            branchId: formData.branchId,
            category: formData.category,
            orderNumber: formData.orderNumber,
            participantCode,
            photoUrl: formData.photoUrl.trim() || undefined,
            streamUrl: formData.streamUrl.trim() || undefined,
            teamMembers: teamMembers.length > 0 ? teamMembers : undefined
          };
        }
        return p;
      });
      onSaveParticipants(updated);
    } else {
      const newId = `p-${Date.now()}`;
      const regNumber = `REG-MTQ-2026-${(participants.length + 1).toString().padStart(3, '0')}`;
      const newParticipant: Participant = {
        id: newId,
        registrationNumber: regNumber,
        participantCode,
        fullName: formData.fullName,
        nik: formData.nik,
        originKafilah: formData.originKafilah,
        gender: formData.gender,
        birthPlace: formData.birthPlace,
        birthDate: formData.birthDate,
        phone: formData.phone,
        branchId: formData.branchId,
        category: formData.category,
        teamMembers: teamMembers.length > 0 ? teamMembers : undefined,
        status: 'TERDAFTAR',
        orderNumber: formData.orderNumber,
        photoUrl: formData.photoUrl.trim() || undefined,
        streamUrl: formData.streamUrl.trim() || undefined,
        createdAt: new Date().toISOString(),
        judgeScores: []
      };
      onSaveParticipants([...participants, newParticipant]);
    }
    setIsFormOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus data peserta: ${name}?`)) {
      onSaveParticipants(participants.filter(p => p.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: ParticipantStatus) => {
    const updated = participants.map(p => p.id === id ? { ...p, status: newStatus } : p);
    onSaveParticipants(updated);
  };

  const handleImportSuccess = (newParticipants: Participant[], replaceAll: boolean) => {
    if (replaceAll) {
      onSaveParticipants(newParticipants);
    } else {
      onSaveParticipants([...participants, ...newParticipants]);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Nomor Registrasi', 'Kode Peserta', 'Nama Lengkap', 'NIK', 'Kafilah', 'Gender', 'Cabang Lomba', 'Golongan', 'No Urut', 'Status', 'Lampiran Foto', 'Nilai Akhir'];
    const rows = filteredParticipants.map(p => {
      const b = OFFICIAL_BRANCHES.find(x => x.id === p.branchId);
      return [
        p.registrationNumber,
        p.participantCode,
        `"${p.fullName}"`,
        `"${p.nik}"`,
        `"${p.originKafilah}"`,
        p.gender,
        `"${b?.name || p.branchId}"`,
        `"${p.category}"`,
        p.orderNumber,
        p.status,
        p.photoUrl ? 'Ada' : 'Tidak',
        p.finalScore || '-'
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Daftar_Peserta_MTQ_${config.year}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering
  const filteredParticipants = participants.filter(p => {
    const matchesSearch = 
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.participantCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.originKafilah.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nik.includes(searchTerm);

    const matchesBranch = selectedBranch === 'ALL' || p.branchId === selectedBranch;
    const matchesGender = selectedGender === 'ALL' || p.gender === selectedGender;
    const matchesStatus = selectedStatus === 'ALL' || p.status === selectedStatus;
    const matchesKafilah = selectedKafilah === 'ALL' || p.originKafilah.toLowerCase().includes(selectedKafilah.toLowerCase());

    return matchesSearch && matchesBranch && matchesGender && matchesStatus && matchesKafilah;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner / Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-amber-400 bg-white p-1 flex items-center justify-center shadow-sm" title="Kabupaten Lombok Barat">
              <img
                src={LOGO_LOMBOK_BARAT}
                alt="Logo Kabupaten Lombok Barat"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-emerald-500 bg-white p-1 flex items-center justify-center shadow-sm" title="MTQ Nasional">
              <img
                src={LOGO_MTQ_NATIONAL}
                alt="Logo MTQ Nasional"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-700" />
              {activeKelurahan.length > 0 
                ? `${activeVillages.length} Kafilah Resmi: ${activeDesa.length} Desa & ${activeKelurahan.length} Kelurahan se-Kecamatan ${activeKecamatan.name}`
                : `${activeVillages.length} Kafilah Resmi: ${activeDesa.length} Desa se-Kecamatan ${activeKecamatan.name}`}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Data Peserta MTQ Kec. {activeKecamatan.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Kelola pendaftaran qari/qari'ah dari {activeVillages.length} Kafilah se-Kecamatan {activeKecamatan.name}, Kabupaten Lombok Barat.
            </p>
          </div>
        </div>

        {/* Action Buttons: Import, Export, Add */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Impor Peserta */}
          <button
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition shadow-sm"
            title="Impor data peserta dari file Excel atau CSV"
          >
            <UploadCloud className="w-4 h-4 text-emerald-600" />
            <span>Impor Peserta</span>
          </button>

          {/* Ekspor Dropdown Group */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition shadow-sm"
              title="Ekspor data peserta ke Excel, Word, PDF, atau CSV"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Ekspor Data</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </button>

            {isExportDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-30"
                  onClick={() => setIsExportDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-40 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Format Ekspor ({filteredParticipants.length} Peserta)
                  </div>
                  
                  {/* Excel (.xlsx) */}
                  <button
                    type="button"
                    onClick={() => {
                      exportParticipantsToExcel(
                        filteredParticipants, 
                        config, 
                        selectedBranch !== 'ALL' ? selectedBranch : 'Semua'
                      );
                      setIsExportDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-950 transition"
                  >
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Microsoft Excel (.xlsx)</div>
                      <div className="text-[10px] text-slate-500">Tabel data peserta & sheet info MTQ</div>
                    </div>
                  </button>

                  {/* Word (.doc) */}
                  <button
                    type="button"
                    onClick={() => {
                      exportParticipantsToWord(
                        filteredParticipants, 
                        config, 
                        selectedBranch !== 'ALL' ? selectedBranch : 'Semua'
                      );
                      setIsExportDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-950 transition"
                  >
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-700 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Microsoft Word (.doc)</div>
                      <div className="text-[10px] text-slate-500">Lengkap kop LPTQ & tanda tangan resmi</div>
                    </div>
                  </button>

                  {/* PDF (.pdf) */}
                  <button
                    type="button"
                    onClick={() => {
                      exportParticipantsToPdf(
                        filteredParticipants, 
                        config, 
                        selectedBranch !== 'ALL' ? selectedBranch : 'Semua'
                      );
                      setIsExportDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-950 transition"
                  >
                    <div className="p-2 rounded-lg bg-rose-100 text-rose-700 shrink-0">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Dokumen PDF Resmi (.pdf)</div>
                      <div className="text-[10px] text-slate-500">Rekapitulasi A4 landscape siap cetak</div>
                    </div>
                  </button>

                  {/* CSV (.csv) */}
                  <button
                    type="button"
                    onClick={() => {
                      handleExportCSV();
                      setIsExportDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 transition border-t border-slate-100 mt-1"
                  >
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">File CSV (.csv)</div>
                      <div className="text-[10px] text-slate-500">Data mentah tabular sederhana</div>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Tambah Peserta Baru */}
          <button
            type="button"
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition shadow-md shadow-emerald-700/20"
          >
            <UserPlus className="w-4 h-4" />
            Tambah Peserta Baru
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama, kode, kafilah, NIK..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          {/* Kafilah Filter (Dynamic based on active Kecamatan + all 10 Kecamatan in Lombok Barat) */}
          <div className="relative">
            <select
              value={selectedKafilah}
              onChange={e => setSelectedKafilah(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition font-medium text-slate-700"
            >
              <option value="ALL">Semua Kafilah ({activeVillages.length} di Kec. {activeKecamatan.name})</option>
              {activeKelurahan.length > 0 && (
                <optgroup label={`${activeKelurahan.length} Kelurahan Kec. ${activeKecamatan.name}`}>
                  {activeKelurahan.map(k => (
                    <option key={k.id} value={k.name}>
                      Kelurahan {k.name}
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
                <optgroup key={otherKec.id} label={`Kec. ${otherKec.name} (${otherKec.villages.length} Kafilah)`}>
                  {otherKec.villages.map(v => (
                    <option key={v.id} value={v.name}>
                      {v.type === 'KELURAHAN' ? 'Kel.' : 'Desa'} {v.name} (Kec. {otherKec.name})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Branch Filter */}
          <div className="relative">
            <select
              value={selectedBranch}
              onChange={e => setSelectedBranch(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition font-medium text-slate-700"
            >
              <option value="ALL">Semua Cabang Lomba (9 Cabang)</option>
              {OFFICIAL_BRANCHES.map(b => (
                <option key={b.id} value={b.id}>
                  [{b.code}] {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div className="relative">
            <select
              value={selectedGender}
              onChange={e => setSelectedGender(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition font-medium text-slate-700"
            >
              <option value="ALL">Semua Kategori Gender</option>
              <option value="PUTRA">Putra (Qari' / Hafizh / Regu PA)</option>
              <option value="PUTRI">Putri (Qari'ah / Hafizhah / Regu PI)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition font-medium text-slate-700"
            >
              <option value="ALL">Semua Status Musabaqah</option>
              <option value="TERDAFTAR">Terdaftar</option>
              <option value="TERVERIFIKASI">Terverifikasi (Siap)</option>
              <option value="SEDANG_TAMPIL">Sedang Tampil (Live)</option>
              <option value="SELESAI">Selesai Dinilai</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Menampilkan <strong>{filteredParticipants.length}</strong> dari {participants.length} peserta
          </span>
          {(searchTerm || selectedBranch !== 'ALL' || selectedGender !== 'ALL' || selectedStatus !== 'ALL') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedBranch('ALL');
                setSelectedGender('ALL');
                setSelectedStatus('ALL');
              }}
              className="text-emerald-700 hover:text-emerald-800 font-semibold underline"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Participants Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <th className="py-3.5 px-4">No. Undian & Kode</th>
                <th className="py-3.5 px-4">Nama Peserta & Kafilah</th>
                <th className="py-3.5 px-4">Cabang & Golongan</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Nilai Akhir</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredParticipants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Users className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-600">Tidak ada peserta ditemukan</p>
                    <p className="text-xs text-slate-400 mt-0.5">Silakan sesuaikan filter atau tambahkan peserta baru.</p>
                  </td>
                </tr>
              ) : (
                filteredParticipants.map(p => {
                  const branch = OFFICIAL_BRANCHES.find(b => b.id === p.branchId);
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition">
                      {/* Code & Order */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center justify-center">
                            {p.orderNumber}
                          </span>
                          <div>
                            <span className="font-mono font-bold text-emerald-950 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-xs">
                              {p.participantCode}
                            </span>
                            <div className="text-[10px] text-slate-400 mt-0.5">{p.registrationNumber}</div>
                          </div>
                        </div>
                      </td>

                      {/* Name, Avatar & Kafilah */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {/* Photo Thumbnail */}
                          <div 
                            className="relative group shrink-0 cursor-pointer"
                            onClick={() => p.photoUrl && setPreviewPhoto({
                              url: p.photoUrl,
                              name: p.fullName,
                              code: p.participantCode,
                              kafilah: p.originKafilah,
                              branch: branch?.name || p.branchId
                            })}
                            title={p.photoUrl ? "Klik untuk memperbesar foto peserta" : "Belum ada lampiran foto"}
                          >
                            {p.photoUrl ? (
                              <div className="relative w-11 h-13 rounded-lg overflow-hidden border-2 border-emerald-600/50 shadow-sm bg-white group-hover:border-emerald-700 transition">
                                <img
                                  src={p.photoUrl}
                                  alt={p.fullName}
                                  className="w-full h-full object-cover group-hover:scale-110 transition duration-200"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                                  <Eye className="w-3.5 h-3.5 text-white" />
                                </div>
                                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-white/90 rounded-tl p-0.5 shadow-xs" title="Terverifikasi LPTQ Lombok Barat">
                                  <img
                                    src={LOGO_LOMBOK_BARAT}
                                    alt="Lobar"
                                    className="w-full h-full object-contain"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="w-11 h-13 rounded-lg bg-slate-100 border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 group-hover:bg-slate-200/80 transition">
                                <Camera className="w-4 h-4 text-slate-400" />
                                <span className="text-[8px] font-semibold text-slate-400 uppercase mt-0.5">N/A</span>
                              </div>
                            )}
                          </div>

                          {/* Info Text */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 truncate">{p.fullName}</span>
                              {p.photoUrl && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  <ImageIcon className="w-2.5 h-2.5" />
                                  Foto
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-500 font-medium">{p.originKafilah}</div>
                            <div className="text-[11px] text-slate-400 font-mono">NIK: {p.nik}</div>
                            {p.teamMembers && p.teamMembers.length > 0 && (
                              <div className="text-[11px] text-emerald-700 mt-0.5 font-medium">
                                Anggota: {p.teamMembers.join(' • ')}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Branch & Category */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">
                          {branch?.name || p.branchId}
                        </div>
                        <div className="text-xs text-slate-500">
                          {p.category} • <span className="font-medium text-emerald-800">{p.gender}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <select
                          value={p.status}
                          onChange={(e) => handleStatusChange(p.id, e.target.value as ParticipantStatus)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${
                            p.status === 'SELESAI'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              : p.status === 'SEDANG_TAMPIL'
                              ? 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse'
                              : p.status === 'TERVERIFIKASI'
                              ? 'bg-blue-50 text-blue-700 border-blue-300'
                              : 'bg-slate-100 text-slate-600 border-slate-300'
                          }`}
                        >
                          <option value="TERDAFTAR">Terdaftar</option>
                          <option value="TERVERIFIKASI">Terverifikasi</option>
                          <option value="SEDANG_TAMPIL">Sedang Tampil</option>
                          <option value="SELESAI">Selesai</option>
                        </select>
                      </td>

                      {/* Final Score */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        {p.finalScore !== undefined && p.finalScore > 0 ? (
                          <div>
                            <span className="font-black text-sm text-emerald-900 bg-emerald-100/70 px-2.5 py-0.5 rounded-lg">
                              {p.finalScore.toFixed(2)}
                            </span>
                            {p.awardTitle && (
                              <div className="text-[10px] font-bold text-amber-700 mt-0.5">
                                {p.awardTitle}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-300 font-mono">-</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          {/* Live Streaming shortcut */}
                          {onNavigateToStreaming && (
                            <button
                              onClick={onNavigateToStreaming}
                              className={`p-1.5 rounded-lg transition ${
                                p.status === 'SEDANG_TAMPIL'
                                  ? 'bg-rose-600 text-white animate-pulse shadow-sm'
                                  : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50'
                              }`}
                              title={p.status === 'SEDANG_TAMPIL' ? 'Sedang Tampil! Buka Live Streaming' : 'Buka Live Streaming Arena'}
                            >
                              <Radio className="w-4 h-4" />
                            </button>
                          )}

                          {/* ID Card */}
                          <button
                            onClick={() => setCardParticipant(p)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition"
                            title="Lihat Kartu Tanda Peserta (ID Card)"
                          >
                            <QrCode className="w-4 h-4" />
                          </button>

                          {/* Judging shortcut */}
                          {onNavigateToJudging && (
                            <button
                              onClick={() => onNavigateToJudging(p.id)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-amber-700 hover:bg-amber-50 transition"
                              title="Buka Form Penilaian Juri"
                            >
                              <Award className="w-4 h-4" />
                            </button>
                          )}

                          {/* Edit */}
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition"
                            title="Edit Data Peserta"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(p.id, p.fullName)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                            title="Hapus Peserta"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Participant */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 bg-emerald-900 text-white">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm sm:text-base">
                  {editingParticipant ? 'Edit Data Peserta MTQ' : 'Pendaftaran Peserta MTQ Baru'}
                </h3>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveParticipant} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Branch */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Cabang Lomba (9 Cabang Resmi) *
                  </label>
                  <select
                    value={formData.branchId}
                    onChange={e => handleBranchChange(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                    required
                  >
                    {OFFICIAL_BRANCHES.map(b => (
                      <option key={b.id} value={b.id}>
                        [{b.code}] {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Golongan / Kategori *
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                    required
                  >
                    {selectedBranchObj.categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Gender */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kategori Gender *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={e => setFormData({ ...formData, gender: e.target.value as Gender })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  >
                    <option value="PUTRA">Putra (PA)</option>
                    <option value="PUTRI">Putri (PI)</option>
                  </select>
                </div>

                {/* Order Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nomor Urut Undian *
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.orderNumber}
                    onChange={e => setFormData({ ...formData, orderNumber: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                {/* Preview Code */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">
                    Kode Peserta Otomatis
                  </label>
                  <div className="px-3 py-2 bg-slate-100 rounded-xl font-mono font-bold text-emerald-900 text-xs sm:text-sm border border-slate-200">
                    {selectedBranchObj.code}-{formData.gender === 'PUTRA' ? 'PA' : 'PI'}-{formData.orderNumber.toString().padStart(2, '0')}
                  </div>
                </div>
              </div>

              {/* Full Name & NIK */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Lengkap Peserta / Nama Regu *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Contoh: Muhammad Raihan Al-Hafidz"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    NIK / Nomor Identitas Resmi *
                  </label>
                  <input
                    type="text"
                    value={formData.nik}
                    onChange={e => setFormData({ ...formData, nik: e.target.value })}
                    placeholder="16 Digit NIK KTP / KIA"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Kafilah & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Asal Kafilah (Desa / Kelurahan di Kec. {activeKecamatan.name}) *
                  </label>
                  <input
                    type="text"
                    list="kafilah-dynamic-list"
                    value={formData.originKafilah}
                    onChange={e => setFormData({ ...formData, originKafilah: e.target.value })}
                    placeholder={`Contoh: ${activeVillages[0]?.fullName || `Desa di Kec. ${activeKecamatan.name}`}`}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <datalist id="kafilah-dynamic-list">
                    {/* Active Kecamatan Villages First */}
                    {activeVillages.map(k => (
                      <option key={k.id} value={k.fullName} />
                    ))}
                    {/* Other 9 Kecamatan in Lombok Barat */}
                    {allKecamatanList.filter(k => k.id !== activeKecamatan.id).flatMap(k => k.villages).map(k => (
                      <option key={k.id} value={k.fullName} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nomor WhatsApp / Kontak Pendamping *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Contoh: 08123456789"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Place & Date of birth */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    value={formData.birthPlace}
                    onChange={e => setFormData({ ...formData, birthPlace: e.target.value })}
                    placeholder="Kota kelahiran"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Team Members if BEREGU */}
              {selectedBranchObj.categoryType === 'BEREGU' && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                  <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-700" />
                    Data Anggota Regu (Khusus Cabang Beregu)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Anggota 1 (Jurubicara / Pensyarah)"
                      value={formData.teamMember1}
                      onChange={e => setFormData({ ...formData, teamMember1: e.target.value })}
                      className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Anggota 2 (Qari' / Pendamping 1)"
                      value={formData.teamMember2}
                      onChange={e => setFormData({ ...formData, teamMember2: e.target.value })}
                      className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Anggota 3 (Sari Tilawah / Pendamping 2)"
                      value={formData.teamMember3}
                      onChange={e => setFormData({ ...formData, teamMember3: e.target.value })}
                      className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Lampiran Foto Peserta / Dokumen Identitas Resmi */}
              <div className="p-4 bg-emerald-50/60 border-2 border-emerald-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-emerald-950 flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-white p-0.5 border border-emerald-300 shadow-xs shrink-0 flex items-center justify-center">
                      <img
                        src={LOGO_LOMBOK_BARAT}
                        alt="Logo Lombok Barat"
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span>Lampiran Foto Peserta Resmi (3x4 / KTP / KIA) • Kab. Lombok Barat</span>
                  </label>
                  {formData.photoUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, photoUrl: '' })}
                      className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 transition"
                    >
                      Hapus Foto
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Preview Box with Lombok Barat Badge */}
                  <div className="relative w-24 h-32 rounded-xl overflow-hidden border-2 border-emerald-600 bg-white shadow-md shrink-0 flex items-center justify-center">
                    {formData.photoUrl ? (
                      <>
                        <img
                          src={formData.photoUrl}
                          alt="Pratinjau Foto"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {/* Lombok Barat Logo Watermark Badge */}
                        <div className="absolute top-1 left-1 w-5 h-5 p-0.5 bg-white/90 rounded shadow border border-emerald-400">
                          <img
                            src={LOGO_LOMBOK_BARAT}
                            alt="Logo Lombok Barat"
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, photoUrl: '' })}
                          className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-rose-600 text-white rounded-md transition"
                          title="Hapus foto"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-2 text-slate-400">
                        <div className="w-8 h-8 mx-auto mb-1 flex items-center justify-center opacity-70">
                          <img
                            src={LOGO_LOMBOK_BARAT}
                            alt="Logo Lombok Barat"
                            className="w-full h-full object-contain grayscale opacity-60"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="text-[10px] font-semibold block leading-tight text-slate-600">Pas Foto 3x4</span>
                        <span className="text-[9px] text-slate-400">Lombok Barat</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls & Presets */}
                  <div className="flex-1 space-y-2.5 w-full">
                    <div className="flex flex-wrap gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handlePhotoUpload}
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        Pilih File Gambar dari Perangkat
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Mendukung format JPG, PNG, atau WebP. Foto akan otomatis ditampilkan pada Kartu Tanda Peserta (ID Card) & Rekapitulasi.
                    </p>

                    {/* Quick Presets */}
                    <div className="pt-2 border-t border-emerald-200/60">
                      <div className="text-[10px] font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                        <span>Pilihan Cepat Preset Pas Foto Formal MTQ:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {PAS_FOTO_PRESETS.map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, photoUrl: preset.dataUrl })}
                            className="px-2.5 py-1 text-[10px] font-semibold bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg transition"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Streaming Video URL Option */}
              <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1.5">
                <label className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                  <Radio className="w-4 h-4 text-rose-600" />
                  Tautan Live Streaming Khusus Peserta (Opsional)
                </label>
                <input
                  type="url"
                  value={formData.streamUrl}
                  onChange={e => setFormData({ ...formData, streamUrl: e.target.value })}
                  placeholder="Contoh: https://www.youtube.com/watch?v=... atau tautan live OBS"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono text-slate-800"
                />
                <p className="text-[11px] text-rose-700">
                  Jika diisi, live streaming arena akan otomatis menayangkan tautan video/kamera ini saat peserta berstatus <strong>SEDANG TAMPIL</strong>.
                </p>
              </div>

              {/* Form Actions */}
              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs sm:text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-md transition"
                >
                  {editingParticipant ? 'Simpan Perubahan' : 'Daftarkan Peserta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable ID Card Modal */}
      {cardParticipant && (
        <ParticipantIdCardModal
          participant={cardParticipant}
          config={config}
          onClose={() => setCardParticipant(null)}
        />
      )}

      {/* Photo Preview Lightbox Modal */}
      {previewPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setPreviewPhoto(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-sm w-full border border-slate-200 animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 bg-emerald-900 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white p-1 shrink-0 shadow-sm flex items-center justify-center">
                  <img
                    src={LOGO_LOMBOK_BARAT}
                    alt="Logo Lombok Barat"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="font-bold text-xs sm:text-sm block leading-tight">Lampiran Dokumen Foto Peserta</span>
                  <span className="text-[10px] text-emerald-200 block font-medium">Kabupaten Lombok Barat • Kec. {activeKecamatan.name}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewPhoto(null)}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 flex flex-col items-center bg-slate-50">
              <div className="relative w-48 h-64 rounded-2xl overflow-hidden border-4 border-emerald-700 shadow-xl bg-white mb-4">
                <img
                  src={previewPhoto.url}
                  alt={previewPhoto.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Official Lombok Barat Watermark Overlay */}
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/65 backdrop-blur-xs rounded-lg flex items-center gap-1.5 border border-white/20 shadow-md">
                  <img
                    src={LOGO_LOMBOK_BARAT}
                    alt="Logo Lombok Barat"
                    className="w-4 h-4 object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[9px] font-bold text-white tracking-wider">LOMBOK BARAT</span>
                </div>
                <div className="absolute bottom-2 right-2 w-7 h-7 p-1 rounded-full bg-white/90 shadow-md flex items-center justify-center border border-amber-400">
                  <img
                    src={LOGO_MTQ_NATIONAL}
                    alt="Logo MTQ"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="text-center space-y-1">
                <span className="font-mono font-bold text-xs text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  {previewPhoto.code}
                </span>
                <h4 className="font-extrabold text-slate-900 text-base mt-1">
                  {previewPhoto.name}
                </h4>
                <p className="text-xs text-slate-600">
                  {previewPhoto.kafilah}
                </p>
                <p className="text-xs font-semibold text-emerald-700">
                  Cabang: {previewPhoto.branch}
                </p>
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-100 border-t border-slate-200 flex justify-between items-center">
              <a
                href={previewPhoto.url}
                download={`Foto_${previewPhoto.code}_${previewPhoto.name}.png`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition"
              >
                <Download className="w-3.5 h-3.5" />
                Unduh Foto
              </a>
              <button
                type="button"
                onClick={() => setPreviewPhoto(null)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Participants Modal */}
      {isImportModalOpen && (
        <ImportParticipantsModal
          onClose={() => setIsImportModalOpen(false)}
          onImportSuccess={handleImportSuccess}
          currentParticipantCount={participants.length}
        />
      )}
    </div>
  );
};
