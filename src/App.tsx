import { useState } from 'react'
import { RideScreen } from './screens/ride/RideScreen'
import { SetupScreen } from './screens/SetupScreen'
import { loadSettings, saveSettings, type Settings } from './settings/settings'

type Screen = 'setup' | 'ride'

function App() {
  const [settings, setSettings] = useState<Settings>(loadSettings)
  const [screen, setScreen] = useState<Screen>('setup')
  // 속력은 #25에서 GPS로 바꾼다. 지금은 직접 입력.
  const [speedKmh, setSpeedKmh] = useState(20)

  if (screen === 'setup') {
    return (
      <SetupScreen
        initial={settings}
        onStart={(s) => {
          saveSettings(s)
          setSettings(s)
          setScreen('ride')
        }}
      />
    )
  }

  return (
    <RideScreen
      settings={settings}
      speedKmh={speedKmh}
      speedStatus={{ text: '직접 입력', ok: false }}
      onOpenSettings={() => setScreen('setup')}
      controls={
        <label className="speed-input panel">
          <span>속력 직접 입력</span>
          <input
            type="range"
            min={0}
            max={60}
            step={1}
            value={speedKmh}
            onChange={(e) => setSpeedKmh(Number(e.target.value))}
          />
        </label>
      }
    />
  )
}

export default App
