import React, { useEffect, useState } from 'react';
import { X, Printer, Download, Loader2, ShieldCheck, CheckCircle2, QrCode as QrIcon } from 'lucide-react';
import { CommitteeMember, SystemConfig } from '../../types';
import { generateQrDataUrl, downloadElementAsImage, sanitizeFileName } from '../../utils/certificateUtils';
import { LOGO_MTQ_NATIONAL, LOGO_LOMBOK_BARAT } from '../../assets/logo';

interface CommitteeIdCardModalProps {
  member: CommitteeMember | null;
  config: SystemConfig;
  onClose: () => void;
}

export const CommitteeIdCardModal: React.FC<CommitteeIdCardModalProps> = ({
  member,
  config,
  onClose
}) => {
  const [qrUrl, setQrUrl] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  useEffect(() => {
    if (member) {
      const qrPayload = JSON.stringify({
        org: `LPTQ ${config.edition?.toUpperCase() || 'KECAMATAN LOMBOK BARAT'}`,
        event: config.edition,
        type: 'ID_CARD_PANITIA_RESMI',
        code: member.code,
        name: member.fullName,
        role: member.positionName,
        div: member.division,
        inst: member.institution,
        access: member.accessArea,
        verified: true
      });
      generateQrDataUrl(qrPayload).then(setQrUrl);
    }
  }, [member, config]);

  if (!member) return null;

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      handleDownloadImage();
    }
  };

  const handleDownloadImage = async () => {
    const el = document.getElementById('printable-committee-idcard');
    if (!el) return;
    setIsDownloading(true);
    try {
      const safeName = sanitizeFileName(member.fullName);
      await downloadElementAsImage(el, `IDCard_Panitia_${member.code}_${safeName}.png`);
    } finally {
      setIsDownloading(false);
    }
  };

  // Color scheme based on role
  const getRoleTheme = (cat: CommitteeMember['roleCategory']) => {
    switch (cat) {
      case 'DEWAN_HAKIM':
      case 'PANITERA':
        return {
          headerBg: 'bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800',
          ribbonBg: 'bg-amber-500 text-amber-950',
          badgeBorder: 'border-amber-400',
          roleLabel: 'DEWAN HAKAM / JURI MTQ',
          accentText: 'text-amber-700',
          accentBg: 'bg-amber-50 border-amber-200'
        };
      case 'SEKSI_IT_MEDIA':
        return {
          headerBg: 'bg-gradient-to-r from-blue-800 via-indigo-700 to-blue-900',
          ribbonBg: 'bg-blue-500 text-white',
          badgeBorder: 'border-blue-400',
          roleLabel: 'TIM IT & MULTIMEDIA MTQ',
          accentText: 'text-blue-700',
          accentBg: 'bg-blue-50 border-blue-200'
        };
      case 'TIM_MEDIS':
        return {
          headerBg: 'bg-gradient-to-r from-red-700 via-rose-600 to-red-800',
          ribbonBg: 'bg-rose-600 text-white',
          badgeBorder: 'border-rose-400',
          roleLabel: 'TIM MEDIS & KESEHATAN',
          accentText: 'text-rose-700',
          accentBg: 'bg-rose-50 border-rose-200'
        };
      case 'SEKSI_KEAMANAN':
        return {
          headerBg: 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900',
          ribbonBg: 'bg-slate-800 text-white',
          badgeBorder: 'border-slate-400',
          roleLabel: 'TIM PENGAMANAN & TERTIB',
          accentText: 'text-slate-800',
          accentBg: 'bg-slate-100 border-slate-300'
        };
      case 'PENANGGUNG_JAWAB':
        return {
          headerBg: 'bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900',
          ribbonBg: 'bg-amber-400 text-emerald-950 font-black',
          badgeBorder: 'border-amber-400',
          roleLabel: 'PENANGGUNG JAWAB & PENGARAH',
          accentText: 'text-emerald-800',
          accentBg: 'bg-emerald-50 border-emerald-200'
        };
      default: // PANITIA_INTI, SEKSI_MUSABAQAH, dll
        return {
          headerBg: 'bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800',
          ribbonBg: 'bg-emerald-600 text-white',
          badgeBorder: 'border-emerald-400',
          roleLabel: 'PANITIA PELAKSANA MTQ',
          accentText: 'text-emerald-800',
          accentBg: 'bg-emerald-50 border-emerald-200'
        };
    }
  };

  const theme = getRoleTheme(member.roleCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 my-4">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-emerald-950 text-white">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm sm:text-base">KARTU TANDA PANITIA MTQ</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable ID Card Container */}
        <div className="p-6 bg-slate-100 flex justify-center">
          <div
            id="printable-committee-idcard"
            className="w-80 bg-white rounded-2xl border-2 border-emerald-700 shadow-xl overflow-hidden relative flex flex-col"
            style={{ width: '320px', minHeight: '520px' }}
          >
            {/* Lanyard Slot Simulator */}
            <div className="bg-slate-200/90 py-1 flex justify-center items-center border-b border-slate-300">
              <div className="w-12 h-2.5 bg-slate-400/80 rounded-full border border-slate-500/50 shadow-inner" />
            </div>

            {/* Top Header Card */}
            <div className={`${theme.headerBg} text-white text-center p-3 relative flex items-center justify-between gap-2 shadow-md`}>
              <div className="w-10 h-10 bg-white rounded-full p-1 shrink-0 border border-amber-300 shadow" title="Kabupaten Lombok Barat">
                <img
                  src={LOGO_LOMBOK_BARAT}
                  alt="Logo Lombok Barat"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 text-center">
                <div className="text-[8px] uppercase font-semibold tracking-wider text-amber-300 leading-tight">
                  Lembaga Pengembangan Tilawatil Qur'an
                </div>
                <div className="text-[11px] font-bold font-serif uppercase tracking-tight leading-tight mt-0.5">
                  {config.edition}
                </div>
                <div className="text-[8px] text-emerald-200">
                  Kecamatan Gerung • Kab. Lombok Barat
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

            {/* Role Ribbon Bar */}
            <div className={`py-1 px-3 text-center font-black text-xs uppercase tracking-widest shadow-sm ${theme.ribbonBg}`}>
              {theme.roleLabel}
            </div>

            {/* Body */}
            <div className="p-4 text-center flex flex-col items-center flex-1">
              {/* Photo */}
              <div className="relative mb-3 mt-1">
                {member.photoUrl ? (
                  <div className="w-24 h-30 rounded-xl border-3 border-emerald-600 overflow-hidden shadow-md bg-white shrink-0">
                    <img
                      src={member.photoUrl}
                      alt={member.fullName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-30 bg-emerald-50 rounded-xl border-3 border-emerald-600 flex flex-col items-center justify-center p-2 shadow-inner shrink-0">
                    <span className="text-3xl font-bold text-emerald-800">
                      {member.fullName.charAt(0)}
                    </span>
                    <span className="text-[9px] text-emerald-600 font-semibold uppercase mt-1">
                      PANITIA
                    </span>
                  </div>
                )}
                {/* Code Badge */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-slate-900 text-amber-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-amber-400/80 shadow">
                  {member.code}
                </div>
              </div>

              {/* Name & Title */}
              <div className="mt-2 text-center w-full">
                <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                  {member.titleWithDegree || member.fullName}
                </h4>
                <p className="text-[11px] font-bold text-emerald-800 mt-0.5">
                  {member.positionName}
                </p>
                <p className="text-[10px] text-slate-500">
                  {member.institution}
                </p>
              </div>

              {/* Access Level Badge */}
              <div className="mt-3 w-full bg-slate-900 text-white rounded-lg py-1 px-2 flex items-center justify-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-amber-300">
                  AKSES: {member.accessArea}
                </span>
              </div>

              {/* Details Box */}
              <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 mt-2 text-left text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Divisi/Seksi:</span>
                  <span className="font-semibold text-slate-800 text-right truncate max-w-[170px]">{member.division}</span>
                </div>
                {member.nipOrNik && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">NIP / NIK:</span>
                    <span className="font-mono text-slate-700 text-right">{member.nipOrNik}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Status Validasi:</span>
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    RESMI TERTETAPKAN
                  </span>
                </div>
              </div>

              {/* QR Code and Security Verification */}
              <div className="mt-2.5 flex items-center justify-between w-full px-2">
                <div className="flex flex-col items-start">
                  <div className="text-[9px] font-bold text-slate-700 flex items-center gap-1">
                    <QrIcon className="w-3 h-3 text-emerald-700" />
                    Pindai Validasi:
                  </div>
                  <div className="text-[8px] text-slate-400 font-mono mt-0.5">
                    ID: {member.code}
                  </div>
                  <div className="text-[7.5px] text-emerald-800 font-semibold mt-1">
                    Disahkan: LPTQ Kec. Gerung
                  </div>
                </div>

                {qrUrl ? (
                  <img
                    src={qrUrl}
                    alt="QR Panitia"
                    className="w-16 h-16 rounded border border-slate-300 p-0.5 bg-white shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 bg-slate-200 animate-pulse rounded" />
                )}
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="bg-emerald-950 text-white text-[8px] text-center py-1.5 px-2 border-t border-emerald-800">
              Wajib dikenakan selama musabaqah berlangsung di area MTQ
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-5 py-3.5 bg-white border-t border-slate-200 flex flex-wrap justify-between items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Tutup
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-emerald-950 rounded-xl shadow-sm transition disabled:opacity-60"
            >
              {isDownloading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-950" />
              ) : (
                <Download className="w-3.5 h-3.5 text-emerald-950" />
              )}
              <span>{isDownloading ? 'Menyimpan...' : 'Unduh PNG'}</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-sm transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Kartu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
