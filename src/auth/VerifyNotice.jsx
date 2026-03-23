import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Loader2, LogOut, RefreshCw } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const VerifyNotice = () => {
    const { user, resendVerification, logout, checkAuth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    if (!user) return <Navigate to="/login" replace />;
    if (user.emailVerification) return <Navigate to="/" replace />;

    const handleResend = async () => {
        setLoading(true);
        try {
            await resendVerification();
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            await checkAuth();
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="glass-card" style={{ textAlign: 'center' }}>
                <div style={{ background: '#fef3c7', color: '#d97706', width: '4rem', height: '4rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <Mail size={32} />
                </div>
                
                <h3>Verify Your Email</h3>
                <p style={{ color: '#64748b', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                    A verification link was sent to <strong>{user.email}</strong>. 
                    Please check your inbox and click the link to activate your account.
                </p>

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    <button 
                        className="btn-primary" 
                        onClick={handleRefresh}
                        disabled={refreshing}
                    >
                        {refreshing ? <Loader2 className="spinner" /> : <RefreshCw size={18} />}
                        I've verified my email
                    </button>

                    <button 
                        style={{ 
                            background: 'transparent', 
                            border: '1px solid var(--border)', 
                            padding: '0.75rem', 
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            fontWeight: '600',
                            fontSize: '0.875rem'
                        }}
                        onClick={handleResend}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="spinner" /> : null}
                        Resend Verification Link
                    </button>

                    <button 
                        style={{ 
                            background: 'transparent', 
                            border: 'none', 
                            color: '#dc2626',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            marginTop: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: '500'
                        }}
                        onClick={() => logout()}
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyNotice;
