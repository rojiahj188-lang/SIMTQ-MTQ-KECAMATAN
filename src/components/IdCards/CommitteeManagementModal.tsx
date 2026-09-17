import React, { useState, useRef } from 'react';
import { X, Save, UploadCloud, Camera, ShieldCheck } from 'lucide-react';
import { CommitteeMember, CommitteeRoleCategory, Gender } from '../../types';
import { PANITIA_FOTO_PRESETS } from '../../utils/photoPresets';

interface CommitteeManagementModalProps {
  member: CommitteeMember | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: CommitteeMember) => void;
  existingCount: number;
}

const ROLE_OPTIONS: { value: CommitteeRoleCategory; label: string; defaultAccess: string }[] = [
  { value: 'PENANGGUNG_JAWAB', label: 'Penanggung Jawab & Pengarah', defaultAccess: 'ALL ACCESS & VIP PROTOKOLER' },
  { value: 'DEWAN_HAKIM', label: 'Dewan Hakam / Dewan Hakim', defaultAccess: 'MEJA DEWAN HAKIM & MIMBAR UTAMA' },
  { value: 'PANITERA', label: 'Panitera Dewan Hakim', defaultAccess: 'MEJA DEWAN HAKIM & RUANG SKORING' },
  { value: 'PANITIA_INTI', label: 'Panitia Pelaksana Inti (Ketua/Sekretaris/Bendahara)', defaultAccess: 'ALL ACCESS KECAMATAN' },
  { value: 'SEKSI_IT_MEDIA', label: 'Seksi IT, Sistem SIMTQ & Siaran Streaming', defaultAccess: 'ALL ACCESS & RUANG SERVER IT' },
  { value: 'SEKSI_MUSABAQAH', label: 'Seksi Musabaqah, Verifikasi & Registrasi', defaultAccess: 'MIMBAR UTAMA & REGISTRASI' },
  { value: 'SEKSI_ACARA', label: 'Seksi Acara & Protokoler', defaultAccess: 'MIMBAR UTAMA & PANGGUNG' },
  { value: 'SEKSI_LOGISTIK', label: 'Seksi Akomodasi, Konsumsi & Perlengkapan', defaultAccess: 'ARENA LOMBA & POS LOGISTIK' },
  { value: 'TIM_MEDIS', label: 'Tim Medis & Kesehatan Darurat', defaultAccess: 'POSKO KESEHATAN & ALL ARENA' },
  { value: 'SEKSI_KEAMANAN', label: 'Seksi Keamanan & Ketertiban', defaultAccess: 'AREA PENGAMANAN & PINTU MASUK' }
];

export const CommitteeManagementModal: React.FC<CommitteeManagementModalProps> = ({
  member,
  isOpen,
  onClose,
  onSave,
  existingCount
}) => {
  const [formData, setFormData] = useState<Partial<CommitteeMember>>(() => {
    if (member) {
      return { ...member };
    }
    const defaultRole: CommitteeRoleCategory = 'PANITIA_INTI';
    return {
      code: `PAN-${(existingCount + 1).toString().padStart(2, '0')}`,
      fullName: '',
      titleWithDegree: '',
      nipOrNik: '',
      roleCategory: defaultRole,
      positionName: 'Seksi Panitia Pelaksana',
      division: 'Sekretariat Panitia MTQ',
      institution: 'Kecamatan Gerung, Kab. Lombok Barat',
      accessArea: 'ALL ACCESS KECAMATAN',
      gender: 'PUTRA',
      phone: '',
      photoUrl: PANITIA_FOTO_PRESETS[0].dataUrl
    };
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({ ...prev, photoUrl: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleRoleChange = (cat: CommitteeRoleCategory) => {
    const opt = ROLE_OPTIONS.find(o => o.value === cat);
    setFormData(prev => ({
      ...prev,
      roleCategory: cat,
      accessArea: opt?.defaultAccess || prev.accessArea
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.positionName) {
      alert('Mohon lengkapi Nama dan Jabatan Panitia.');
      return;
    }

    const saved: CommitteeMember = {
      id: member ? member.id : `com-${Date.now()}`,
      code: formData.code || `PAN-${Date.now().toString().slice(-4)}`,
      fullName: formData.fullName.trim(),
      titleWithDegree: formData.titleWithDegree?.trim() || formData.fullName.trim(),
      nipOrNik: formData.nipOrNik?.trim() || undefined,
      roleCategory: formData.roleCategory || 'PANITIA_INTI',
      positionName: formData.positionName.trim(),
      division: formData.division?.trim() || 'Panitia MTQ',
      institution: formData.institution?.trim() || 'Kecamatan Gerung',
      accessArea: formData.accessArea?.trim() || 'ALL ACCESS',
      gender: formData.gender || 'PUTRA',
      phone: formData.phone?.trim() || undefined,
      photoUrl: formData.photoUrl
    };

    onSave(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-emerald-950 text-white">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">
              {member ? 'Edit Data Panitia / Hakim' : 'Tambah Panitia / Hakim MTQ Baru'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[78vh] overflow-y-auto">
          {/* Row 1: Code & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                ID / Kode Panitia <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.code || ''}
                onChange={e => setFormData({ ...formData, code: e.target.value })}
                placeholder="Contoh: DHK-01, PAN-05, IT-01"
                className="w-full px-3.5 py-2 text-xs font-mono font-bold uppercase rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Kategori Peran <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.roleCategory || 'PANITIA_INTI'}
                onChange={e => handleRoleChange(e.target.value as CommitteeRoleCategory)}
                className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                {ROLE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Full Name & Title */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Nama Lengkap & Gelar Resmi <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.fullName || ''}
              onChange={e => setFormData({ ...formData, fullName: e.target.value, titleWithDegree: e.target.value })}
              placeholder="Contoh: TGH. Mukhlis Ibrahim, S.Q., M.Pd.I atau Husni, S.Kom.I"
              className="w-full px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
          </div>

          {/* Row 3: NIP / NIK & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                NIP / NIK (Opsional)
              </label>
              <input
                type="text"
                value={formData.nipOrNik || ''}
                onChange={e => setFormData({ ...formData, nipOrNik: e.target.value })}
                placeholder="Contoh: 19870912 201403 1 003"
                className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Jenis Kelamin
              </label>
              <div className="flex gap-4 pt-1.5">
                <label className="flex items-center gap-1.5 text-xs text-slate-700 font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={formData.gender === 'PUTRA'}
                    onChange={() => setFormData({ ...formData, gender: 'PUTRA' })}
                    className="text-emerald-700 focus:ring-emerald-500"
                  />
                  Pria (Putra)
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-700 font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={formData.gender === 'PUTRI'}
                    onChange={() => setFormData({ ...formData, gender: 'PUTRI' })}
                    className="text-emerald-700 focus:ring-emerald-500"
                  />
                  Wanita (Putri)
                </label>
              </div>
            </div>
          </div>

          {/* Row 4: Specific Position & Division */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Jabatan Spesifik pada MTQ <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.positionName || ''}
                onChange={e => setFormData({ ...formData, positionName: e.target.value })}
                placeholder="Contoh: Koordinator IT & Siaran Streaming"
                className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Divisi / Bidang
              </label>
              <input
                type="text"
                value={formData.division || ''}
                onChange={e => setFormData({ ...formData, division: e.target.value })}
                placeholder="Contoh: Teknologi, Multimedia & Live Broadcast"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>
          </div>

          {/* Row 5: Institution & Access Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Asal Instansi / Lembaga
              </label>
              <input
                type="text"
                value={formData.institution || ''}
                onChange={e => setFormData({ ...formData, institution: e.target.value })}
                placeholder="Contoh: KUA Kec. Gerung, Kantor Camat, Polsek"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Hak Akses Area
              </label>
              <input
                type="text"
                value={formData.accessArea || ''}
                onChange={e => setFormData({ ...formData, accessArea: e.target.value })}
                placeholder="Contoh: ALL ACCESS & RUANG SERVER IT"
                className="w-full px-3.5 py-2 text-xs font-mono font-bold uppercase rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>
          </div>

          {/* Row 6: Phone Number */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Nomor Kontak / WhatsApp (Opsional)
            </label>
            <input
              type="text"
              value={formData.phone || ''}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Contoh: 0819-xxxx-xxxx"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
          </div>

          {/* Row 7: Photo Attachment Section */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-emerald-700" />
                Pas Foto Panitia / Dewan Hakim
              </label>
              {formData.photoUrl && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, photoUrl: '' })}
                  className="text-[11px] font-semibold text-rose-600 hover:text-rose-800"
                >
                  Hapus Foto
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-20 h-26 rounded-xl overflow-hidden border-2 border-emerald-600 bg-white shadow-sm shrink-0 flex items-center justify-center">
                {formData.photoUrl ? (
                  <img
                    src={formData.photoUrl}
                    alt="Foto Panitia"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="text-center p-1 text-slate-400">
                    <Camera className="w-6 h-6 mx-auto text-slate-300 mb-1" />
                    <span className="text-[9px] block">Belum ada</span>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2 w-full">
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  Unggah Foto dari Perangkat
                </button>
                <p className="text-[10px] text-slate-500">
                  Format JPG, PNG, atau pilih dari preset pas foto formal panitia di bawah:
                </p>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PANITIA_FOTO_PRESETS.map(preset => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, photoUrl: preset.dataUrl })}
                      className="px-2 py-1 text-[10px] font-semibold bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg transition"
                    >
                      {preset.label.split(' - ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end items-center gap-2 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-md transition"
            >
              <Save className="w-4 h-4" />
              Simpan Data Panitia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
