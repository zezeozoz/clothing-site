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

export const createUserProfileDocument = async (userAuth, additionalData) => {
   if (!userAuth) return;

   const userRef = firestore.doc(`users/${userAuth.uid}`);

   const snapShot = await userRef.get()
   if(!snapShot.exists) {
      const {displayName, email} = userAuth;
      const createdAt = new Date()

      try {
         await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
         })
      }  catch(err) {
         console.log('error creating user', err.message);
      }
   }
   return userRef;
} 

 firebase.initializeApp(config);

 export const auth = firebase.auth();
 export const firestore = firebase.firestore();

 const provider = new firebase.auth.GoogleAuthProvider();
 provider.setCustomParameters({ prompt: 'select_account' });
 export const signInWithGoogle = () => auth.signInWithPopup(provider);

 export default firebase;