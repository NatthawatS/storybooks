// import firebase from "firebase";
import * as firebase from 'firebase/app';
// Reducer
const config = {
  apiKey: "AIzaSyDYw4nW7k_QpBZjoF1fjHfwI0RPGTfw0qU",
  authDomain: "storage-storybook.firebaseapp.com",
  databaseURL: "https://storage-storybook.firebaseio.com",
  projectId: "storage-storybook",
  storageBucket: "storage-storybook.appspot.com",
  messagingSenderId: "1063688389583",
};
!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

const initialState = {
  db: firebase,
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
