let cart = [];
let cart_count = document.querySelector(".cart_count");
let main_container_innerHtml = "";
let aside_container_innerHtml = "";
let subTotal = 0;
let total = 0;
let displayQts = 1;

onLoad();
function onLoad() {
  loadElement();
  cart_visibilty();
  calculateSubTotal();
}

function loadElement() {
  PRODUCT_INFO.forEach((items) => {
    main_container_innerHtml += `
  <div class="product-container" id="${items.id}">
    <div class="image-container">
      <img src="${items.image_src}" alt="Lamzu Maya" />
    </div>
    <div class="rating">${items.rating}</div>
    <div class="product-name">${items.product_name}</div>
    <div class="product-color">Color: ${items.color}</div>
    <div class="price">
     ${
       items.discount_percent == 0
         ? `<span class="current-price">Rs. ${items.current_price}</span>`
         : `
        <span class="current-price">Rs. ${items.current_price}</span>
        <span class="actual-price">Rs. ${items.actual_price}</span>
        <span class="discount-percent">(-${items.discount_percent}%)</span>
      `
     }
    </div>
    <button class="cart_btn" onclick="addToCart(${
      items.id
    })">Add to cart</button>
  </div>`;
  });
  document.querySelector(".main-container").innerHTML =
    main_container_innerHtml;
}

function displayCartItems() {
  PRODUCT_INFO.forEach((element) => {
    if (cart.includes(element.id)) {
      aside_container_innerHtml += `
        <div class="aside-container" id="${element.id}">
          <div class="aside-imgContainer"><img src="${element.image_src}" alt="Product-Image"></div>
          <div class="aside-imgDesc">
            <h3 class="aside-productName">${element.product_name}</h3>
            <p class="aside-productColor">Color: ${element.color}</p>
            <p class="aside-productPrice">Rs. ${element.current_price}</p>
          </div>
          <div id="aside-buttons" >
            <span class="material-symbols-outlined" onclick="deleteItem(${element.id})">delete</span>
          </div>
        </div>`;
    }
  });
  document.querySelector(".aside-parentContainer").innerHTML =
    aside_container_innerHtml;
  aside_container_innerHtml = "";
}

function addToCart(id) {
  let container = document.getElementById(id);
  if (!cart.includes(id)) {
    cart.push(id);
    cart_visibilty();
    container.querySelector(".cart_btn").style.backgroundColor = "#228B22";
    container.querySelector(".cart_btn").textContent = "In cart";
  } else {
    alert("Item is already in cart");
  }
  displayCartItems();
  calculateSubTotal();
}

function deleteItem(id) {
  let container = document.getElementById(`${id}`);
  if (cart.includes(id)) {
    cart = cart.filter((item) => item != id);
    displayCartItems();
    calculateSubTotal();
    cart_visibilty();
    container.querySelector(".cart_btn").style.backgroundColor = "#fe7743";
    container.querySelector(".cart_btn").textContent = "Add to cart";
  }
}

function open_cartPage() {
  document.querySelector("aside").style.right = "0px";
  document.querySelector("aside").style.boxShadow =
    "0px 0px 8px 0px rgba(0, 0, 0, 0.51)";
}

function close_cartpage() {
  document.querySelector("aside").style.right = "-414px";
  document.querySelector("aside").style.boxShadow = "";
}

function checkOut() {
  alert("Thanks for your Purchase");
}

function calculateSubTotal() {
  PRODUCT_INFO.forEach((element) => {
    if (cart.includes(element.id)) {
      subTotal += parseInt(element.current_price.replace(/,/g, ""));
    }
  });
  document.querySelector(".sub-total-price").textContent = `Rs. ${subTotal}`;
  total = subTotal + 99;
  document.querySelector(".total-price").textContent = `Rs. ${total}`;
  subTotal = 0;
}

function cart_visibilty() {
  if (cart.length == 0) {
    cart_count.style.visibility = "hidden";
  } else {
    cart_count.textContent = cart.length;
    cart_count.style.visibility = "visible";
  }
}
