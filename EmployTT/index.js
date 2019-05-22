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

  const auth = firebase.auth();
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log('user logged in: ', user.email);
      auth.fetchSignInMethodsForEmail(user.email).then(providers =>{
        console.log(providers);
    }).catch(error=>{
      console.log(error);
    })
    } else {
      console.log('No user logged in');
    }
  })

const logout = document.querySelector('#logged-in');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});


const logOutBtn = document.querySelector('#logged-in');
logOutBtn.addEventListener('click',(btnPressListener)=>{
  btnPressListener.preventDefault();
  firebase.auth().signOut().then(function() {
    console.log('Sign out successful');
  }).catch(function(error) {
    // An error happened.
  });
})

