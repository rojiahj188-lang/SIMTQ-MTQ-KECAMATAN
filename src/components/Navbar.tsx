import React, { useState, useRef, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Award, 
  Trophy, 
  Scroll, 
  ShieldCheck, 
  Settings,
  Sparkles,
  Radio,
  FileText,
  Contact,
  MapPin,
  ChevronDown,
  Check,
  Building2
} from 'lucide-react';
import { SystemConfig } from '../types';
import { LOGO_MTQ_NATIONAL, LOGO_LOMBOK_BARAT } from '../assets/logo';
import { getAllKecamatan, getKecamatanById } from '../data/lombokBaratKecamatan';

export type NavTab = 'registration' | 'idcards' | 'branches' | 'documents' | 'judging' | 'streaming' | 'scoreboard' | 'certificates' | 'verify';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  config: SystemConfig;
  onOpenSettings: () => void;
  onOpenRubric?: () => void;
  onSelectKecamatan?: (kecamatanId: string) => void;
  totalParticipants: number;
  completedParticipants: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  config,
  onOpenSettings,
  onOpenRubric,
  onSelectKecamatan,
  totalParticipants,
  completedParticipants
}) => {
  const [isKecDropdownOpen, setIsKecDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allKecamatan = getAllKecamatan();
  const currentKecamatan = getKecamatanById(config.activeKecamatanId || 'gerung');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsKecDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const tabs = [
    { id: 'registration', label: 'Pendaftaran Peserta', icon: Users, badge: totalParticipants },
    { id: 'idcards', label: 'ID Card Panitia & Peserta', icon: Contact, badgeText: 'RESMI' },
    { id: 'branches', label: 'Kode Cabang Lomba', icon: BookOpen, badge: 9 },
    { id: 'documents', label: 'Lampiran & Bank Soal', icon: FileText, badgeText: 'PDF' },
    { id: 'streaming', label: 'Live Streaming', icon: Radio, pulse: true, badgeText: 'LIVE' },
    { id: 'judging', label: 'Penilaian Dewan Juri', icon: Award },
    { id: 'scoreboard', label: 'Live Score & Hasil', icon: Trophy },
    { id: 'certificates', label: 'Piagam Tersertifikasi', icon: Scroll, badge: completedParticipants },
    { id: 'verify', label: 'Cek Sertifikat', icon: ShieldCheck }
  ];

  return (
    <header className="bg-emerald-950 text-white shadow-xl sticky top-0 z-40 border-b border-emerald-800">
      {/* Top Bar with Islamic Branding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg shadow-amber-500/20 border-2 border-amber-400 overflow-hidden" title="Pemerintah Kabupaten Lombok Barat">
              <img
                src={LOGO_LOMBOK_BARAT}
                alt="Logo Kabupaten Lombok Barat"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg shadow-emerald-500/20 border-2 border-emerald-400 overflow-hidden" title="LPTQ / MTQ Nasional">
              <img
                src={LOGO_MTQ_NATIONAL}
                alt="Logo MTQ Nasional"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                SIMTQ <span className="text-amber-400 font-medium text-xs px-2 py-0.5 rounded-full bg-emerald-900 border border-emerald-700">Digital LPTQ</span>
              </span>
            </div>
            <p className="text-xs text-emerald-200 font-medium truncate max-w-xs sm:max-w-md">
              {config.edition} • {config.hostLocation}
            </p>
            <div className="text-[10px] text-amber-300 font-sans mt-0.5 flex items-center gap-1">
              <span>Pengembang:</span>
              <span className="font-bold text-white">Husni, S.Kom.I</span>
              <span className="text-emerald-300 hidden sm:inline">(Penyuluh Agama Islam KUA Kec. Gerung)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center bg-emerald-900/80 px-3 py-1.5 rounded-lg border border-emerald-800 text-xs text-emerald-200 space-x-3">
            <span>Peserta: <strong className="text-white">{totalParticipants}</strong></span>
            <span className="text-emerald-700">•</span>
            <span>Nilai Masuk: <strong className="text-amber-300">{completedParticipants}</strong></span>
            <span className="text-emerald-700">•</span>
            <span className="flex items-center gap-1 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Sistem Aktif
            </span>
          </div>

          {/* Kecamatan Selector (10 Kecamatan se-Lombok Barat, Default Gerung) */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsKecDropdownOpen(!isKecDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-900 hover:bg-emerald-800 text-white border border-amber-400/50 hover:border-amber-400 transition shadow-sm"
              title="Pilih Kecamatan Penyelenggara (Tersedia 10 Kecamatan se-Kabupaten Lombok Barat)"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline text-amber-300 font-medium">Kecamatan:</span>
              <span className="font-extrabold text-white">{currentKecamatan.name}</span>
              {currentKecamatan.id === 'gerung' && (
                <span className="text-[9px] font-black bg-amber-400 text-emerald-950 px-1.5 py-0.2 rounded font-sans uppercase">
                  Default
                </span>
              )}
              <ChevronDown className={`w-3.5 h-3.5 text-emerald-300 transition-transform duration-200 ${isKecDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isKecDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 text-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                      10 Kecamatan Lombok Barat
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Kab. Lobar
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Pilih wilayah penyelenggara untuk menyesuaikan data kafilah, dokumen, dan kop MTQ.
                  </p>
                </div>

                <div className="max-h-72 overflow-y-auto py-1">
                  {allKecamatan.map(kec => {
                    const isSelected = (config.activeKecamatanId || 'gerung') === kec.id;
                    return (
                      <button
                        key={kec.id}
                        type="button"
                        onClick={() => {
                          if (onSelectKecamatan) {
                            onSelectKecamatan(kec.id);
                          }
                          setIsKecDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left flex items-center justify-between text-xs transition ${
                          isSelected 
                            ? 'bg-emerald-50 text-emerald-900 font-bold' 
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-600' : 'bg-slate-300'}`}></span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-900">Kec. {kec.name}</span>
                              {kec.id === 'gerung' && (
                                <span className="text-[9px] bg-amber-100 text-amber-900 font-extrabold px-1.5 py-0.2 rounded border border-amber-300">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 font-normal">
                              {kec.totalKelurahan > 0 
                                ? `${kec.totalDesa} Desa & ${kec.totalKelurahan} Kelurahan (${kec.villages.length} Kafilah)`
                                : `${kec.totalDesa} Desa (${kec.villages.length} Kafilah)`}
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Ibukota: <strong className="text-slate-700">Gerung</strong></span>
                  <button
                    type="button"
                    onClick={() => {
                      onOpenSettings();
                      setIsKecDropdownOpen(false);
                    }}
                    className="text-emerald-700 font-bold hover:underline"
                  >
                    Atur Detail MTQ →
                  </button>
                </div>
              </div>
            )}
          </div>

          {onOpenRubric && (
            <button
              type="button"
              onClick={onOpenRubric}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-300 text-emerald-950 transition shadow-sm"
              title="Pedoman Acuan & Rubrik Penilaian Nasional Dewan Hakam LPTQ"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-950" />
              <span className="hidden sm:inline">Rubrik LPTQ</span>
            </button>
          )}

          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-900 hover:bg-emerald-800 text-emerald-200 hover:text-white border border-emerald-700/60 transition shadow-sm"
            title="Pengaturan Event MTQ & Pejabat Penandatangan"
          >
            <Settings className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Konfigurasi MTQ</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-emerald-900 border-t border-emerald-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-1 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as NavTab)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-400 text-emerald-950 font-bold shadow-md shadow-amber-500/10'
                      : 'text-emerald-200 hover:bg-emerald-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-950' : 'text-emerald-300'}`} />
                  <span>{tab.label}</span>
                  {tab.pulse && !isActive && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                  )}
                  {tab.badgeText && (
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                        isActive
                          ? 'bg-rose-600 text-white'
                          : 'bg-rose-500/80 text-white animate-pulse'
                      }`}
                    >
                      {tab.badgeText}
                    </span>
                  )}
                  {tab.badge !== undefined && (
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-emerald-950 text-amber-300 font-bold'
                          : 'bg-emerald-800 text-emerald-300'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
