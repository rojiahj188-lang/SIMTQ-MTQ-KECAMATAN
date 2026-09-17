import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Users, 
  Loader2,
  FileText,
  ArrowRight
} from 'lucide-react';
import { Participant } from '../../types';
import { 
  downloadParticipantTemplateExcel, 
  parseParticipantsFromFile 
} from '../../utils/participantExportImport';
import { OFFICIAL_BRANCHES } from '../../data/mtqBranches';

interface ImportParticipantsModalProps {
  onClose: () => void;
  onImportSuccess: (newParticipants: Participant[], replaceAll: boolean) => void;
  currentParticipantCount: number;
}

export const ImportParticipantsModal: React.FC<ImportParticipantsModalProps> = ({
  onClose,
  onImportSuccess,
  currentParticipantCount
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedParticipants, setParsedParticipants] = useState<Participant[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [replaceAll, setReplaceAll] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File) => {
    if (!file) return;
    setSelectedFile(file);
    setIsProcessing(true);
    setWarnings([]);

    try {
      const result = await parseParticipantsFromFile(file, currentParticipantCount);
      setParsedParticipants(result.importedParticipants);
      setWarnings(result.warnings);
    } catch (err: any) {
      console.error('Error parsing file:', err);
      setWarnings([`Gagal membaca file: ${err?.message || 'Format tidak dikenali. Pastikan file Excel (.xlsx) atau CSV valid.'}`]);
      setParsedParticipants([]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleConfirmImport = () => {
    if (parsedParticipants.length === 0) return;
    onImportSuccess(parsedParticipants, replaceAll);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-emerald-900 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-800 rounded-xl">
              <FileSpreadsheet className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                Impor Data Pendaftaran Peserta MTQ
              </h3>
              <p className="text-xs text-emerald-200 mt-0.5">
                Dukungan file Microsoft Excel (.xlsx, .xls) dan CSV
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Template Download Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-950">Belum memiliki format data yang sesuai?</span>
                <p className="text-xs text-amber-800 mt-0.5">
                  Unduh contoh template pendaftaran resmi untuk mempermudah pengisian kolom data peserta.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={downloadParticipantTemplateExcel}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition shadow-sm shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              Unduh Template Excel
            </button>
          </div>

          {/* Upload Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
              isDragging
                ? 'border-emerald-500 bg-emerald-50/50'
                : selectedFile
                ? 'border-emerald-300 bg-emerald-50/20'
                : 'border-slate-300 hover:border-emerald-500 hover:bg-slate-50'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
              accept=".xlsx, .xls, .csv"
              className="hidden"
            />

            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 mb-1">
              <UploadCloud className="w-6 h-6" />
            </div>

            {selectedFile ? (
              <div>
                <p className="text-sm font-bold text-slate-800">{selectedFile.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {(selectedFile.size / 1024).toFixed(1)} KB • Klik atau seret file lain untuk mengganti
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-bold text-slate-700">
                  Klik untuk memilih file Excel atau seret file ke sini
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Format file yang didukung: .xlsx, .xls, atau .csv
                </p>
              </div>
            )}
          </div>

          {/* Loading Indicator */}
          {isProcessing && (
            <div className="flex items-center justify-center py-6 text-emerald-800 gap-2 text-sm font-semibold">
              <Loader2 className="w-5 h-5 animate-spin" />
              Membaca dan memvalidasi file Excel...
            </div>
          )}

          {/* Warnings list */}
          {warnings.length > 0 && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Catatan / Peringatan ({warnings.length}):
              </div>
              <ul className="text-xs text-amber-800 list-disc list-inside space-y-0.5 max-h-24 overflow-y-auto">
                {warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Preview Table if file parsed */}
          {parsedParticipants.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Ditemukan {parsedParticipants.length} Data Peserta Siap Diimpor:
                </span>
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-600">
                  <input
                    type="checkbox"
                    checked={replaceAll}
                    onChange={(e) => setReplaceAll(e.target.checked)}
                    className="rounded text-emerald-700 focus:ring-emerald-500"
                  />
                  Ganti seluruh data saat ini (Reset)
                </label>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0 border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">No</th>
                      <th className="py-2 px-3">Kode</th>
                      <th className="py-2 px-3">Nama Lengkap</th>
                      <th className="py-2 px-3">Kafilah</th>
                      <th className="py-2 px-3">Cabang & Golongan</th>
                      <th className="py-2 px-3 text-center">Gender</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {parsedParticipants.map((p, idx) => {
                      const branch = OFFICIAL_BRANCHES.find(b => b.id === p.branchId);
                      return (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-semibold text-slate-500">{idx + 1}</td>
                          <td className="py-2 px-3 font-mono font-bold text-emerald-900">{p.participantCode}</td>
                          <td className="py-2 px-3 font-bold text-slate-900">
                            {p.fullName}
                            {p.teamMembers && p.teamMembers.length > 0 && (
                              <span className="text-[10px] text-emerald-700 block font-normal">
                                Regu: {p.teamMembers.join(', ')}
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-3 text-slate-600">{p.originKafilah}</td>
                          <td className="py-2 px-3">
                            <span className="font-semibold text-slate-800">{branch?.code}</span> - {p.category}
                          </td>
                          <td className="py-2 px-3 text-center">
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 font-bold text-[10px] text-slate-700">
                              {p.gender === 'PUTRA' ? 'PA' : 'PI'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition"
          >
            Batal
          </button>
          
          <button
            type="button"
            disabled={parsedParticipants.length === 0 || isProcessing}
            onClick={handleConfirmImport}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-md shadow-emerald-800/20"
          >
            <Users className="w-4 h-4" />
            Impor {parsedParticipants.length > 0 ? `${parsedParticipants.length} Peserta` : ''}
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
