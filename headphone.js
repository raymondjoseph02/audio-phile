let headPhoneProductSection = document.getElementById("hp-prduts-wrapper");



















import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,signOut
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getFirestore,
  doc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,deleteDoc,setDoc
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






const speakersPRoductWrapper = document.getElementById('hp-prduts-wrapper')
let productStatus = document.getElementById("prdut-status")
const hamMenu = document.querySelector('.ham-menu');
const offScreen = document.querySelector(".nav-links");
const hamBurger = document.querySelector(".ham-buger")
const body = document.querySelector("body")
const allLinks = document.querySelectorAll('a')
let cartArry = []
const cartWrapper = document.querySelector('.payment-style-wrapper')
let circleDiv = document.createElement('div')
circleDiv.setAttribute('id', 'circleDiv')
let cart = document.getElementById('cart')
cart.insertBefore(circleDiv, cartWrapper)




hamMenu.addEventListener("click", ()=>{
    hamMenu.classList.toggle("active")
    offScreen.classList.toggle("active")
    hamBurger.classList.toggle("ps-fixed")
});

cartIcon.style.cursor= 'pointer'

cartIcon.addEventListener('click', (e)=>{
  e.stopPropagation()
  let main = document.querySelector('main')
    cartWrapper.classList.toggle("togglecartclass")
      main.classList.toggle('opacitytoglleclass')

})
fetch("./data.json").then((res) => {
  res.json().then((data) => {
    const headerPhones = data.slice(1, 4);
    console.log(headerPhones);
    headerPhones.forEach((item) => {
     

      headPhoneProductSection.innerHTML += `
        <section class="hp-prduts-wrapper">
          <div class="hp-xx99-mark-ii ${item.slug}">
            <div class="hp-xx99-mark-ii-img  ${item.slug}-image">
              <img
                src="${item.image.desktop}"
                alt="xx99-mark-two-headphones"
              
                height="386px"
              />
            </div>
            <div class="hp-xx99-mark-ii-text   ${item.slug}-text">
              <p id="prdut-status"></p>
              <h2 class="prdut-title"> ${item.name}</h2>
              <p class="prdut-describtion">
                ${item.description}
              </p>
              <a href="./product-${item.slug}.html" class="prdut-btn">see product</a>
            </div>
          </div>
        </section>
            `;
            if (item.new == true) {
              let productStatus = document.getElementById("prdut-status");
              productStatus.innerHTML = "new product";
            }
    });
  });
});

function displayInCart() {
  let prdInCart = document.getElementById("productInCart");
  prdInCart.innerHTML = "";

  cartArry.forEach((item, index) => {
    let itemWrapper = document.createElement("div");
    itemWrapper.classList.add("image-price-wrapper");

    itemWrapper.innerHTML = `
     <div class="img-price">
      <div class="item-image">
        <img src="${item.img}" alt="">
      </div>
      <div class="text-price-wrapper">
        <div class="price">
          <h3>${item.name}</h3>
          <span>$${item.price}</span>
        </div>
      </div>
     </div>
    `;

    let nop = document.createElement("div");
    nop.classList.add("nop");

    let newDiv = document.createElement("div");
    nop.appendChild(newDiv);

    let btnMinus = document.createElement("button");
    btnMinus.textContent = "-";
    btnMinus.addEventListener("click", () => minusQuantityInCart(index));

    let itemQty = document.createElement("p");
    itemQty.textContent = `${item.quantity}`;
    itemQty.setAttribute("id", "itemQty");

    let btnAdd = document.createElement("button");
    btnAdd.textContent = "+";
    btnAdd.addEventListener("click", () => addQuantityInCart(index));

    newDiv.appendChild(btnMinus);
    newDiv.appendChild(itemQty);
    newDiv.appendChild(btnAdd);

    itemWrapper.appendChild(nop);
    prdInCart.appendChild(itemWrapper);
  });
  // let totalInCart = cartArry.reduce((accumulator, currentItem) => {
  //   return accumulator + currentItem.quantity;
  // }, 0);
  // circle.innerText = totalInCart;
  calQtyInCart();
}

async function minusQuantityInCart(index) {
  if (cartArry[index].quantity > 1) {
    cartArry[index].quantity -= 1;
    cartArry[index].price =
      cartArry[index].quantity *
      (cartArry[index].price / (cartArry[index].quantity + 1));
  }
  if (cartArry[index].quantity <= 1) {
    cartArry.splice(index, 1);
  }

  // Update Firestore with the current cart items
  console.log(cartArry);

  await updateCartInFirestore();

  // Update the cart display and total price
  displayInCart();
  totalPriceInCart();
}

function addQuantityInCart(index) {
  cartArry[index].quantity += 1;
  cartArry[index].price =
    cartArry[index].quantity *
    (cartArry[index].price / (cartArry[index].quantity - 1));
  updateCartInFirestore();
  displayInCart();
  totalPriceInCart();
}
async function updateCartInFirestore() {
  let userid = localStorage.getItem("uid");
  const cartCollectionRef = collection(db, "users", userid, "cart");

  try {
    // Clear existing cart collection to remove items not in the current cart array
    const existingItemsSnapshot = await getDocs(cartCollectionRef);
    for (let doc of existingItemsSnapshot.docs) {
      await deleteDoc(doc.ref);
    }

    // Iterate over each item in the cart array and add/update it in Firestore
    for (let item of cartArry) {
      const itemRef = doc(cartCollectionRef, item.name);
      await setDoc(itemRef, {
        name: item.name,
        price: item.price,
        img: item.img,
        quantity: item.quantity,
      });
      console.log(
        `Item ${item.name} added/updated in Firestore cart successfully`
      );
    }
  } catch (error) {
    console.error("Error updating cart in Firestore: ", error);
  }
}
function calQtyInCart() {
  let qtyInCart = cartArry.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity;
  }, 0);
  console.log(qtyInCart);
  circleDiv.innerHTML = qtyInCart;
  console.log(cart);
}


displayInCart();
totalPriceInCart()


function totalPriceInCart(){
let totalPrice = cartArry.reduce((accumulator, currentItem) => {
  return accumulator + (currentItem.price);
}, 0);
console.log(totalPrice);
let prdTotal = document.getElementById("prdTotal")
prdTotal.textContent = `$${totalPrice}`
}

async function clearCart() {
let userid = localStorage.getItem('uid')
const subcollectionRef = collection(db, "users", userid, "cart");
const querySnapshot = await getDocs(subcollectionRef);

const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
await Promise.all(deletePromises);

cartArry=[]

loadCartFromFirestore()
totalPriceInCart()
}
removeAllFromCart.addEventListener('click', clearCart)


displayInCart()



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
displayInCart()
totalPriceInCart()
}
loadCartFromFirestore()