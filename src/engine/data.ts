import type { BikeKind, TargetKind, Tone } from './types'

/*
 * 계산 상수. 과제 수준의 근사값이며 의료 판단 근거가 아니다.
 * 근거: docs/decisions/2026-11-23-004-idea-bike-collision-risk.md
 * - 질량 가중 Δv, 사망 위험 ∝ Δv^4: https://arxiv.org/pdf/2108.02403
 * - 도로 이용자별 중상 10% 접근 속도(보행자 29, 자전거 44, 오토바이 48, 승용차 112 km/h): Lubbe 2022
 * - 보행자 사망률(32km/h 5%, 48km/h 45%, 64km/h 85%): EU 도로안전 자료
 * - 헬멧: 중상 머리 부상 약 60~69% 감소(머리에만 해당하므로 일부만 반영): Olivier & Creighton 2017
 */

export interface TargetPreset {
  name: string
  kg: number
  /** 가정한 상대 속력 (km/h) */
  speedKmh: number
  /** 부상도 곡선의 기준 Δv (km/h). 클수록 잘 보호됨 */
  v0: number
}

export const TARGETS: Record<TargetKind, TargetPreset> = {
  pedestrian: { name: '보행자', kg: 70, speedKmh: 5, v0: 42 },
  bicycle: { name: '자전거', kg: 85, speedKmh: 18, v0: 55 },
  motorcycle: { name: '오토바이', kg: 250, speedKmh: 40, v0: 62 },
  car: { name: '승용차', kg: 1500, speedKmh: 30, v0: 140 },
  truck: { name: '트럭', kg: 12000, speedKmh: 30, v0: 200 },
}

export const TARGET_ORDER: TargetKind[] = ['pedestrian', 'bicycle', 'motorcycle', 'car', 'truck']

export interface BikePreset {
  name: string
  kg: number
}

export const BIKES: Record<BikeKind, BikePreset> = {
  road: { name: '로드', kg: 9 },
  mtb: { name: 'MTB', kg: 13 },
  ebike: { name: '전기자전거', kg: 22 },
  shared: { name: '공유자전거', kg: 18 },
}

export const BIKE_ORDER: BikeKind[] = ['road', 'mtb', 'ebike', 'shared']

/** 자전거 이용자의 기준 Δv (km/h): 헬멧 착용 / 미착용 */
export const RIDER_V0 = { helmet: 60, noHelmet: 52 }

/** 부상도 → 단계, 전치 표시 (앱 자체 기준, 공개 기준표 없음) */
export const LEVELS: { maxPct: number; level: string; recovery: string; tone: Tone }[] = [
  { maxPct: 2, level: '부상 거의 없음', recovery: '전치 1주 이하', tone: 'low' },
  { maxPct: 14, level: '경상', recovery: '전치 2~3주', tone: 'low' },
  { maxPct: 34, level: '중등도 부상', recovery: '전치 4~6주', tone: 'mid' },
  { maxPct: 59, level: '중상', recovery: '전치 8~12주', tone: 'high' },
  { maxPct: 89, level: '심각한 중상', recovery: '전치 12주 이상', tone: 'severe' },
  { maxPct: 100, level: '생명 위험', recovery: '사망 가능성 높음', tone: 'severe' },
]
