document.addEventListener("DOMContentLoaded", function () {
  const products = [
    { id: 1, name: "Product 1", price: 300 },
    { id: 2, name: "Product 2", price: 500 },
    { id: 3, name: "Product 3", price: 700 },
    { id: 4, name: "Product 4", price: 900 },
  ];

  const cart = [];
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("card-items");
  const emptyCartMessage = document.getElementById("empty-card");
  const cardTotalMessage = document.getElementById("card-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <p>Price: $${product.price}</p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      <button class="remove-from-cart" data-id="${product.id}">Remove from Cart</button>
    `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.className==="add-to-cart") {
      console.log("Button clicked:", e.target);
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      console.log("Id of the product clicked: ", product.id);
      addToCart(product);
    }
    else if(e.target.className==="remove-from-cart"){
      console.log("Button Clicked",e.target);
      const productId=parseInt(e.target.getAttribute("data-id"))
      const product=products.find(p=>p.id===productId)
      removeFromCart(product);
      
    }
  });

  function removeFromCart(product){
    cart.forEach((item) => {
      if(item.name === product.name){
        cart.splice(cart.indexOf(item), 1);
        renderCart();
      }
      else{
        // this is not working?
        console.log("Product not found in cart:", product.name);
        
      }
    });
  }

  function addToCart(product) {
    cart.push(product);
    console.log("Product added to cart:", product);
    showNotification("Product added to cart!");
    renderCart();
  }

  function renderCart() {
    cartItems.innerText = "";
    let totalPrice = 0;
    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cardTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}
        `;
        cartItems.appendChild(cartItem);
        totalPriceDisplay.textContent=`Total Price: $${totalPrice.toFixed(2)}`;
      });
      console.log(totalPrice);
      
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent=`Total Price: $0.00`;
    }
  }

  checkOutBtn.addEventListener("click",()=>{
    cart.length=0;
    alert("Thank you for your purchase!");
    renderCart();
  })

  function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.classList.remove("hidden");

  setTimeout(() => {
    notification.classList.add("hidden");
  }, 2000); // hide after 2 seconds
}

});
