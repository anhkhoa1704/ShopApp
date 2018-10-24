import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyA5leYCl5mQYcXdGH20qK-XYynbIf4TlLY",
    authDomain: "shopapp-8541a.firebaseapp.com",
    databaseURL: "https://shopapp-8541a.firebaseio.com",
    projectId: "shopapp-8541a",
    storageBucket: "shopapp-8541a.appspot.com",
    messagingSenderId: "980477341655"
};

const firebaseShopApp = firebase.initializeApp(config);

export default firebaseShopApp;