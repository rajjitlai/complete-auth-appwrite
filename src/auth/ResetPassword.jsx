import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const { resetPassword } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const urlParams = new URLSearchParams(location.search);
        const userId = urlParams.get('userId');
        const secret = urlParams.get('secret');

        if (!userId || !secret) {
            toast.error("Invalid password reset link.");
            return;
        }

        setLoading(true);
        try {
            await resetPassword(userId, secret, password);
            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="auth-page">
                <div className="glass-card" style={{ textAlign: 'center' }}>
                    <div style={{ background: '#d1fae5', color: '#059669', width: '4rem', height: '4rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <ShieldCheck size={32} />
                    </div>
                    <h3>Success!</h3>
                    <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Your password has been reset successfully. Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="glass-card">
                <div className="auth-header">
                    <h2>Reset Password</h2>
                    <p>Enter your new password below.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <div className="input-wrapper">
                            <Lock size={18} />
                            <input
                                id="password"
                                type="password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <div className="input-wrapper">
                            <Lock size={18} />
                            <input
                                id="confirmPassword"
                                type="password"
                                className="form-input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="spinner" />
                                <span>Resetting...</span>
                            </>
                        ) : (
                            'Reset Password'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
