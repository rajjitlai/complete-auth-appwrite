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
      
      if (!userData.emailVerification) {
        await logout(true);
        throw new Error("Please verify your email to continue.");
      }

      setUser(userData);
      toast.success("Login successful!");
      return true;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const logout = async (silent = false) => {
    try {
      await account.deleteSession("current");
      setUser(null);
      if (!silent) {
        toast.success("Logged out successfully!");
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
