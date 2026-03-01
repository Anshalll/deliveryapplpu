import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import ProtectedRoute from './ProtectedRoute'
import Loading from './components/Loading'

export default function App() {

  const Login = lazy(() => import('./pages/Login'));
  const Dashboard = lazy(() => import('./pages/Inventory'));
  const Notfound = lazy(() => import('./pages/Notfound'));
  const UpdateItem = lazy(() => import('./pages/UpdateItem'));
  const CreateItem =  lazy(() => import('./pages/CreateItems'));

  const auth = true;

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>

          {/* Protected Dashboard */}
          <Route element={<ProtectedRoute user={auth} redirect="/login" />} >
            <Route path='/inventory' element={<Dashboard />} />
            <Route path='/updateitem/:id' element={<UpdateItem />} />
            <Route path='/createitem' element={<CreateItem />} />
          </Route>

          {/* Protected Login (if already logged in) */}
          <Route element={<ProtectedRoute user={!auth} redirect="/inventory" />} >
            <Route path='/login' element={<Login />} />
          </Route>

          <Route path='*' element={<Notfound />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}