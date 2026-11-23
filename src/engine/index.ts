import { evaluateRisk } from './model'
import type { RiskEngine } from './types'

/** 브라우저 안에서 계산하는 엔진. 서버로 옮길 때는 같은 인터페이스의 원격 구현으로 바꾼다. */
export const localEngine: RiskEngine = {
  evaluate: async (input) => evaluateRisk(input),
}

export { evaluateRisk } from './model'
export * from './data'
export type * from './types'
