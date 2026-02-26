import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({ user, redirect = "/login" }) {

    
    if (user !== null) {

        if (user) {
            return <Outlet />
        }
        else {
            return <Navigate to={redirect} />
        }
    }

}