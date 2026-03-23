import { useAuth } from '../context/AuthContext';
import { User, LogOut, ShieldCheck, Mail, Loader2 } from 'lucide-react';

const Home = () => {
    const { user, loading, logout } = useAuth();

    if (loading) {
        return (
            <div className="auth-page">
                <Loader2 className="spinner" size={48} color="#D4AF37" />
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <header className="auth-header">
                <h2>Account Dashboard</h2>
                <p>Manage your account settings and preferences</p>
            </header>

            <div className="user-card">
                <div className="user-avatar">
                    {user?.name ? user.name.charAt(0).toUpperCase() : <User size={40} />}
                </div>
                
                <h3>{user?.name || "Welcome Back"}</h3>
                <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>{user?.email}</p>

                <div style={{ display: 'grid', gap: '1rem', textAlign: 'left', maxWidth: '300px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                        <ShieldCheck size={18} color="#10b981" />
                        <span>Email Verified</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                        <Mail size={18} color="#64748b" />
                        <span>{user?.email}</span>
                    </div>
                </div>

                <button onClick={logout} className="logout-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Home;
