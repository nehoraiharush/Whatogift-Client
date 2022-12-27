import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCvAj6DNq6hrQ_NG8s4Gga-fdydCcY8x2U",
    authDomain: "whatogift-35a37.firebaseapp.com",
    projectId: "whatogift-35a37",
    storageBucket: "whatogift-35a37.appspot.com",
    messagingSenderId: "1064514421996",
    appId: "1:1064514421996:web:8cc7937017747b05c4d1c9"
};

firebase.initializeApp(firebaseConfig);
export default firebase;