import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { account } from '../config/appwrite';
import { ID } from 'appwrite';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { logout } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        setLoading(true);

        try {
            // Register the user
            await account.create(ID.unique(), email, password, username);

            // Automatically log the user in after registration to create verification
            await account.createEmailPasswordSession(email, password);

            // Send verification email
            await account.createVerification(`${window.location.origin}/verify-email`);

            toast.success("Registration successful! Check your email for verification.");
            
            // Log out so they have to verify before logging in (using our context logout)
            await logout(true);
            navigate('/login');
        } catch (error) {
            toast.error("Registration failed: " + error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="glass-card">
                <div className="auth-header">
                    <h2>Create Account</h2>
                    <p>Join us today and get started</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <div className="input-wrapper">
                            <User size={18} />
                            <input
                                id="username"
                                type="text"
                                className="form-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="johndoe"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <Mail size={18} />
                            <input
                                id="email"
                                type="email"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
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
                        <label htmlFor="confirmPassword">Confirm Password</label>
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
                                <span>Creating account...</span>
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Already have an account? <Link to="/login">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
