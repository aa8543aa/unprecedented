import { useEffect, useRef, useState } from 'react'
import type { CameraFacing } from '../settings/settings'
import { cameraConstraints, cameraErrorStatus, type CameraStatus } from './camera'

const supported = () => typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia

/** 카메라 영상을 video 요소에 연결한다. 화면을 떠나면 카메라를 끈다. */
export function useRearCamera(facing: CameraFacing) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [status, setStatus] = useState<CameraStatus>(() =>
    supported() ? 'starting' : 'unsupported',
  )

  useEffect(() => {
    if (!supported()) return
    let stream: MediaStream | null = null
    let cancelled = false

    navigator.mediaDevices
      .getUserMedia(cameraConstraints(facing))
      .then((s) => {
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop())
          return
        }
        stream = s
        if (videoRef.current) {
          videoRef.current.srcObject = s
          void videoRef.current.play().catch(() => {})
        }
        setStatus('ok')
      })
      .catch((err) => {
        if (!cancelled) setStatus(cameraErrorStatus(err))
      })

    return () => {
      cancelled = true
      stream?.getTracks().forEach((t) => t.stop())
    }
  }, [facing])

  return { videoRef, status }
}
