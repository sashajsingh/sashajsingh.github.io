// Your web app's Firebase configuration


// TODO: Add SDKs for Firebase products that you want to use
    //https://firebase.google.com/docs/web/setup#config-web-app -->

    let firebaseConfig = {
        apiKey: "AIzaSyBr4tb9MiA_22vj7_3I7uV0j-Sx86Qhyd4",
        authDomain: "testingdatabase-33052.firebaseapp.com",
        databaseURL: "https://testingdatabase-33052.firebaseio.com",
        projectId: "testingdatabase-33052",
        storageBucket: "testingdatabase-33052.appspot.com",
        messagingSenderId: "975242944439",
        appId: "1:975242944439:web:296a666c7edd9f6b"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

let firestore = firebase.firestore(); //Grab reference to database

const userRef= document.querySelector("#username");
const passRef= document.querySelector("#password");
const cnfmpassRef= document.querySelector("#cnfmPassword");
const subBtnRef = document.querySelector("#submitButton");
const updBtnRef = document.querySelector("#updateButton");
const delBtnRef = document.querySelector("#removeButton");
const emailRef = document.querySelector('#emailAddress');
const form   = document.querySelector('#form');
//Get elements for file upload
const prgBarRef = document.getElementById('resumeFile');
const fileBtnRef = document.getElementById('fileButton');
const userData = firestore.doc('/');



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
});



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
});


/*

//Delete Button Event Listener
delBtnRef.addEventListener("click",(btnPressListener)=>{
    btnPressListener.preventDefault();
    const Username = userRef.value;
    //TODO: ADD IN AUTHORIZATION KEY TO ALLOW FOR USER DELETE
    console.log("Deleting user: " + Username);
    //userData.collection('EmployTT/User/'+ Username).doc(Username).delete()
    userData.collection('EmployTT/User/'+ Username).doc(Username).get()
        .then(function(doc){
            if(doc.exists){
                userData.collection('EmployTT/User/'+ Username).doc(Username).delete()
                console.log("User:" +Username+ " successfully deleted!");
            }else{
                console.log("User:" +Username+ " not found!");
            }

    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    form.username.value ='';
    form.password.value ='';
});

//Update Information Button
updBtnRef.addEventListener("click",(btnPressListener)=>{
    //TODO: Get user ID programmatically, fetch the field and update it 
    btnPressListener.preventDefault();
    const Username = userRef.value;
    const Password = passRef.value;
    console.log("Username is: " + Username + " and password is: " + Password);
    userData.collection('EmployTT/User/'+ Username).doc(Username).set({
        Pass  : Password,
        Users : Username
    }).then(function(){
        console.log("User information Updated!");
    }).catch(function(error){   
        console.log(error);
    })
    form.username.value ='';
    form.password.value ='';
});

*/