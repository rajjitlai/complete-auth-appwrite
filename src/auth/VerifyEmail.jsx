import React, { useEffect, useState } from 'react'
import { account } from '../config/appwrite'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Loader2, ShieldCheck, ShieldAlert } from 'lucide-react'

const VerifyEmail = () => {
    const navigate = useNavigate()
    const [status, setStatus] = useState('verifying') // verifying, success, error

    useEffect(() => {
        const verifyEmail = async () => {
            const urlParams = new URLSearchParams(window.location.search)
            const userId = urlParams.get('userId')
            const secret = urlParams.get('secret')

            try {
                if (userId && secret) {
                    await account.updateVerification(userId, secret)
                    setStatus('success')
                    toast.success("Email verified successfully!")
                    setTimeout(() => navigate('/login'), 3000)
                } else {
                    setStatus('error')
                    toast.error("Invalid verification link.")
                }
            } catch (error) {
                setStatus('error')
                toast.error("Failed to verify email.")
            }
        }

        verifyEmail()
    }, [navigate])

    return (
        <div className="auth-page">
            <div className="glass-card" style={{ textAlign: 'center' }}>
                {status === 'verifying' && (
                    <>
                        <Loader2 className="spinner" size={48} color="#D4AF37" style={{ margin: '0 auto 1.5rem' }} />
                        <h3>Verifying Email</h3>
                        <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Please wait while we confirm your email address...</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div style={{ background: '#d1fae5', color: '#059669', width: '4rem', height: '4rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', margin: '0 auto 1.5rem', justifyContent: 'center' }}>
                            <ShieldCheck size={32} />
                        </div>
                        <h3>Success!</h3>
                        <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Your email has been verified. Redirecting to login...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div style={{ background: '#fee2e2', color: '#dc2626', width: '4rem', height: '4rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', margin: '0 auto 1.5rem', justifyContent: 'center' }}>
                            <ShieldAlert size={32} />
                        </div>
                        <h3>Verification Failed</h3>
                        <p style={{ color: '#64748b', marginTop: '0.5rem' }}>The link is invalid or has expired.</p>
                        <button 
                            className="btn-primary" 
                            style={{ marginTop: '1.5rem' }}
                            onClick={() => navigate('/register')}
                        >
                            Back to Register
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default VerifyEmail
