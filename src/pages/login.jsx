import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            navigate("/");
        } catch (error) {
            // Handle different error codes
            if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
                setError("Sign in was cancelled. Please try again.");
            } else {
                setError("An error occurred during sign in. Please try again.");
            }
            console.error("Error during sign in:", error);
        }
    }

    return (
        <>
            <p>Sign In With Google To Continue</p>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
            {error && <p className="error-message">{error}</p>}
        </>
    )
}
