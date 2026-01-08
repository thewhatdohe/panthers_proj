// ==============================
// MAIN JS: CART + FADE-IN SCROLL
// ==============================

let cart = [];

// ------------------------------
// CART FUNCTIONALITY
// ------------------------------
function addToCart(product, price = 0) {
    cart.push({ name: product, price });
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartPrice = document.getElementById("cart-price");

    if (cartCount) cartCount.innerText = cart.length;

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const div = document.createElement('div');
                div.classList.add('cart-item');
                div.innerHTML = `
                    <span>${item.name}</span>
                    <span>${item.price} AED</span>
                    <button onclick="removeFromCart(${index})">✕</button>
                `;
                cartItemsContainer.appendChild(div);
            });
        }
    }

    if (cartTotal) cartTotal.innerText = cart.length;
    if (cartPrice) {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartPrice.innerText = `AED ${total}`;
    }
}

// ------------------------------
// FADE-IN ON SCROLL
// ------------------------------
function handleFadeIn() {
    const fadeEls = document.querySelectorAll('.fade-in');
    fadeEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
}

// ------------------------------
// DOM CONTENT LOADED
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {

    // --- Cart Drawer ---
    const cartLink = document.querySelector('a[href$="/cart"], a[href="#cart"]'); // universal
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');

    if (cartLink && cartDrawer) {
        // Removed hover functionality
        cartLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default navigation
            cartDrawer.classList.toggle('open');
            cartOverlay.classList.toggle('active');
        });
    }

    if (closeCartBtn && cartDrawer) {
        closeCartBtn.addEventListener('click', () => {
            cartDrawer.classList.remove('open');
            cartOverlay.classList.remove('active');
        });
    }
    if (cartOverlay && cartDrawer) {
        cartOverlay.addEventListener('click', () => {
            cartDrawer.classList.remove('open');
            cartOverlay.classList.remove('active');
        });
    }

    // --- Fade-in animation ---
    handleFadeIn(); // trigger on load
    window.addEventListener('scroll', handleFadeIn); // trigger on scroll

    // --- Cart UI ---
    updateCartUI();

    // --- Add to cart buttons ---
    const addCartButtons = document.querySelectorAll('.add-cart-btn');
    addCartButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const product = btn.dataset.product || 'Unknown Product';
            const price = parseFloat(btn.dataset.price) || 0;
            addToCart(product, price);
        });
    });
});
