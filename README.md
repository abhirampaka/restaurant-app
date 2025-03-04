# restaurant-app
# Foodie Hub

Foodie Hub is a restaurant listing web application where users can explore different restaurants, search by name or location, and navigate through paginated results. The project is built using **HTML, CSS, JavaScript, and MongoDB**.

## Features

### 🔍 Search Functionality
- **Search by Name**: Users can search for restaurants by entering the restaurant's name in the search bar.
- **Search by Location**: Users can filter restaurants based on their location.

### 📋 Restaurant Listings
- Displays restaurant details including name, cuisine type, rating, and images.
- Supports various categories like **Pizza, Italian, Japanese, American, BBQ, Burgers**, etc.
- Fetches restaurant data from a MongoDB database.

### 📌 Pagination
- Efficient pagination to navigate through multiple pages of restaurant listings.
- Highlighted active page number.
- Users can click on a page number to jump to that specific page.

### 🛒 Cart System
- Users can add restaurants to their cart.
- Displays cart count in the navigation bar.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Project Structure
```
foodie-hub/
│-- public/          # Static assets (CSS, JS, Images)
│-- views/           # HTML templates
│-- models/          # MongoDB Schemas
│-- routes/          # Express routes
│-- server.js        # Main server file
│-- package.json     # Dependencies and scripts
```

## Future Enhancements
- 📝 User authentication (login/signup)
- ⭐ User reviews and ratings
- 🗺️ Interactive map for restaurant locations

## Contributing
Feel free to fork this repository and submit pull requests. If you find any bugs or have suggestions, open an issue.

## License
This project is licensed under the **MIT License**.

