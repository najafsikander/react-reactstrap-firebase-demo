import firebase from 'firebase';

const firebaseConfig = {
    // apiKey: process.env.API_KEY,
    // authDomain: process.env.AUTH_DOMAIN,
    // projectId: process.env.PROJECT_ID,
    // storageBucket: process.env.STORAGE_BUCKET,
    // messagingSenderId: process.env.MESSAGING_SENDER_ID,
    // appId: process.env.APP_ID,
    // measurementId: process.env.MEASUREMENT_ID
    apiKey: "AIzaSyBidMMFRPvx0MHGrnmIgg9zmDyWzNE59AE",
    authDomain: "fir-react-demo-5796e.firebaseapp.com",
    projectId: "fir-react-demo-5796e",
    storageBucket: "fir-react-demo-5796e.appspot.com",
    messagingSenderId: "26766225899",
    appId: "1:26766225899:web:2e18a43929bc3b3e38e9ae",
    measurementId: "G-BVWNXKD8CD"
  };

  firebase.initializeApp(firebaseConfig);

export default firebase;