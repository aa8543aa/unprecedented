import type { CameraFacing } from '../settings/settings'

/** 설정의 카메라 선택 → getUserMedia 조건 */
export function cameraConstraints(facing: CameraFacing): MediaStreamConstraints {
  return {
    audio: false,
    video: {
      facingMode: { ideal: facing === 'front' ? 'user' : 'environment' },
      width: { ideal: 1280 },
      height: { ideal: 720 },
    },
  }
}

export type CameraStatus = 'starting' | 'ok' | 'denied' | 'unsupported' | 'error'

export function cameraErrorStatus(err: unknown): CameraStatus {
  const name = err instanceof DOMException || err instanceof Error ? err.name : ''
  if (name === 'NotAllowedError' || name === 'SecurityError') return 'denied'
  if (name === 'NotFoundError' || name === 'OverconstrainedError') return 'unsupported'
  return 'error'
}

export const CAMERA_STATUS_TEXT: Record<CameraStatus, string> = {
  starting: '카메라 켜는 중',
  ok: '',
  denied: '카메라 권한 없음',
  unsupported: '카메라 없음',
  error: '카메라 오류',
}
