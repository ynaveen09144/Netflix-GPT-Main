import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyD-ol5DLFOIpfjEKoCnCMI1OoANrpnpcWw",

  authDomain: "netflixgpt-beb26.firebaseapp.com",

  projectId: "netflixgpt-beb26",

  storageBucket: "netflixgpt-beb26.firebasestorage.app",

  messagingSenderId: "906728136178",

  appId: "1:906728136178:web:34f50c68a90a3760851f6b",

  measurementId: "G-EXPFE6KN0L",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth();
