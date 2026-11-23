import type { BikeKind } from '../engine'

export type CameraFacing = 'front' | 'back'

/** 주행 전 설정. 기기(localStorage)에만 저장한다. */
export interface Settings {
  riderKg: number
  bike: BikeKind
  helmet: boolean
  camera: CameraFacing
}

export const DEFAULT_SETTINGS: Settings = {
  riderKg: 70,
  bike: 'road',
  helmet: true,
  camera: 'front',
}

const KEY = 'bike-risk:settings'

export const MIN_KG = 20
export const MAX_KG = 200

/** 저장된 값을 읽는다. 없거나 깨졌거나 저장소를 못 쓰면 기본값. */
export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULT_SETTINGS
    return sanitize({ ...DEFAULT_SETTINGS, ...JSON.parse(raw) })
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(s: Settings): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    // 저장소를 못 써도 이번 주행에는 쓸 수 있다.
  }
}

export function sanitize(s: Settings): Settings {
  const kg = Number(s.riderKg)
  return {
    riderKg: Number.isFinite(kg)
      ? Math.min(MAX_KG, Math.max(MIN_KG, Math.round(kg)))
      : DEFAULT_SETTINGS.riderKg,
    bike: ['road', 'mtb', 'ebike', 'shared'].includes(s.bike) ? s.bike : DEFAULT_SETTINGS.bike,
    helmet: Boolean(s.helmet),
    camera: s.camera === 'back' ? 'back' : 'front',
  }
}
