import React, { useEffect, useState } from 'react';
import { Participant, SystemConfig } from '../../types';
import { OFFICIAL_BRANCHES } from '../../data/mtqBranches';
import { generateQrDataUrl, formatDateIndonesian } from '../../utils/certificateUtils';
import { ShieldCheck, Award, CheckCircle } from 'lucide-react';
import { LOGO_MTQ_NATIONAL, LOGO_LOMBOK_BARAT } from '../../assets/logo';

interface PrintableCertificateProps {
  participant: Participant;
  config: SystemConfig;
}

export const PrintableCertificate: React.FC<PrintableCertificateProps> = ({
  participant,
  config
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const branch = OFFICIAL_BRANCHES.find(b => b.id === participant.branchId);

  useEffect(() => {
    // Verification URL / payload
    const verificationPayload = JSON.stringify({
      certNo: participant.certificateNumber,
      hash: participant.certificateHash,
      name: participant.fullName,
      award: participant.awardTitle,
      branch: branch?.name || participant.branchId,
      category: participant.category,
      kafilah: participant.originKafilah,
      score: participant.finalScore,
      issued: config.announcementDate
    });

    generateQrDataUrl(verificationPayload).then(setQrCodeUrl);
  }, [participant, branch, config]);

  return (
    <div
      id="printable-certificate"
      className="w-full max-w-[1020px] aspect-[1.414/1] mx-auto bg-white text-slate-900 relative shadow-2xl rounded-sm p-8 sm:p-12 overflow-hidden flex flex-col justify-between border-[12px] border-emerald-900 print:border-[10px] select-none"
      style={{
        boxShadow: '0 0 40px rgba(6, 78, 59, 0.15)',
        backgroundColor: '#fefefe'
      }}
    >
      {/* Inner Ornate Gold Border Line */}
      <div className="absolute inset-3 border-2 border-amber-500/80 pointer-events-none rounded-sm"></div>
      <div className="absolute inset-4 border border-emerald-700/40 pointer-events-none rounded-sm"></div>

      {/* Decorative Corner Ornaments */}
      <div className="absolute top-5 left-5 text-amber-600/70 font-cinzel text-xl select-none">
        ❖
      </div>
      <div className="absolute top-5 right-5 text-amber-600/70 font-cinzel text-xl select-none">
        ❖
      </div>
      <div className="absolute bottom-5 left-5 text-amber-600/70 font-cinzel text-xl select-none">
        ❖
      </div>
      <div className="absolute bottom-5 right-5 text-amber-600/70 font-cinzel text-xl select-none">
        ❖
      </div>

      {/* Background Watermark Pattern */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none">
        <span className="text-[260px] font-arabic font-bold text-emerald-950 select-none">
          القرآن
        </span>
      </div>

      {/* Certificate Header */}
      <div className="text-center relative z-10 space-y-1">
        {/* Official Regional & National Logos */}
        <div className="flex items-center justify-center gap-6 mb-1">
          <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0" title="Pemerintah Kabupaten Lombok Barat">
            <img
              src={LOGO_LOMBOK_BARAT}
              alt="Logo Kabupaten Lombok Barat"
              className="max-w-full max-h-full object-contain drop-shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0" title="LPTQ / MTQ Nasional">
            <img
              src={LOGO_MTQ_NATIONAL}
              alt="Logo MTQ Nasional"
              className="max-w-full max-h-full object-contain drop-shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="text-2xl sm:text-3xl font-arabic text-emerald-950 font-bold mb-0.5 tracking-wider">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>

        <div className="text-[11px] sm:text-xs tracking-[0.25em] font-cinzel font-bold text-amber-700 uppercase">
          LEMBAGA PENGEMBANGAN TILAWATIL QUR'AN (LPTQ) KECAMATAN GERUNG
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-emerald-950 tracking-wider">
          PIAGAM PENGHARGAAN
        </h1>

        <div className="text-xs sm:text-sm font-serif font-bold text-slate-700 uppercase tracking-widest">
          {config.edition} • TAHUN {config.year}
        </div>

        <div className="text-[11px] text-slate-500 font-mono pt-0.5">
          Nomor: {participant.certificateNumber || `PIAGAM/MTQ-XXXII/LPTQ-GRG/${config.year}/${participant.participantCode}`}
        </div>
      </div>

      {/* Certificate Body */}
      <div className="text-center relative z-10 py-3 sm:py-4 space-y-2 sm:space-y-3">
        <p className="text-xs sm:text-sm text-slate-600 italic font-serif">
          Dewan Hakim Musabaqah Tilawatil Qur'an dengan ini menerangkan bahwa:
        </p>

        {/* Winner Name */}
        <div className="py-1">
          <span className="text-xl sm:text-3xl font-extrabold text-emerald-950 font-serif border-b-2 border-amber-500/80 pb-1 px-8 inline-block tracking-wide">
            {participant.fullName}
          </span>
          <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
            Utusan Kafilah: <strong className="text-slate-800">{participant.originKafilah}</strong>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 font-serif">
          Telah berhasil meraih prestasi gemilang sebagai:
        </p>

        {/* Award Badge / Title */}
        <div className="inline-block">
          <div className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-emerald-950 font-black text-base sm:text-xl uppercase tracking-widest shadow-md border border-amber-300">
            ★ {participant.awardTitle || 'JUARA TERBAIK'} ★
          </div>
        </div>

        {/* Branch & Category */}
        <div className="text-xs sm:text-sm text-slate-800 font-medium max-w-xl mx-auto leading-relaxed">
          Pada Cabang <strong className="text-emerald-950 font-bold">{branch?.name || participant.branchId}</strong>
          <br />
          Golongan: <strong className="text-emerald-900">{participant.category}</strong> ({participant.gender})
          <br />
          Dengan Perolehan Nilai Akhir: <strong className="font-mono text-emerald-900 font-bold text-sm sm:text-base">{participant.finalScore?.toFixed(2) || '97.00'}</strong> / 100
        </div>
      </div>

      {/* Certificate Footer: QR Code & Signatures */}
      <div className="relative z-10 pt-2 border-t border-amber-500/40 grid grid-cols-3 items-end text-center">
        {/* Signer 1: Ketua Umum LPTQ */}
        <div className="space-y-1 text-center">
          <div className="text-[11px] font-serif text-slate-600">
            {config.chairmanTitle || 'Ketua Umum LPTQ Kec. Gerung'}
          </div>
          {/* Digital Signature graphic */}
          <div className="h-14 flex items-center justify-center relative">
            <span className="font-serif italic text-emerald-800 text-lg sm:text-xl font-bold transform -rotate-6">
              H. Syafi'i
            </span>
          </div>
          <div className="text-xs font-bold text-slate-900 border-t border-slate-300 pt-1 font-serif">
            {config.chairmanName}
          </div>
          <div className="text-[10px] text-slate-500">
            NIP: 197204151998031005
          </div>
        </div>

        {/* Middle: Digital Verification Stamp & QR Code */}
        <div className="flex flex-col items-center justify-center space-y-1">
          <div className="relative">
            {qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt="QR Verifikasi Sertifikat"
                className="w-20 h-20 sm:w-24 sm:h-24 p-1 bg-white border-2 border-emerald-800 rounded-lg shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 bg-slate-200 animate-pulse rounded-lg" />
            )}
            {/* Stamp seal emblem */}
            <div className="absolute -bottom-2 -right-2 bg-amber-400 text-emerald-950 p-1 rounded-full border border-amber-300 shadow">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="text-[9px] font-mono text-slate-600 font-bold tracking-tighter">
            HASH: {participant.certificateHash || 'E9B3A74C81FD92E8'}
          </div>
          <div className="text-[8px] uppercase tracking-wider text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            LPTQ Kec. Gerung Terverifikasi
          </div>
        </div>

        {/* Signer 2: Ketua Dewan Hakim MTQ */}
        <div className="space-y-1 text-center">
          <div className="text-[10px] sm:text-[11px] font-serif text-slate-600">
            Ditetapkan di Gerung, Lombok Barat
            <br />
            Pada {formatDateIndonesian(config.announcementDate)}
            <br />
            {config.chiefJudgeTitle || 'Ketua Dewan Hakim'}
          </div>
          {/* Digital Signature graphic */}
          <div className="h-10 flex items-center justify-center relative">
            <span className="font-serif italic text-emerald-800 text-lg sm:text-xl font-bold transform -rotate-3">
              TGH. Ahmad Muammar
            </span>
          </div>
          <div className="text-xs font-bold text-slate-900 border-t border-slate-300 pt-1 font-serif">
            {config.chiefJudgeName}
          </div>
          <div className="text-[10px] text-slate-500">
            NIP: 197805122003121003
          </div>
        </div>
      </div>
    </div>
  );
};
