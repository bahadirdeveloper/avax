
// Global State
let allProducts = [];
let currentCategory = 'all';
let currentSearchTerm = '';

// --- CORE FUNCTIONS ---

// Update visibility of products based on current filters
function updateProductVisibility() {
    let hasVisibleProducts = false;
    document.querySelectorAll('.product-item').forEach(product => {
        const category = normalizeString(product.dataset.category);
        const name = normalizeString(product.querySelector('.product-name').textContent);

        const categoryMatch = (currentCategory === 'all') || (category === normalizeString(currentCategory));
        const searchMatch = name.includes(normalizeString(currentSearchTerm));

        const isVisible = categoryMatch && searchMatch;
        product.style.display = isVisible ? '' : 'none';
        if (isVisible) {
            hasVisibleProducts = true;
        }
    });

    const noProductsMessage = document.getElementById('noProductsMessage');
    if (noProductsMessage) {
        noProductsMessage.style.display = hasVisibleProducts ? 'none' : 'block';
    }
}

// Render all products to the grid
function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = ''; // Clear existing products
    
    products.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        // Artık doğrudan categorySlug kullan
        productElement.dataset.category = normalizeString(product.categorySlug);
        
        productElement.innerHTML = `
            <div class="product-thumb-wrapper">
                <img src="${product.thumbnail}" alt="${product.name}" class="product-thumb" loading="lazy" 
                     onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkfDtnJzZWwgWW9rPC90ZXh0Pjwvc3ZnPg==';">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${product.category}</p>
            </div>
        `;
        productElement.onclick = () => showProductModal(product);
        grid.appendChild(productElement);
    });

    // Add a message container for no results
    const noProductsMessage = document.createElement('p');
    noProductsMessage.id = 'noProductsMessage';
    noProductsMessage.className = 'no-products';
    noProductsMessage.textContent = 'Filtre ile eşleşen ürün bulunamadı.';
    noProductsMessage.style.display = 'none';
    grid.appendChild(noProductsMessage);
}

// Show the product details modal
function showProductModal(product) {
    const modal = document.getElementById('productModal');
    const modalMainImage = document.getElementById('modalMainImage');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductCode = document.getElementById('modalProductCode');
    const imageThumbnails = document.getElementById('imageThumbnails');
    const colorVariants = document.getElementById('colorVariants');
    
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);

    modalProductName.textContent = product.name;
    modalProductCode.textContent = 'Ürün Kodu: ' + (product.code || 'AVX' + Math.floor(Math.random() * 9000 + 1000));
    
    const existingDescription = modal.querySelector('.product-description');
    if (existingDescription) existingDescription.remove();

    if (product.description) {
        const descElement = document.createElement('p');
        descElement.className = 'product-description';
        descElement.textContent = product.description;
        modalProductCode.after(descElement);
    }

    const updateImages = (images) => {
        if (!images || images.length === 0) {
            modalMainImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkfDtnJzZWwgWW9rPC90ZXh0Pjwvc3ZnPg==';
            imageThumbnails.innerHTML = '';
            return;
        };
        modalMainImage.src = images[0];
        imageThumbnails.innerHTML = '';
        images.forEach((image, index) => {
            const thumb = document.createElement('img');
            thumb.src = image;
            thumb.alt = `${product.name} - ${index + 1}`;
            thumb.className = 'thumbnail';
            if (index === 0) thumb.classList.add('active');
            thumb.onclick = () => {
                modalMainImage.src = image;
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            };
            imageThumbnails.appendChild(thumb);
        });
    };

    colorVariants.innerHTML = '';
    if (product.variants && product.variants.length > 0) {
        if (product.variants.length > 1) {
            const colorsTitle = document.createElement('h4');
            colorsTitle.textContent = 'Renk Seçenekleri:';
            colorVariants.appendChild(colorsTitle);
        }

        product.variants.forEach((variant, index) => {
            const colorDot = document.createElement('span');
            colorDot.className = 'color-dot';
            const colorSlug = normalizeString(variant.color);
            colorDot.classList.add(colorSlug);
            colorDot.title = variant.color;
            if (index === 0) colorDot.classList.add('active');

            colorDot.onclick = () => {
                updateImages(variant.images);
                document.querySelectorAll('.color-dot').forEach(dot => dot.classList.remove('active'));
                colorDot.classList.add('active');
            };
            colorVariants.appendChild(colorDot);
        });
        // Initial image load
        updateImages(product.variants[0].images);
    }
    
    modal.onclick = (event) => {
        if (event.target === modal) closeModal();
    };
}


function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Genel normalize fonksiyonu (kategori, varyant, arama için)
function normalizeString(str) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}


// --- EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    // Load product data
    if (typeof window.PRODUCTS_DATA !== 'undefined') {
        allProducts = window.PRODUCTS_DATA;
        renderProducts(allProducts);
    } else {
        const grid = document.getElementById('productsGrid');
        if(grid) grid.innerHTML = '<p class="no-products">Hata: Ürün verileri yüklenemedi.</p>';
    }

    // Search input
    const searchInput = document.getElementById('searchInput');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.toLowerCase();
            updateProductVisibility();
        });
    }

    // Category filter buttons
    document.querySelectorAll('.filter-btn, .category-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const category = btn.dataset.category;
            currentCategory = normalizeString(category);

            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.category-link').forEach(b => b.classList.remove('active'));
            document.querySelector(`.filter-btn[data-category="${category}"]`).classList.add('active');
            const categoryLink = document.querySelector(`.category-link[data-category="${category}"]`);
            if (categoryLink) categoryLink.classList.add('active');
            
            updateProductVisibility();
            
            if (e.currentTarget.classList.contains('category-link')) {
                 document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Hook up modal close button
    const closeBtn = document.querySelector('.modal .close');
    if(closeBtn) closeBtn.onclick = closeModal;
});
