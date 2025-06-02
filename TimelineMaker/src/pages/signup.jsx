import React, { useState } from 'react'
import { Navigate, Link } from "react-router-dom"
import { doCreateUserWithEmailAndPassword, signInWithGoogle } from '../firebase/auth'
import { useAuth } from "../contexts/AuthContext/index";

const Signup = () => { 
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSigningUp, setIsSigningUp ] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if(isSigningUp) {
            return;
        }

        if(password != confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            setIsSigningUp(true);
            await doCreateUserWithEmailAndPassword(email, password);
        } catch (err) {
            if(err.code == "auth/email-already-exists" || err.code == "auth/email-already-in-use") {
                setErrorMessage("Account already exists. Log in instead.")
            }
            else if(err.code == "auth/weak-password") {
                setErrorMessage("Password must be at least 6 characters")
            }
            else {
                setErrorMessage(err.message);
            }
            setIsSigningUp(false);
        }
    };

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if(!isSigningIn) {
            setIsSigningIn(true);
            try {
                await signInWithGoogle();
            } catch(err) {
                if(err.code == "auth/popup-closed-by-user") {
                    setErrorMessage("Sign-in popup closed. Please try again.");
                }
                else if(err.code == "auth/popup-blocked") {
                    setErrorMessage("Allow popups for Google sign-in");
                }
                else {
                    setErrorMessage(err.message);
                }
                setIsSigningIn(false);
            }
        }
    }

    if(userLoggedIn) {
        return <Navigate to="/timelines" replace />;
    }

    return (
        <div>
            <div className="bg-slate-900 w-screen h-screen flex justify-center items-center">
                <form className="flex-row space-y-5" onSubmit={onSubmit}>
                    <div className="flex justify-center">
                        <p className="bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-300  bg-clip-text text-transparent text-[50px] font-semibold">Chrono</p>
                    </div>
                    <div>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-[200px] h-[30px]" placeholder="Email" required  />
                    </div>
                    <div>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-[200px] h-[30px]" required />
                    </div>
                    <div>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="w-[200px] h-[30px]" required />
                    </div>
                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                    <div>
                        <button type="submit" className="text-black bg-white  border-gray-300 text-[14px] rounded-md py-2 px-4 text-lg my-5 ml-10 shadow-xl ring-1 ring-gray-700" disabled={isSigningUp}>
                            Sign Up
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={onGoogleSignIn} className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2">
                            Sign up With Google
                        </button>
                    </div>

                    <div className="flex justify-center text-white">
                        Already have an account?&nbsp;
                        <Link to="/login" className="underline text-cyan-400">
                            Log In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup