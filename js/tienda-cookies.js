const cardContainer = document.getElementById('cardContainer');
const productCardTemplate = document.getElementById('productCardTemplate');


// Datos de ejemplo para las tarjetas
const products = [
    {
        image: '../imagenes/desarrollo-web-3.jpg',
        title: 'Diseño Web',    
        description: 'Creación de diseños y lenguaje personalizado al gusto del cliente',
        price: '€120.00'
    },
    {
        image: '../imagenes/uetus.jpg',
        title: 'Web Responsiva',
        description: 'Nos encargamos de desarrollar su web responsiva adaptada a todos los dispositivos',
        price: '€80.00'
    },
    {
        image: '../imagenes/1-e8175fe9.jpg',
        title: 'Mantenimiento y Actualización',
        description: 'Servicio de mantenimiento para mantener segura y estable tu web, además de aplicar actualizaciones necesarias',
        price: '€30.00'
    },
    {
        image: '../imagenes/seo.jpg',
        title: 'Optimización SEO',
        description: ' Aseguramos que tu página web esté optimizada para los motores de búsqueda, mejorando tu visibilidad online.',
        price: '€30.00'
    },
    {
        image: '../imagenes/Miniaturas-CMAS.png',
        title: 'Desarrollo de eCommerce',
        description: 'Creamos tiendas en línea funcionales y seguras.',
        price: '€55.00'
    }
];

// Inicializar el carrito y favoritos
let cart = [];
let favorites = [];

// Crear tarjetas de producto
products.forEach(product => {
    const cardClone = document.importNode(productCardTemplate.content, true);
    const card = cardClone.querySelector('.card');

    card.querySelector('.product-image').src = product.image;
    card.querySelector('slot[name="title"]').innerText = product.title;
    card.querySelector('slot[name="description"]').innerText = product.description;
    card.querySelector('slot[name="price"]').innerText = product.price;

    // Manejar el clic en el botón de añadir al carrito
    card.querySelector('.cart-button').addEventListener('click', () => {
        cart.push(product);
        alert(`${product.title} ha sido añadido al carrito.`);
    });

    // Manejar el clic en el botón de añadir a favoritos
    card.querySelector('.like-button').addEventListener('click', () => {
        if (!favorites.includes(product)) {
            favorites.push(product);
            alert(`${product.title} ha sido añadido a favoritos.`);
        } else {
            alert(`${product.title} ya está en favoritos.`);
        }
    });

    cardContainer.appendChild(cardClone);
});

// Manejar el clic en el botón de ver carrito
document.getElementById('viewCartButton').addEventListener('click', () => {
    const cartContent = document.getElementById('cartContent');
    const favoritesContent = document.getElementById('favoritesContent');
    const checkoutContent = document.getElementById('checkoutContent');

    // Limpiar el contenido de favoritos y checkout
    favoritesContent.style.display = 'none';
    checkoutContent.style.display = 'none';
    cartContent.innerHTML = '<h2>Carrito</h2>';
    
    if (cart.length === 0) {
        cartContent.innerHTML += '<p>Tu carrito está vacío.</p>';
    } else {
        cart.forEach(item => {
            cartContent.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; margin-right: 10px;">
                    <span>${item.title} - ${item.price}</span>
                </div>
            `;
        });
        cartContent.innerHTML += `<button id="proceedToCheckoutButton">Proceder a la Compra</button>`;
    }
  

  
    
    cartContent.style.display = 'block';
    showModal();

    
    document.getElementById('proceedToCheckoutButton').addEventListener('click', () => {
     
        handleCheckout();
    });
});

function handleCheckout() {
    const checkoutContent = document.getElementById('checkoutContent');
    const cartContent = document.getElementById('cartContent');
    const favoritesContent = document.getElementById('favoritesContent');

    favoritesContent.style.display = 'none';
    cartContent.style.display = 'none';

    let totalPrice = 0;
    checkoutContent.innerHTML = '<h2>Resumen de la Compra</h2>';
    
    if (cart.length === 0) {
        checkoutContent.innerHTML += '<p>Tu carrito está vacío.</p>';
    } else {
        cart.forEach(item => {
            checkoutContent.innerHTML += `
                <div class="checkout-item">
                    <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; margin-right: 10px;">
                    <span>${item.title} - ${item.price}</span>
                </div>
            `;
            // Eliminar el símbolo de euro antes de convertir el precio
            const priceValue = parseFloat(item.price.replace('€', '').trim());
            totalPrice += priceValue;
        });
        checkoutContent.innerHTML += `<h3>Precio Total: €${totalPrice.toFixed(2)}</h3>`;
        checkoutContent.innerHTML += `<button id="confirmPurchaseButton">Confirmar Compra</button>`;
    }
    
    checkoutContent.style.display = 'block';
    showModal();
 
    const confirmPurchaseButton = document.getElementById('confirmPurchaseButton');
    if (confirmPurchaseButton) {
        confirmPurchaseButton.addEventListener('click', () => {
            alert('Gracias por tu compra!');
            cart = []; 
            checkoutContent.innerHTML = ''; 
            checkoutContent.style.display = 'none'; 
        });
    }
}

document.getElementById('viewFavoritesButton').addEventListener('click', () => {
    const cartContent = document.getElementById('cartContent');
    const favoritesContent = document.getElementById('favoritesContent');
    const checkoutContent = document.getElementById('checkoutContent');

    cartContent.style.display = 'none';
    checkoutContent.style.display = 'none';
    favoritesContent.innerHTML = '<h2>Favoritos</h2>';
    
    if (favorites.length === 0) {
        favoritesContent.innerHTML += '<p>No tienes favoritos.</p>';
    } else {
        favorites.forEach(item => {
            favoritesContent.innerHTML += `
                <div class="favorites-item">
                    <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; margin-right: 10px;">
                    <span>${item.title} - ${item.price}</span>
                </div>
            `;
        });
    }
    
    favoritesContent.style.display = 'block';
    showModal();
});

function showModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    modal.classList.add('active');
}

document.getElementById('closeModal').addEventListener('click', () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    modal.classList.remove('active');
});

document.getElementById('checkoutButton').addEventListener('click', () => {
    const checkoutContent = document.getElementById('checkoutContent');
    const cartContent = document.getElementById('cartContent');
    const favoritesContent = document.getElementById('favoritesContent');

    favoritesContent.style.display = 'none';
    cartContent.style.display = 'none';
    
    let totalPrice = 0;
    checkoutContent.innerHTML = '<h2>Resumen de la Compra</h2>';
    
    if (cart.length === 0) {
        checkoutContent.innerHTML += '<p>Tu carrito está vacío.</p>';
    } else {
        cart.forEach(item => {
            checkoutContent.innerHTML += `
                <div class="checkout-item">
                    <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; margin-right: 10px;">
                    <span>${item.title} - ${item.price}</span>
                </div>
            `;
            const priceValue = parseFloat(item.price.replace('€', '').trim());
            totalPrice += priceValue;
        });
        checkoutContent.innerHTML += `<h3>Precio Total: €${totalPrice.toFixed(2)}</h3>`;
        checkoutContent.innerHTML += `<button id="confirmPurchaseButton">Confirmar Compra</button>`;
    }

    checkoutContent.style.display = 'block';
    showModal();

    document.getElementById('confirmPurchaseButton')?.addEventListener('click', () => {
        alert('Gracias por tu compra!');
        cart = []; 
        checkoutContent.innerHTML = ''; 
        checkoutContent.style.display = 'none'; 
    });
});