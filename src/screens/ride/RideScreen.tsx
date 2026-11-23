import { useState, type ReactNode } from 'react'
import { BIKES, TARGET_ORDER, TARGETS, type TargetKind } from '../../engine'
import { useRisk } from '../../engine/useRisk'
import type { Settings } from '../../settings/settings'
import { PartyGauge } from './PartyGauge'
import './RideScreen.css'

interface Props {
  settings: Settings
  speedKmh: number
  /** 속력 아래 표시할 상태 (예: GPS 수신 중) */
  speedStatus: { text: string; ok: boolean }
  /** 배경 (카메라 백미러). 없으면 어두운 단색 */
  background?: ReactNode
  /** 속력 직접 입력 같은 추가 조작부 */
  controls?: ReactNode
  onOpenSettings: () => void
}

export function RideScreen({
  settings,
  speedKmh,
  speedStatus,
  background,
  controls,
  onOpenSettings,
}: Props) {
  const [target, setTarget] = useState<TargetKind>('car')
  const risk = useRisk({
    speedKmh,
    riderKg: settings.riderKg,
    bike: settings.bike,
    helmet: settings.helmet,
    target,
  })
  const t = TARGETS[target]
  const nextTarget = () =>
    setTarget(TARGET_ORDER[(TARGET_ORDER.indexOf(target) + 1) % TARGET_ORDER.length])

  return (
    <main className="ride">
      <div className="ride__bg">{background}</div>

      <div className="ride__speed panel">
        <div className="ride__speed-value">
          <span className="num">{Math.round(speedKmh)}</span>
          <span className="ride__unit">km/h</span>
        </div>
        <div className="ride__status">
          <span className={`dot ${speedStatus.ok ? 'dot--ok' : ''}`} aria-hidden="true" />
          <span>{speedStatus.text}</span>
        </div>
      </div>

      <PartyGauge
        side="left"
        label="나"
        title={<strong>나</strong>}
        subtitle={`${BIKES[settings.bike].name} · ${settings.riderKg}kg · ${settings.helmet ? '헬멧 착용' : '헬멧 없음'}`}
        result={risk.me}
      />

      <PartyGauge
        side="right"
        label={t.name}
        title={
          <button
            type="button"
            className="gauge__target"
            onClick={nextTarget}
            aria-label={`충돌 대상: ${t.name}. 눌러서 바꾸기`}
          >
            <span>{t.name}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        }
        subtitle={`${t.kg >= 1000 ? `${t.kg / 1000}t` : `${t.kg}kg`} · ${t.speedKmh}km/h`}
        result={risk.other}
      />

      <div className="ride__bottom">
        {controls}
        <div className="ride__footer">
          <div className="ride__note panel">
            <span>이 속도로 정면 충돌하면 (상대 {risk.targetSpeedKmh}km/h 가정)</span>
            <small>참고용 추정 · 의료 판단 아님 · 100% = 사망</small>
          </div>
          <button
            type="button"
            className="ride__settings panel"
            onClick={onOpenSettings}
            aria-label="주행 전 설정 열기"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>
  )
}
