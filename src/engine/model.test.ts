import { describe as group, expect, it } from 'vitest'
import { localEngine } from './index'
import { deltaV, describe, evaluateRisk, severityPct } from './model'
import type { RiskInput } from './types'

const base: RiskInput = { speedKmh: 25, riderKg: 70, bike: 'road', helmet: true, target: 'car' }

group('deltaV', () => {
  it('가벼운 쪽이 속도 변화를 더 크게 받는다', () => {
    expect(deltaV(60, 80, 1500)).toBeGreaterThan(deltaV(60, 1500, 80))
  })
  it('두 쪽의 Δv 합은 접근 속력과 같다', () => {
    expect(deltaV(50, 80, 70) + deltaV(50, 70, 80)).toBeCloseTo(50)
  })
})

group('severityPct', () => {
  it('Δv가 0이면 0%', () => {
    expect(severityPct(0, 60)).toBe(0)
  })
  it('Δv가 클수록 커지고 100을 넘지 않는다', () => {
    expect(severityPct(30, 60)).toBeLessThan(severityPct(60, 60))
    expect(severityPct(500, 60)).toBe(100)
  })
})

group('describe', () => {
  it('부상도에 맞는 단계와 전치를 고른다', () => {
    expect(describe(0, 0).level).toBe('부상 거의 없음')
    expect(describe(40, 0).recovery).toBe('전치 8~12주')
    expect(describe(100, 0).level).toBe('생명 위험')
  })
})

group('evaluateRisk', () => {
  it('승용차와 부딪히면 내가 더 다친다', () => {
    const r = evaluateRisk(base)
    expect(r.me.severityPct).toBeGreaterThan(r.other.severityPct)
  })
  it('보행자와 부딪히면 상대가 더 다친다', () => {
    const r = evaluateRisk({ ...base, target: 'pedestrian' })
    expect(r.other.severityPct).toBeGreaterThan(r.me.severityPct)
  })
  it('속력이 오르면 내 부상도가 오른다', () => {
    const slow = evaluateRisk({ ...base, speedKmh: 15 }).me.severityPct
    const fast = evaluateRisk({ ...base, speedKmh: 35 }).me.severityPct
    expect(fast).toBeGreaterThan(slow)
  })
  it('헬멧을 쓰면 내 부상도가 낮아진다', () => {
    const on = evaluateRisk({ ...base, speedKmh: 20 }).me.severityPct
    const off = evaluateRisk({ ...base, speedKmh: 20, helmet: false }).me.severityPct
    expect(on).toBeLessThan(off)
  })
  it('음수 속력은 0으로 본다', () => {
    expect(evaluateRisk({ ...base, speedKmh: -10 }).closingSpeedKmh).toBe(30)
  })
})

group('localEngine', () => {
  it('evaluateRisk와 같은 결과를 돌려준다', async () => {
    expect(await localEngine.evaluate(base)).toEqual(evaluateRisk(base))
  })
})
