import { useState } from 'react'
import { GPS_STATUS_TEXT, useGpsSpeed } from '../../sensors/useGpsSpeed'
import type { Settings } from '../../settings/settings'
import { CameraBackground } from './CameraBackground'
import { RideScreen } from './RideScreen'

interface Props {
  settings: Settings
  onOpenSettings: () => void
}

/**
 * 센서(GPS, 카메라)를 연결해 주행 화면에 넘긴다.
 * GPS를 못 쓰면 슬라이더로 속력을 받고, 카메라를 못 쓰면 어두운 배경을 쓴다.
 */
export function RideContainer({ settings, onOpenSettings }: Props) {
  const gps = useGpsSpeed()
  const [manualKmh, setManualKmh] = useState(20)
  const useGps = gps.status === 'ok' && gps.speedKmh !== null
  const speed = useGps ? (gps.speedKmh ?? 0) : manualKmh

  return (
    <RideScreen
      settings={settings}
      speedKmh={speed}
      speedStatus={{ text: GPS_STATUS_TEXT[gps.status], ok: useGps }}
      background={<CameraBackground facing={settings.camera} />}
      onOpenSettings={onOpenSettings}
      controls={
        useGps ? null : (
          <label className="speed-input panel">
            <span>속력 직접 입력</span>
            <input
              type="range"
              min={0}
              max={60}
              step={1}
              value={manualKmh}
              onChange={(e) => setManualKmh(Number(e.target.value))}
            />
          </label>
        )
      }
    />
  )
}
