import { useEffect, useState } from 'react'
import { localEngine } from './index'
import { evaluateRisk } from './model'
import type { RiskEngine, RiskInput, RiskResult } from './types'

/**
 * 화면은 이 훅으로만 계산 결과를 받는다.
 * 엔진을 바꾸면(예: 서버 엔진) 화면 코드는 그대로 둔다.
 */
export function useRisk(input: RiskInput, engine: RiskEngine = localEngine): RiskResult {
  const [result, setResult] = useState<RiskResult>(() => evaluateRisk(input))
  const { speedKmh, riderKg, bike, helmet, target } = input

  useEffect(() => {
    let cancelled = false
    engine.evaluate({ speedKmh, riderKg, bike, helmet, target }).then((r) => {
      if (!cancelled) setResult(r)
    })
    return () => {
      cancelled = true
    }
  }, [engine, speedKmh, riderKg, bike, helmet, target])

  return result
}
