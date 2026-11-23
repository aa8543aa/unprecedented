import { useEffect, useRef, useState } from 'react'
import { smooth, speedKmh, type Fix } from './speed'

export type GpsStatus = 'unsupported' | 'waiting' | 'ok' | 'denied' | 'error'

export interface GpsSpeed {
  status: GpsStatus
  /** km/h. 아직 모르면 null */
  speedKmh: number | null
}

/** 마지막 측정 후 이 시간이 지나면 다시 '찾는 중'으로 본다 (ms) */
const STALE_MS = 6000

const supported = () => typeof navigator !== 'undefined' && 'geolocation' in navigator

/** 브라우저 위치 API로 현재 속력을 읽는다. 화면이 켜져 있을 때만 동작한다. */
export function useGpsSpeed(): GpsSpeed {
  const [state, setState] = useState<GpsSpeed>(() => ({
    status: supported() ? 'waiting' : 'unsupported',
    speedKmh: null,
  }))
  const prevFix = useRef<Fix | null>(null)
  const lastSpeed = useRef<number | null>(null)

  useEffect(() => {
    if (!supported()) return

    let lastFixAt = 0
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const fix: Fix = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          time: pos.timestamp,
          accuracy: pos.coords.accuracy,
          speed: pos.coords.speed,
        }
        const raw = speedKmh(prevFix.current, fix)
        prevFix.current = fix
        lastFixAt = Date.now()
        if (raw === null) {
          setState((s) => ({ ...s, status: s.speedKmh === null ? 'waiting' : 'ok' }))
          return
        }
        lastSpeed.current = smooth(lastSpeed.current, raw)
        setState({ status: 'ok', speedKmh: lastSpeed.current })
      },
      (err) => {
        setState((s) => ({
          ...s,
          status:
            err.code === err.PERMISSION_DENIED
              ? 'denied'
              : s.speedKmh === null
                ? 'error'
                : s.status,
        }))
      },
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 15000 },
    )

    const timer = window.setInterval(() => {
      if (lastFixAt && Date.now() - lastFixAt > STALE_MS) {
        setState((s) => (s.status === 'ok' ? { ...s, status: 'waiting' } : s))
      }
    }, 2000)

    return () => {
      navigator.geolocation.clearWatch(watchId)
      window.clearInterval(timer)
    }
  }, [])

  return state
}

export const GPS_STATUS_TEXT: Record<GpsStatus, string> = {
  ok: 'GPS 수신 중',
  waiting: 'GPS 찾는 중',
  denied: '위치 권한 없음',
  unsupported: 'GPS 없음',
  error: 'GPS 오류',
}
