import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Participant, SystemConfig, Gender, ParticipantStatus } from '../types';
import { OFFICIAL_BRANCHES } from '../data/mtqBranches';
import { sanitizeFileName } from './certificateUtils';

/**
 * Helper to get human readable branch name
 */
function getBranchName(branchId: string): string {
  const b = OFFICIAL_BRANCHES.find(x => x.id === branchId);
  return b ? `[${b.code}] ${b.name}` : branchId;
}

/**
 * Ekspor Data Peserta ke format Excel (.xlsx)
 */
export function exportParticipantsToExcel(
  participants: Participant[],
  config: SystemConfig,
  filterName: string = 'Semua'
) {
  const dataRows = participants.map((p, index) => {
    const branch = OFFICIAL_BRANCHES.find(b => b.id === p.branchId);
    return {
      'No': index + 1,
      'No. Undian': p.orderNumber,
      'Kode Peserta': p.participantCode,
      'No. Registrasi': p.registrationNumber,
      'Nama Lengkap': p.fullName,
      'NIK / Identitas': p.nik,
      'Asal Kafilah': p.originKafilah,
      'Jenis Kelamin': p.gender === 'PUTRA' ? 'Putra' : 'Putri',
      'Cabang Musabaqah': branch?.name || p.branchId,
      'Kode Cabang': branch?.code || p.branchId,
      'Golongan / Kategori': p.category,
      'Tempat Lahir': p.birthPlace || '-',
      'Tanggal Lahir': p.birthDate || '-',
      'No. WhatsApp / HP': p.phone || '-',
      'Anggota Regu': p.teamMembers && p.teamMembers.length > 0 ? p.teamMembers.join(', ') : '-',
      'Status Musabaqah': p.status,
      'Tautan Streaming': p.streamUrl || '-',
      'Lampiran Foto': p.photoUrl ? 'Ada Foto' : 'Belum Ada',
      'Nilai Akhir': p.finalScore ?? '-',
      'Peringkat': p.rank ? `Juara ${p.rank}` : '-',
      'Predikat Juara': p.awardTitle || '-'
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(dataRows);

  // Set column widths
  const colWidths = [
    { wch: 5 },  // No
    { wch: 10 }, // No. Undian
    { wch: 14 }, // Kode Peserta
    { wch: 20 }, // No. Registrasi
    { wch: 28 }, // Nama Lengkap
    { wch: 18 }, // NIK
    { wch: 28 }, // Asal Kafilah
    { wch: 12 }, // Gender
    { wch: 24 }, // Cabang
    { wch: 12 }, // Kode Cabang
    { wch: 18 }, // Golongan
    { wch: 15 }, // Tempat Lahir
    { wch: 14 }, // Tanggal Lahir
    { wch: 16 }, // WhatsApp
    { wch: 28 }, // Anggota Regu
    { wch: 15 }, // Status
    { wch: 25 }, // Tautan Streaming
    { wch: 14 }, // Lampiran Foto
    { wch: 12 }, // Nilai Akhir
    { wch: 12 }, // Peringkat
    { wch: 16 }, // Predikat Juara
  ];
  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Daftar Peserta');

  // Also add metadata sheet
  const metaRows = [
    { 'Informasi': 'Nama Acara', 'Keterangan': config.eventName },
    { 'Informasi': 'Edisi Pelaksanaan', 'Keterangan': config.edition },
    { 'Informasi': 'Lokasi Tuan Rumah', 'Keterangan': config.hostLocation },
    { 'Informasi': 'Tahun Pelaksanaan', 'Keterangan': config.year },
    { 'Informasi': 'Ketua LPTQ', 'Keterangan': `${config.chairmanName} (${config.chairmanTitle})` },
    { 'Informasi': 'Ketua Dewan Hakim', 'Keterangan': `${config.chiefJudgeName} (${config.chiefJudgeTitle})` },
    { 'Informasi': 'Total Peserta Terdaftar', 'Keterangan': participants.length },
    { 'Informasi': 'Tanggal Ekspor', 'Keterangan': new Date().toLocaleString('id-ID') },
    { 'Informasi': 'Filter Yang Diterapkan', 'Keterangan': filterName }
  ];
  const metaSheet = XLSX.utils.json_to_sheet(metaRows);
  metaSheet['!cols'] = [{ wch: 24 }, { wch: 50 }];
  XLSX.utils.book_append_sheet(workbook, metaSheet, 'Informasi MTQ');

  const fileName = `Daftar_Peserta_MTQ_${config.year}_${sanitizeFileName(filterName)}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}

/**
 * Unduh Contoh Template Excel untuk Impor Peserta
 */
export function downloadParticipantTemplateExcel() {
  const sampleData = [
    {
      'Nama Lengkap*': 'Ahmad Fauzi Al-Hafidz',
      'NIK (16 Digit)*': '5201011234560010',
      'Asal Kafilah*': 'Kelurahan Gerung Selatan, Kec. Gerung',
      'Jenis Kelamin (Putra/Putri)*': 'Putra',
      'Cabang Lomba (Tilawah/Tahfiz/Tafsir/Fahmil/Syarhil/Khat/Hadis/KTIQ)*': 'Tilawah',
      'Golongan / Kategori*': 'Golongan Dewasa',
      'No. Undian': 15,
      'Tempat Lahir': 'Gerung',
      'Tanggal Lahir (YYYY-MM-DD)': '1998-05-20',
      'No. WhatsApp': '081234567899',
      'Anggota Regu 1 (Khusus Beregu)': '',
      'Anggota Regu 2 (Khusus Beregu)': '',
      'Tautan Streaming (Opsional)': ''
    },
    {
      'Nama Lengkap*': 'Siti Nurhaliza Zahra',
      'NIK (16 Digit)*': '5201015678900021',
      'Asal Kafilah*': 'Desa Beleke, Kec. Gerung',
      'Jenis Kelamin (Putra/Putri)*': 'Putri',
      'Cabang Lomba (Tilawah/Tahfiz/Tafsir/Fahmil/Syarhil/Khat/Hadis/KTIQ)*': 'Tahfiz 5 Juz & Tilawah',
      'Golongan / Kategori*': 'Golongan 5 Juz',
      'No. Undian': 16,
      'Tempat Lahir': 'Beleke',
      'Tanggal Lahir (YYYY-MM-DD)': '2005-11-14',
      'No. WhatsApp': '087812345678',
      'Anggota Regu 1 (Khusus Beregu)': '',
      'Anggota Regu 2 (Khusus Beregu)': '',
      'Tautan Streaming (Opsional)': ''
    },
    {
      'Nama Lengkap*': 'Regu Cerdas Cermat KLU',
      'NIK (16 Digit)*': '5201019988770032',
      'Asal Kafilah*': 'Desa Babussalam, Kec. Gerung',
      'Jenis Kelamin (Putra/Putri)*': 'Putra',
      'Cabang Lomba (Tilawah/Tahfiz/Tafsir/Fahmil/Syarhil/Khat/Hadis/KTIQ)*': 'Fahmil Quran (MFQ)',
      'Golongan / Kategori*': 'Golongan Beregu',
      'No. Undian': 17,
      'Tempat Lahir': 'Gerung',
      'Tanggal Lahir (YYYY-MM-DD)': '2008-01-01',
      'No. WhatsApp': '085912345678',
      'Anggota Regu 1 (Khusus Beregu)': 'Rafi Ahmad (Jubir)',
      'Anggota Regu 2 (Khusus Beregu)': 'Dani Pratama (Pendamping)',
      'Tautan Streaming (Opsional)': ''
    }
  ];

  const ws = XLSX.utils.json_to_sheet(sampleData);
  ws['!cols'] = [
    { wch: 26 }, { wch: 20 }, { wch: 32 }, { wch: 18 },
    { wch: 28 }, { wch: 20 }, { wch: 12 }, { wch: 16 },
    { wch: 18 }, { wch: 16 }, { wch: 24 }, { wch: 24 },
    { wch: 25 }
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Template Peserta');
  XLSX.writeFile(wb, 'Template_Import_Pendaftaran_MTQ.xlsx');
}

/**
 * Ekspor Data Peserta ke format Microsoft Word (.doc)
 */
export function exportParticipantsToWord(
  participants: Participant[],
  config: SystemConfig,
  filterName: string = 'Semua'
) {
  const dateFormatted = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const tableRowsHtml = participants.map((p, idx) => {
    const branch = OFFICIAL_BRANCHES.find(b => b.id === p.branchId);
    const photoBadge = p.photoUrl
      ? '<span style="color: #059669; font-weight: bold;">[Ada Foto]</span>'
      : '<span style="color: #9ca3af;">-</span>';

    return `
      <tr style="background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; font-size: 10pt;">${idx + 1}</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; font-family: monospace; font-weight: bold; font-size: 10pt; color: #064e3b;">${p.participantCode}</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; font-weight: bold; font-size: 10pt; color: #0f172a;">
          ${p.fullName}
          ${p.teamMembers && p.teamMembers.length > 0 ? `<div style="font-size: 8pt; color: #059669; font-weight: normal;">Anggota: ${p.teamMembers.join(', ')}</div>` : ''}
        </td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; font-size: 9pt; font-family: monospace;">${p.nik}</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; font-size: 9.5pt; color: #334155;">${p.originKafilah}</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; font-size: 9.5pt;">${p.gender === 'PUTRA' ? 'PA' : 'PI'}</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; font-size: 9.5pt;">${branch?.name || p.branchId}</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; font-size: 9pt;">${p.category}</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; font-weight: bold; font-size: 10pt; color: #b45309;">${p.orderNumber}</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; font-size: 9pt;">${p.status}</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; font-size: 9pt;">${photoBadge}</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; font-weight: bold; font-size: 9.5pt; color: #047857;">${p.finalScore ?? '-'}</td>
      </tr>
    `;
  }).join('');

  const wordHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>Daftar Peserta MTQ ${config.year}</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page {
          size: A4 landscape;
          margin: 1.5cm 1.5cm 1.5cm 1.5cm;
        }
        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 11pt;
          line-height: 1.3;
          color: #000000;
        }
        .header-kop {
          text-align: center;
          border-bottom: 3px double #000000;
          padding-bottom: 8px;
          margin-bottom: 15px;
        }
        .kop-title {
          font-size: 14pt;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0;
        }
        .kop-sub {
          font-size: 12pt;
          font-weight: bold;
          text-transform: uppercase;
          margin: 2px 0;
        }
        .kop-loc {
          font-size: 10pt;
          font-style: italic;
          margin: 0;
        }
        .doc-title {
          text-align: center;
          margin: 15px 0 10px 0;
        }
        .doc-title h2 {
          font-size: 13pt;
          font-weight: bold;
          text-decoration: underline;
          text-transform: uppercase;
          margin: 0;
        }
        .meta-info {
          font-size: 9.5pt;
          margin-bottom: 12px;
        }
        table.peserta-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 8px;
        }
        th {
          background-color: #064e3b;
          color: #ffffff;
          border: 1px solid #064e3b;
          padding: 8px 6px;
          font-size: 9.5pt;
          font-weight: bold;
          text-align: center;
        }
        .signatures {
          margin-top: 30px;
          width: 100%;
        }
      </style>
    </head>
    <body>
      <div class="header-kop">
        <div class="kop-title">LEMBAGA PENGEMBANGAN TILAWATIL QUR'AN (LPTQ)</div>
        <div class="kop-sub">${config.edition} TAHUN ${config.year}</div>
        <div class="kop-loc">${config.hostLocation}</div>
      </div>

      <div class="doc-title">
        <h2>DAFTAR REKAPITULASI RESMI PENDAFTARAN PESERTA</h2>
        <div style="font-size: 10pt; margin-top: 3px; font-weight: bold;">Status: Terverifikasi Panitia Pelaksana</div>
      </div>

      <div class="meta-info">
        <table style="width: 100%; border: none;">
          <tr>
            <td style="width: 60%; font-size: 9.5pt;">
              <strong>Total Peserta:</strong> ${participants.length} Orang/Regu &nbsp;|&nbsp;
              <strong>Filter:</strong> ${filterName}
            </td>
            <td style="text-align: right; font-size: 9.5pt;">
              <strong>Tanggal Cetak:</strong> ${dateFormatted}
            </td>
          </tr>
        </table>
      </div>

      <table class="peserta-table">
        <thead>
          <tr>
            <th style="width: 30px;">No</th>
            <th style="width: 80px;">Kode</th>
            <th>Nama Peserta</th>
            <th style="width: 100px;">NIK</th>
            <th>Asal Kafilah</th>
            <th style="width: 35px;">L/P</th>
            <th>Cabang Musabaqah</th>
            <th>Golongan</th>
            <th style="width: 40px;">Urut</th>
            <th style="width: 70px;">Status</th>
            <th style="width: 60px;">Foto</th>
            <th style="width: 50px;">Nilai</th>
          </tr>
        </thead>
        <tbody>
          ${tableRowsHtml}
        </tbody>
      </table>

      <div class="signatures">
        <table style="width: 100%; border: none; margin-top: 25px;">
          <tr>
            <td style="width: 50%; text-align: center; font-size: 10pt;">
              Mengetahui,<br>
              <strong>${config.chairmanTitle}</strong>
              <br><br><br><br>
              <u><strong>${config.chairmanName}</strong></u>
            </td>
            <td style="width: 50%; text-align: center; font-size: 10pt;">
              Gerung, ${dateFormatted}<br>
              <strong>Panitia Pendaftaran & Verifikasi</strong>
              <br><br><br><br>
              <u><strong>Sekretariat Panitia LPTQ</strong></u>
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + wordHtml], {
    type: 'application/msword;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Daftar_Peserta_MTQ_${config.year}_${sanitizeFileName(filterName)}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Ekspor Data Peserta ke format PDF Resmi Berstandar A4 Landscape
 */
export function exportParticipantsToPdf(
  participants: Participant[],
  config: SystemConfig,
  filterName: string = 'Semua'
) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const dateFormatted = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Kop Lembaga
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(6, 78, 59); // Emerald 900
  doc.text("LEMBAGA PENGEMBANGAN TILAWATIL QUR'AN (LPTQ)", pageWidth / 2, 12, { align: 'center' });

  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.text(`${config.edition} TAHUN ${config.year}`, pageWidth / 2, 17, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(config.hostLocation, pageWidth / 2, 21, { align: 'center' });

  // Divider line
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.7);
  doc.line(14, 23, pageWidth - 14, 23);
  doc.setLineWidth(0.2);
  doc.line(14, 24, pageWidth - 14, 24);

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('DAFTAR REKAPITULASI RESMI PENDAFTARAN PESERTA', pageWidth / 2, 30, { align: 'center' });

  // Subtitle / metadata
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`Kategori Filter: ${filterName} | Total Peserta: ${participants.length} Orang/Regu`, 14, 34);
  doc.text(`Tanggal Cetak: ${dateFormatted}`, pageWidth - 14, 34, { align: 'right' });

  // Table Data
  const tableData = participants.map((p, idx) => {
    const branch = OFFICIAL_BRANCHES.find(b => b.id === p.branchId);
    return [
      (idx + 1).toString(),
      p.orderNumber.toString(),
      p.participantCode,
      p.fullName + (p.teamMembers && p.teamMembers.length > 0 ? `\n(Anggota: ${p.teamMembers.join(', ')})` : ''),
      p.nik,
      p.originKafilah,
      p.gender === 'PUTRA' ? 'PA' : 'PI',
      branch?.name || p.branchId,
      p.category,
      p.status,
      p.photoUrl ? 'Ada' : '-',
      p.finalScore !== undefined ? p.finalScore.toFixed(2) : '-'
    ];
  });

  autoTable(doc, {
    startY: 37,
    head: [[
      'No',
      'Urut',
      'Kode',
      'Nama Peserta & Anggota',
      'NIK',
      'Kafilah Asal',
      'L/P',
      'Cabang Musabaqah',
      'Golongan',
      'Status',
      'Foto',
      'Nilai'
    ]],
    body: tableData,
    theme: 'grid',
    styles: {
      fontSize: 7.5,
      cellPadding: 1.8,
      overflow: 'linebreak'
    },
    headStyles: {
      fillColor: [6, 78, 59],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'center'
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 8 },
      1: { halign: 'center', cellWidth: 10, fontStyle: 'bold' },
      2: { halign: 'center', cellWidth: 20, fontStyle: 'bold' },
      3: { cellWidth: 50 },
      4: { cellWidth: 28, fontSize: 7 },
      5: { cellWidth: 42 },
      6: { halign: 'center', cellWidth: 9 },
      7: { cellWidth: 35 },
      8: { cellWidth: 25 },
      9: { halign: 'center', cellWidth: 18 },
      10: { halign: 'center', cellWidth: 10 },
      11: { halign: 'center', cellWidth: 12, fontStyle: 'bold' }
    },
    didDrawPage: (data) => {
      // Footer page numbering
      const str = `Halaman ${data.pageNumber} | SIMTQ Digital ${config.year}`;
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184);
      doc.text(str, pageWidth / 2, doc.internal.pageSize.getHeight() - 6, { align: 'center' });
    }
  });

  // Save the PDF
  const fileName = `Daftar_Peserta_MTQ_${config.year}_${sanitizeFileName(filterName)}.pdf`;
  doc.save(fileName);
}

/**
 * Parse file Excel / CSV ke dalam format Participant[]
 */
export async function parseParticipantsFromFile(
  file: File,
  existingCount: number = 0
): Promise<{
  successCount: number;
  importedParticipants: Participant[];
  warnings: string[];
}> {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const rows: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

  const importedParticipants: Participant[] = [];
  const warnings: string[] = [];

  rows.forEach((row, index) => {
    const rowNum = index + 2; // header is row 1
    
    // Attempt to map various header styles
    const fullName = String(
      row['Nama Lengkap*'] || row['Nama Lengkap'] || row['Nama Peserta'] || row['Nama'] || ''
    ).trim();

    if (!fullName) {
      warnings.push(`Baris ${rowNum}: Dilewati karena nama peserta kosong.`);
      return;
    }

    const nik = String(
      row['NIK (16 Digit)*'] || row['NIK'] || row['No. Identitas'] || row['NIK / Identitas'] || ''
    ).trim() || `520100${Date.now().toString().slice(-10)}`;

    const originKafilah = String(
      row['Asal Kafilah*'] || row['Asal Kafilah'] || row['Kafilah'] || row['Desa/Kelurahan'] || 'Kecamatan Gerung'
    ).trim();

    // Gender
    const rawGender = String(
      row['Jenis Kelamin (Putra/Putri)*'] || row['Jenis Kelamin'] || row['Gender'] || ''
    ).trim().toLowerCase();
    const gender: Gender = rawGender.includes('putri') || rawGender.includes('pi') || rawGender === 'p' ? 'PUTRI' : 'PUTRA';

    // Cabang Lomba
    const rawBranch = String(
      row['Cabang Lomba (Tilawah/Tahfiz/Tafsir/Fahmil/Syarhil/Khat/Hadis/KTIQ)*'] ||
      row['Cabang Lomba'] || row['Cabang Musabaqah'] || row['Cabang'] || ''
    ).trim().toLowerCase();

    let matchedBranch = OFFICIAL_BRANCHES[0];
    for (const b of OFFICIAL_BRANCHES) {
      if (
        rawBranch.includes(b.id.toLowerCase()) || 
        rawBranch.includes(b.code.toLowerCase()) ||
        rawBranch.includes(b.name.toLowerCase().slice(0, 5))
      ) {
        matchedBranch = b;
        break;
      }
    }

    // Category / Golongan
    const rawCategory = String(
      row['Golongan / Kategori*'] || row['Golongan'] || row['Kategori'] || ''
    ).trim();
    const category = rawCategory || matchedBranch.categories[0] || 'Umum';

    // Order number
    const rawOrder = Number(row['No. Undian'] || row['Nomor Undian'] || row['Urut']);
    const orderNumber = !isNaN(rawOrder) && rawOrder > 0 ? rawOrder : existingCount + importedParticipants.length + 1;

    // Dates & phone
    const birthPlace = String(row['Tempat Lahir'] || '').trim();
    const birthDate = String(row['Tanggal Lahir (YYYY-MM-DD)'] || row['Tanggal Lahir'] || '2000-01-01').trim();
    const phone = String(row['No. WhatsApp'] || row['WhatsApp'] || row['No. HP'] || '').trim();

    // Team members
    const team1 = String(row['Anggota Regu 1 (Khusus Beregu)'] || row['Anggota 1'] || '').trim();
    const team2 = String(row['Anggota Regu 2 (Khusus Beregu)'] || row['Anggota 2'] || '').trim();
    const teamMembers: string[] = [];
    if (team1) teamMembers.push(team1);
    if (team2) teamMembers.push(team2);

    const streamUrl = String(row['Tautan Streaming (Opsional)'] || row['Tautan Streaming'] || '').trim();

    const genderSuffix = gender === 'PUTRA' ? 'PA' : 'PI';
    const orderStr = orderNumber.toString().padStart(2, '0');
    const participantCode = `${matchedBranch.code}-${genderSuffix}-${orderStr}`;
    const newId = `p-imp-${Date.now()}-${index}`;
    const registrationNumber = `REG-MTQ-2026-${(existingCount + importedParticipants.length + 1).toString().padStart(3, '0')}`;

    importedParticipants.push({
      id: newId,
      registrationNumber,
      participantCode,
      fullName,
      nik,
      originKafilah,
      gender,
      birthPlace,
      birthDate,
      phone,
      branchId: matchedBranch.id,
      category,
      teamMembers: teamMembers.length > 0 ? teamMembers : undefined,
      status: 'TERDAFTAR',
      orderNumber,
      streamUrl: streamUrl || undefined,
      createdAt: new Date().toISOString(),
      judgeScores: []
    });
  });

  return {
    successCount: importedParticipants.length,
    importedParticipants,
    warnings
  };
}
