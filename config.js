import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAdUrAMlpMWnsZEFxB9QF8FS0opMnFcXww",
    authDomain: "rn-todo-ac737.firebaseapp.com",
    projectId: "rn-todo-ac737",
    storageBucket: "rn-todo-ac737.appspot.com",
    messagingSenderId: "609607035402",
    appId: "1:609607035402:web:f49c79b31be5cbecbf4df3"
  }; 

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

  export { firebase };