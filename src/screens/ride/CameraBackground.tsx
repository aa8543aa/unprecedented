import { CAMERA_STATUS_TEXT } from '../../sensors/camera'
import { useRearCamera } from '../../sensors/useRearCamera'
import type { CameraFacing } from '../../settings/settings'

/** 화면 전체를 백미러 영상으로 채운다. 실제 거울처럼 좌우를 뒤집어 보여 준다. */
export function CameraBackground({ facing }: { facing: CameraFacing }) {
  const { videoRef, status } = useRearCamera(facing)

  return (
    <div className="camera">
      <video
        ref={videoRef}
        className="camera__video"
        autoPlay
        playsInline
        muted
        aria-label="후방 카메라 영상"
        hidden={status !== 'ok'}
      />
      {status !== 'ok' && <p className="camera__status">{CAMERA_STATUS_TEXT[status]}</p>}
    </div>
  )
}
