/** 충돌 대상 종류 */
export type TargetKind = 'pedestrian' | 'bicycle' | 'motorcycle' | 'car' | 'truck'

/** 자전거 종류 */
export type BikeKind = 'road' | 'mtb' | 'ebike' | 'shared'

/** 계산에 필요한 입력 */
export interface RiskInput {
  /** 내 속력 (km/h) */
  speedKmh: number
  /** 내 몸무게 (kg) */
  riderKg: number
  bike: BikeKind
  helmet: boolean
  target: TargetKind
}

/** 부상 단계 (색 구분용) */
export type Tone = 'low' | 'mid' | 'high' | 'severe'

/** 한쪽(나 또는 상대)의 결과 */
export interface PartyResult {
  /** 부상도 0~100 (100 = 사망) */
  severityPct: number
  /** 부상 단계 글자 (예: 중상) */
  level: string
  /** 전치 표시 (예: 전치 8~12주) */
  recovery: string
  tone: Tone
  /** 이 쪽이 받는 속도 변화 (km/h) */
  deltaVKmh: number
}

export interface RiskResult {
  me: PartyResult
  other: PartyResult
  /** 계산에 가정한 상대 속력 (km/h) */
  targetSpeedKmh: number
  /** 정면 충돌로 가정한 접근 속력 (km/h) */
  closingSpeedKmh: number
}

/**
 * 계산 엔진 인터페이스.
 * 지금은 브라우저 안에서 계산하지만, 나중에 서버로 옮길 때 이 구현만 바꾸면 된다.
 */
export interface RiskEngine {
  evaluate(input: RiskInput): Promise<RiskResult>
}
