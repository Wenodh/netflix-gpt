import React, { useEffect } from 'react';
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from '../utils/constants';
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
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
    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView());
    };
    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    };
    return (
        <div className="absolute w-screen px-1 md:px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
            <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
            {user && (
                <div className="flex md:p-2 justify-between">
                    {showGptSearch && (
                        <select
                            className="p-2 m-2 bg-gray-900 text-white rounded"
                            onChange={handleLanguageChange}
                        >
                            {SUPPORTED_LANGUAGES.map(({ identifier, name }) => (
                                <option key={identifier} value={identifier}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    )}
                    <button
                        className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
                        onClick={handleGptSearchClick}
                    >
                        {showGptSearch ? 'Homepage' : 'GPT Search'}
                    </button>
                    <img
                        className="hidden md:block w-12 h-12"
                        alt="usericon"
                        src={USER_AVATAR}
                    />
                    <button
                        onClick={handleSignOut}
                        className="font-bold text-white "
                    >
                        (Sign Out)
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
