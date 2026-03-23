import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../config/appwrite";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const userData = await account.get();
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const userData = await account.get();
      setUser(userData);
      toast.success("Login successful!");
      return userData;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const logout = async (silent = false) => {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.error("Logout failed:", error.message);
    } finally {
      setUser(null);
      if (!silent) {
        toast.success("Logged out successfully!");
      }
    }
  };

  const resendVerification = async () => {
    try {
      await account.createVerification(`${window.location.origin}/verify-email`);
      toast.success("Verification email sent!");
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const requestPasswordReset = async (email) => {
    try {
      await account.createRecovery(email, `${window.location.origin}/reset-password`);
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const resetPassword = async (userId, secret, password) => {
    try {
      await account.updateRecovery(userId, secret, password);
      toast.success("Password reset successfully!");
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, loading, login, logout, checkAuth, 
      resendVerification, requestPasswordReset, resetPassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
