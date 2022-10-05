import { useState } from 'react'
import { Outlet } from 'react-router'
import {app} from "./firebase.js"

function App({children}) {
  const [count, setCount] = useState(0)

  return (
    <div className="App w-full h-full">
      {children}
    </div>
  )
}

export default App
