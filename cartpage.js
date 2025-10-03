document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const cartTotalEl = document.getElementById("cart-total");
    const checkoutBtn = document.querySelector(".checkout-btn");
    


    function displayCart() {
        cartContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = `<p>Your cart is empty.</p>`;
            cartTotalEl.innerText = "0.00";
            return;
        }

        cart.forEach((item, index) => {
            const itemTotal = (item.price * item.quantity).toFixed(2);
            total += parseFloat(itemTotal);

            const card = document.createElement("div");
            card.classList.add("cart-card");
            console.log(item.image);
            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p class="price">Price: $${item.price}</p>
                <p>Total: $<span class="item-total">${itemTotal}</span></p>
                <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="qty">
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;

            cartContainer.appendChild(card);
        });

        cartTotalEl.innerText = total.toFixed(2);

        document.querySelectorAll(".qty").forEach(input => {
            input.addEventListener("change", updateQuantity);
        });
        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", removeItem);
        });
    }

    function updateQuantity(e) {
        const index = e.target.dataset.index;
        cart[index].quantity = parseInt(e.target.value);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }

    function removeItem(e) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }

    function checkout() {
        if(cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        alert("Thank you for your purchase!");
        localStorage.removeItem("cart");
        displayCart();
    }

    checkoutBtn.addEventListener("click", checkout);

    displayCart();
});
