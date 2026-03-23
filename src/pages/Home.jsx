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

                <div style={{ display: 'grid', gap: '1rem', textAlign: 'left', maxWidth: '350px', margin: '0 auto', background: '#f8fafc', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                        <div style={{ background: '#d1fae5', padding: '0.25rem', borderRadius: '50%' }}>
                            <ShieldCheck size={16} color="#059669" />
                        </div>
                        <span style={{ fontWeight: '500' }}>Email Verified</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                        <div style={{ background: '#e0f2fe', padding: '0.25rem', borderRadius: '50%' }}>
                            <Mail size={16} color="#0284c7" />
                        </div>
                        <span style={{ color: '#64748b' }}>{user?.email}</span>
                    </div>
                    {user?.registration && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                            <span style={{ color: '#64748b' }}>Member since:</span>
                            <span style={{ fontWeight: '500' }}>
                                {new Date(user.registration).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                    )}
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
