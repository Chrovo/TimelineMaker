import React, { useState } from 'react'
import { Navigate, Link } from "react-router-dom"
import { doSignInWithEmailAndPassword, signInWithGoogle } from '../firebase/auth'
import { useAuth } from "../contexts/AuthContext/index";

const Login = () => {
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn ] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if(!isSigningIn) {
            setIsSigningIn(true);
            await doSignInWithEmailAndPassword(email, password);
        }
    }

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if(!isSigningIn) {
            setIsSigningIn(true);
            try {
                await signInWithGoogle();
            } catch(err) {
                setErrorMessage(err.message);
                setIsSigningIn(false);
            }
        }
    }

    return (
        <div>
            {userLoggedIn && (<Navigate to={"/timelines"} replace />)}
            <div className="bg-slate-900 w-screen h-screen flex justify-center items-center">
                <form className="flex-row space-y-5" onSubmit={onSubmit}>
                    <div className="flex justify-center">
                        <p className="bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-300  bg-clip-text text-transparent text-[50px] font-semibold">Chrono</p>
                    </div>
                    <div>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-[200px] h-[30px]" placeholder="john.doe@gmail.com" required  />
                    </div>
                    <div>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-[200px] h-[30px]" />
                    </div>
                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                    <div>
                        <button type="submit" className="text-black bg-white  border-gray-300 text-[14px] rounded-md py-2 px-4 text-lg my-5 ml-10 shadow-xl ring-1 ring-gray-700">
                            Sign Up
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={onGoogleSignIn} className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2">
                            Sign in With Google
                        </button>
                    </div>

                    <div className="flex justify-center text-white">
                        Don't have an account?&nbsp;
                        <Link to="/signup" className="underline text-cyan-400">
                            Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login