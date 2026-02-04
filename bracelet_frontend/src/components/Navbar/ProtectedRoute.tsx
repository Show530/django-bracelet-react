import { Navigate } from "react-router";
import {useAuth} from "../../auth/AuthContext.tsx"
import Loading from "../Loading.tsx"

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireStaff?: boolean;
}

export default function ProtectedRoute({ children, requireStaff = false }: ProtectedRouteProps) {
    const {isAuthenticated, user, loading} = useAuth();

    if (loading) {
        return <Loading where={"Protected"}/>
    }

    // does not require staff- just send to login
    if (!requireStaff) {
        if (!isAuthenticated) {
            return <Navigate to="/Login" replace />;
        }
        return <>{children}</>;
    }
    // requires staff- send home if not staff
    else {
        if (!isAuthenticated) {
            return <Navigate to="/" replace />;
        }
        // logged in user who is not admin
        else if(!(user?.is_staff)) {
            return <Navigate to="/" replace />;
        }
        else {
            return <>{children}</>;
        }
    }
   
    

}