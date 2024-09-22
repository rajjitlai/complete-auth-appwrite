import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../config/appwriteConfig';
import toast from 'react-hot-toast';

const Verified = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            const searchParams = new URLSearchParams(window.location.search);
            const userId = searchParams.get('userId');
            const secret = searchParams.get('secret');

            if (userId && secret) {
                try {
                    await account.updateVerification(userId, secret);
                    toast.success("Email verified successfully!");
                    navigate('/home');
                } catch (error) {
                    toast.error("Verification failed. Please try again.");
                    navigate('/login');
                }
            } else {
                toast.error("Invalid verification link.");
                navigate('/login');
            }

            setLoading(false);
        };

        verifyUser();
    }, [navigate]);

    if (loading) return <div>Verifying...</div>;

    return null;
};

export default Verified;
