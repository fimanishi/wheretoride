import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyDNG6xrs9TODjXV4YlEXvG0EpHQBi-7Naw",
    authDomain: "wheretoride-64510.firebaseapp.com",
    databaseURL: "https://wheretoride-64510.firebaseio.com",
    projectId: "wheretoride-64510",
    storageBucket: "wheretoride-64510.appspot.com",
    messagingSenderId: "281990477060"
  };
var fire = firebase.initializeApp(config);
export default fire;