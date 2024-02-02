import React, { useEffect } from 'react';
import { LOGO, USER_AVATAR } from '../utils/constants';
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {})
            .catch((error) => {
                navigate('/error');
            });
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid, email, displayName }));
                navigate('/browse');
            } else {
                dispatch(removeUser());
                navigate('/');
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <div className="absolute z-10 w-screen px-8 py-2 bg-gradient-to-b from-black flex justify-between">
            <img className="w-44 " src={LOGO} alt="logo" />
            {user && (
                <div className="flex p-2">
                    <img
                        className="w-12 h-12 pr-1 rounded-sm object-center"
                        alt="usericon"
                        src={USER_AVATAR}
                    />
                    <button
                        className="font-bold text-white hover:text-gray-200"
                        onClick={handleSignOut}
                    >
                        (Sign Out)
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
