import { useState } from 'react'
import { BIKE_ORDER, BIKES } from '../engine'
import { MAX_KG, MIN_KG, sanitize, type CameraFacing, type Settings } from '../settings/settings'
import './SetupScreen.css'

interface Props {
  initial: Settings
  onStart: (s: Settings) => void
}

const CAMERAS: { value: CameraFacing; label: string }[] = [
  { value: 'front', label: '전면 카메라' },
  { value: 'back', label: '후면 카메라' },
]

export function SetupScreen({ initial, onStart }: Props) {
  const [s, setS] = useState(initial)
  const [kgText, setKgText] = useState(String(initial.riderKg))

  const start = () => onStart(sanitize({ ...s, riderKg: Number(kgText) }))

  return (
    <main className="setup">
      <header className="setup__head">
        <h1>주행 전 설정</h1>
        <p>충돌 시 부상도 계산에 쓰입니다. 기기에만 저장돼요.</p>
      </header>

      <div className="setup__field">
        <label htmlFor="weight">내 몸무게</label>
        <div className="setup__input">
          <input
            id="weight"
            type="number"
            inputMode="numeric"
            min={MIN_KG}
            max={MAX_KG}
            value={kgText}
            onChange={(e) => setKgText(e.target.value)}
          />
          <span>kg</span>
        </div>
      </div>

      <fieldset className="setup__field">
        <legend>자전거 종류</legend>
        <div className="setup__grid">
          {BIKE_ORDER.map((b) => (
            <button
              key={b}
              type="button"
              className="setup__choice"
              aria-pressed={s.bike === b}
              onClick={() => setS({ ...s, bike: b })}
            >
              <strong>{BIKES[b].name}</strong>
              <small>약 {BIKES[b].kg}kg</small>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="setup__row">
        <div>
          <strong>헬멧 착용</strong>
          <small>머리 부상 위험을 낮춰 계산해요</small>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={s.helmet}
          aria-label="헬멧 착용 여부"
          className="setup__switch"
          onClick={() => setS({ ...s, helmet: !s.helmet })}
        >
          <span />
        </button>
      </div>

      <fieldset className="setup__field">
        <legend>백미러 카메라</legend>
        <div className="setup__grid">
          {CAMERAS.map((c) => (
            <button
              key={c.value}
              type="button"
              className="setup__choice setup__choice--short"
              aria-pressed={s.camera === c.value}
              onClick={() => setS({ ...s, camera: c.value })}
            >
              <strong>{c.label}</strong>
            </button>
          ))}
        </div>
        <small className="setup__hint">폰을 다는 방향에 따라 뒤를 보는 카메라가 달라요.</small>
      </fieldset>

      <button type="button" className="setup__start" onClick={start}>
        주행 시작
      </button>
    </main>
  )
}
