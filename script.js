const quantitySelect = document.getElementById("quantity-select");
const quantityInput = document.getElementById("quantity-input");
const priceSpan = document.getElementById("price");
const offerMsg = document.getElementById("offer-msg");
const quantityDisplay = document.getElementById("quantity-display");
const addToCartBtn = document.getElementById("add-to-cart");
const cartTotal = document.getElementById("cart-total");
const cartActions = document.getElementById("cart-actions");
const cartQuantityInput = document.getElementById("cart-quantity");
const updateCartBtn = document.getElementById("update-cart");
const removeCartBtn = document.getElementById("remove-cart");
const checkoutBtn = document.getElementById("checkout");
const checkoutForm = document.getElementById("checkout-form");
const confirmOrderBtn = document.getElementById("confirm-order");
const orderSummary = document.getElementById("order-summary");
const summaryText = document.getElementById("summary");

const basePrice = 100;
let currentQuantity = 1;
let currentTotal = 100;
let cartValue = 0;

function updatePrice(quantity) {
  currentQuantity = quantity;
  let totalPrice = basePrice * quantity;
  let message = "";

  if (quantity >= 5) {
    totalPrice *= 0.8;  
    message = "🔥🔥 لقد حصلت على تخفيض 20%!";
  } else if (quantity >= 3) {
    totalPrice *= 0.9; 
    message = "🔥 لقد حصلت على تخفيض 10%!";
  }

  currentTotal = totalPrice;
  priceSpan.textContent = totalPrice.toFixed(2);
  offerMsg.textContent = message;
  quantityDisplay.textContent = `الكمية المطلوبة: ${quantity}`;
}

quantitySelect.addEventListener("change", () => {
  const quantity = parseInt(quantitySelect.value);
  quantityInput.value = "";
  updatePrice(quantity);
});

quantityInput.addEventListener("input", () => {
  const quantity = parseInt(quantityInput.value);
  if (!isNaN(quantity) && quantity > 0) {
    quantitySelect.value = "";
    updatePrice(quantity);
  } else {
    updatePrice(1);
  }
});

addToCartBtn.addEventListener("click", () => {
  cartValue = currentTotal;
  cartTotal.textContent = cartValue.toFixed(2);
  cartQuantityInput.value = currentQuantity;
  cartActions.style.display = "block";
  checkoutForm.style.display = "none";
  orderSummary.style.display = "none";
});

updateCartBtn.addEventListener("click", () => {
  const quantity = parseInt(cartQuantityInput.value);
  if (!isNaN(quantity) && quantity > 0) {
    updatePrice(quantity);
    cartValue = currentTotal;
    cartTotal.textContent = cartValue.toFixed(2);
  }
});

removeCartBtn.addEventListener("click", () => {
  cartValue = 0;
  cartTotal.textContent = "0";
  cartActions.style.display = "none";
  checkoutForm.style.display = "none";
  orderSummary.style.display = "none";
});

checkoutBtn.addEventListener("click", () => {
  checkoutForm.style.display = "block";
  orderSummary.style.display = "none";
});

confirmOrderBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const surname = document.getElementById("surname").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (name && surname && address && phone) {
    summaryText.innerHTML = `
      شكرا ${name} ${surname}! <br>
      العنوان: ${address} <br>
      رقم الهاتف: ${phone} <br>
      الكمية: ${currentQuantity} <br>
      السعر النهائي: ${currentTotal.toFixed(2)} دج
    `;
    orderSummary.style.display = "block";
    checkoutForm.style.display = "none";
  } else {
    alert("يرجى تعبئة جميع الحقول!");
  }
});

updatePrice(1);
