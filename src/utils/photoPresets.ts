/**
 * Preset avatar pas foto formal standar Indonesia (Latar Merah/Biru/Hijau MTQ)
 * Digunakan sebagai contoh cepat atau alternatif jika belum memiliki scan foto fisik.
 */

export const PAS_FOTO_PRESETS = [
  {
    id: 'pa-merah',
    label: 'Putra - Peci Hitam (Latar Merah)',
    gender: 'PUTRA',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200">
      <rect width="160" height="200" fill="%23dc2626"/>
      <!-- Badan Jas / Baju Koko -->
      <path d="M20 200 L40 140 L60 135 L80 155 L100 135 L120 140 L140 200 Z" fill="%231e293b"/>
      <!-- Kerah Koko Putih -->
      <polygon points="70,135 80,150 90,135 80,138" fill="%23ffffff"/>
      <!-- Leher -->
      <rect x="68" y="115" width="24" height="25" fill="%23fcd34d" rx="4"/>
      <!-- Kepala -->
      <ellipse cx="80" cy="85" rx="32" ry="38" fill="%23fed7aa"/>
      <!-- Peci / Songkok Hitam -->
      <path d="M48 65 Q80 48 112 65 L110 38 Q80 30 50 38 Z" fill="%230f172a"/>
      <!-- Wajah & Mata -->
      <circle cx="68" cy="84" r="3" fill="%231e293b"/>
      <circle cx="92" cy="84" r="3" fill="%231e293b"/>
      <!-- Senyum -->
      <path d="M72 102 Q80 108 88 102" stroke="%239a3412" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    id: 'pa-biru',
    label: 'Putra - Sorban / Peci Putih (Latar Biru)',
    gender: 'PUTRA',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200">
      <rect width="160" height="200" fill="%232563eb"/>
      <!-- Jas Hijau Tua MTQ -->
      <path d="M20 200 L40 140 L60 135 L80 155 L100 135 L120 140 L140 200 Z" fill="%23064e3b"/>
      <!-- Kemeja Putih -->
      <polygon points="70,135 80,150 90,135 80,138" fill="%23ffffff"/>
      <!-- Leher -->
      <rect x="68" y="115" width="24" height="25" fill="%23fcd34d" rx="4"/>
      <!-- Kepala -->
      <ellipse cx="80" cy="85" rx="32" ry="38" fill="%23fed7aa"/>
      <!-- Peci Putih Haji / Qari -->
      <path d="M48 65 Q80 48 112 65 L110 40 Q80 32 50 40 Z" fill="%23f8fafc" stroke="%23cbd5e1" stroke-width="1.5"/>
      <!-- Mata -->
      <circle cx="68" cy="84" r="3" fill="%231e293b"/>
      <circle cx="92" cy="84" r="3" fill="%231e293b"/>
      <!-- Senyum -->
      <path d="M72 102 Q80 108 88 102" stroke="%239a3412" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    id: 'pi-merah',
    label: 'Putri - Hijab Putih (Latar Merah)',
    gender: 'PUTRI',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200">
      <rect width="160" height="200" fill="%23dc2626"/>
      <!-- Hijab / Jilbab Putih Menutup Dada -->
      <path d="M25 200 L35 150 Q80 170 125 150 L135 200 Z" fill="%23f8fafc"/>
      <!-- Hijab Kepala -->
      <ellipse cx="80" cy="82" rx="45" ry="52" fill="%23ffffff"/>
      <!-- Bukaan Muka -->
      <ellipse cx="80" cy="88" rx="26" ry="32" fill="%23fed7aa"/>
      <!-- Ciput Hijab -->
      <path d="M54 75 Q80 62 106 75 Z" fill="%23065f46"/>
      <!-- Mata -->
      <circle cx="70" cy="86" r="3" fill="%231e293b"/>
      <circle cx="90" cy="86" r="3" fill="%231e293b"/>
      <!-- Alis -->
      <path d="M66 80 Q71 78 76 80" stroke="%231e293b" stroke-width="1.5" fill="none"/>
      <path d="M84 80 Q89 78 94 80" stroke="%231e293b" stroke-width="1.5" fill="none"/>
      <!-- Senyum -->
      <path d="M74 104 Q80 108 86 104" stroke="%23e11d48" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    id: 'pi-hijau',
    label: 'Putri - Hijab Hijau MTQ (Latar Biru)',
    gender: 'PUTRI',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200">
      <rect width="160" height="200" fill="%232563eb"/>
      <!-- Hijab Hijau Syari -->
      <path d="M20 200 L30 145 Q80 175 130 145 L140 200 Z" fill="%23047857"/>
      <!-- Hijab Kepala -->
      <ellipse cx="80" cy="82" rx="45" ry="52" fill="%23065f46"/>
      <!-- Bukaan Muka -->
      <ellipse cx="80" cy="88" rx="26" ry="32" fill="%23fed7aa"/>
      <!-- Ciput Putih -->
      <path d="M54 75 Q80 62 106 75 Z" fill="%23ffffff"/>
      <!-- Mata -->
      <circle cx="70" cy="86" r="3" fill="%231e293b"/>
      <circle cx="90" cy="86" r="3" fill="%231e293b"/>
      <!-- Senyum -->
      <path d="M74 104 Q80 108 86 104" stroke="%23e11d48" stroke-width="2" fill="none"/>
    </svg>`
  }
];

export const PANITIA_FOTO_PRESETS = [
  {
    id: 'panitia-jas-peci',
    label: 'Pria - Jas Hitam, Dasi & Peci Resmi (Dewan Hakim & Panitia Inti)',
    gender: 'PUTRA',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200">
      <rect width="160" height="200" fill="%23dc2626"/>
      <!-- Jas Hitam -->
      <path d="M15 200 L35 135 L60 130 L80 160 L100 130 L125 135 L145 200 Z" fill="%230f172a"/>
      <!-- Kemeja Putih -->
      <polygon points="62,130 80,155 98,130 80,132" fill="%23ffffff"/>
      <!-- Dasi Merah Maroon / Emas -->
      <polygon points="76,132 84,132 86,168 80,178 74,168" fill="%23991b1b"/>
      <!-- Leher -->
      <rect x="68" y="112" width="24" height="22" fill="%23fcd34d" rx="3"/>
      <!-- Kepala -->
      <ellipse cx="80" cy="82" rx="30" ry="36" fill="%23fed7aa"/>
      <!-- Peci Songkok Hitam Formal -->
      <path d="M46 62 Q80 44 114 62 L112 34 Q80 26 48 34 Z" fill="%23020617"/>
      <line x1="50" y1="60" x2="110" y2="60" stroke="%23f59e0b" stroke-width="1.5"/>
      <!-- Mata & Kacamata Elegan -->
      <circle cx="68" cy="80" r="2.5" fill="%231e293b"/>
      <circle cx="92" cy="80" r="2.5" fill="%231e293b"/>
      <rect x="60" y="74" width="16" height="12" rx="2" fill="none" stroke="%23475569" stroke-width="1.2"/>
      <rect x="84" y="74" width="16" height="12" rx="2" fill="none" stroke="%23475569" stroke-width="1.2"/>
      <line x1="76" y1="79" x2="84" y2="79" stroke="%23475569" stroke-width="1.2"/>
      <!-- Senyum Berwibawa -->
      <path d="M72 98 Q80 104 88 98" stroke="%2378350f" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    id: 'panitia-jas-hijau',
    label: 'Pria - Seragam Jas Hijau LPTQ / Kemenag (Panitia Pelaksana)',
    gender: 'PUTRA',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200">
      <rect width="160" height="200" fill="%232563eb"/>
      <!-- Jas Hijau LPTQ -->
      <path d="M15 200 L35 135 L60 130 L80 160 L100 130 L125 135 L145 200 Z" fill="%23064e3b"/>
      <!-- Kemeja Putih -->
      <polygon points="62,130 80,155 98,130 80,132" fill="%23ffffff"/>
      <!-- Dasi Hijau Tua -->
      <polygon points="76,132 84,132 86,168 80,178 74,168" fill="%23047857"/>
      <!-- Leher -->
      <rect x="68" y="112" width="24" height="22" fill="%23fcd34d" rx="3"/>
      <!-- Kepala -->
      <ellipse cx="80" cy="82" rx="30" ry="36" fill="%23fed7aa"/>
      <!-- Peci Songkok Hitam -->
      <path d="M46 62 Q80 44 114 62 L112 34 Q80 26 48 34 Z" fill="%230f172a"/>
      <!-- Wajah & Mata -->
      <circle cx="68" cy="80" r="3" fill="%231e293b"/>
      <circle cx="92" cy="80" r="3" fill="%231e293b"/>
      <!-- Senyum -->
      <path d="M72 98 Q80 104 88 98" stroke="%2378350f" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    id: 'panitia-putri-formal',
    label: 'Wanita - Jilbab Formal Kemenag / LPTQ (Latar Merah)',
    gender: 'PUTRI',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200">
      <rect width="160" height="200" fill="%23dc2626"/>
      <!-- Blazer Hitam / Gelap -->
      <path d="M15 200 L30 145 Q80 175 130 145 L145 200 Z" fill="%231e293b"/>
      <!-- Jilbab Cream / Formal Menutup Rapi -->
      <path d="M28 200 L38 148 Q80 168 122 148 L132 200 Z" fill="%23fef3c7"/>
      <!-- Jilbab Kepala -->
      <ellipse cx="80" cy="80" rx="44" ry="50" fill="%23fef3c7"/>
      <!-- Bukaan Wajah -->
      <ellipse cx="80" cy="86" rx="25" ry="30" fill="%23fed7aa"/>
      <!-- Ciput Hijau Tua -->
      <path d="M56 73 Q80 62 104 73 Z" fill="%23065f46"/>
      <!-- Mata & Senyum -->
      <circle cx="71" cy="84" r="2.8" fill="%231e293b"/>
      <circle cx="89" cy="84" r="2.8" fill="%231e293b"/>
      <path d="M68 78 Q72 76 76 78" stroke="%231e293b" stroke-width="1.2" fill="none"/>
      <path d="M84 78 Q88 76 92 78" stroke="%231e293b" stroke-width="1.2" fill="none"/>
      <path d="M74 102 Q80 106 86 102" stroke="%23e11d48" stroke-width="2" fill="none"/>
    </svg>`
  }
];
