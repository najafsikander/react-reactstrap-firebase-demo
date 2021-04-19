import firebase from 'firebase';

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    authDomain:  `${process.env.REACT_APP_AUTH_DOMAIN}`,
    projectId:  `${process.env.REACT_APP_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID }`,
    appId: `${process.env.REACT_APP_APP_ID }`,
    measurementId: `${process.env.REACT_APP_MEASUREMENT_ID }`
    
    // apiKey: "AIzaSyBidMMFRPvx0MHGrnmIgg9zmDyWzNE59AE",
    // authDomain: "fir-react-demo-5796e.firebaseapp.com",
    // projectId: "fir-react-demo-5796e",
    // storageBucket: "fir-react-demo-5796e.appspot.com",
    // messagingSenderId: "26766225899",
    // appId: "1:26766225899:web:2e18a43929bc3b3e38e9ae",
    // measurementId: "G-BVWNXKD8CD"
  };

  firebase.initializeApp(firebaseConfig);

export default firebase;