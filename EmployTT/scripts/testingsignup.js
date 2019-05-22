  // Your web app's Firebase configuration
  let firebaseConfig = {
    apiKey: "AIzaSyCh66whvYGuBBf4nWFK0-Rr0WPgnFGLNSk",
    authDomain: "testingdb-c8368.firebaseapp.com",
    databaseURL: "https://testingdb-c8368.firebaseio.com",
    projectId: "testingdb-c8368",
    storageBucket: "testingdb-c8368.appspot.com",
    messagingSenderId: "848870518937",
    appId: "1:848870518937:web:8b14f4cf0993e523"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


const firestore = firebase.firestore(); //Grab reference to database
const auth = firebase.auth();

//const email = document.querySelector("#email");  // gone
//const password  = document.querySelector("#password"); //gone
const subBtnRef = document.querySelector("#submitButton"); 
const signupForm = document.querySelector('#signup-form');

subBtnRef.addEventListener('click',(btnPressListener)=>{
    btnPressListener.preventDefault();
    const email = signupForm['signup-email'].value;  // gone
    const password  = signupForm['signup-password'].value; //gone
    console.log(email);
    console.log(password);
    auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

});

const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });

const googleBtnRef = document.querySelector("#googleSignIn"); 
googleBtnRef.addEventListener('click',(btnPressListener)=>{
    btnPressListener.preventDefault();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

})


firebase.auth().signOut().then(function() {
    console.log('Sign out successful');
  }).catch(function(error) {
    // An error happened.
  });