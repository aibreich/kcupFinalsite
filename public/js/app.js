function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // var displayName = user.displayName;
      console.log("connected");
      // $(".pName").css("display", "block");
      // $(".pLink").css("display", "block");
      // $(".pLinkn").css("display", "block");
      // $(".pLog").css("display", "none");
      // loadUserRecipe();
    } else {
      // console.log("user is not there");
      // $(".pName").css("display", "none");
      // $(".pLink").css("display", "none");
      // $(".pLinkn").css("display", "none");
      // $(".pLog").css("display", "block");
      // loadPublicRecipe();
    }
  });
  // firebase
  //   .auth()
  //   .signInAnonymously()
  //   .then(() => {
  //     console.log("Signed In!");
  //   })
  //   .catch((error) => {
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     _db = [];
  //   });
}
// makersIndex
// function loadUserRecipe() {
//   $("#makerbox").empty();
//   $.getJSON("data/data.json", function (makers) {
//     console.log("hi", makers.COFFEE_MAKERS);
//     let maker = makers.COFFEE_MAKERS;
//     console.log(maker.makerName);
//     $("#makerbox").append(`<div class="foods">

//     <div class="top-half">
//         <div class="img-box">

//         <h1 >${maker.makerName}</h1>
//         <div class="food-img"></div>
//         </div>

//     <div class="text-cont">
//         <h2>Description:</h2>
//         <p >${maker.makerPrice}</p>

//     <div class="ingredients">
//         <h2>Ingredients:</h2>
//         <p >${maker.makerRating}</p>

//     </div>
//    `);
//     // <p ${index}>${recipe.recipeName}</p>`
//   }).fail(function (jqxhr, textStatus, error) {
//     console.log(jqxhr + textStatus + error);
//     // loadPublicRecipes();
//   });
// }

function loadCoffee() {
  $("#makerbox").empty();
  $.getJSON("data/data.json", function (makers) {
    let maker = makers.COFFEE_MAKERS;
    // console.log("hi", makers.COFFEE_MAKERS);

    $.each(makers.COFFEE_MAKERS, function (index, maker) {
      // console.log("recipe: " + index + " " + maker.makerName);
      $("#makerbox").append(`<div class="maker">
  
    
        
        <div class="${maker.makerPic}"> </div>
        
        
    <div class="text-cont">
        
        <h1 class="header">${maker.makerName}</h1>
        <p class="price">${maker.makerPrice}</p>
        <p class="rating">${maker.makerRating}</p>
    
        <div class="btn" onclick="addtoCart(event)" data-cell="${maker.makerPlace}">Buy Now</div>
        </div>  
    </div>
   `);
    });

    // <p ${index}>${recipe.recipeName}</p>`
  }).fail(function (jqxhr, textStatus, error) {
    console.log(jqxhr + textStatus + error);
    // loadPublicRecipes();
  });
}

let cartNum = document.getElementById("cartNum");
let cartCounter = 0;
let cartArray = [];
function addtoCart(event) {
  console.log("clicked");
  // console.log(event);
  if (event.target.classList.contains("btn")) {
    let cartItems = event.target.parentElement.parentElement;
    console.log(cartItems);
    placeInCart(cartItems);
  }

  cartCounter++;
  cartNum.innerHTML = cartCounter;
  cartNum.style.backgroundColor = "#000";
  console.log(cartCounter);
}
let itemsHeld = document.getElementById("items-held");
let cartItemID = 1;
function placeInCart(cartItems) {
  let cartItemInfo = {
    id: cartItemID,
    place: cartItems.querySelector(".text-cont .btn").dataset.cell,
    name: cartItems.querySelector(".text-cont .header").textContent,
    price: cartItems.querySelector(".text-cont .price").textContent,
    rating: cartItems.querySelector(".text-cont .rating").textContent,
  };
  console.log(cartItemInfo);
  cartArray.push(cartItemInfo);
  console.log(cartArray);
  let cartString = JSON.stringify(cartArray);
  // console.log(cartString);

  // addItems(cartItemInfo);
}

// function placeonPage() {
//   itemsHeld.innerHTML = `
//   ${cartArray.map(function (maker) {
//     `<div class="maker">

//     <div class="maker-${maker.id}"> </div>

// <div class="text-cont">

//     <h1 class="header">${maker.name}</h1>
//     <p class="price">${maker.price}</p>
//     <p class="rating">${maker.rating}</p>

//     </div>
// </div>`;
//   })}
//   `;
// }

function createUser() {
  let password = $("#password").val(); // $("#password").val();
  let email = $("#email").val();
  let fName = $("#fName").val();
  let lName = $("#lName").val();
  console.log("create user button clicked");

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(userCredential.user);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
}
function login() {
  // e.preventDefault();

  let lpassword = $("#lpassword").val(); // $("#password").val();
  let lemail = $("#lemail").val();
  firebase
    .auth()
    .signInWithEmailAndPassword(lemail, lpassword)
    .then((userCredential) => {
      // Signed in
      console.log("signed In");
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}
function signout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("signed out");
    })
    .catch((error) => {
      // An error happened.
      console.log("error");
    });
}
let btnBox = document.getElementsByClassName("btn");

for (let i = 0; i < btnBox.length; i++) {
  btnBox[i].addEventListener("click", addToCart);
}

function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#/", "");

  if (pageID == "") {
    model.placholder("home");
    console.log("Grabbing:" + pageID);
    // loadCoffee();
  } else if (pageID == "cart") {
    console.log("Grabbing:" + pageID);
    placeonPage();
  } else {
    model.placholder(pageID);
    console.log("Grabbing:" + pageID);
    // addItems(cartItems);
  }
}
// else if (pageID == "cart") {
//   console.log("Grabbing:" + pageID);
//   addItems();
// }
function initListeners() {
  $(window).on("hashchange", route);
  // $(".recipe a").click(function (e) {
  //   console.log("clicked");
  //   // route();
  // });
  route();
}

$(document).ready(function () {
  try {
    let app = firebase.app();
    initFirebase();
    initListeners();

    // addItems();
  } catch {
    console.error();
  }
  loadCoffee();
  model.placholder("home");
});
