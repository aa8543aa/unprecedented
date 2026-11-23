import type { ReactNode } from 'react'
import type { PartyResult } from '../../engine'

interface Props {
  side: 'left' | 'right'
  /** 위쪽 제목 (나, 또는 대상 선택 버튼) */
  title: ReactNode
  subtitle: string
  result: PartyResult
  /** 스크린 리더용 이름 */
  label: string
}

export function PartyGauge({ side, title, subtitle, result, label }: Props) {
  const fill = Math.max(2, result.severityPct)
  return (
    <section
      className={`gauge gauge--${side} tone--${result.tone}`}
      aria-label={`${label} 부상도 ${result.severityPct}%, ${result.level}, ${result.recovery}`}
    >
      <div className="gauge__title">{title}</div>
      <span className="gauge__sub">{subtitle}</span>
      <div className="gauge__track" aria-hidden="true">
        <div className="gauge__fill" style={{ height: `${fill}%` }} />
      </div>
      <span className="gauge__pct" aria-hidden="true">
        {result.severityPct}%
      </span>
      <span className="gauge__recovery" aria-hidden="true">
        {result.recovery}
      </span>
      <span className="gauge__level" aria-hidden="true">
        {result.level}
      </span>
    </section>
  )
}
