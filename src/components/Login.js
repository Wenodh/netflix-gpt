import React, { useRef, useState } from 'react';
import Header from './Header';
import { BG_URL } from '../utils/constants';
import { checkValidData, validateUsername } from '../utils/validate';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const email = useRef(null);
    const password = useRef(null);
    const userName = useRef(null);

    const headingText = `Sign ${isSignInForm ? 'In' : 'Up'}`;
    const footerText = isSignInForm
        ? 'New to NetFlix? Sign Up Now'
        : 'Already registered? Sign In now.';
    const btnText = `Sign ${isSignInForm ? 'In' : 'Up'}`;

    const handleButtonCheck = (e) => {
        const message = checkValidData(
            email.current.value,
            password.current.value
        );
        setErrorMsg(message);
        if (message) return;
        if (!isSignInForm) {
            const isValidUserName = validateUsername();
            if (isValidUserName) return setErrorMsg(isValidUserName);
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: userName.current.value,
                    })
                        .then(() => {
                            const { uid, email, displayName } =
                                auth.currentUser;
                            dispatch(addUser({ uid, email, displayName }));
                            navigate('/browse');
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            setErrorMsg(errorCode + ' : ' + errorMessage);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMsg(errorCode + ' : ' + errorMessage);
                });
        } else {
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then(() => {})
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMsg(errorCode + ' : ' + errorMessage);
                });
        }
    };
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
            <form
                className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
                onSubmit={(e) => e.preventDefault()}
            >
                <h1 className="font-bold text-3xl py-4">{headingText}</h1>
                {!isSignInForm && (
                    <input
                        ref={userName}
                        type="text"
                        placeholder="Full Name"
                        className="p-4 my-4 w-full bg-slate-700"
                    />
                )}
                <input
                    ref={email}
                    type="text"
                    placeholder="Email Address"
                    className="p-4 my-4 w-full bg-slate-700"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="p-4 my-4 w-full bg-slate-700"
                />
                <p className="text-red-500 font-bold text-lg">{errorMsg}</p>
                <button
                    className="p-4 my-4  bg-red-700 w-full rounded-md"
                    onClick={handleButtonCheck}
                >
                    {btnText}
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
