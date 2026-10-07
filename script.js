let cart = [];

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    // Automatically open cart
    document.getElementById("cart").classList.add("active");
    document.getElementById("overlay").classList.add("active");
}


function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

    } else {

        cart.forEach((item, index) => {

            total += item.price * item.quantity;
            count += item.quantity;

            const div = document.createElement("div");

            div.className = "cart-item";

            div.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <p>
                        ₹${item.price} × ${item.quantity}
                    </p>
                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>
            `;

            cartItems.appendChild(div);
        });
    }

    cartCount.textContent = count;
    cartTotal.textContent = total;
}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


function toggleCart() {

    document.getElementById("cart").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}


function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    alert(
        "Thank you for your order! ☕\n\n" +
        "Your total is ₹" + total +
        "\n\nWe will prepare your coffee shortly."
    );

    cart = [];

    updateCart();

    toggleCart();
}


// Update cart when page loads
updateCart();
