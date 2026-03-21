import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy, useEffect, useState } from 'react'
import ProtectedRoute from './ProtectedRoute'
import Loading from './components/Loading'

export default function App() {

  const Login = lazy(() => import('./pages/Login'));
  const Dashboard = lazy(() => import('./pages/Inventory'));
  const Notfound = lazy(() => import('./pages/Notfound'));
  const UpdateItem = lazy(() => import('./pages/UpdateItem'));
  const CreateItem = lazy(() => import('./pages/CreateItems'));
  const [auth, setauth] = useState(null)


  useEffect(() => {

    const check_is_admin = async () => {

      const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/admin/getloggedadminstatus` , {
        credentials: "include"
      })

      const data = await response.json();
      console.log(data)
      if (data.error) {
        setauth(false)

      }
      else {

        setauth(true);
      }

    }

    if (auth == null) {
      check_is_admin()
    }
  }, [auth])

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        {auth == null ? <Loading /> : <Routes>

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

        </Routes>}

      </Suspense>
    </BrowserRouter>
  )
}