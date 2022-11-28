// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.tsx

import * as React from 'react'
import {Switch} from '../switch'

function useToggle() {
  const [internalOn, setOn] = React.useState(false)
  const toggle = () => setOn(!internalOn)

  function getTogglerProps<Props>({
    onClick,
    ...rest
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & Props) {
    return {
      'aria-pressed': internalOn,
      onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        toggle()
        onClick?.(e)
      },
      ...rest,
    }
  }

  return {
    on: internalOn,
    toggle,
    getTogglerProps,
  }
}

function App() {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <div>
        <Switch {...getTogglerProps({on})} />
        <hr />
        <button
          {...getTogglerProps({
            'aria-label': 'custom-button',
            onClick: () => console.info('onButtonClick'),
            id: 'custom-button-id',
          })}
        >
          {on ? 'on' : 'off'}
        </button>
      </div>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
