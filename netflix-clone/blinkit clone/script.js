// Sample product data
const products = [
    {
        id: 1,
        name: "Fresh Red Apples",
        price: 12000,
        weight: "1 kg",
        category: "fruits",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        description: "Fresh, crispy red apples"
    },
    {
        id: 2,
        name: "Fresh Bananas",
        price: 4000,
        weight: "6 pieces",
        category: "fruits",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        description: "Ripe yellow bananas"
    },
    {
        id: 3,
        name: "Fresh Carrots",
        price: 3000,
        weight: "500g",
        category: "vegetables",
        image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        description: "Fresh orange carrots"
    },
    {
        id: 4,
        name: "Fresh Spinach",
        price: 2500,
        weight: "1 bunch",
        category: "vegetables",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        description: "Fresh green spinach leaves"
    },
    {
        id: 5,
        name: "Fresh Milk",
        price: 6000,
        weight: "1 Liter",
        category: "dairy",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        description: "Fresh whole milk"
    },
    {
        id: 6,
        name: "Greek Yogurt",
        price: 8000,
        weight: "200g",
        category: "dairy",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        description: "Creamy Greek yogurt"
    },
    {
        id: 7,
        name: "Whole Wheat Bread",
        price: 4500,
        weight: "1 loaf",
        category: "bakery",
        image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        description: "Fresh whole wheat bread"
    },
    {
        id: 8,
        name: "Fresh Croissants",
        price: 12000,
        weight: "4 pieces",
        category: "bakery",
        image: "https://images.unsplash.com/photo-1555507036-ab794f1ad063?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        description: "Buttery fresh croissants"
    },
    {
        id: 9,
        name: "Mixed Nuts",
        price: 18000,
        weight: "250g",
        category: "snacks",
        image: "https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        description: "Assorted mixed nuts"
    },
    {
        id: 10,
        name: "Organic Chips",
        price: 8500,
        weight: "150g",
        category: "snacks",
        image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        description: "Crispy organic potato chips"
    },
    {
        id: 11,
        name: "Fresh Orange Juice",
        price: 7000,
        weight: "500ml",
        category: "beverages",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        description: "Freshly squeezed orange juice"
    },
    {
        id: 12,
        name: "Green Tea",
        price: 15000,
        weight: "100 bags",
        category: "beverages",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        description: "Premium green tea bags"
    }
];

// Popular areas data
const popularAreas = [
    "New Delhi 110001",
    "Mumbai 400001", 
    "Bangalore 560001",
    "Gurgaon 122001",
    "Noida 201301",
    "Pune 411001",
    "Hyderabad 500001",
    "Chennai 600001"
];

// Application state
let currentCategory = 'all';
let currentLocation = 'New Delhi 110001';
let cart = [];
let isCartOpen = false;
let isLoginMode = true;

// Utility functions
function formatPrice(priceInPaisa) {
    return `₹${(priceInPaisa / 100).toFixed(0)}`;
}

function generateSessionId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function getProductQuantity(productId) {
    const cartItem = cart.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
}

function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

function calculateCartItemCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// DOM utility functions
function createElement(tag, className = '', innerHTML = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
}

function showElement(element) {
    element.style.display = 'block';
    setTimeout(() => element.classList.add('visible'), 10);
}

function hideElement(element) {
    element.classList.remove('visible');
    setTimeout(() => element.style.display = 'none', 300);
}

// Product rendering
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(product => product.category === currentCategory);

    // Show loading state
    productsGrid.innerHTML = `
        <div class="loading">
            ${Array.from({length: 8}, () => `
                <div class="skeleton">
                    <div class="skeleton-image"></div>
                    <div class="skeleton-text"></div>
                    <div class="skeleton-text short"></div>
                    <div class="skeleton-text short"></div>
                </div>
            `).join('')}
        </div>
    `;

    // Simulate loading delay
    setTimeout(() => {
        productsGrid.innerHTML = filteredProducts.map(product => {
            const quantity = getProductQuantity(product.id);
            
            return `
                <div class="product-card" data-product-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-weight">${product.weight}</p>
                    <div class="product-footer">
                        <span class="product-price">${formatPrice(product.price)}</span>
                        ${quantity === 0 ? `
                            <button class="btn-add" onclick="addToCart(${product.id})">ADD</button>
                        ` : `
                            <div class="quantity-controls">
                                <button class="qty-btn" onclick="updateQuantity(${product.id}, ${quantity - 1})">
                                    <i data-lucide="minus"></i>
                                </button>
                                <span class="qty-value">${quantity}</span>
                                <button class="qty-btn" onclick="updateQuantity(${product.id}, ${quantity + 1})">
                                    <i data-lucide="plus"></i>
                                </button>
                            </div>
                        `}
                    </div>
                </div>
            `;
        }).join('');

        // Re-initialize Lucide icons
        lucide.createIcons();
    }, 500);
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.product.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: Date.now(),
            product: product,
            quantity: 1
        });
    }

    updateCartUI();
    renderProducts(); // Re-render to update quantity controls
    showAddedFeedback(productId);
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        cart = cart.filter(item => item.product.id !== productId);
    } else {
        const cartItem = cart.find(item => item.product.id === productId);
        if (cartItem) {
            cartItem.quantity = newQuantity;
        }
    }

    updateCartUI();
    renderProducts(); // Re-render to update quantity controls
}

function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.id !== cartItemId);
    updateCartUI();
    renderCart();
    renderProducts(); // Re-render to update quantity controls
}

function showAddedFeedback(productId) {
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    const addButton = productCard?.querySelector('.btn-add');
    
    if (addButton) {
        addButton.textContent = 'ADDED';
        addButton.classList.add('added');
        
        setTimeout(() => {
            renderProducts(); // This will restore the normal state
        }, 1000);
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    const itemCount = calculateCartItemCount();
    const totalAmount = calculateCartTotal();
    
    cartCount.textContent = itemCount;
    cartCount.classList.toggle('visible', itemCount > 0);
    
    cartTotal.textContent = formatPrice(totalAmount);
    
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i data-lucide="shopping-cart" class="empty-icon"></i>
                <p>Your cart is empty</p>
                <span>Add some groceries to get started</span>
            </div>
        `;
        cartSummary.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.product.name}</h4>
                    <p class="cart-item-weight">${item.product.weight}</p>
                    <p class="cart-item-price">${formatPrice(item.product.price)}</p>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.product.id}, ${item.quantity - 1})">
                            <i data-lucide="minus"></i>
                        </button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.product.id}, ${item.quantity + 1})">
                            <i data-lucide="plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        const subtotal = calculateCartTotal();
        document.getElementById('subtotal').textContent = formatPrice(subtotal);
        document.getElementById('totalAmount').textContent = formatPrice(subtotal);
        cartSummary.style.display = 'block';
    }
    
    // Re-initialize Lucide icons
    lucide.createIcons();
}

// Location functions
function updateLocation(newLocation) {
    currentLocation = newLocation;
    document.getElementById('currentLocation').textContent = newLocation;
    document.getElementById('heroCurrentLocation').textContent = newLocation;
    hideLocationModal();
}

function renderLocationAreas() {
    const areaList = document.getElementById('areaList');
    const searchQuery = document.getElementById('locationSearch').value.toLowerCase();
    
    const filteredAreas = popularAreas.filter(area =>
        area.toLowerCase().includes(searchQuery)
    );
    
    areaList.innerHTML = filteredAreas.map(area => `
        <div class="area-item" onclick="updateLocation('${area}')">
            <i data-lucide="map-pin" style="color: var(--primary-color);"></i>
            <div class="area-text">
                <div class="area-name">${area.split(' ')[0]} ${area.split(' ')[1] || ''}</div>
                <div class="area-code">${area}</div>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Modal functions
function showLocationModal() {
    const modal = document.getElementById('locationModal');
    showElement(modal);
    renderLocationAreas();
}

function hideLocationModal() {
    const modal = document.getElementById('locationModal');
    hideElement(modal);
}

function showLoginModal() {
    const modal = document.getElementById('loginModal');
    showElement(modal);
}

function hideLoginModal() {
    const modal = document.getElementById('loginModal');
    hideElement(modal);
}

function toggleLoginMode() {
    isLoginMode = !isLoginMode;
    
    const loginTitle = document.getElementById('loginTitle');
    const nameGroup = document.getElementById('nameGroup');
    const submitBtn = document.getElementById('submitBtn');
    const toggleText = document.getElementById('toggleText');
    
    if (isLoginMode) {
        loginTitle.textContent = 'Welcome Back';
        nameGroup.style.display = 'none';
        submitBtn.textContent = 'Sign In';
        toggleText.innerHTML = 'Don\'t have an account? <button type="button" id="toggleMode">Sign up</button>';
    } else {
        loginTitle.textContent = 'Get Started';
        nameGroup.style.display = 'block';
        submitBtn.textContent = 'Create Account';
        toggleText.innerHTML = 'Already have an account? <button type="button" id="toggleMode">Sign in</button>';
    }
    
    // Re-attach event listener
    document.getElementById('toggleMode').addEventListener('click', toggleLoginMode);
}

// Cart functions
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    isCartOpen = !isCartOpen;
    
    if (isCartOpen) {
        showElement(cartOverlay);
        cartSidebar.classList.add('visible');
        renderCart();
    } else {
        hideElement(cartOverlay);
        cartSidebar.classList.remove('visible');
    }
}

function closeCart() {
    isCartOpen = false;
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    hideElement(cartOverlay);
    cartSidebar.classList.remove('visible');
}

// Search functionality
function handleSearch() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    
    if (!searchQuery) {
        renderProducts();
        return;
    }
    
    const productsGrid = document.getElementById('productsGrid');
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery)
    );
    
    productsGrid.innerHTML = filteredProducts.map(product => {
        const quantity = getProductQuantity(product.id);
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-weight">${product.weight}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    ${quantity === 0 ? `
                        <button class="btn-add" onclick="addToCart(${product.id})">ADD</button>
                    ` : `
                        <div class="quantity-controls">
                            <button class="qty-btn" onclick="updateQuantity(${product.id}, ${quantity - 1})">
                                <i data-lucide="minus"></i>
                            </button>
                            <span class="qty-value">${quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${product.id}, ${quantity + 1})">
                                <i data-lucide="plus"></i>
                            </button>
                        </div>
                    `}
                </div>
            </div>
        `;
    }).join('');
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-light);">
                <i data-lucide="search" style="width: 3rem; height: 3rem; margin: 0 auto 1rem; opacity: 0.3;"></i>
                <p>No products found for "${searchQuery}"</p>
                <span style="font-size: 0.875rem;">Try searching for something else</span>
            </div>
        `;
    }
    
    lucide.createIcons();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize products
    renderProducts();
    
    // Category buttons
    document.getElementById('categoryButtons').addEventListener('click', function(e) {
        if (e.target.classList.contains('category-btn')) {
            // Update active state
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            // Update category and re-render
            currentCategory = e.target.dataset.category;
            renderProducts();
        }
    });
    
    // Location pickers
    document.getElementById('locationPicker').addEventListener('click', showLocationModal);
    document.getElementById('heroLocationPicker').addEventListener('click', showLocationModal);
    
    // Cart button
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', closeCart);
    document.getElementById('cartOverlay').addEventListener('click', closeCart);
    
    // Login button
    document.getElementById('loginBtn').addEventListener('click', showLoginModal);
    
    // Modal close buttons
    document.getElementById('closeLocationModal').addEventListener('click', hideLocationModal);
    document.getElementById('closeLoginModal').addEventListener('click', hideLoginModal);
    
    // Location search
    document.getElementById('locationSearch').addEventListener('input', renderLocationAreas);
    
    // Custom location
    document.getElementById('setCustomLocation').addEventListener('click', function() {
        const customLocation = document.getElementById('customLocationInput').value.trim();
        if (customLocation) {
            updateLocation(customLocation);
        }
    });
    
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Login form
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('emailInput').value;
        const phone = document.getElementById('phoneInput').value;
        const password = document.getElementById('passwordInput').value;
        const name = document.getElementById('nameInput').value;
        
        // Simulate form submission
        alert(isLoginMode ? 'Login successful!' : 'Account created successfully!');
        hideLoginModal();
        
        // Reset form
        this.reset();
    });
    
    // Toggle login mode
    document.getElementById('toggleMode').addEventListener('click', toggleLoginMode);
    
    // Close modals on outside click
    document.getElementById('locationModal').addEventListener('click', function(e) {
        if (e.target === this) hideLocationModal();
    });
    
    document.getElementById('loginModal').addEventListener('click', function(e) {
        if (e.target === this) hideLoginModal();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // ESC to close modals
        if (e.key === 'Escape') {
            hideLocationModal();
            hideLoginModal();
            if (isCartOpen) closeCart();
        }
        
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
    });
    
    // Initialize location areas
    renderLocationAreas();
});

// Global functions for onclick handlers
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.updateLocation = updateLocation;