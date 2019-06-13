import firebase from 'firebase/app'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDPCfh5UyTLhXIubdc3cvb49YSStBgpOdI",
  authDomain: "teak-passage-126010.firebaseapp.com",
  databaseURL: "https://teak-passage-126010.firebaseio.com",
  projectId: "teak-passage-126010",
  storageBucket: "teak-passage-126010.appspot.com",
  messagingSenderId: "204790237190",
  appId: "1:204790237190:web:bb2f7180135cc5f9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default {
  firebase, storage
}