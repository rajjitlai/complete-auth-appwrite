import { useContext, useState, useEffect, createContext } from "react";
import { account } from "../config/appwriteConfig";
import { ID } from "appwrite";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        checkUser()
    }, [])

    const loginUser = async (userInfo) => {
        setLoading(true)
        try {
            let response = await account.createEmailPasswordSession(
                userInfo.email,
                userInfo.password
            )
            let accountDetails = await account.get()

            console.log("SESSION ACTIVE with ", accountDetails)
            setUser(accountDetails)
        } catch (error) {
            console.error(error)
        }

        setLoading(false)
    }

    const logoutUser = () => {
        account.deleteSession('current')
        setUser(null)
    }

    const registerUser = async (userInfo) => {
        setLoading(true)
        try {
            let response = await account.create(
                ID.unique(),
                userInfo.email,
                userInfo.password1,
                userInfo.name
            )

            await account.createEmailPasswordSession(
                userInfo.email,
                userInfo.password1
            )

            // await account.createVerification("http://localhost:3000/home")

            let accountDetails = await account.get()

            console.log("SESSION ACTIVE with ", accountDetails)
            setUser(accountDetails)
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    const checkUser = async () => {
        try {
            let accountDetails = await account.get()
            setUser(accountDetails)
        } catch (error) {
            console.log(error)
        }

        setLoading(false)
    }

    const contextData = {
        user,
        loginUser,
        logoutUser,
        registerUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext