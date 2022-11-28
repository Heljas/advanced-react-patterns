// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.tsx

import * as React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext<
  {on: boolean; toggle: () => void} | undefined
>(undefined)
ToggleContext.displayName = 'ToggleContext'

function Toggle({children}: {children: React.ReactNode}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return (
    <ToggleContext.Provider value={{on, toggle}}>
      {children}
    </ToggleContext.Provider>
  )
}

function ToggleOn({children}: {children: React.ReactNode}) {
  const context = React.useContext(ToggleContext)
  if (context === undefined)
    throw new Error("Can't use ToggleOn without Toggle")
  return <>{context.on ? children : null}</>
}

function ToggleOff({children}: {children: React.ReactNode}) {
  const context = React.useContext(ToggleContext)
  if (context === undefined)
    throw new Error("Can't use ToggleOff without Toggle")
  return <>{context.on ? null : children}</>
}

function ToggleButton(
  props: Omit<React.ComponentProps<typeof Switch>, 'on' | 'onClick'>,
) {
  const context = React.useContext(ToggleContext)
  if (context === undefined)
    throw new Error("Can't use ToggleButton without Toggle")
  return <Switch on={context.on} onClick={context.toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
  @typescript-eslint/no-unused-vars: "off",
*/
