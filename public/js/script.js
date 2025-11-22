const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);

const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled-in");
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            displayScrollElement(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

scrollElements.forEach((el) => {
    observer.observe(el);
});

const mobileBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');
const closeBtn = document.querySelector('.mobile-close-btn');

function toggleMenu() {
    navLinks.classList.toggle('active');
}

mobileBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            currentSection = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(currentSection)) {
            item.classList.add('active');
        }
    });
});

const cartIcon = document.querySelector('.cart-icon-container');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.querySelector('.close-cart-btn');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalElement = document.getElementById('cart-total-price');
const cartBadge = document.querySelector('.cart-badge');
const addToCartButtons = document.querySelectorAll('.add-cart-btn');

let cart = [];

function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
}

cartIcon.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonTarget = e.currentTarget;
        const name = buttonTarget.dataset.name;
        const price = parseFloat(buttonTarget.dataset.price);
        const img = buttonTarget.dataset.img;

        const newProduct = {
            id: Date.now(),
            name: name,
            price: price,
            img: img
        };

        cart.push(newProduct);
        updateCartUI();
        openCart();
    });
});

function removeItem(id) {
    cart = cart.filter(product => product.id !== id);
    updateCartUI();
}

function updateCartUI() {
    cartBadge.innerText = cart.length;

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-msg">
                <span class="material-symbols-outlined">production_quantity_limits</span>
                <p>Seu carrinho está vazio.</p>
            </div>
        `;
    } else {
        cart.forEach(product => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <div class="item-details">
                    <h4>${product.name}</h4>
                    <p>R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                </div>
                <span class="material-symbols-outlined remove-item-btn" onclick="removeItem(${product.id})">delete</span>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    const total = cart.reduce((acc, item) => acc + item.price, 0);
    cartTotalElement.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function saveCartToStorage() {
    localStorage.setItem('shoeasyCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('shoeasyCart');
    
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

document.addEventListener('DOMContentLoaded', loadCartFromStorage);