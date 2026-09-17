import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Scroll, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  Loader2, 
  X, 
  Share2, 
  Info,
  Calendar,
  MapPin,
  Users,
  Award
} from 'lucide-react';
import { LPTQ_NTB_SURAT_EDARAN, CircularLetterData, FAHMIL_PACKAGES_LIST } from '../../data/officialDocsData';
import { CircularLetterDoc } from './CircularLetterDoc';
import { FahmilQuestionsDoc } from './FahmilQuestionsDoc';
import { downloadElementAsPdf, sanitizeFileName } from '../../utils/certificateUtils';

export const OfficialDocumentsView: React.FC = () => {
  const [activeDocType, setActiveDocType] = useState<'circular' | 'fahmil'>('circular');
  const [selectedFahmilPackageId, setSelectedFahmilPackageId] = useState<string>('P01');
  
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [statusNotification, setStatusNotification] = useState<{
    text: string;
    type: 'success' | 'info' | 'error';
  } | null>(null);

  const circularRef = useRef<HTMLDivElement>(null);
  const fahmilRef = useRef<HTMLDivElement>(null);

  const handleDownloadActiveDocPdf = async () => {
    setIsGeneratingPdf(true);

    if (activeDocType === 'circular') {
      const el = document.getElementById('circular-letter-print-area');
      if (!el) {
        setIsGeneratingPdf(false);
        return;
      }

      setStatusNotification({
        text: 'Sedang merender Surat Edaran Resmi LPTQ NTB ke format PDF (A4 Portrait)...',
        type: 'info'
      });

      const fileName = 'Surat_Edaran_LPTQ_NTB_Persiapan_MTQ_XXXII_2027.pdf';
      try {
        const success = await downloadElementAsPdf(el, fileName, 'portrait');
        if (success) {
          setStatusNotification({
            text: `File PDF "${fileName}" berhasil diunduh ke komputer Anda!`,
            type: 'success'
          });
        }
      } catch (err) {
        console.error('Download error:', err);
        setStatusNotification({
          text: 'Gagal merender PDF secara otomatis. Silakan gunakan tombol Dialog Cetak.',
          type: 'error'
        });
      } finally {
        setIsGeneratingPdf(false);
      }
    } else {
      const el = document.getElementById('fahmil-print-area');
      if (!el) {
        setIsGeneratingPdf(false);
        return;
      }

      const activePkg = FAHMIL_PACKAGES_LIST.find(p => p.id === selectedFahmilPackageId) || FAHMIL_PACKAGES_LIST[0];
      const fileName = `Soal_Fahmil_Quran_${sanitizeFileName(activePkg.code)}_${sanitizeFileName(activePkg.round)}.pdf`;

      setStatusNotification({
        text: `Sedang merender ${activePkg.title} ke format PDF (A4 Portrait)...`,
        type: 'info'
      });

      try {
        const success = await downloadElementAsPdf(el, fileName, 'portrait');
        if (success) {
          setStatusNotification({
            text: `File PDF "${fileName}" berhasil diunduh! Siap dicetak untuk Dewan Hakim / Regu Peserta.`,
            type: 'success'
          });
        }
      } catch (err) {
        console.error('Download error:', err);
        setStatusNotification({
          text: 'Gagal membuat file PDF. Silakan coba kembali.',
          type: 'error'
        });
      } finally {
        setIsGeneratingPdf(false);
      }
    }
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      handleDownloadActiveDocPdf();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-800/80 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-emerald-950 px-3 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase shadow-sm mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Dokumen Resmi & Bank Soal MTQ</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white font-serif">
            Lampiran Dokumen Resmi LPTQ & Bank Soal Fahmil Qur'an
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/90 mt-2 leading-relaxed">
            Pusat arsip berkas surat edaran resmi persiapan <strong>MTQ XXXII Tingkat Provinsi NTB Tahun 2027</strong> dan bank soal lengkap cabang <strong>Fahmil Qur'an (MFQ)</strong>. Seluruh berkas telah diformat standar dan siap diunduh ke format PDF A4.
          </p>

          {/* Quick Metrics */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase text-emerald-300 font-bold block">Surat Edaran</span>
              <span className="text-xs font-semibold text-white">No. 400.8.2/51/2026</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase text-emerald-300 font-bold block">Tuan Rumah NTB</span>
              <span className="text-xs font-semibold text-white">Lombok Utara (2027)</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase text-emerald-300 font-bold block">Kafilah Daerah</span>
              <span className="text-xs font-semibold text-white">102 Orang / Kab-Kota</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase text-emerald-300 font-bold block">Bank Soal MFQ</span>
              <span className="text-xs font-semibold text-amber-300">Penyisihan s/d Final</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Status Banner */}
      {statusNotification && (
        <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-medium transition-all ${
          statusNotification.type === 'success'
            ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
            : statusNotification.type === 'error'
            ? 'bg-rose-50 text-rose-950 border-rose-300'
            : 'bg-amber-50 text-amber-950 border-amber-300'
        }`}>
          <div className="flex items-center gap-2">
            {statusNotification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : statusNotification.type === 'error' ? (
              <X className="w-5 h-5 text-rose-600 shrink-0" />
            ) : (
              <Loader2 className="w-5 h-5 text-amber-600 animate-spin shrink-0" />
            )}
            <span>{statusNotification.text}</span>
          </div>
          <button
            onClick={() => setStatusNotification(null)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Switcher & Download Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        {/* Document Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveDocType('circular')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition border ${
              activeDocType === 'circular'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Surat Edaran LPTQ NTB 2026</span>
          </button>

          <button
            onClick={() => setActiveDocType('fahmil')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition border ${
              activeDocType === 'fahmil'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Bank Soal Fahmil Qur'an (MFQ)</span>
          </button>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadActiveDocPdf}
            disabled={isGeneratingPdf}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-amber-400 hover:bg-amber-300 text-emerald-950 transition shadow-sm active:scale-95 disabled:opacity-70 cursor-pointer"
            title="Unduh dokumen yang sedang dibuka dalam format PDF (A4 Portrait)"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-emerald-950" />
                <span>Membuat PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-emerald-950" />
                <span>Unduh PDF (Siap Cetak)</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition border border-slate-300"
            title="Buka dialog cetak browser"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">Cetak</span>
          </button>
        </div>
      </div>

      {/* View Body */}
      {activeDocType === 'circular' ? (
        <div className="space-y-6">
          {/* Information Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Jadwal Penyelenggaraan</h4>
                <p className="text-sm font-bold text-slate-900 mt-1">Minggu IV Maret / Minggu I April 2027</p>
                <p className="text-xs text-slate-600 mt-0.5">Kabupaten Lombok Utara (KLU)</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kapasitas Kafilah Resmi</h4>
                <p className="text-sm font-bold text-slate-900 mt-1">102 Orang per Kab/Kota</p>
                <p className="text-xs text-slate-600 mt-0.5">Total 1.020 orang delegasi se-NTB (10 Kab/Kota)</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cabang yang Dimusabaqahkan</h4>
                <p className="text-sm font-bold text-slate-900 mt-1">9 Cabang & Puluhan Golongan</p>
                <p className="text-xs text-slate-600 mt-0.5">Sesuai Pedoman Musabaqah Nasional 2026</p>
              </div>
            </div>
          </div>

          {/* Rendered Document */}
          <CircularLetterDoc 
            data={LPTQ_NTB_SURAT_EDARAN} 
            printableRef={circularRef} 
          />
        </div>
      ) : (
        <FahmilQuestionsDoc
          printableRef={fahmilRef}
          selectedPackageId={selectedFahmilPackageId}
          onSelectPackageId={setSelectedFahmilPackageId}
        />
      )}
    </div>
  );
};
