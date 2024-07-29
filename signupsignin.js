// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkIq3tQltY_F0fxi9_POh-2wOT8mkyHsE",
  authDomain: "leaning-firebase-dabab.firebaseapp.com",
  projectId: "leaning-firebase-dabab",
  storageBucket: "leaning-firebase-dabab.appspot.com",
  messagingSenderId: "1052258681421",
  appId: "1:1052258681421:web:19b744af8cf43912b19204",
  measurementId: "G-E4S42ZW3GJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const fullNameRegex = /^[a-zA-Z]+(?:[\s-'][a-zA-Z]+)*$/;
const emailErrorMessage = document.querySelector(".emailerrorMessage");
const nameErrorMessage = document.querySelector(".nameerrormessage");
const passwordErrorMessage = document.querySelectorAll(".password-error");
const phoneNumberRegex = /^\+?[0-9\s-]{9,11}$/;
const signupform = document.querySelector("#signup-form");
const signUpAllInputTypeText = document.querySelectorAll(
  `#signup-form input[type="text"]`
);
const signUpAllInputTypepassword = document.querySelectorAll(
  `#signup-form input[type="password"]`
);
let password = document.getElementById("signup-password");
let email = document.getElementById("email");
const comfpassword = document.getElementById("signup-confirm-password");
const pasRegex = /^[a-zA-Z]+(?:[\s-'][a-zA-Z]+)*$/;
const allInput = document.querySelectorAll("#signup-form input");
let uid;

signupform.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (errorMessage()) {
    console.log("i reach here");
    if (await createuser()) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User is signed in:", user);

          localStorage.setItem("uid", JSON.stringify(uid));

          window.location.href = `./index.html?${uid}`;
        } else {
          console.log("No user is signed in.");

          window.location.href = "sign-in.html";
        }
      });

      console.log("User ID: ", uid);
    }
  }
});



function errorMessage() {
  let message = true;
  if (!emailRegex.test(signupform[(name = "email")].value)) {
    emailErrorMessage.style.display = "flex";
    message = false;
  }
  if (!fullNameRegex.test(signupform[(name = "name")].value)) {
    nameErrorMessage.style.display = "flex";
    message = false;
  }
  if (!pasRegex.test(signupform.password.value)) {
    passwordErrorMessage[0].style.display = " flex";
    console.log("password doest match");
    message = false;
  } else {
    passwordErrorMessage[0].style.display = " none";
  }

  if (comfpassword.value !== password.value) {
    passwordErrorMessage[1].style.display = " flex";
    message = false;
  } else {
    passwordErrorMessage[1].style.display = " none";
  }
  return message;
}

allInput.forEach((input) => {
  input.addEventListener("input", () => {
    input.style.border = "1px solid #d87d4a";
  });
});

async function createuser() {
  let userstatus = false;
  let userPassword = password.value;
  let useremail = email.value;
  console.log(userPassword);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      useremail,
      userPassword
    );
    alert("account created successfully");
    userstatus = true;
    uid = userCredential.user.uid;
    console.log("User ID: ", uid);
    let users = email.value;

    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      createdAt: new Date(),
    });

    console.log("User signed up and Firestore document created successfully");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (
      errorMessage.trim().toLowerCase() ==
      "Firebase: Error (auth/email-already-in-use).".trim().toLowerCase()
    ) {
      alert(`${useremail} already exist`);
    }
    console.log(errorMessage);
  }
  return userstatus;
}
let loginForm = document.getElementById("loginForm");
let tosignInBtn = document.getElementById("toSignIn");
tosignInBtn.addEventListener("click", () => {
  signupform.classList.toggle('displayNone')

});
signupform.addEventListener('animationend', (event) => {
  if (event.animationName === 'displayanima') {
    signupform.style.display = 'none';
  loginForm.classList.toggle("active");


  }
});


let logInBtn = document.getElementById('logInBtn')

logInBtn?.addEventListener('click',  loginUser)
 

async function loginUser(e) {
  e.preventDefault()
  console.log('loading');
  const email = document.getElementById('signInEmail').value;
  const password = document.getElementById('signInPassword').value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User logged in:', user);

    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      console.log('User document loaded from Firestore:', userDoc.data());
    } else {
      console.log('No user document found in Firestore');
    }

    localStorage.setItem("uid", user.uid);
    window.location.href = `./index.html?${user.uid}`;
  } catch (error) {
    console.error('Error logging in:', error.code, error.message);
  }
}



onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
    localStorage.setItem("uid", user.uid);
    if (!window.location.href.includes('index.html')) {
      window.location.href = `./index.html?${user.uid}`;
    }
  } else {
    console.log("No user is signed in.");
  }
});

const forgotPassword = document.getElementById("forgotPassword");
const passwordWrapper = document.querySelector(".e-money-number");
const forgotPasswordBtnEL = document.getElementById("forgotPasswordBtn");

forgotPassword.addEventListener("click",()=>{
  console.log(loginForm);
  loginForm.password.toggleAttribute("hidden")
  logInBtn.toggleAttribute("hidden")
  passwordWrapper.classList.toggle("d-none");
  forgotPasswordBtnEL.classList.toggle("d-none")
});


forgotPasswordBtnEL.addEventListener("click", (e)=>{
  e.preventDefault()
  const email = loginForm.email.value
  sendPasswordResetEmail(auth, email ).then(()=>{
    // alert(`reset eamil have sent to ${email}`)
    swal({
      title: "Reset Password",
      text: `Email sent to ${email}`,
      icon: "success",
    });
    loginForm.email.value =""
  }).catch((e)=>{
    const errorCode = e.code;
    const errorMessage = e.message;
    console.log(errorMessage);
    if (errorMessage == "Firebase: Error (auth/too-many-requests).") {
      swal({
        title: "Reset Password",
        text: `Too Many Requests Try Again in 30 minutes`,
        icon: "success",
      });
      forgotPasswordBtnEL.setAttribute("disabled", true);

      setInterval(() => {
        forgotPasswordBtnEL.removeAttribute("disabled");
      }, 1800000);
    }
  })

})

