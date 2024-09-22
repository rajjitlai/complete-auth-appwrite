import { useEffect, useState } from 'react';
import { account } from '../config/appwriteConfig';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isVerified, setIsVerified] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkVerification = async () => {
      try {
        const user = await account.get();
        if (user.emailVerification) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    checkVerification();
  }, []);

  if (isVerified === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {isVerified ? (
        <>
          <h1>Welcome to my website!</h1>
          <p>This page is protected for authenticated users.</p>
        </>
      ) : (
        <>
          <h1>Verify Your Email</h1>
          <p>Please verify your email to access this page.</p>
        </>
      )}
    </div>
  );
};

export default Home;
