import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeProvider'
import { AuthProvider } from './context/AuthContext'
import { DashboardProvider } from './context/DashboardContext'
import { NotebookProvider } from './context/NotebookContext'
import { NoteProvider } from './context/NoteContext'
import LandingLayout from './components/layout/landing/LandingLayout'
import DashboardLayout from './components/layout/dashboard/DashboardLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import NotePage from './pages/Note'
import Notebook from './pages/Notebook'
import TrashPage from './pages/TrashPage'
import ProtectedRoutes from './routes/ProtectedRoutes'
import GuestRoutes from './routes/GuestRoutes'
import './App.css'

function App() { 
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes> {/* Public Routes */}
            <Route element={<GuestRoutes />}>
              <Route path='/' element={<LandingLayout />}>
                <Route index element={<HomePage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='register' element={<SignupPage />} />
              </Route>
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedRoutes />}>
              <Route path='/' element={
                <DashboardProvider>
                  <NotebookProvider>
                    <NoteProvider>
                      <DashboardLayout />
                    </NoteProvider>
                  </NotebookProvider>
                </DashboardProvider>
              }>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='dashboard/notebooks/:notebookId' element={<Notebook />} />
                <Route path='dashboard/notebooks/:notebookId/:noteId' element={<NotePage />} />
                <Route path='dashboard/trash' element={<TrashPage />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider> 
    </ThemeProvider>
  )
}

export default App
