import { describe, expect, it } from 'vitest'
import { distanceM, smooth, speedKmh, type Fix } from './speed'

const at = (lat: number, lon: number, time: number, extra: Partial<Fix> = {}): Fix => ({
  lat,
  lon,
  time,
  accuracy: 5,
  speed: null,
  ...extra,
})

describe('distanceM', () => {
  it('위도 0.001도는 약 111m', () => {
    expect(distanceM(at(37, 127, 0), at(37.001, 127, 0))).toBeCloseTo(111.2, 0)
  })
})

describe('speedKmh', () => {
  it('기기가 준 속력(m/s)을 km/h로 바꾼다', () => {
    expect(speedKmh(null, at(37, 127, 0, { speed: 5 }))).toBeCloseTo(18)
  })
  it('기기 속력이 없으면 거리/시간으로 구한다', () => {
    const v = speedKmh(at(37, 127, 0), at(37.001, 127, 20000))
    expect(v).toBeCloseTo(20, 0)
  })
  it('앞 점이 없거나 시간이 너무 짧으면 null', () => {
    expect(speedKmh(null, at(37, 127, 0))).toBeNull()
    expect(speedKmh(at(37, 127, 0), at(37.001, 127, 500))).toBeNull()
  })
  it('정확도가 나쁜 점은 쓰지 않는다', () => {
    expect(speedKmh(at(37, 127, 0), at(37.001, 127, 20000, { accuracy: 200 }))).toBeNull()
  })
})

describe('smooth', () => {
  it('첫 값은 그대로, 이후는 중간값', () => {
    expect(smooth(null, 10)).toBe(10)
    expect(smooth(10, 20)).toBe(15)
  })
})
