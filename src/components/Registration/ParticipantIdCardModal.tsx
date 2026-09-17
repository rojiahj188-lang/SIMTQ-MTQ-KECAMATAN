import React, { useEffect, useState } from 'react';
import { X, Printer, QrCode as QrIcon, CheckCircle2, Download, Loader2 } from 'lucide-react';
import { Participant, SystemConfig } from '../../types';
import { OFFICIAL_BRANCHES } from '../../data/mtqBranches';
import { generateQrDataUrl, downloadElementAsImage, sanitizeFileName } from '../../utils/certificateUtils';
import { LOGO_MTQ_NATIONAL, LOGO_LOMBOK_BARAT } from '../../assets/logo';

interface ParticipantIdCardModalProps {
  participant: Participant | null;
  config: SystemConfig;
  onClose: () => void;
}

export const ParticipantIdCardModal: React.FC<ParticipantIdCardModalProps> = ({
  participant,
  config,
  onClose
}) => {
  const [qrUrl, setQrUrl] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  useEffect(() => {
    if (participant) {
      const qrPayload = JSON.stringify({
        code: participant.participantCode,
        reg: participant.registrationNumber,
        name: participant.fullName,
        kafilah: participant.originKafilah,
        branch: participant.branchId,
        cat: participant.category
      });
      generateQrDataUrl(qrPayload).then(setQrUrl);
    }
  }, [participant]);

  if (!participant) return null;

  const branch = OFFICIAL_BRANCHES.find(b => b.id === participant.branchId);

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      handleDownloadImage();
    }
  };

  const handleDownloadImage = async () => {
    const el = document.getElementById('printable-idcard');
    if (!el) return;
    setIsDownloading(true);
    try {
      const safeName = sanitizeFileName(participant.fullName);
      await downloadElementAsImage(el, `Kartu_Peserta_${participant.participantCode}_${safeName}.png`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-emerald-900 text-white">
          <div className="flex items-center gap-2">
            <QrIcon className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm sm:text-base">KARTU TANDA PESERTA MTQ</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Card View (Printable) */}
        <div className="p-6 bg-slate-100 flex justify-center">
          <div 
            id="printable-idcard" 
            className="w-80 bg-white rounded-2xl border-2 border-emerald-700 shadow-lg overflow-hidden relative"
          >
            {/* Top decorative stripe */}
            <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 text-white text-center p-3 relative flex items-center justify-between gap-2">
              <div className="w-10 h-10 bg-white rounded-full p-1 shrink-0 border border-amber-300 shadow" title="Kabupaten Lombok Barat">
                <img
                  src={LOGO_LOMBOK_BARAT}
                  alt="Logo Lombok Barat"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1">
                <div className="text-[9px] uppercase font-semibold tracking-wider text-amber-300">
                  Lembaga Pengembangan Tilawatil Qur'an
                </div>
                <div className="text-[11px] font-bold font-serif uppercase tracking-tight leading-tight">
                  {config.edition}
                </div>
                <div className="text-[9px] text-emerald-200 mt-0.5">
                  {config.hostLocation}
                </div>
              </div>
              <div className="w-10 h-10 bg-white rounded-full p-1 shrink-0 border border-amber-300 shadow" title="LPTQ / MTQ Nasional">
                <img
                  src={LOGO_MTQ_NATIONAL}
                  alt="Logo MTQ"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Photo & Badge Section */}
            <div className="p-5 text-center flex flex-col items-center">
              {/* Participant Number Badge */}
              <div className="bg-amber-400 text-emerald-950 font-black px-4 py-1.5 rounded-full text-base tracking-wider shadow-sm border border-amber-300 mb-4">
                {participant.participantCode}
              </div>

              {/* Avatar photo or fallback icon */}
              {participant.photoUrl ? (
                <div className="w-24 h-28 rounded-xl border-2 border-emerald-600 overflow-hidden mb-3 shadow-md bg-white shrink-0">
                  <img 
                    src={participant.photoUrl} 
                    alt={participant.fullName} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="w-24 h-28 bg-emerald-50 rounded-xl border-2 border-emerald-600 flex flex-col items-center justify-center p-2 mb-3 shadow-inner shrink-0">
                  <span className="text-3xl font-bold text-emerald-700 font-cinzel">
                    {participant.fullName.charAt(0)}
                  </span>
                  <span className="text-[9px] text-emerald-600 font-semibold uppercase mt-1">
                    {participant.gender}
                  </span>
                </div>
              )}

              <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                {participant.fullName}
              </h4>
              <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                {participant.originKafilah}
              </p>

              {/* Details box */}
              <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 mt-4 text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Cabang:</span>
                  <span className="font-bold text-slate-800">{branch?.name || participant.branchId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Golongan:</span>
                  <span className="font-medium text-slate-700 text-right">{participant.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">No. Undian:</span>
                  <span className="font-bold text-amber-600">Urut #{participant.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {participant.status}
                  </span>
                </div>
              </div>

              {/* QR Code section */}
              <div className="mt-4 flex flex-col items-center">
                {qrUrl ? (
                  <img 
                    src={qrUrl} 
                    alt="QR Peserta" 
                    className="w-24 h-24 rounded-lg border border-slate-200 shadow-sm"
                  />
                ) : (
                  <div className="w-24 h-24 bg-slate-200 animate-pulse rounded-lg" />
                )}
                <span className="text-[10px] text-slate-400 font-mono mt-1">
                  {participant.registrationNumber}
                </span>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="bg-emerald-950 text-white text-[9px] text-center py-2 px-3 border-t border-emerald-800">
              Kartu Resmi Panitia Pelaksana • Tunjukkan saat registrasi & tampil
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex flex-wrap justify-between items-center gap-2">
          <span className="text-xs text-slate-500">
            Format resmi siap cetak / laminating
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Tutup
            </button>
            <button
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-emerald-950 rounded-lg shadow-sm transition disabled:opacity-60"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin text-emerald-950" />
              ) : (
                <Download className="w-4 h-4 text-emerald-950" />
              )}
              <span>{isDownloading ? 'Menyimpan...' : 'Unduh Gambar (PNG)'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg shadow-sm transition"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Kartu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
