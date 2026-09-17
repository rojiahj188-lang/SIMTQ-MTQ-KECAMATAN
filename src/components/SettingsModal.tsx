import React, { useState } from 'react';
import { X, Settings, RotateCcw, Save, ShieldCheck, MapPin, Sparkles, Building2 } from 'lucide-react';
import { SystemConfig } from '../types';
import { getAllKecamatan, getKecamatanById } from '../data/lombokBaratKecamatan';

interface SettingsModalProps {
  config: SystemConfig;
  onSaveConfig: (updated: SystemConfig) => void;
  onResetAllData: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  config,
  onSaveConfig,
  onResetAllData,
  onClose
}) => {
  const [formData, setFormData] = useState<SystemConfig>({ ...config });
  const allKecamatan = getAllKecamatan();
  const selectedKec = getKecamatanById(formData.activeKecamatanId || 'gerung');

  const handleKecamatanChange = (newKecId: string) => {
    const kec = getKecamatanById(newKecId);
    setFormData(prev => ({
      ...prev,
      activeKecamatanId: kec.id,
      edition: `MTQ KE-XXXII TINGKAT KECAMATAN ${kec.name.toUpperCase()}`,
      hostLocation: `Kecamatan ${kec.name}, Kabupaten Lombok Barat, NTB`,
      chairmanTitle: `Ketua LPTQ Kec. ${kec.name} / Camat ${kec.name}`,
      chiefJudgeTitle: `Ketua Dewan Hakim MTQ Kec. ${kec.name}`,
      chairmanName: kec.defaultChairman,
      chiefJudgeName: kec.defaultChiefJudge
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    onClose();
  };

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan seluruh data peserta dan pengaturan ke bawaan awal? Data perubahan Anda akan di-reset.')) {
      onResetAllData();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 bg-emerald-900 text-white">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm sm:text-base">Pengaturan Event MTQ & Sertifikasi</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Multi-Kecamatan Selector: 10 Kecamatan di Lombok Barat */}
          <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200 rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-700" />
                Pilih Kecamatan Penyelenggara (10 Kec. Lombok Barat)
              </label>
              <span className="text-[10px] bg-amber-400 text-emerald-950 font-bold px-2 py-0.5 rounded-full">
                Default: Gerung
              </span>
            </div>

            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Sistem SIMTQ dapat digunakan oleh seluruh <strong>10 Kecamatan</strong> di Kabupaten Lombok Barat. Mengubah kecamatan akan menyesuaikan nama tingkat edisi, tuan rumah, dan pejabat LPTQ secara otomatis.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {allKecamatan.map(kec => {
                const isSelected = (formData.activeKecamatanId || 'gerung') === kec.id;
                return (
                  <button
                    key={kec.id}
                    type="button"
                    onClick={() => handleKecamatanChange(kec.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-start justify-between transition ${
                      isSelected
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500/50'
                        : 'bg-white hover:bg-emerald-50/50 text-slate-800 border-emerald-100 hover:border-emerald-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs">Kec. {kec.name}</span>
                        {kec.id === 'gerung' && (
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase ${isSelected ? 'bg-amber-400 text-emerald-950' : 'bg-amber-100 text-amber-900 border border-amber-300'}`}>
                            Default
                          </span>
                        )}
                      </div>
                      <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                        {kec.totalKelurahan > 0 
                          ? `${kec.totalDesa} Desa & ${kec.totalKelurahan} Kel. (${kec.villages.length} Kafilah)`
                          : `${kec.totalDesa} Desa (${kec.villages.length} Kafilah)`}
                      </div>
                    </div>
                    {isSelected && (
                      <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold">
                        Aktif
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Resmi Musabaqah (Event Name)
            </label>
            <input
              type="text"
              value={formData.eventName}
              onChange={e => setFormData({ ...formData, eventName: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Edisi / Tingkat MTQ
              </label>
              <input
                type="text"
                value={formData.edition}
                onChange={e => setFormData({ ...formData, edition: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tahun Penyelenggaraan
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={e => setFormData({ ...formData, year: parseInt(e.target.value) || 2026 })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Lokasi Tuan Rumah (Venue)
            </label>
            <input
              type="text"
              value={formData.hostLocation}
              onChange={e => setFormData({ ...formData, hostLocation: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
            <span className="text-xs font-bold text-emerald-900 block">
              Pejabat Penandatangan Piagam Penghargaan & Dokumen
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Nama Ketua Umum LPTQ (Beserta Gelar)
                </label>
                <input
                  type="text"
                  value={formData.chairmanName}
                  onChange={e => setFormData({ ...formData, chairmanName: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Jabatan Ketua LPTQ / Camat
                </label>
                <input
                  type="text"
                  value={formData.chairmanTitle || `Ketua LPTQ Kec. ${selectedKec.name} / Camat ${selectedKec.name}`}
                  onChange={e => setFormData({ ...formData, chairmanTitle: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Nama Ketua Dewan Hakim MTQ (Beserta Gelar)
                </label>
                <input
                  type="text"
                  value={formData.chiefJudgeName}
                  onChange={e => setFormData({ ...formData, chiefJudgeName: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Jabatan Ketua Dewan Hakim
                </label>
                <input
                  type="text"
                  value={formData.chiefJudgeTitle || `Ketua Dewan Hakim MTQ Kec. ${selectedKec.name}`}
                  onChange={e => setFormData({ ...formData, chiefJudgeTitle: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Tanggal Penetapan Piagam / Pengumuman
              </label>
              <input
                type="date"
                value={formData.announcementDate}
                onChange={e => setFormData({ ...formData, announcementDate: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                required
              />
            </div>
          </div>

          {/* Informasi Pengembang Aplikasi */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between text-xs">
            <div>
              <div className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Pengembang Aplikasi SIMTQ</div>
              <div className="font-bold text-emerald-950 text-sm">Husni, S.Kom.I</div>
              <div className="text-[11px] text-emerald-700">Penyuluh Agama Islam KUA Kecamatan Gerung, Kabupaten Lombok Barat, NTB</div>
            </div>
            <div className="text-right">
              <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-700 text-white font-bold text-[10px]">
                KUA Kec. Gerung
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Data Contoh Awal
            </button>

            <div className="flex gap-2">
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
                Simpan Konfigurasi
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
