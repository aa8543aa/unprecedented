import { useState } from 'react'
import { SetupScreen } from './screens/SetupScreen'
import { loadSettings, saveSettings, type Settings } from './settings/settings'

type Screen = 'setup' | 'ride'

function App() {
  const [settings, setSettings] = useState<Settings>(loadSettings)
  const [screen, setScreen] = useState<Screen>('setup')

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

  // 주행 화면은 #24에서 구현
  return (
    <main style={{ padding: 24 }}>
      <p>주행 화면 (준비 중)</p>
      <button type="button" onClick={() => setScreen('setup')}>
        설정으로
      </button>
    </main>
  )
}

export default App
