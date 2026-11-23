import { useState } from 'react'
import { RideContainer } from './screens/ride/RideContainer'
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

  return <RideContainer settings={settings} onOpenSettings={() => setScreen('setup')} />
}

export default App
