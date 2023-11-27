import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDnDxIK_wPUIDqlt-yzxhvryZaj5zLlCLg",
    authDomain: "reactnativeairbnb-f368d.firebaseapp.com",
    projectId: "reactnativeairbnb-f368d",
    storageBucket: "reactnativeairbnb-f368d.appspot.com",
    messagingSenderId: "732854154527",
    appId: "1:732854154527:web:6cff6234bc039a93fe6c2a"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase