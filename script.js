const priceSpan = document.getElementById("price");
const addToCartBtn = document.getElementById("add-to-cart");
const cartTotal = document.getElementById("cart-total");
const cartActions = document.getElementById("cart-actions");
const cartQuantitySpan = document.getElementById("cart-quantity");
const removeCartBtn = document.getElementById("remove-cart");
const checkoutBtn = document.getElementById("checkout");
const checkoutForm = document.getElementById("checkout-form");
const confirmOrderBtn = document.getElementById("confirm-order");
const orderSummary = document.getElementById("order-summary");
const summaryText = document.getElementById("summary");

const basePrice = 100;
let currentQuantity = 1;
let currentTotal = basePrice;

function calculatePrice(quantity) {
  let totalPrice = basePrice * quantity;
  if (quantity === 2) {
    totalPrice = 180;
  } else if (quantity === 3) {
    totalPrice = 270;
  }
  priceSpan.textContent = totalPrice.toFixed(2);
  currentTotal = totalPrice;
  currentQuantity = quantity;
}

// Initial price
calculatePrice(1);

document.querySelectorAll('input[name="quantity"]').forEach(radio => {
  radio.addEventListener("change", () => {
    const q = parseInt(radio.value);
    calculatePrice(q);
  });
});

addToCartBtn.addEventListener("click", () => {
  cartTotal.textContent = currentTotal.toFixed(2);
  cartQuantitySpan.textContent = currentQuantity;
  cartActions.style.display = "block";
  checkoutForm.style.display = "none";
  orderSummary.style.display = "none";
});

removeCartBtn.addEventListener("click", () => {
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
