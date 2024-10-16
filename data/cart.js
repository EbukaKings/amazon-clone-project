// import { calculateCartQuantity } from "../scripts/amazon.js";

export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    },
    {
        productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity: 2,
        deliveryOptionId: '2'
    },
    ];
    
}

export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem;
          cart.forEach((item) => {
              if (productId === item.productId) {
                  matchingItem = item;
              }
          });
  
          const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
          if (matchingItem) {
              matchingItem.quantity += quantity; 
          } else {
              cart.push({
                  productId: productId,
                  quantity: quantity,
                  deliveryOptionId: '1'
              });
          }
          saveToStorage();
  }

  export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem)
        }
    })
    cart = newCart
    saveToStorage()
  }

  export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
          cart.forEach((item) => {
              if (productId === item.productId) {
                  matchingItem = item;
              }
          });
          matchingItem.deliveryOptionId = deliveryOptionId;
          saveToStorage()
  }
  