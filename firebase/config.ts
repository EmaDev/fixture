import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBmm3tu0acmX__KYdgb3W5m-i_coG1_-ak",
    authDomain: "fixture22-b2992.firebaseapp.com",
    projectId: "fixture22-b2992",
    storageBucket: "fixture22-b2992.appspot.com",
    messagingSenderId: "1051901785599",
    appId: "1:1051901785599:web:1771b2380bc467a78623ca",
    measurementId: "G-V7ERC5S433"
};

export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);