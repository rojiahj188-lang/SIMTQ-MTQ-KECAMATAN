import React, { useState } from 'react';
import { FahmilQuestionPackage, FAHMIL_PACKAGES_LIST, FahmilQuestion } from '../../data/officialDocsData';
import { LOGO_MTQ_NATIONAL, LOGO_LOMBOK_BARAT } from '../../assets/logo';
import { 
  BookOpen, 
  Search, 
  Eye, 
  EyeOff, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  Layers, 
  Download,
  Filter,
  Copy,
  Check
} from 'lucide-react';

interface FahmilQuestionsDocProps {
  printableRef?: React.RefObject<HTMLDivElement>;
  selectedPackageId: string;
  onSelectPackageId: (id: string) => void;
}

export const FahmilQuestionsDoc: React.FC<FahmilQuestionsDocProps> = ({
  printableRef,
  selectedPackageId,
  onSelectPackageId
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAllAnswers, setShowAllAnswers] = useState<boolean>(true);
  const [individualRevealed, setIndividualRevealed] = useState<Record<number, boolean>>({});
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const activePackage = FAHMIL_PACKAGES_LIST.find(p => p.id === selectedPackageId) || FAHMIL_PACKAGES_LIST[0];

  const categories = [
    'all',
    'Al-Qur\'an',
    'Fiqih',
    'Tajwid',
    'Ulumul Qur\'an',
    'Hadits',
    'Tarikh/Kisah',
    'Faraidh/Waris',
    'Bahasa Arab',
    'English',
    'Nagham'
  ];

  const filteredQuestions = activePackage.questions.filter(q => {
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.arabicText && q.arabicText.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  const handleCopyQuestion = (q: FahmilQuestion, idx: number) => {
    const text = `Soal No. ${q.number} (${q.category || 'MFQ'}):\n${q.question}\n${q.arabicText ? `\n[Teks Arab]: ${q.arabicText}\n` : ''}\nKunci Jawaban:\n${q.answer}`;
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleReveal = (qNum: number) => {
    setIndividualRevealed(prev => ({
      ...prev,
      [qNum]: !prev[qNum]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Package Selector & Round Selector */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-700" />
            <span className="font-bold text-slate-900 text-sm sm:text-base">
              Pilih Paket Soal Musabaqah Fahmil Qur'an (MFQ)
            </span>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-900 font-semibold px-2.5 py-1 rounded-full">
            Tersedia {FAHMIL_PACKAGES_LIST.length} Paket Soal Resmi
          </span>
        </div>

        {/* Package Tabs */}
        <div className="flex flex-wrap gap-2">
          {FAHMIL_PACKAGES_LIST.map((pkg) => {
            const isSelected = pkg.id === activePackage.id;
            return (
              <button
                key={pkg.id}
                onClick={() => onSelectPackageId(pkg.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm ring-2 ring-emerald-600/30'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  isSelected ? 'bg-amber-400 text-emerald-950 font-black' : 'bg-slate-200 text-slate-700'
                }`}>
                  {pkg.code}
                </span>
                <span>{pkg.round}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter & Toolbar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari materi soal (contoh: waris, tajwid, hadits, surat)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'Semua Kategori Bidang' : c}
              </option>
            ))}
          </select>
        </div>

        {/* Answer visibility toggle */}
        <button
          onClick={() => setShowAllAnswers(!showAllAnswers)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition border ${
            showAllAnswers
              ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
              : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
          }`}
          title="Tampilkan atau sembunyikan semua kunci jawaban untuk simulasi cerdas cermat"
        >
          {showAllAnswers ? <Eye className="w-3.5 h-3.5 text-amber-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
          <span>{showAllAnswers ? 'Kunci Jawaban: Tampil' : 'Mode Uji: Jawaban Tertutup'}</span>
        </button>
      </div>

      {/* Printable Sheet Area */}
      <div 
        id="fahmil-print-area"
        ref={printableRef}
        className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-200 space-y-6"
      >
        {/* Package Header with Official Kop & Logos */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-slate-900 pb-4 mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-emerald-300 p-1 bg-white shadow-xs flex items-center justify-center shrink-0" title="Kabupaten Lombok Barat">
            <img
              src={LOGO_LOMBOK_BARAT}
              alt="Logo Lombok Barat"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex-1 text-center">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-800">
              LEMBAGA PENGEMBANGAN TILAWATIL QUR'AN (LPTQ) KABUPATEN LOMBOK BARAT
            </p>
            <h2 className="text-base sm:text-xl font-extrabold text-slate-900 uppercase mt-0.5 font-serif">
              Cabang Fahmil Qur'an (MFQ) • {activePackage.title}
            </h2>
            <div className="mt-2 inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-mono font-bold">
              <span>KODE PAKET:</span>
              <span className="text-amber-400">{activePackage.code}</span>
              <span>•</span>
              <span className="text-emerald-300">{activePackage.round}</span>
            </div>
          </div>

          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-amber-400 p-1 bg-white shadow-xs flex items-center justify-center shrink-0" title="LPTQ / MTQ Nasional">
            <img
              src={LOGO_MTQ_NATIONAL}
              alt="Logo MTQ Nasional"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Question Cards */}
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            Tidak ditemukan butir soal yang sesuai dengan kriteria filter pencarian.
          </div>
        ) : (
          <div className="space-y-6">
            {filteredQuestions.map((q, idx) => {
              const isAnswerVisible = showAllAnswers || individualRevealed[q.number];

              return (
                <div 
                  key={q.number}
                  className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-emerald-300 transition relative"
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-emerald-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                        {q.number}
                      </span>
                      {q.category && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-900 border border-emerald-200">
                          {q.category}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyQuestion(q, idx)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/80 transition text-xs flex items-center gap-1"
                        title="Salin soal dan jawaban"
                      >
                        {copiedIndex === idx ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span className="hidden sm:inline text-[11px]">
                          {copiedIndex === idx ? 'Tersalin' : 'Salin'}
                        </span>
                      </button>

                      <button
                        onClick={() => toggleReveal(q.number)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/80 transition text-xs"
                        title={isAnswerVisible ? 'Sembunyikan Kunci' : 'Lihat Kunci'}
                      >
                        {isAnswerVisible ? <EyeOff className="w-3.5 h-3.5 text-slate-600" /> : <Eye className="w-3.5 h-3.5 text-amber-600" />}
                      </button>
                    </div>
                  </div>

                  {/* Question Body */}
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-3 pl-0 sm:pl-9">
                    <p className="font-medium text-justify">
                      <strong className="text-slate-900">Soal:</strong> {q.question}
                    </p>

                    {/* Arabic Text if any */}
                    {q.arabicText && (
                      <div className="p-3.5 rounded-xl bg-white border border-emerald-200 text-right font-serif text-base sm:text-lg md:text-xl text-emerald-950 leading-loose shadow-xs">
                        {q.arabicText}
                      </div>
                    )}

                    {/* Answer Area */}
                    {isAnswerVisible ? (
                      <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm">
                        <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>KUNCI JAWABAN DEWAN HAKIM:</span>
                        </div>
                        <p className="text-slate-800 font-semibold pl-5 text-justify">
                          {q.answer}
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={() => toggleReveal(q.number)}
                        className="w-full py-2 bg-slate-200/60 hover:bg-amber-100 text-slate-600 hover:text-amber-900 text-xs font-semibold rounded-lg border border-dashed border-slate-300 transition text-center"
                      >
                        Klik untuk melihat kunci jawaban resmi
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer info for printable */}
        <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-500 font-mono">
          <span>SIMTQ Digital LPTQ • Bank Soal Cabang Fahmil Qur'an</span>
          <span>Halaman Paket: {activePackage.code}</span>
        </div>
      </div>
    </div>
  );
};
