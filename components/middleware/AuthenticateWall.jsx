import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AuthenticateWall = ({ children, isAdmin = false, isSupaAdmin = false }) => {
    const { user } = useSelector((state) => state.auth);
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (isAdmin && user.role === 'user') {
        return <Navigate to="/" replace />;
    }
    if (isSupaAdmin && user.role !== 'SUPA_ADMIN') {
        return <Navigate to="/" replace />;
    }
    return children;
}