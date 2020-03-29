import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const config = {
   apiKey: "AIzaSyCGDNw8OCEDrcPG09o8SHHqvPXc4j0BPDs",
   authDomain: "clothing-d.firebaseapp.com",
   databaseURL: "https://clothing-d.firebaseio.com",
   projectId: "clothing-d",
   storageBucket: "clothing-d.appspot.com",
   messagingSenderId: "529766631817",
   appId: "1:529766631817:web:fcf4eb475d71b77f3e7958",
   measurementId: "G-084WVSQBEJ"
 };

 firebase.initializeApp(config);

 export const auth = firebase.auth();
 export const firestore = firebase.firestore();

 const provider = new firebase.auth.GoogleAuthProvider();
 provider.setCustomParameters({ prompt: 'select_account' });
 export const signInWithGoogle = () => auth.signInWithPopup(provider);

 export default firebase;