import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyDi2UST3wH0QZMV_5ZlIX0i-pklx-WM89o",
    authDomain: "smart-waiter-a6b70.firebaseapp.com",
    projectId: "smart-waiter-a6b70",
    storageBucket: "smart-waiter-a6b70.appspot.com",
    messagingSenderId: "630918391677",
    appId: "1:630918391677:web:02a366fa562ba6d7518e14"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

// Export initialized Firebase app and messaging
export { app, messaging, onMessage };
