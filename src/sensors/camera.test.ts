import { describe, expect, it } from 'vitest'
import { cameraConstraints, cameraErrorStatus } from './camera'

describe('cameraConstraints', () => {
  it('전면은 user, 후면은 environment, 소리는 끈다', () => {
    const front = cameraConstraints('front')
    expect(front.audio).toBe(false)
    expect(front.video).toMatchObject({ facingMode: { ideal: 'user' } })
    expect(cameraConstraints('back').video).toMatchObject({ facingMode: { ideal: 'environment' } })
  })
})

describe('cameraErrorStatus', () => {
  it('오류 이름으로 상태를 고른다', () => {
    expect(cameraErrorStatus(new DOMException('x', 'NotAllowedError'))).toBe('denied')
    expect(cameraErrorStatus(new DOMException('x', 'NotFoundError'))).toBe('unsupported')
    expect(cameraErrorStatus(new Error('x'))).toBe('error')
  })
})
