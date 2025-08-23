import { useState } from 'react'
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <WelcomePage /> */}
    {/* <LoginPage /> */}
    <SignupPage /> 
    </>
  )
}

export default App
