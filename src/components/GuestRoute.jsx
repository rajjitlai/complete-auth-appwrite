import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const GuestRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="auth-page">
                <Loader2 className="spinner" size={48} color="#D4AF37" />
            </div>
        );
    }

    return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default GuestRoute;
