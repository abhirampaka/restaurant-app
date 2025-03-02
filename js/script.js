// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load restaurant data (simulated from JSON file)
let restaurants = [];
fetch('data/restaurants.json')
    .then(response => response.json())
    .then(data => {
        restaurants = data;
        if (window.location.pathname.includes('index.html')) {
            displayRestaurants(restaurants, 1);
        }
        updateCartCount(); // Update cart count on load
        if (window.location.pathname.includes('cart.html')) {
            displayCart(); // Display cart only on cart page
        }
    })
    .catch(error => console.error('Error loading restaurants:', error));

// Home Page: Display Restaurants with Pagination
function displayRestaurants(restaurantData, page) {
    const perPage = 10;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const restaurantList = document.getElementById('restaurant-list');
    restaurantList.innerHTML = '';

    const paginatedRestaurants = restaurantData.slice(start, end);
    paginatedRestaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.classList.add('restaurant-card');
        card.innerHTML = `
            <img src="${restaurant.featured_image}" alt="${restaurant.name}">
            <h3>${restaurant.name}</h3>
            <p>${restaurant.cuisines}</p>
            <p>Rating: ${restaurant.aggregate_rating} (${restaurant.rating_text})</p>
        `;
        card.addEventListener('click', () => {
            window.location.href = `restaurant-details.html?id=${restaurant.restaurant_id}`;
        });
        restaurantList.appendChild(card);
    });

    const totalPages = Math.ceil(restaurantData.length / perPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => displayRestaurants(restaurantData, i));
        if (i === page) button.style.backgroundColor = '#f4c430';
        pagination.appendChild(button);
    }
}

// Restaurant Details Page
if (window.location.pathname.includes('restaurant-details.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get('id');
    fetch('data/restaurants.json')
        .then(response => response.json())
        .then(data => {
            const restaurant = data.find(r => r.restaurant_id == restaurantId);
            const details = document.getElementById('restaurant-details');
            details.innerHTML = `
                <img src="${restaurant.featured_image}" alt="${restaurant.name}">
                <h2>${restaurant.name}</h2>
                <p><strong>Cuisines:</strong> ${restaurant.cuisines}</p>
                <p><strong>Address:</strong> ${restaurant.address}</p>
                <p><strong>Rating:</strong> ${restaurant.aggregate_rating} (${restaurant.rating_text})</p>
                <p><strong>Average Cost for Two:</strong> $${restaurant.average_cost_for_two}</p>
                <p><strong>Votes:</strong> ${restaurant.votes}</p>
            `;
            document.getElementById('add-to-cart-btn').addEventListener('click', () => {
                addToCart({ name: `${restaurant.name} - Sample Item`, price: 10 });
            });
        });
}

// Location Search Page
if (window.location.pathname.includes('location-search.html')) {
    document.getElementById('locationForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const lat = parseFloat(document.getElementById('latitude').value);
        const lon = parseFloat(document.getElementById('longitude').value);
        const results = document.getElementById('location-results');
        results.innerHTML = '';

        const matchedRestaurants = restaurants.filter(r => {
            const distance = getDistance(lat, lon, r.latitude, r.longitude);
            return distance < 5;
        });

        matchedRestaurants.forEach(restaurant => {
            const card = document.createElement('div');
            card.classList.add('restaurant-card');
            card.innerHTML = `
                <img src="${restaurant.featured_image}" alt="${restaurant.name}">
                <h3>${restaurant.name}</h3>
                <p>${restaurant.cuisines}</p>
                <p>Rating: ${restaurant.aggregate_rating}</p>
            `;
            card.addEventListener('click', () => {
                window.location.href = `restaurant-details.html?id=${restaurant.restaurant_id}`;
            });
            results.appendChild(card);
        });
    });
}

// Search Functionality for Home Page
if (window.location.pathname.includes('index.html')) {
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query === '') {
            displayRestaurants(restaurants, 1);
        } else {
            const filteredRestaurants = restaurants.filter(r => {
                const nameMatch = r.name.toLowerCase().includes(query);
                const cuisinesMatch = typeof r.cuisines === 'string' && r.cuisines.toLowerCase().includes(query);
                return nameMatch || cuisinesMatch;
            });
            displayRestaurants(filteredRestaurants, 1);
        }
    });
}

// Cart Functions
function addToCart(item) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function displayCart() {
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');
    cartItemsList.innerHTML = '';
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price}</span>
        `;
        cartItemsList.appendChild(div);
    });

    cartTotal.textContent = total.toFixed(2);

    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length > 0) {
            alert(`Checkout complete! Total: $${total.toFixed(2)}. Your cart has been cleared.`);
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            displayCart();
        } else {
            alert('Your cart is empty!');
        }
    });
}

// Load cart on cart page
if (window.location.pathname.includes('cart.html')) {
    displayCart();
}

// Distance Calculation (Haversine formula)
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 3958.8; // Radius of Earth in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}