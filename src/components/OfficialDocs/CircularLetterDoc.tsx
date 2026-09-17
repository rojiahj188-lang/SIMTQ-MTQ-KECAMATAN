import React from 'react';
import { CircularLetterData } from '../../data/officialDocsData';
import { LOGO_MTQ_NATIONAL, LOGO_LOMBOK_BARAT } from '../../assets/logo';
import { Users, Calendar, MapPin, Award, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CircularLetterDocProps {
  data: CircularLetterData;
  printableRef?: React.RefObject<HTMLDivElement>;
}

export const CircularLetterDoc: React.FC<CircularLetterDocProps> = ({ data, printableRef }) => {
  return (
    <div 
      id="circular-letter-print-area"
      ref={printableRef}
      className="bg-white p-6 sm:p-10 md:p-12 rounded-2xl shadow-sm border border-slate-200 text-slate-800 font-sans max-w-4xl mx-auto leading-relaxed"
    >
      {/* Official Kop Surat */}
      <div className="border-b-4 border-double border-slate-900 pb-5 mb-6 text-center relative">
        <div className="flex items-center justify-between gap-4">
          <div className="w-20 h-20 shrink-0 hidden sm:flex items-center justify-center p-1 border border-slate-200 rounded-lg bg-white shadow-sm" title="Kabupaten Lombok Barat">
            <img 
              src={LOGO_LOMBOK_BARAT} 
              alt="Logo Kabupaten Lombok Barat" 
              className="max-h-full max-w-full object-contain" 
            />
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-base sm:text-lg md:text-xl font-extrabold uppercase tracking-tight text-slate-900 font-serif">
              Lembaga Pengembangan Tilawatil Qur'an (LPTQ)
            </h1>
            <h2 className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider text-emerald-900 mt-0.5 font-serif">
              Provinsi Nusa Tenggara Barat
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-600 mt-1">
              Alamat : Gedung Pendidikan Islamic Center Provinsi NTB, Jl. Langko No. 2 Mataram
            </p>
            <p className="text-[11px] sm:text-xs text-slate-600">
              Email: <span className="text-emerald-800 font-medium">lptq.ntb@gmail.com</span>, Telp: <span className="font-medium">081234594007</span>
            </p>
          </div>
          <div className="w-20 h-20 shrink-0 hidden sm:flex items-center justify-center p-1 border border-slate-200 rounded-lg bg-white shadow-sm" title="LPTQ / MTQ Nasional">
            <img 
              src={LOGO_MTQ_NATIONAL} 
              alt="Logo MTQ Nasional" 
              className="max-h-full max-w-full object-contain" 
            />
          </div>
        </div>
      </div>

      {/* Surat Metadata */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 text-xs sm:text-sm">
        <div className="space-y-1">
          <div className="flex gap-2">
            <span className="w-16 font-semibold text-slate-600">Nomor</span>
            <span>: <strong>{data.letterNumber}</strong></span>
          </div>
          <div className="flex gap-2">
            <span className="w-16 font-semibold text-slate-600">Sifat</span>
            <span>: <span className="bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded text-xs">Penting</span></span>
          </div>
          <div className="flex gap-2">
            <span className="w-16 font-semibold text-slate-600">Hal</span>
            <span>: <strong className="text-emerald-950">{data.subject}</strong></span>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <p className="font-medium text-slate-700">{data.location}, {data.date}</p>
          <div className="mt-3 text-left sm:text-left inline-block bg-slate-50 p-3 rounded-lg border border-slate-200">
            <p className="font-semibold text-slate-700">Kepada Yang Terhormat:</p>
            <ol className="list-decimal list-inside text-xs mt-1 space-y-0.5 text-slate-800">
              {data.recipient.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ol>
            <p className="text-xs italic text-slate-600 mt-1">di - Tempat</p>
          </div>
        </div>
      </div>

      {/* Pembuka */}
      <div className="my-4 text-xs sm:text-sm space-y-2">
        <p className="font-serif italic text-emerald-950 font-bold text-base text-center my-3">
          Bismillahirrahmanirrahim.<br />
          Assalamu'alaikum Warahmatullahi Wabarakatuh.
        </p>
        <p className="text-justify indent-8 leading-relaxed text-slate-700">
          Berdasarkan Keputusan Menteri Agama nomor 739, tanggal 25 Mei 2026 tentang Penyelenggaraan Musabaqah Tilawatil Quran (MTQ), maka bersama ini kami sampaikan beberapa hal berikut:
        </p>
      </div>

      {/* Bagian I: Waktu & Tempat */}
      <div className="my-5 bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 text-xs sm:text-sm">
        <div className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
          <Calendar className="w-4 h-4 text-emerald-700" />
          <span>I. Waktu & Lokasi Penyelenggaraan MTQ XXXII Tingkat Provinsi NTB</span>
        </div>
        <p className="text-slate-700 leading-relaxed pl-6">
          Penyelenggaraan <strong>MTQ XXXII Tingkat Provinsi NTB</strong> direncanakan akan diselenggarakan pada <span className="bg-amber-100 text-amber-950 font-semibold px-1 rounded">{data.eventPlannedDate}</span>, bertempat di <strong>{data.eventHost}</strong>.
        </p>
      </div>

      {/* Bagian II: Komposisi Kafilah */}
      <div className="my-5 bg-white rounded-xl border border-slate-200 overflow-hidden text-xs sm:text-sm shadow-xs">
        <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Users className="w-4 h-4 text-amber-400" />
            <span>II. Jumlah Kafilah Resmi Masing-Masing Kabupaten / Kota</span>
          </div>
          <span className="text-xs bg-amber-400 text-slate-950 font-extrabold px-2 py-0.5 rounded">
            Total {data.totalPerKabKota} Orang / Kafilah
          </span>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.contingentBreakdown.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-700">
                  {String.fromCharCode(97 + index)}. {item.role}
                </span>
                <strong className="text-emerald-900 font-bold bg-white px-2.5 py-0.5 rounded border border-slate-200">
                  {item.count} orang
                </strong>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap justify-between items-center bg-emerald-900 text-white p-3 rounded-lg">
            <span className="font-semibold text-xs sm:text-sm">
              Total Seluruh Kafilah se-Provinsi NTB (10 Kab/Kota × 102 orang):
            </span>
            <span className="text-base font-extrabold text-amber-300">
              {data.totalProvince.toLocaleString()} Orang
            </span>
          </div>
        </div>
      </div>

      {/* Bagian III: 9 Cabang & Batasan Umur */}
      <div className="my-6">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-3">
          <Award className="w-4 h-4 text-emerald-700" />
          <span>III. Cabang dan Golongan yang Dimusabaqahkan (Pedoman MTQ Nasional 2026)</span>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          {data.branches.map((b) => (
            <div key={b.number} className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-emerald-800 text-white px-3.5 py-2 font-bold flex items-center justify-between">
                <span>{b.number}. {b.name}</span>
                <span className="text-[11px] bg-emerald-950 text-emerald-200 px-2 py-0.5 rounded font-normal">
                  {b.categories.length} Golongan
                </span>
              </div>
              <div className="divide-y divide-slate-100 bg-white">
                {b.categories.map((cat, idx) => (
                  <div key={idx} className="p-2.5 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-700 hover:bg-slate-50/80">
                    <span className="font-medium text-slate-900">
                      • {cat.title} {cat.quota && <span className="text-xs text-amber-700 font-semibold">({cat.quota})</span>}
                    </span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono shrink-0">
                      {cat.ageLimit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Penutup */}
      <div className="my-6 text-xs sm:text-sm space-y-2 text-slate-700 leading-relaxed">
        <p className="text-justify indent-8">
          Selanjutnya hal-hal lain yang menyangkut teknis penyelenggaraan dan lain sebagainya akan diatur dan disampaikan kemudian.
        </p>
        <p className="text-justify indent-8">
          Demikian atas perhatian dan kerjasamanya disampaikan terima kasih.
        </p>
        <p className="font-serif italic text-emerald-950 font-bold mt-3">
          Wabillahi taufik wal hidayah.<br />
          Wassalamu'alaikum Warahmatullahi Wabarakatuh.
        </p>
      </div>

      {/* Tanda Tangan & Stempel */}
      <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start gap-6 text-xs sm:text-sm">
        {/* Tembusan */}
        <div className="text-slate-600 max-w-xs">
          <p className="font-bold text-slate-800 mb-1">Tembusan:</p>
          <ol className="list-decimal list-inside space-y-0.5 text-xs text-slate-600">
            {data.copies.map((copy, i) => (
              <li key={i}>{copy}</li>
            ))}
          </ol>
        </div>

        {/* Tanda Tangan Lembaga */}
        <div className="text-center sm:text-right min-w-[240px]">
          <p className="font-bold text-slate-900">{data.signer.institution}</p>
          <p className="font-semibold text-emerald-900">{data.signer.role},</p>
          
          {/* Stempel & Paraf Digital */}
          <div className="my-3 py-2 flex items-center justify-center sm:justify-end gap-3">
            <div className="border-2 border-emerald-700 rounded-full w-20 h-20 flex flex-col items-center justify-center text-center p-1 text-[9px] text-emerald-800 font-bold uppercase rotate-[-8deg] shadow-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-700 mb-0.5" />
              <span>LPTQ NTB</span>
              <span className="text-[7px] text-slate-600">RESMI</span>
            </div>
            <div className="font-serif italic text-lg font-bold text-slate-700 pr-4">
              (Tertanda)
            </div>
          </div>

          <p className="font-bold text-slate-950 underline decoration-2 decoration-emerald-800 text-sm">
            {data.signer.name}
          </p>
          <p className="text-[11px] text-slate-500">NIP / SK Pengurus LPTQ Prov. NTB</p>
        </div>
      </div>
    </div>
  );
};
