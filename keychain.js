document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            const image = button.dataset.image;

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${name} added to cart!`);
        });
    });
});
