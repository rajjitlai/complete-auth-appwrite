
import React, { useRef } from 'react'
import toast from 'react-hot-toast'
import { account } from '../config/appwrite'

const registerUser = async (userInfo) => {
    try {
        await account.create(ID.unique(), userInfo.email, userInfo.password, userInfo.username)
        await account.createVerification(`${window.location.origin}/verify-email`);
        toast.success("User registered successfully! Please check your email to verify your account.")
    } catch (error) {
        toast.error("Error: ${error.message}")
    }
}

const Register = () => {
    const registerForm = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = registerForm.current.username.value;
        const email = registerForm.current.password.value;
        const password = registerForm.current.password.value;
        const passwordConfirmation = registerForm.current.passwordConfirmation.value;

        if (!username || !email || !password || !passwordConfirmation) {
            toast.error("All fields are required!")
            return;
        }

        if (password === passwordConfirmation) {
            await registerUser({ username, email, password });
        } else {
            toast.error("Passwords do not match!")
        }
    }

    return (
        <form ref={registerForm} onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button type="submit">Register</button>
            <p>Already have an account? <a href="/login">Login</a></p>
        </form>
    )
}

export default Register