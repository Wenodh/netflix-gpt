import React, { useState } from 'react';
import Header from './Header';
import { BG_URL } from '../utils/constants';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const headingText = `Sign ${isSignInForm ? 'In' : 'Up'}`;
    const footerText = isSignInForm
        ? 'New to NetFlix? Sign Up Now'
        : 'Already registered? Sign In now.';
    return (
        <div>
            <Header />
            <div className="absolute ">
                <img
                    className=" h-screen w-screen object-cover"
                    src={BG_URL}
                    alt="background"
                />
            </div>
            <form className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1 className="font-bold text-3xl py-4">{headingText}</h1>
                {!isSignInForm && (
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="p-4 my-4 w-full bg-slate-700"
                    />
                )}
                <input
                    type="text"
                    placeholder="Email Address"
                    className="p-4 my-4 w-full bg-slate-700"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-4 my-4 w-full bg-slate-700"
                />

                <button className="p-4 my-4  bg-red-700 w-full rounded-md">
                    Sign In
                </button>
                <p
                    className="cursor-pointer p-4"
                    onClick={() => setIsSignInForm(!isSignInForm)}
                >
                    {footerText}
                </p>
            </form>
        </div>
    );
};

export default Login;
