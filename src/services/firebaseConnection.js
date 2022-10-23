import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDv9RyBsW5wK2xOz8p3yry5f-Pwo4KaJpM",
  authDomain: "tarefas-be33b.firebaseapp.com",
  projectId: "tarefas-be33b",
  storageBucket: "tarefas-be33b.appspot.com",
  messagingSenderId: "185479339151",
  appId: "1:185479339151:web:f629df7830cca32e45a4fa"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase;