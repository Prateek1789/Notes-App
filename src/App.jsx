import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import LandingLayout from './components/layout/landing/LandingLayout'
import DashboardLayout from './components/layout/dashboard/DashboardLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<LandingLayout />}>
          <Route index element={<HomePage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<SignupPage />} />
        </Route>

        {/* Protected Routes */}
        <Route path='/' element={<DashboardLayout/>}>
          <Route path='dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
