import firebase from 'firebase';
require('@firebase/firestore');
const firebaseConfig = {
  apiKey: "AIzaSyBYj8ew9ys9O-KR5qd0AhIr3pKPC1djS1Q",
  authDomain: "challengeup-3150c.firebaseapp.com",
  projectId: "challengeup-3150c",
  storageBucket: "challengeup-3150c.appspot.com",
  messagingSenderId: "349028633902",
  appId: "1:349028633902:web:c91442f70dc50966aa7ebf"
};

if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
} 

export default firebase.firestore();