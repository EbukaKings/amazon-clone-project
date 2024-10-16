import { cart } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";


export function renderPaymentSummary() {
    let productPricecents = 0;
    let shippingPriceCents = 0;
 cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPricecents += product.priceCents * cartItem.quantity
    const deliveryOption = getDeliveryOption(cartItem.deliveryOption);
    shippingPriceCents += deliveryOption.priceCents
 });
 const totalBeforeTaxCents = productPricecents + shippingPriceCents;
 const taxCents = totalBeforeTaxCents * 0.1
 const totalCents = totalBeforeTaxCents + taxCents;
 
 const paymentSummaryHTML = `
 <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPricecents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$47.74</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
 `;
 document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

 document.querySelector('.js-place-order').addEventListener('click', async() => {
  const response = await fetch('https://supersimplebackend.dev/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cart: cart
    })
  });
  const order = await response.json();
  addOrder(order)
 });
}