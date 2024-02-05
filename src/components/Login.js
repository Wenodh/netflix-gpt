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
                className="w-full md:max-w-[400px] absolute p-8 bg-black mt-[100px] mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
                onSubmit={(e) => e.preventDefault()}
            >
                <h1 className="font-bold text-xl md:text-3xl">{headingText}</h1>
                {!isSignInForm && (
                    <input
                        ref={userName}
                        type="text"
                        placeholder="Full Name"
                        className="md:p-4 md:my-4 p-2 my-2 w-full bg-slate-700 rounded"
                    />
                )}
                <input
                    ref={email}
                    type="text"
                    placeholder="Email Address"
                    className="md:p-4 md:my-4 p-2 my-2 w-full rounded bg-slate-700"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="md:p-4 md:my-4 p-2 my-2 w-full bg-slate-700 rounded"
                />
                <p className="text-red-500 font-bold text-lg">{errorMsg}</p>
                <button
                    className="md:p-4 md:my-4 p-2 my-2  bg-red-700 w-full rounded-md"
                    onClick={handleButtonCheck}
                >
                    {btnText}
                </button>
                <p
                    className="cursor-pointer"
                    onClick={() => setIsSignInForm(!isSignInForm)}
                >
                    {footerText}
                </p>
            </form>
        </div>
    );
};

export default Login;
