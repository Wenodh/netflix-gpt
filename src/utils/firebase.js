// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';

import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDZ9tAKBu_ruYxm6x4j_Wi63qCWkvqTud0',
    authDomain: 'netflixgpt-710c3.firebaseapp.com',
    projectId: 'netflixgpt-710c3',
    storageBucket: 'netflixgpt-710c3.appspot.com',
    messagingSenderId: '247670296605',
    appId: '1:247670296605:web:c9a94494e66499b8ec36f4',
    measurementId: 'G-88QT97W7HQ',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const auth = getAuth();
