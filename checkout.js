import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getFirestore,
  doc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
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

// varibles declaration

const hamMenu = document.querySelector(".ham-menu");
const offScreen = document.querySelector(".nav-links");
const hamBurger = document.querySelector(".ham-buger");
const body = document.querySelector("body");
const form = document.querySelector("form");
const allInputTypeText = document.querySelectorAll(`input[type="text"]`);
const inpTypeRadio = document.querySelectorAll('input[type="radio"]');
const selectRadio = document.querySelectorAll('input[type="radio"]:checked');

const root = document.documentElement;
const mainColor = getComputedStyle(root)
  .getPropertyValue("---burnt-orange")
  .trim();
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const fullNameRegex = /^[a-zA-Z]+(?:[\s-'][a-zA-Z]+)*$/;
const emailErrorMessage = document.querySelector(".emailerrorMessage");
const nameErrorMessage = document.querySelector(".nameerrormessage");
const phoneNoErrorMessage = document.querySelector(".phonenoerrorMessage");
const phoneNumberRegex = /^\+?[0-9\s-]{9,11}$/;
const addressRegex = /^[a-zA-Z0-9\s.,#-]+$/;
const nigeriaPostalCodeRegex = /^\d{6}$/;
const countryNameRegex = /^[a-zA-Z\s-]+$/;
const cartWrapper = document.querySelector(".payment-style-wrapper");
let signedInUser = null;
let cartArry = [];
// const successfullyModal = document.getElementsByClassName('successfull-modal')[0]
const successfullyModal = document.querySelector('.successfull-modal')
const main = document.querySelector('main')
const closeModal = document.getElementById("closeModal")

// successfullyModal.classList.to('modal-toggle')

onAuthStateChanged(auth, (user) => {
  if (user) {
    signedInUser = user;

    form.email.value = user.email;
    form.email.disabled = true;
  }
});

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreen.classList.toggle("active");
  hamBurger.classList.toggle("ps-fixed");
  body.classList.toggle("position-fixed");
});


form.addEventListener("submit", (event) => {
  event.preventDefault();
  textinputvalidation();
  // errorMessage();
  const isValid = textinputvalidation()
  if (isValid) {
successfullyModal.setAttribute('id', 'modalToggle')
main.classList.toggle('opacitytoglleclass')
// body.classList.toggle("position-fixed");
allInputTypeText.forEach(input =>{
  input.value = ""
})
  };
  
});

closeModal.addEventListener("click", function(){
  successfullyModal.removeAttribute("id", "modalToggle");
  main.classList.toggle('opacitytoglleclass')
  // body.classList.toggle("position-fixed");

})
function textinputvalidation() {
  let validation = true

  allInputTypeText.forEach((input) => {
    if (input.value == "") {
      input.style.border = "1px solid red";
      validation = false

    }
  });
  return validation;


 
}


allInputTypeText.forEach((input) => {
  input.addEventListener("input", () => {
    input.style.border = `1px solid ${mainColor}`;
  });
});


inpTypeRadio.forEach((radio)=>{
  let codSummary = document.querySelector('.cod-summary')
  let eMoneySummary = document.querySelector('.e-money-summary')


  radio.addEventListener("change",()=>{
    if (radio.value == 'eMoney') {
      eMoneySummary.setAttribute('id', 'displyFlexClass')
      codSummary.removeAttribute('id', 'displyFlexClass')

    } else {
      codSummary.setAttribute('id', 'displyFlexClass')
      eMoneySummary.removeAttribute('id', 'displyFlexClass')

    }
  })
})
podWrapper.addEventListener('click', checkRadioBtnInside)
eMoneyNumberWrapper.addEventListener('click', checkRadioBtnInside)
function checkRadioBtnInside() {
  const radioButton = event.currentTarget.querySelector('input[type="radio"]');
  if (radioButton) {
    radioButton.checked = true;
    radioButton.dispatchEvent(new Event('change')); // Trigger change event
  }
}

function errorMessage() {
  if (!emailRegex.test(form[(name = "email")].value)) {
    emailErrorMessage.style.display = "flex";
  }
  if (!fullNameRegex.test(form[(name = "name")].value)) {
    nameErrorMessage.style.display = "flex";
  }
  if (!phoneNumberRegex.test(form[(name = "tel")].value)) {
    phoneNoErrorMessage.style.display = "flex";
  }
  if (!addressRegex.test(form[(name = "address")].value)) {
    console.log("to short");
  }
  if (!nigeriaPostalCodeRegex.test(form[(name = "zip-code")].value)) {
    console.log(" zip code to short");
  }
  if (!countryNameRegex.test(form[(name = "city")].value)) {
    console.log(" wrong");
  }
  if (!countryNameRegex.test(form[(name = "country")].value)) {
    console.log(" wrong");
  }
}
form.addEventListener("input", () => {
  if (emailRegex.test(form[(name = "email")].value)) {
    emailErrorMessage.style.display = "none";
  }
  if (fullNameRegex.test(form[(name = "name")].value)) {
    nameErrorMessage.style.display = "none";
  }
  if (phoneNumberRegex.test(form[(name = "tel")].value)) {
    phoneNoErrorMessage.style.display = "none";
  }

  if (addressRegex.test(form[(name = "address")].value)) {
    console.log("address ok");
  }
  if (nigeriaPostalCodeRegex.test(form[(name = "zip-code")].value)) {
    console.log(" zip code ok");
  }
  if (countryNameRegex.test(form[(name = "city")].value)) {
    console.log(" sweet city");
  }
  if (countryNameRegex.test(form[(name = "country")].value)) {
    console.log(" sweet");
  }
});
cartIcon.addEventListener("click", () => {
  // let main = document.querySelector("main");
  // cartWrapper.classList.toggle("togglecartclass");
  // main.classList.toggle("opacitytoglleclass");
  location.reload()
});
const backBtn = document.getElementById('backBtn')
backBtn.addEventListener('click', ()=>{
  window.history.back();

})
let summaryPrdTotal = document.getElementById('summaryPrdTotal')
let shippingAmount = document.getElementById('shippingAmount')
let vatAmount = document.getElementById('vatAmount')
let grandTotalAmount = document.getElementById('grandTotalAmount')


async function loadCartFromFirestore() {
  try {
    const uid = localStorage.getItem("uid");
    if (uid) {
      const cartCollectionRef = collection(db, "users", uid, "cart");
      const cartSnapshot = await getDocs(cartCollectionRef);

      // Check if cartSnapshot has a forEach method
      if (cartSnapshot.forEach) {
        cartSnapshot.forEach((doc) => {
          let existingProduct = cartArry.find(
            (prod) => prod.name === doc.data().name
          );
          if (existingProduct) {
            // console.log(doc.data());
            existingProduct.quantity = doc.data().quantity;
            existingProduct.price = doc.data().price;
          } else {
            cartArry.push(doc.data());
          }
        });
        // console.log("Cart loaded from Firestore successfully");
        // console.log(cartArry);
      } else {
        console.error("cartSnapshot does not have a forEach method");
      }
    } else {
      console.log("No user is signed in");
    }
  } catch (error) {
    console.error("Error loading cart from Firestore:", error);
  }
  totalPriceInCart();
  grandCalcUlation()
  summaryInToTAL();

}
loadCartFromFirestore();

/*function displayInCart() {
  let prdInCart = document.getElementById("productInCart");
  prdInCart.innerHTML = "";

  cartArry.forEach((item,) => {
    const price = item.price.toLocaleString()
    prdInCart.innerHTML += `
        <div class="image-price-wrapper">
          <div class="item-image">
            <img src="${item.img}" alt="">
          </div>
          <div class="text-price-wrapper">
            <div class="price">
              <h3>${item.name}</h3>
              <span>$${price}</span>
            </div>
          </div>
        </div>
        
      `;
    let nop = document.createElement("div");
    nop.classList.add("nop");
    let newDiv = document.createElement("div");
    nop.appendChild(newDiv);

    let btnMinus = document.createElement("button");
    let btnAdd = document.createElement("button");
    btnAdd.setAttribute("id", "addQuantityInCart");
    let itemQty = document.createElement("p");
    itemQty.textContent = `${item.quantity}`;
    itemQty.setAttribute("id", "itemQty");
    btnMinus.addEventListener("click", minusQuantityInCart);
    btnMinus.textContent = "-";
    btnAdd.addEventListener("click", addQuantityInCart);
    btnAdd.textContent = "+";
    newDiv.appendChild(btnMinus);
    newDiv.appendChild(itemQty);
    newDiv.appendChild(btnAdd);
    prdInCart.appendChild(nop);
  });

}*/

async function totalPriceInCart() {
  let totalPrice = cartArry.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price;
  }, 0);
  let dollarSign = '$'
  prdTotal.textContent = `$${totalPrice.toLocaleString()}`;
  summaryPrdTotal.innerHTML=`$${totalPrice.toLocaleString()}`
  let vat = totalPrice*(20 / 100)
  let newVat = parseInt(vat)
  vatAmount.innerHTML=`$${newVat.toLocaleString()}`
  let shipping = 20 * cartArry.length
  shippingAmount.innerHTML =  `${dollarSign}${shipping}`
   let grandTotal =  totalPrice + shipping + newVat
  grandTotalAmount.innerHTML = `${dollarSign}${grandTotal.toLocaleString()}`
  return grandTotal
}

async function grandCalcUlation() {
  const sucGrandPriceEl = document.getElementById("sucGrandPrice")
  let grandTotal = await totalPriceInCart()

  sucGrandPriceEl.innerHTML = `
  $${grandTotal.toLocaleString()}
  `
}

/*async function clearCart() {
  let userid = localStorage.getItem("uid");
  const subcollectionRef = collection(db, "users", userid, "cart");
  const querySnapshot = await getDocs(subcollectionRef);

  const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deletePromises);

  cartArry = [];

  loadCartFromFirestore();
  totalPriceInCart();
}*/
/*removeAllFromCart.addEventListener("click", clearCart);

function minusQuantityInCart() {
  cartArry[index].quantity -= 1;
  cartArry[index].price =
    cartArry[index].quantity *
    (cartArry[index].price / (cartArry[index].quantity + 1));
  displayInCart();
  totalPriceInCart();

  if (cartArry[index].quantity < 1) {
    console.log(index);
    cartArry.splice(index, 1);
    console.log(cartArry);
    displayInCart();
    totalPriceInCart();
  }
  console.log("minusQuantityInCart");
}

function addQuantityInCart() {
  console.log("addQuantityInCart");
}*/

function summaryInToTAL() {
  let summary = document.getElementById("cartSummary");
  cartArry.forEach((item)=>{
    summary.innerHTML+=`<div class="items-in-cart">
                <div class="image-price-wrapper">
                  <div class="item-image">
                    <img src="${item.img}" alt="">
                  </div>
                  <div class="text-price-wrapper">
                    <div class="price">
                      <h3>${item.name}</h3>
                      <span>$${item.price.toLocaleString()}</span>
                    </div>
                </div>
              </div>
              <div class="nop">
                <p>x${item.quantity}</p>
              </div>`
  });    
  successfullyModalTotal()
  }
 

  function successfullyModalTotal() {
    let summary = document.getElementById("items");
    cartArry.forEach((item)=>{
      if (item.name > 20) {
        name = name.slice(0,20)
      }
      summary.innerHTML+=`
                <div class="item-wrapper">
                <div class="firstsection">
                  <div class="imgwrapper">
                    <img src="${item.img}" width="50px" alt="">
                  </div>
                  <div class="price">
                    <h3>${item.name}</h3>
                    <span>$${item.price.toLocaleString()}</span>
                  </div>
                </div>
                <div class="secondsection">
                  <p>x${item.quantity}</p>
                </div>
              </div>
                
                `
    });    
    }
   

