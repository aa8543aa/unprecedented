import { BIKES, LEVELS, RIDER_V0, TARGETS } from './data'
import type { PartyResult, RiskInput, RiskResult } from './types'

/** 두 물체가 정면 충돌할 때 각자가 받는 속도 변화 (질량 가중) */
export function deltaV(closingKmh: number, selfKg: number, otherKg: number): number {
  return (closingKmh * otherKg) / (selfKg + otherKg)
}

/** Δv → 부상도 % (0~100). Δv^4에 비례해 커지다가 100에 수렴한다. */
export function severityPct(deltaVKmh: number, v0: number): number {
  if (deltaVKmh <= 0) return 0
  const x = Math.pow(deltaVKmh / v0, 4)
  return Math.round(100 * (1 - Math.exp(-x)))
}

/** 부상도 % → 단계, 전치 표시 */
export function describe(pct: number, deltaVKmh: number): PartyResult {
  const clamped = Math.min(100, Math.max(0, pct))
  const row = LEVELS.find((l) => clamped <= l.maxPct) ?? LEVELS[LEVELS.length - 1]
  return {
    severityPct: clamped,
    level: row.level,
    recovery: row.recovery,
    tone: row.tone,
    deltaVKmh: Math.round(deltaVKmh * 10) / 10,
  }
}

/** 입력 → 나와 상대의 결과 (순수 함수) */
export function evaluateRisk(input: RiskInput): RiskResult {
  const target = TARGETS[input.target]
  const myKg = input.riderKg + BIKES[input.bike].kg
  const speed = Math.max(0, input.speedKmh)
  const closing = speed + target.speedKmh

  const dvMe = deltaV(closing, myKg, target.kg)
  const dvOther = deltaV(closing, target.kg, myKg)
  const myV0 = input.helmet ? RIDER_V0.helmet : RIDER_V0.noHelmet

  return {
    me: describe(severityPct(dvMe, myV0), dvMe),
    other: describe(severityPct(dvOther, target.v0), dvOther),
    targetSpeedKmh: target.speedKmh,
    closingSpeedKmh: closing,
  }
}
