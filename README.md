# eCommerce Backend API

This project is a fully functional backend API built with Node.js and Express.js for an eCommerce application. It supports complete **CRUD operations** for **Users**, **Products**, **Carts**, **Wishlists**, and **Orders**. 

## URL : https://ecommerce-project-2ty6.onrender.com

Key features include:
- User Registration and Login
- Product Management (Create, Read, Update, Delete)
- Cart Management (Add, Update, Remove Items)
- Wishlist Management
- Order Placement and Tracking

The project uses **MongoDB** as the database and follows a structured MVC (Model-View-Controller) architecture for clean and scalable code organization.

---


## User API

The User API provides functionalities for user registration and login.

### Endpoints


### 1. Register User

- **URL:** `/register`
- **Method:** `POST`
- **Description:** Registers a new user in the database.
- **Request Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "Password@123",
    "mobileNo": "9876543210",
    "gender": "male"
  }

- **Response (Success):**
  ```json
  {
    "success": true,
    "message": "User Registered Successfully!"
  }
### 2. Login User

- **URL:** `/login`
- **Method:** `POST`
- **Description:** Authenticates a user and logs them in.
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "Password@123"
  }

- **Response (Success):**
  ```json
  {
    "success": true,
    "message": "User Logged in successfully",
    "user": {
        "_id": "user_id_here",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "mobileNo": "9876543210",
        "gender": "male",
        "password": "hashed_password_here",
        "__v": 0
    }
  }

- **Response (Failure - User Not Found):**
  ```json
  {
    "message": "No user registered with this email. SignUp instead"
  }

- **Response (Failure - Invalid Credentials):**
  ```json
  {
    "message": "Invalid email or password"
  }

---

## Product API

Handles CRUD operations for product management.

### Endpoints

### 1. Fetch Product List

- **URL:** `/products-list`
- **Method:** `GET`
- **Description:** Fetches a paginated list of products. Supports searching by title, description, brand, or tags.
- **Query Parameters (optional):**
    - `pageSize` — Number of products per page (default: 10)
    - `pageNumber ` — Page number to fetch (default: 1)
    - `searchKey ` — Keyword to search products

- **Response:**
  ```json
  {
    "success": true,
    "message": "Products fetched successfully",
    "totalProducts": 100,
    "data": [ /* array of product objects */ ]
  }

### 2. Fetch Single Product

- **URL:** `/product/:id`
- **Method:** `GET`
- **Description:** Fetches details of a single product by its ID.

- **Response:**
  ```json
  {
    "success": true,
    "message": "Product fetched successfully",
    "data": { /* product details */ }
  }


### 3. Create a Product

- **URL:** `/product/create `
- **Method:** `GET`
- **Description:** Creates a new product.

- **Request Body Example:**
  ```json
  {
    "title": "iPhone 15",
    "description": "Latest iPhone model",
    "category": "Electronics",
    "price": 99999,
    "brand": "Apple",
    "stock": 50,
    "tags": ["smartphone", "apple", "electronics"],
    "rating": 4.8
  }

- **Response:**
  ```json
  {
    "success": true,
    "message": "Product created successfully",
    "data": { /* created product object */ }
  }


### 4. Update a Product

- **URL:** `/product/update/:id `
- **Method:** `PUT`
- **Description:** Updates an existing product by ID.

- **Request Body (fields to update):**
  ```json
  {
    "price": 94999,
    "stock": 45
  }

- **Response:**
  ```json
  {
    "success": true,
    "message": "Product updated successfully",
    "data": { /* updated product object */ }
  }

### 5. Delete a Product

- **URL:** `/product/delete/:id `
- **Method:** `DELETE`
- **Description:** Deletes a product by its ID.

- **Response:**
  ```json
  {
    "success": true,
    "message": "Product deleted successfully"
  }

---

## Cart API

Handles adding, updating, fetching, and removing products in the user's cart.

### Endpoints

---

### 1. Add Product to Cart

- **URL:** `/cart/add`
- **Method:** `POST`
- **Description:** Adds a product to the user's cart. If the user already has a cart, the product is added to it; otherwise, a new cart is created.
- **Request Body:**
  ```json
  {
    "userId": "USER_OBJECT_ID",
    "product": {
      "productId": "PRODUCT_OBJECT_ID",
      "qty": 2
    }
  }

- **Response:**
  ```json
  {
    "success": true,
    "message": "Products Added to the cart successfully!"
  }


### 2.Fetch User Cart

- **URL:** `/cart/list/:id`
- **Method:** `GET`
- **Description:** Fetches the cart details for a specific user.
- **Path Parameters :**
    - `id`: User's ObjectId

- **Response:**
  ```json
  {
    "success": true,
    "message": "Cart details fetched successfully!",
    "data": {
        "userId": { /* user data */ },
        "products": [
         {
            "productId": { /* product details */ },
            "qty": 2
        }
     ]
    }
  }


### 3.Update Product Quantity in Cart

- **URL:** `/cart/update`
- **Method:** `PUT`
- **Description:** Updates the quantity of a product already present in the user's cart.

- **Request Body:**
  ```json
  {
    "userId": "USER_OBJECT_ID",
    "product": {
        "productId": "PRODUCT_OBJECT_ID",
        "qty": 1
    }
  }

- **Response:**
  ```json
  {
    "success": true,
    "message": "Cart updated successfully!",
    "data": { /* updated cart data */ }
  }


### 4.Remove Product from Cart

- **URL:** `/cart/delete`
- **Method:** `DELETE`
- **Description:** Removes a specific product from the user's cart.

- **Request Body:**
  ```json
  {
    "userId": "USER_OBJECT_ID",
    "productId": "PRODUCT_OBJECT_ID"
  }

- **Response:**
  ```json
  {
    "success": true,
    "message": "Product removed from cart successfully",
    "cart": { /* updated cart data */ }
  }


---
