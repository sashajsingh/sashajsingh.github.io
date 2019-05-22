// Your web app's Firebase configuration


// TODO: Add SDKs for Firebase products that you want to use
    //https://firebase.google.com/docs/web/setup#config-web-app -->

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
const auth = firebase.auth(); //Grab reference to firebase objects
const prgBarRef = document.getElementById('resumeFile');
const fileBtnRef = document.getElementById('fileButton');
const userData = firestore.doc('/');

/* const userRef= document.querySelector("#username");  // gone
const passRef= document.querySelector("#password"); //gone
const cnfmpassRef= document.querySelector("#cnfmPassword"); //gone 
const subBtnRef = document.querySelector("#submitButton"); 
const updBtnRef = document.querySelector("#updateButton");
const delBtnRef = document.querySelector("#removeButton");
const emailRef = document.querySelector('#emailAddress');
const form   = document.querySelector('#form');
//Get elements for file upload




passRef.addEventListener("invalid",(emailChange)=>{
    emailChange.target.setCustomValidity('Password does not meet minimum requirements');
})

passRef.addEventListener("input",(emailChange)=>{
    emailChange.target.setCustomValidity('');
})

cnfmPassword.addEventListener("change",(passwordChange)=>{
    const initPassword =passRef.value;
    const cnfmdPassword = cnfmPassword.value;

    if(initPassword !=cnfmdPassword){
        passwordChange.target.setCustomValidity('Passwords do not match. Ensure that the same password is in both fields');
        
    }
})

cnfmPassword.addEventListener("input",(emailChange)=>{
    emailChange.target.setCustomValidity('');
})

emailRef.addEventListener("invalid",(emailChange)=>{
    emailChange.target.setCustomValidity('Please recheck email address. Example: johndoe@domain.com');
})

emailRef.addEventListener("input",(emailChange)=>{
    emailChange.target.setCustomValidity('');
})

//Submit Button Event Listener
subBtnRef.addEventListener("click",(btnPressListener)=>{
   // btnPressListener.preventDefault();
    const Username = userRef.value;
    const Password = passRef.value;

    console.log("Username is: " + Username + " and password is: " + Password);
    userData.collection('EmployTT/User/'+ Username).doc(Username).set({
        Pass  : Password,
        Users : Username
    }).then(function(){
        console.log("User information Saved!");
        
    }).catch(function(error){   
        console.log(error);
    })
    //form.username.value ='';
    //form.password.value ='';
    prgBarRef.value=0;
    //fileBtnRef.value="";
    // //window.location.href = 'registration_success.html';
});*/

const subBtnRef  = document.querySelector("#submitButton"); 
const signupForm = document.querySelector('#signup-form');

const firstName     = document.querySelector('#firstName');
const lastName      = document.querySelector('#lastName')
const cnfmPassword  = document.querySelector('#cnfmPassword')
const addressOne    = document.querySelector('#addressOne')
const addressTwo    = document.querySelector('#addressTwo')
const cityortown    = document.querySelector('#cityortown')
const phoneNumber   = document.querySelector('#phoneNumber')


/*
const resumeFile        = document.querySelector('#resumeFile')
const transcriptFile    = document.querySelector('#transcriptFile')
const birthPaperFile    = document.querySelector('#birthPaperFile')
const referencesFiles   = document.querySelector('#referencesFiles')
const addMatFile        = document.querySelector('#addMatFile')
*/

const fileDrop          = document.querySelector('#drop_zone');
const fileNames         = document.querySelector('#file-names');
let   fileNameArr       = [];

fileDrop.addEventListener('drop',(dropListener)=>{
    console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    dropListener.preventDefault();
    fileNames.innerHTML="Files ready for upload:";
    

    if (dropListener.dataTransfer.items) {
        
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < dropListener.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (dropListener.dataTransfer.items[i].kind === 'file') {
          let file = dropListener.dataTransfer.items[i].getAsFile();
          fileNameArr[i] =dropListener.dataTransfer.items[i].getAsFile();
          console.log('... file[' + i + '].name = ' + file.name);
          let droppedFile = document.createElement("p"); 
          droppedFile.innerHTML=file.name;
          fileNames.appendChild(droppedFile);
          
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < dropListener.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + dropListener.dataTransfer.files[i].name);
      }
    }
})

fileDrop.addEventListener('dragover',(dragListener)=>{
    console.log('File(s) in drop zone'); 
    // Prevent default behavior (Prevent file from being opened)
    dragListener.preventDefault();
})


subBtnRef.addEventListener('click',(btnPressListener)=>{
    btnPressListener.preventDefault();

    
  



    const email = signupForm['signup-email'].value;  // gone
    const password  = signupForm['signup-password'].value; //gone - don't give to firebase in plaintext
    console.log(email);
    console.log(password);
    auth.createUserWithEmailAndPassword(email, password)
    .then(cred =>{
      return firestore.collection('Users').doc(cred.user.uid).set({
        User : signupForm['signup-email'].value,
      })
      
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });


      let user = firebase.auth().currentUser;
      for (let i = 0; i < fileNameArr.length; i++) {
                console.log(fileNameArr[i]);
                storageRef = firebase.storage().ref('Users/'+user.uid +'/   '+fileNameArr[i].name);
                storageRef.put(fileNameArr[i]);
        } 
    
    window.location.assign("../index.html");  //USE DOUBLE QUOTES WHEN USING THIS FUNCTION n
});

/* 

*/

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
          let token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        let user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
      });

})

/*
//File Button Event Listener
fileBtnRef.addEventListener('change',(btnPressListener)=>{
    btnPressListener.preventDefault();
    //Get File - Create a root reference
    let file = btnPressListener.target.files[0];
    //Create a storage reference
    let storageRef=  firebase.storage().ref('Resumes/'+file.name);
    //Upload File
    let task = storageRef.put(file);
    //Update progress bar
    task.on('state_changed', function progress(snapshot){
        let percentage = (snapshot.bytesTransferred/snapshot.totalBytes) *100;
        prgBarRef.value=percentage;
    },
    function (error){
        console.log(error);
    },
    function complete(){
        console.log("File uploaded successfully!");
        
    })

    document.getElementById('file').files[0]
});
*/