// JavaScript işlevleri buraya eklenecek

// Global ürün dizisi
let allProducts = [];

// Kategori eşleştirme haritası
const categoryMap = {
    'Taktik Gömlek': 'taktik-gomlek',
    'Outdoor T-Shirt': 'outdoor-tshirt', 
    'Taktik Pantolon': 'taktik-pantolon',
    'Mont / Yağmurluk': 'mont-yagmurluk',
    'Outdoor Ayakkabı': 'outdoor-ayakkabi',
    'Taktik Bot': 'taktik-bot',
    'Teçhizat & Aksesuar': 'techizat-aksesuar'
};

// Ürün verilerini yükle ve dönüştür
function loadProductData() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '<div class="loading">Ürünler yükleniyor...</div>';
    
    if (typeof window.PRODUCTS_DATA !== 'undefined') {
        allProducts = window.PRODUCTS_DATA.map(product => ({
            name: product.name,
            category: product.category,
            description: product.description || '',
            categorySlug: categoryMap[product.category] || 'other',
            thumbnail: product.thumbnail,
            variants: product.variants
        }));
        console.log('Ürünler yüklendi:', allProducts.length, 'ürün');
        renderProducts(allProducts);
    } else {
        console.error('Ürün verileri bulunamadı!');
        grid.innerHTML = '<div class="error">Ürün verileri yüklenemedi!</div>';
    }
}

// Ürünleri render etme fonksiyonu
function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    products.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item', 'fade-in');
        productElement.onclick = () => showProductModal(product);
        // Görsel hata kontrolü ekle
        const imgElement = document.createElement('img');
        imgElement.className = 'product-thumb loading';
        imgElement.alt = product.name;
        imgElement.loading = 'lazy';
        
        // Hata durumunda placeholder görsel
        imgElement.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkdvcnNlbCBZdWtsZW5lbWVkaTwvdGV4dD48L3N2Zz4=';
            this.classList.remove('loading');
        };
        
        // Başarıyla yüklendiğinde
        imgElement.onload = function() {
            this.classList.remove('loading');
        };
        
        imgElement.src = product.thumbnail;
        
        productElement.innerHTML = `
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${product.category}</p>
            </div>
        `;
        
        productElement.insertBefore(imgElement, productElement.firstChild);
        
        // Animasyon gecikmesi
        setTimeout(() => {
            grid.appendChild(productElement);
        }, index * 50);
    });
    
    // Lazy loading'i yeniden başlat
    setTimeout(lazyLoadImages, 100);
}

// Modaller için fonksiyon
function showProductModal(product) {
    console.log('Ürün modalı açıldı:', product);
    const modal = document.getElementById('productModal');
    const modalMainImage = document.getElementById('modalMainImage');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductCode = document.getElementById('modalProductCode');
    const imageThumbnails = document.getElementById('imageThumbnails');
    const colorVariants = document.getElementById('colorVariants');
    
    // Modal'ı görünür yap
    modal.style.display = 'block';
    // Animasyon için küçük bir gecikme
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    // Ürün bilgilerini güncelle
    modalProductName.textContent = product.name;
    modalProductCode.textContent = 'Ürün Kodu: ' + (product.code || 'AVX' + Math.floor(Math.random() * 1000));
    
    // Varolan açıklamayı temizle
    const existingDescription = document.querySelector('.product-description');
    if (existingDescription) {
        existingDescription.remove();
    }
    
    // Ürün açıklaması varsa ekle
    if (product.description) {
        const descriptionElement = document.createElement('p');
        descriptionElement.className = 'product-description';
        descriptionElement.textContent = product.description;
        // Ürün kodundan sonra açıklamayı ekle
        modalProductCode.parentNode.insertBefore(descriptionElement, modalProductCode.nextSibling);
    }
    
    // Ana resmi güncelle
    const mainImageSrc = product.thumbnail || (product.variants && product.variants[0] && product.variants[0].images[0]);
    modalMainImage.classList.add('loading');
    modalMainImage.src = mainImageSrc;
    modalMainImage.alt = product.name;
    
    // Ana görsel hata yönetimi
    modalMainImage.onerror = function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkfDtnJzZWwgWcO8a2xlbmVtZWRpPC90ZXh0Pjwvc3ZnPg==';
        this.classList.remove('loading');
    };
    
    modalMainImage.onload = function() {
        this.classList.remove('loading');
    };
    
    // Thumbnail'ları temizle ve yükle
    imageThumbnails.innerHTML = '';
    if (product.variants && product.variants.length > 0) {
        const firstVariant = product.variants[0];
        if (firstVariant.images && firstVariant.images.length > 0) {
            firstVariant.images.forEach((image, index) => {
                const thumbnail = document.createElement('img');
                thumbnail.classList.add('thumbnail');
                thumbnail.src = image;
                thumbnail.alt = `${product.name} - ${index + 1}`;
                if (index === 0) thumbnail.classList.add('active');
                
                thumbnail.onclick = () => {
                    modalMainImage.src = image;
                    // Aktif thumbnail'ı güncelle
                    imageThumbnails.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                    thumbnail.classList.add('active');
                };
                
                imageThumbnails.appendChild(thumbnail);
            });
        }
    }
    
    // Renk varyantlarını yükle
    colorVariants.innerHTML = '';
    if (product.variants && product.variants.length > 1) {
        const colorsTitle = document.createElement('h4');
        colorsTitle.textContent = 'Renk Seçenekleri:';
        colorVariants.appendChild(colorsTitle);
        
        product.variants.forEach((variant, index) => {
            const colorDot = document.createElement('span');
            colorDot.classList.add('color-dot');
            colorDot.classList.add(variant.color.toLowerCase().replace('İ', 'i').replace('Ü', 'u').replace('Ö', 'o').replace('Ç', 'c').replace('Ğ', 'g').replace('Ş', 's'));
            colorDot.title = variant.color;
            if (index === 0) colorDot.classList.add('active');
            
            colorDot.onclick = () => {
                // Ana resmi güncelle
                if (variant.images && variant.images.length > 0) {
                    modalMainImage.src = variant.images[0];
                    
                    // Thumbnail'ları güncelle
                    imageThumbnails.innerHTML = '';
                    variant.images.forEach((image, imgIndex) => {
                        const thumbnail = document.createElement('img');
                        thumbnail.classList.add('thumbnail');
                        thumbnail.src = image;
                        thumbnail.alt = `${product.name} - ${variant.color} - ${imgIndex + 1}`;
                        if (imgIndex === 0) thumbnail.classList.add('active');
                        
                        thumbnail.onclick = () => {
                            modalMainImage.src = image;
                            imageThumbnails.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                            thumbnail.classList.add('active');
                        };
                        
                        imageThumbnails.appendChild(thumbnail);
                    });
                }
                
                // Aktif renk seçimini güncelle
                colorVariants.querySelectorAll('.color-dot').forEach(dot => dot.classList.remove('active'));
                colorDot.classList.add('active');
            };
            
            colorVariants.appendChild(colorDot);
        });
    }
    
    // Modal kapatıldığında ekrandan kaldır
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
}

// Modal kapatma fonksiyonu
function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Ürün filtreleme fonksiyonu
function filterProducts(category) {
    const allProducts = document.querySelectorAll('.product-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    console.log('Filtreleme kategorisi:', category);
    console.log('Kategori adı:', getCategoryName(category));
    
    // Aktif buton stilini güncelle
    filterBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    let visibleCount = 0;
    allProducts.forEach(product => {
        const productCategory = product.querySelector('.product-category').textContent;
        console.log('Ürün kategorisi:', productCategory);
        if (category === 'all' || productCategory.includes(getCategoryName(category))) {
            product.style.display = 'block';
            visibleCount++;
        } else {
            product.style.display = 'none';
        }
    });
    console.log('Görünür ürün sayısı:', visibleCount);
}

// Kategori adlarını dönüştürme
function getCategoryName(category) {
    const categoryMap = {
        'taktik-gomlek': 'Taktik Gömlek',
        'outdoor-tshirt': 'Outdoor T-Shirt',
        'taktik-pantolon': 'Taktik Pantolon',
        'mont-yagmurluk': 'Mont / Yağmurluk',
        'outdoor-ayakkabi': 'Outdoor Ayakkabı',
        'taktik-bot': 'Taktik Bot',
        'techizat-aksesuar': 'Teçhizat & Aksesuar'
    };
    return categoryMap[category] || '';
}

// Arama fonksiyonu
function searchProducts(query) {
    const allProducts = document.querySelectorAll('.product-item');
    
    allProducts.forEach(product => {
        const productName = product.querySelector('.product-name').textContent.toLowerCase();
        if (productName.includes(query.toLowerCase())) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Ürünleri keşfet butonunu etkinleştir
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Lazy loading implementasyonu
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Sayfa yüklendiğinde çalışacak fonksiyon
document.addEventListener('DOMContentLoaded', function() {
    loadProductData();
    
    // Lazy loading başlat
    setTimeout(lazyLoadImages, 100);
    
    // Arama çubuğu etkinleştir
    document.getElementById('searchInput').addEventListener('input', function(e) {
        const query = e.target.value;
        searchProducts(query);
    });
    
    // Filtre butonlarını etkinleştir
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });
    
    // Ana menüdeki kategori linklerini etkinleştir
    document.querySelectorAll('.category-link[data-category]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            // Ürünler bölümüne kaydır
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            // Kategoriye göre filtrele
            setTimeout(() => {
                filterProducts(category);
            }, 300);
        });
    });
});
