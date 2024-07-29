import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
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








let cartArry = [];
const cartWrapper = document.querySelector(".payment-style-wrapper");
const cart = document.getElementById("cart");
let circleDiv = document.createElement("div");
circleDiv.setAttribute("id", "circleDiv");
cart.insertBefore(circleDiv, cartWrapper);
console.log(cart);


cartIcon.style.cursor= 'pointer'

cartIcon.addEventListener("click", () => {
  let main = document.querySelector("main");
  cartWrapper.classList.toggle("togglecartclass");
  main.classList.toggle("opacitytoglleclass");
});



fetch("./data.json")
.then((res) => res.json())
.then((actualdata) => {
  const item = actualdata.slice(4, 5);
 
  

  
  const prdDescriptionWrapper = document.querySelector(
    ".product-description-wrapper"
  );
  const prdShowCaseWrapper = document.querySelector(
    ".show-case-section-wrapper"
  );
  prdDescriptionWrapper.innerHTML = `
<div class="prd-first-section-wrapper">
            <div class="prd-image">
              <img
                src="${item[0].image.desktop}"
                alt=""
              />
            </div>
            <div class="prd-description">
              <p id="prd-status"></p>
              <h2 id="prd-title"> ${item[0].name}</h2>
              <p id="prd-description">
              ${item[0].description}
              </p>
              <p id="prd-price">$${item[0].price}</p>
              <div class="cart-btns">
                <div id="incrementing-btn">
                 
                </div>
                <div id="add-cart">
                  <button id="add-cart-btn">
                  <div class="spinner-wrapper d-none">
                   <div class="spinner-border " role="status">
                  <span class="visually-hidden">Loading...</span>
                  </div>
                  </div>
                  add to cart</button>
                </div>
              </div>
            </div>
          </div>
          <div class="prd-features-wrapper">
            <h3 class="feature-h3">features</h3>
            <div class="prd-features-content">
              <div class="features-para">
                <p>
                ${item[0].features.slice(0, 335)}
                </p>
                <p>
                ${item[0].features.slice(335)}
                
                </p>
              </div>
              <div class="prd-in-the-box">
                <h3>in the box</h3>
  
              
                   <ul>
                  <li><span>${item[0].includes[0].quantity}x </span>${item[0].includes[0].item}</li>
                  <li><span>${item[0].includes[1].quantity}x </span>${item[0].includes[1].item}</li>
                  <li><span>${item[0].includes[2].quantity}x </span>${item[0].includes[2].item}</li>
                  <li><span>${item[0].includes[3].quantity}x </span>${item[0].includes[3].item}</li>
                </ul>
              
              </div>
            </div>
          </div>

`;
let minusQuantity = document.createElement('button')
minusQuantity.textContent='-'
minusQuantity.addEventListener('click', ()=>{
  let totalQuantity = document.getElementById("totalQuantity");
  if (+totalQuantity.textContent > 1) {
    totalQuantity.textContent = +totalQuantity.textContent - 1;
  }
})
let totalQuantity = document.createElement('p')
totalQuantity.setAttribute('id', 'totalQuantity')
totalQuantity.textContent= 1
let addQuantity = document.createElement('button')
addQuantity.setAttribute('id', "addQuantityBtn")
addQuantity.textContent = '+'
addQuantity.addEventListener('click', ()=>{
  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent = +totalQuantity.textContent + 1;
  console.log('is working');
})

let incrementingbtn = document.getElementById('incrementing-btn')
incrementingbtn.appendChild(minusQuantity)
incrementingbtn.appendChild(totalQuantity)
incrementingbtn.appendChild(addQuantity)

console.log(incrementingbtn);

console.log(item[0].includes[0].quantity);
  if (item[0].new === true) {
    let productStatus = document.getElementById("prd-status");
    productStatus.textContent = "new product";
  }
  let image1 = item[0].gallery.first.desktop;
  let image2 = item[0].gallery.second.desktop;
  let image3 = item[0].gallery.third.desktop;

  prdShowCaseWrapper.innerHTML = `
  <div class="prd-show-case-image-wrapper">
          <div class="flex-wrapper">
            <div class="show-case-one">
              <img
                src="${image1}"
                alt=""
              />
            </div>

            <div class="show-case-two">
              <img
                src="${image2}"
                alt=""
              />
            </div>
          </div>
          <div class="show-case-three">
            <img
              src="${image3}"
              alt=""
            />
          </div>
        </div>

`;

  const addToCartBtn = document.getElementById("add-cart-btn");
  addToCartBtn.addEventListener("click", addTocart);

});



async function addTocart() {
  const spinnerWrapper = document.querySelector('.spinner-wrapper')
  try {
    spinnerWrapper.classList.toggle("d-none")
    const response = await fetch("./data.json");
    const actualData = await response.json();
    const item = actualData[4]; // Assuming only one item is being processed
    const image = item.image.desktop;
    const name = item.name.slice(0, 12);
    const price = item.price;
    const quantity = +document.getElementById("totalQuantity").textContent;
    const addprd = {
      name: name,
      price: price * quantity,
      img: image,
      quantity: quantity,
    };

    // console.log(addprd);
    const user = localStorage.getItem("uid");
    console.log(user);

    if (user) {
      const uid = user;
      const cartCollectionRef = collection(db, "users", uid, "cart");

      // Check if the product already exists in the Firestore cart collection
      const cartQuery = query(cartCollectionRef, where("name", "==", name));
      const cartSnapshot = await getDocs(cartQuery);

      if (!cartSnapshot.empty) {
        // If the product exists, update its quantity and price
        const existingProductDoc = cartSnapshot.docs[0];
        const existingProduct = existingProductDoc.data();
        const updatedQuantity = existingProduct.quantity + quantity;
        const updatedPrice = updatedQuantity * price;

        console.log(updatedQuantity);
        console.log(existingProduct);

        await updateDoc(existingProductDoc.ref, {
          quantity: updatedQuantity,
          price: updatedPrice,
        });

        console.log(
          "Item quantity and price updated in Firestore cart successfully"
        );
      } else {
        // If the product doesn't exist, add it to the cart collection
        await addDoc(cartCollectionRef, addprd);
        console.log("Item added to Firestore cart successfully");
      }
    } else {
      console.error("No user signed in.");
    }
    loadCartFromFirestore();
    displayInCart();
    totalPriceInCart();
  } catch (error) {
    console.log("Error adding to cart:", error);
  }finally{
    spinnerWrapper.classList.toggle("d-none")
  }
  await loadCartFromFirestore();
  totalPriceInCart()
}

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

displayInCart();
totalPriceInCart();
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



async function loadCartFromFirestore() {
  try {
    const uid = localStorage.getItem("uid");
    if (uid) {
      const cartCollectionRef = collection(db, "users", uid, "cart");
      const cartSnapshot = await getDocs(cartCollectionRef);

      if (cartSnapshot.forEach) {
        cartSnapshot.forEach((doc) => {
          let existingProduct = cartArry.find(
            (prod) => prod.name === doc.data().name
          );
          if (existingProduct) {
            existingProduct.quantity = doc.data().quantity;
            existingProduct.price = doc.data().price;
          } else {
            cartArry.push(doc.data());
          }
        });
      } else {
        console.error("cartSnapshot does not have a forEach method");
      }
    } else {
      console.log("No user is signed in");
    }
  } catch (error) {
    console.error("Error loading cart from Firestore:", error);
  }
  totalPriceInCart()
  displayInCart()

}
loadCartFromFirestore();

