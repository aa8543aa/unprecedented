/** 위치 한 점 */
export interface Fix {
  lat: number
  lon: number
  /** ms */
  time: number
  /** m, 작을수록 정확 */
  accuracy: number
  /** 기기가 준 속력 (m/s), 없으면 null */
  speed: number | null
}

const EARTH_R = 6371000

/** 두 좌표 사이 거리 (m) */
export function distanceM(a: Pick<Fix, 'lat' | 'lon'>, b: Pick<Fix, 'lat' | 'lon'>): number {
  const rad = Math.PI / 180
  const dLat = (b.lat - a.lat) * rad
  const dLon = (b.lon - a.lon) * rad
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2
  return 2 * EARTH_R * Math.asin(Math.sqrt(h))
}

/** 정확도가 이보다 나쁜 점은 거리 계산에 쓰지 않는다 (m) */
export const MAX_ACCURACY_M = 50

/**
 * 새 점의 속력 (km/h). 기기가 준 속력이 있으면 그것을, 없으면 앞 점과의 거리/시간으로 구한다.
 * 계산할 수 없으면 null.
 */
export function speedKmh(prev: Fix | null, next: Fix): number | null {
  if (next.speed !== null && Number.isFinite(next.speed) && next.speed >= 0) {
    return next.speed * 3.6
  }
  if (!prev || next.accuracy > MAX_ACCURACY_M || prev.accuracy > MAX_ACCURACY_M) return null
  const dt = (next.time - prev.time) / 1000
  if (dt < 1) return null
  return (distanceM(prev, next) / dt) * 3.6
}

/** 튀는 값을 줄이는 지수 평활 */
export function smooth(prev: number | null, next: number, alpha = 0.5): number {
  return prev === null ? next : prev + alpha * (next - prev)
}
