import React, { useState } from 'react';
import { 
  Scroll, 
  Printer, 
  Eye, 
  ShieldCheck, 
  Search, 
  Filter, 
  Award, 
  Download,
  CheckCircle2,
  Sparkles,
  X,
  Loader2,
  FileDown,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { Participant, SystemConfig } from '../../types';
import { OFFICIAL_BRANCHES } from '../../data/mtqBranches';
import { PrintableCertificate } from './PrintableCertificate';
import { downloadElementAsPdf, downloadElementAsImage, sanitizeFileName } from '../../utils/certificateUtils';

interface CertificateGeneratorViewProps {
  participants: Participant[];
  config: SystemConfig;
  initialSelectedParticipantId?: string;
  onNavigateToVerify?: (hashOrNo: string) => void;
}

export const CertificateGeneratorView: React.FC<CertificateGeneratorViewProps> = ({
  participants,
  config,
  initialSelectedParticipantId,
  onNavigateToVerify
}) => {
  const [selectedBranch, setSelectedBranch] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activePreviewParticipant, setActivePreviewParticipant] = useState<Participant | null>(() => {
    if (initialSelectedParticipantId) {
      return participants.find(p => p.id === initialSelectedParticipantId) || null;
    }
    return null;
  });

  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Eligible participants for certificates: those with completed scores
  const eligibleParticipants = participants.filter(p => p.finalScore && p.finalScore > 0);

  const filtered = eligibleParticipants.filter(p => {
    const matchesBranch = selectedBranch === 'ALL' || p.branchId === selectedBranch;
    const matchesSearch = 
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.originKafilah.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.certificateNumber && p.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.awardTitle && p.awardTitle.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesBranch && matchesSearch;
  });

  const handlePrintCertificate = () => {
    try {
      window.print();
    } catch (err) {
      console.warn('Direct window.print restricted in frame:', err);
      setStatusMessage({
        text: 'Peramban membatasi dialog cetak di dalam bingkai (iframe). Mengalihkan ke unduh file PDF...',
        type: 'info'
      });
      if (activePreviewParticipant) {
        handleDownloadPdf(activePreviewParticipant);
      }
    }
  };

  const handleDownloadPdf = async (participant: Participant) => {
    const certElement = document.getElementById('printable-certificate');
    if (!certElement) {
      // If modal is not open yet, open it first
      setActivePreviewParticipant(participant);
      setTimeout(() => handleDownloadPdf(participant), 300);
      return;
    }

    setIsGeneratingPdf(true);
    setStatusMessage({
      text: 'Sedang merender Piagam Penghargaan ke format PDF (A4 Landscape)...',
      type: 'info'
    });

    const safeName = sanitizeFileName(participant.fullName);
    const safeBranch = sanitizeFileName(participant.branchId);
    const fileName = `Piagam_MTQ_Gerung_${safeName}_${safeBranch}.pdf`;

    try {
      const success = await downloadElementAsPdf(certElement, fileName);
      if (success) {
        setStatusMessage({
          text: `File PDF "${fileName}" berhasil diunduh ke komputer Anda! Silakan buka file untuk mencetak ke kertas sertifikat.`,
          type: 'success'
        });
        // Also attempt print dialog as bonus if permitted
        try {
          window.print();
        } catch {
          // ignore if window.print is blocked in iframe
        }
      } else {
        setStatusMessage({
          text: 'Gagal membuat PDF. Mencoba mengunduh piagam dalam format gambar (PNG)...',
          type: 'error'
        });
        await handleDownloadImage(participant);
      }
    } catch (err: any) {
      console.error('Download PDF error:', err);
      setStatusMessage({
        text: 'Terjadi kendala saat menghasilkan PDF. Mengalihkan ke format gambar...',
        type: 'error'
      });
      await handleDownloadImage(participant);
    } finally {
      setIsGeneratingPdf(false);
      setTimeout(() => {
        setStatusMessage(prev => (prev?.type === 'success' ? prev : null));
      }, 6000);
    }
  };

  const handleDownloadImage = async (participant: Participant) => {
    const certElement = document.getElementById('printable-certificate');
    if (!certElement) {
      setActivePreviewParticipant(participant);
      setTimeout(() => handleDownloadImage(participant), 300);
      return;
    }

    setIsGeneratingImage(true);
    setStatusMessage({
      text: 'Sedang menyimpan piagam dalam resolusi tinggi (PNG)...',
      type: 'info'
    });

    const safeName = sanitizeFileName(participant.fullName);
    const fileName = `Piagam_MTQ_Gerung_${safeName}.png`;

    try {
      const success = await downloadElementAsImage(certElement, fileName);
      if (success) {
        setStatusMessage({
          text: `Gambar piagam resolusi tinggi "${fileName}" berhasil disimpan!`,
          type: 'success'
        });
      }
    } catch (err) {
      console.error('Download image error:', err);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
            <Scroll className="w-3.5 h-3.5 text-emerald-700" />
            Generator Piagam Penghargaan Otomatis
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Penerbitan Piagam Juara Tersertifikasi Digital
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Setiap piagam dilengkapi nomor registrasi resmi, QR Code verifikasi keaslian, stempel digital, dan dapat diunduh langsung sebagai file PDF (A4 Landscape) siap cetak.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl text-xs text-amber-900 font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{eligibleParticipants.length} Pemenang Tersertifikasi</span>
          </div>
        </div>
      </div>

      {/* Global Status Banner if any */}
      {statusMessage && (
        <div className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-medium ${
          statusMessage.type === 'success'
            ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
            : statusMessage.type === 'error'
            ? 'bg-rose-50 text-rose-900 border-rose-200'
            : 'bg-amber-50 text-amber-900 border-amber-200'
        }`}>
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : statusMessage.type === 'error' ? (
              <X className="w-4 h-4 text-rose-600 shrink-0" />
            ) : (
              <Loader2 className="w-4 h-4 text-amber-600 animate-spin shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative min-w-[200px] flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama juara, no piagam, kafilah..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Branch Select */}
          <select
            value={selectedBranch}
            onChange={e => setSelectedBranch(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          >
            <option value="ALL">Semua Cabang Lomba</option>
            {OFFICIAL_BRANCHES.map(b => (
              <option key={b.id} value={b.id}>
                [{b.code}] {b.name}
              </option>
            ))}
          </select>
        </div>

        <span className="text-xs text-slate-500">
          Menampilkan <strong>{filtered.length}</strong> piagam siap cetak
        </span>
      </div>

      {/* Certificates Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-slate-200">
            <Scroll className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700">Belum ada piagam tersedia</h3>
            <p className="text-xs text-slate-400 mt-1">
              Lakukan penilaian dewan hakim terlebih dahulu untuk menerbitkan piagam pemenang.
            </p>
          </div>
        ) : (
          filtered.map(p => {
            const branch = OFFICIAL_BRANCHES.find(b => b.id === p.branchId);
            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Corner Ribbon / Badge */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    p.rank === 1
                      ? 'bg-amber-400 text-emerald-950 shadow-sm border border-amber-300'
                      : p.rank === 2
                      ? 'bg-slate-200 text-slate-800'
                      : p.rank === 3
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-900'
                  }`}>
                    ★ {p.awardTitle || `Juara #${p.rank}`}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {p.certificateNumber?.split('/').pop()}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1.5 flex-1">
                  <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                    {p.fullName}
                  </h3>
                  <div className="text-xs font-medium text-slate-600">
                    Kafilah: <strong className="text-slate-800">{p.originKafilah}</strong>
                  </div>
                  <div className="text-xs text-slate-500">
                    {branch?.name} ({p.category})
                  </div>
                  <div className="flex items-center gap-3 pt-2 text-xs">
                    <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200 font-mono">
                      Skor: {p.finalScore?.toFixed(2)}
                    </span>
                    <span className="text-emerald-700 font-medium flex items-center gap-1 text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Tersertifikasi
                    </span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      if (onNavigateToVerify && p.certificateNumber) {
                        onNavigateToVerify(p.certificateNumber);
                      }
                    }}
                    className="text-[11px] font-semibold text-slate-500 hover:text-emerald-700 underline"
                  >
                    Verifikasi QR
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setActivePreviewParticipant(p);
                        setTimeout(() => handleDownloadPdf(p), 150);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-emerald-950 transition shadow-xs"
                      title="Unduh langsung file PDF piagam"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>

                    <button
                      onClick={() => setActivePreviewParticipant(p)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white transition shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat & Cetak</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Certificate Preview & Print Modal */}
      {activePreviewParticipant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-2 sm:p-4 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden border border-emerald-700/50 flex flex-col max-h-[96vh]">
            {/* Modal Bar */}
            <div className="px-4 sm:px-6 py-3.5 bg-emerald-950 text-white flex flex-wrap items-center justify-between gap-3 border-b border-emerald-800">
              <div className="flex items-center gap-2">
                <Scroll className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="font-bold text-xs sm:text-sm">
                    Pratinjau Piagam Penghargaan Tersertifikasi (A4 Landscape)
                  </div>
                  <div className="text-[11px] text-emerald-300">
                    {activePreviewParticipant.fullName} • {activePreviewParticipant.awardTitle}
                  </div>
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-2">
                {/* Primary Action: Download PDF directly (Solves the "terkunci" issue) */}
                <button
                  type="button"
                  onClick={() => handleDownloadPdf(activePreviewParticipant)}
                  disabled={isGeneratingPdf}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-amber-400 hover:bg-amber-300 active:scale-95 text-emerald-950 transition shadow-md disabled:opacity-70 cursor-pointer"
                  title="Unduh piagam langsung sebagai file PDF A4 Landscape"
                >
                  {isGeneratingPdf ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-950" />
                      <span>Sedang Membuat PDF...</span>
                    </>
                  ) : (
                    <>
                      <Printer className="w-4 h-4 text-emerald-950" />
                      <span>Cetak Sekarang (PDF)</span>
                    </>
                  )}
                </button>

                {/* Secondary Action: Download high-res PNG */}
                <button
                  type="button"
                  onClick={() => handleDownloadImage(activePreviewParticipant)}
                  disabled={isGeneratingImage}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-900 hover:bg-emerald-800 text-emerald-100 hover:text-white border border-emerald-700 transition"
                  title="Simpan piagam sebagai file gambar PNG beresolusi tinggi"
                >
                  {isGeneratingImage ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  )}
                  <span>Unduh Gambar</span>
                </button>

                {/* Direct Print Dialog trigger */}
                <button
                  type="button"
                  onClick={handlePrintCertificate}
                  className="hidden md:flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-900/60 hover:bg-emerald-800 text-slate-300 hover:text-white border border-emerald-800 transition"
                  title="Buka dialog cetak browser langsung"
                >
                  <span>Dialog Cetak</span>
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActivePreviewParticipant(null)}
                  className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-emerald-800 transition ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Notification Bar inside modal */}
            {statusMessage && (
              <div className={`px-6 py-2.5 text-xs font-semibold flex items-center justify-between border-b ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-900/90 text-emerald-100 border-emerald-700'
                  : statusMessage.type === 'error'
                  ? 'bg-rose-900/90 text-rose-100 border-rose-700'
                  : 'bg-amber-900/90 text-amber-100 border-amber-700'
              }`}>
                <div className="flex items-center gap-2">
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : statusMessage.type === 'error' ? (
                    <X className="w-4 h-4 text-rose-400 shrink-0" />
                  ) : (
                    <Loader2 className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
                <button
                  onClick={() => setStatusMessage(null)}
                  className="text-slate-300 hover:text-white"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Certificate Display Area */}
            <div className="p-3 sm:p-6 md:p-8 overflow-y-auto flex flex-col items-center justify-center bg-slate-800/40">
              <PrintableCertificate
                participant={activePreviewParticipant}
                config={config}
              />

              {/* Helpful footer hints */}
              <div className="mt-4 text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-4">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> Format: Standar A4 Landscape (297 × 210 mm)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> Dilengkapi QR Code & Digital Signature
                </span>
                <span>•</span>
                <span className="text-slate-300">
                  Tombol <strong>Cetak Sekarang (PDF)</strong> otomatis mengunduh file PDF beresolusi tinggi ke folder Download Anda.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

