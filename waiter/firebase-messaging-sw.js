importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDi2UST3wH0QZMV_5ZlIX0i-pklx-WM89o",
    authDomain: "smart-waiter-a6b70.firebaseapp.com",
    projectId: "smart-waiter-a6b70",
    storageBucket: "smart-waiter-a6b70.appspot.com",
    messagingSenderId: "630918391677",
    appId: "1:630918391677:web:02a366fa562ba6d7518e14"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/logo.png'
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});