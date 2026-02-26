import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import ProtectedRoute from './ProtectedRoute'
import Loading from './components/Loading'
export default function App() {

  const Login = lazy(() => import('./pages/Login'))
  const Dashboard = lazy(() => import('./pages/Dashboard'))
  const Notfound = lazy(() => import('./pages/Notfound'))

  const auth = false;

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          {/* Protected Dashboard */}
          <Route element={<ProtectedRoute user={auth} redirect="/login" />} >
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>

          {/* Protected Login (if already logged in) */}
          <Route element={<ProtectedRoute user={!auth} redirect="/dashboard" />} >
            <Route path='/login' element={<Login />} />
          </Route>

          <Route path='*' element={<Notfound />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}