import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyD5w1d_dlSNGWBtTNEM5kPAFSrLC4xQswQ",
    authDomain: "crown-clothing-db-c96db.firebaseapp.com",
    databaseURL: "https://crown-clothing-db-c96db.firebaseio.com",
    projectId: "crown-clothing-db-c96db",
    storageBucket: "crown-clothing-db-c96db.appspot.com",
    messagingSenderId: "335990727593",
    appId: "1:335990727593:web:33655bacda096add0cdab8",
    measurementId: "G-2P629CCQ7M"
}


export const createUserProfileDocument = async (userAuth, ...additionalData) => {
    if (!userAuth) return;

    const userDocRef = firestore.doc(`users/${userAuth.uid}`);

    const docSnapshot = await userDocRef.get();

    if(!docSnapshot.exists){
       const {displayName, email} = userAuth;
       const createdAt = new Date();

       try{
           await userDocRef.set({
               displayName,
               email,
               createdAt,
               ...additionalData
           })
       }catch(err){
            console.log("Something went worng while creating user", err);
            
       }
    }

    return userDocRef;
    
}




firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ propmt: 'select account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;