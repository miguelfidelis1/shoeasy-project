// --- 1. Navbar Efeito Scroll ---
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);


// --- 2. Scroll Reveal Animation (Elementos aparecem ao rolar) ---
// Seleciona todos os elementos que devem ser animados
const scrollElements = document.querySelectorAll(".js-scroll");

// Função que verifica se o elemento está visível na tela
const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

// Função que adiciona a classe 'scrolled-in' para ativar o CSS
const displayScrollElement = (element) => {
  element.classList.add("scrolled-in");
};

// Usando IntersectionObserver para performance moderna
// Ele "observa" quando os elementos entram na janela de visualização
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Se o elemento entrou na tela (isIntersecting é true)
        if (entry.isIntersecting) {
            displayScrollElement(entry.target);
            // Para de observar o elemento depois que ele já animou uma vez
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2 // Inicia a animação quando 20% do elemento estiver visível
});


// Aplica o observador a todos os elementos
scrollElements.forEach((el) => {
    observer.observe(el);
});

// ... (Mantenha o código anterior do Navbar Scroll e Scroll Reveal) ...

// --- 3. Menu Mobile (Toggle) ---
const mobileBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');
const closeBtn = document.querySelector('.mobile-close-btn');

// Função abrir/fechar
function toggleMenu() {
    navLinks.classList.toggle('active');
}

mobileBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

// Fechar menu ao clicar em um link (UX melhor)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});


// --- 4. Scroll Spy (Link Ativo na Navbar) ---
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Verifica se o scroll passou de 1/3 da seção
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

// --- 5. Lógica do Carrinho de Compras ---

// Elementos do DOM
const cartIcon = document.querySelector('.cart-icon-container');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.querySelector('.close-cart-btn');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalElement = document.getElementById('cart-total-price');
const cartBadge = document.querySelector('.cart-badge');
const addToCartButtons = document.querySelectorAll('.add-cart-btn');

let cart = []; // Array que guarda os produtos

// ABRIR E FECHAR CARRINHO
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

// ADICIONAR AO CARRINHO
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Pega os dados do botão clicado (dataset)
        const buttonTarget = e.currentTarget; // Garante que pegamos o botão, não o ícone dentro
        const name = buttonTarget.dataset.name;
        const price = parseFloat(buttonTarget.dataset.price);
        const img = buttonTarget.dataset.img;

        const newProduct = {
            id: Date.now(), // ID único baseado no tempo
            name: name,
            price: price,
            img: img
        };

        cart.push(newProduct);
        updateCartUI();
        openCart(); // Abre o carrinho automaticamente para mostrar o item
    });
});

// REMOVER ITEM
function removeItem(id) {
    cart = cart.filter(product => product.id !== id);
    updateCartUI();
}

// ATUALIZAR A INTERFACE (HTML) DO CARRINHO
function updateCartUI() {
    // 1. Atualizar Badge (Bolinha vermelha)
    cartBadge.innerText = cart.length;

    // 2. Atualizar Lista de Itens
    cartItemsContainer.innerHTML = ''; // Limpa tudo antes de redesenhar

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

    // 3. Atualizar Preço Total
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    cartTotalElement.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// --- 6. Persistência de Dados (LocalStorage) ---

function saveCartToStorage() {
    // Transforma o array de objetos em um texto JSON e salva no navegador
    localStorage.setItem('shoeasyCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    // Tenta pegar os dados salvos
    const savedCart = localStorage.getItem('shoeasyCart');
    
    if (savedCart) {
        // Se existirem dados, converte de volta para Array e atualiza a tela
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Carregar o carrinho assim que a página abrir
document.addEventListener('DOMContentLoaded', loadCartFromStorage);