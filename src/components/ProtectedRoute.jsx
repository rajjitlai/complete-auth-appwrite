import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="auth-page">
                <Loader2 className="spinner" size={48} color="#D4AF37" />
            </div>
        );
    }

    if (!user) return <Navigate to="/login" replace />;
    if (!user.emailVerification) return <Navigate to="/verify-notice" replace />;

    return <Outlet />;
};

export default ProtectedRoute;
