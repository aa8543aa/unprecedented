import { describe, expect, it } from 'vitest'
import { DEFAULT_SETTINGS, MAX_KG, MIN_KG, sanitize } from './settings'

describe('sanitize', () => {
  it('몸무게를 허용 범위로 자른다', () => {
    expect(sanitize({ ...DEFAULT_SETTINGS, riderKg: 5 }).riderKg).toBe(MIN_KG)
    expect(sanitize({ ...DEFAULT_SETTINGS, riderKg: 999 }).riderKg).toBe(MAX_KG)
  })
  it('숫자가 아니면 기본 몸무게', () => {
    expect(sanitize({ ...DEFAULT_SETTINGS, riderKg: NaN }).riderKg).toBe(DEFAULT_SETTINGS.riderKg)
  })
  it('모르는 자전거 종류는 기본값', () => {
    // @ts-expect-error 잘못된 값 검증
    expect(sanitize({ ...DEFAULT_SETTINGS, bike: 'tank' }).bike).toBe('road')
  })
})
