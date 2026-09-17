import { LOMBOK_BARAT_KECAMATAN, getKecamatanById, WilayahKafilah } from './lombokBaratKecamatan';

export interface WilayahGerung {
  id: string;
  name: string;
  fullName: string;
  type: 'DESA' | 'KELURAHAN';
}

const gerung = getKecamatanById('gerung');

export const GERUNG_DESA: WilayahGerung[] = gerung.villages
  .filter(v => v.type === 'DESA')
  .map(v => ({ id: v.id, name: v.name, fullName: v.fullName, type: v.type }));

export const GERUNG_KELURAHAN: WilayahGerung[] = gerung.villages
  .filter(v => v.type === 'KELURAHAN')
  .map(v => ({ id: v.id, name: v.name, fullName: v.fullName, type: v.type }));

export const ALL_GERUNG_KAFILAH: WilayahGerung[] = gerung.villages.map(v => ({
  id: v.id,
  name: v.name,
  fullName: v.fullName,
  type: v.type
}));

export * from './lombokBaratKecamatan';
