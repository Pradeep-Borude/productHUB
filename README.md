# ProductHub – Product Management 

##  Overview

**ProductHub** is a full‑stack Product Management application built as part of an assignment. It allows users to register, authenticate securely, and manage products they own. Each product is strictly owned by its creator, ensuring proper authorization and data isolation.

The project follows **industry‑standard practices** such as:

* JWT authentication with **httpOnly cookies**
* Protected frontend routes
* Role‑based product ownership checks
* Clean REST API design

---

##  Assignment Objectives (Covered)

* User Authentication (Register / Login / Logout)
* Secure session handling using cookies
* Product CRUD operations
* Product ownership (only creator can edit/delete)
* Reusable frontend components
* Backend authorization middleware
* MongoDB data modeling with references

 All assignment requirements are implemented

---

##  Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Multer (file uploads)

### Frontend

* React (Vite)
* Axios
* React Router
* CSS (custom, no UI library)

---

## 🔐 Authentication Flow

* JWT is issued on login/register
* Token stored in **httpOnly cookie**
* Frontend never reads token directly
* Backend validates token on every protected request

### Why httpOnly cookies?

* Prevents XSS attacks
* Industry‑standard security practice

---

##  Project Structure

```
backend/
 ├── src/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   ├── middlewares/
 │   ├── services/
 │   └── db/
 ├── server.js
 └── package.json

frontend/
 ├── src/
 │   ├── components/
 │   ├── pages/
 │   ├── middleware/
 │   ├── routes/
 │   └── styles/
 └── package.json
```

---

##  Data Models

### User

* fullName
* email (unique)
* password (hashed)
* contact (optional)
* address (optional)

### Product

* productId (unique)
* name
* description
* image
* price
* company
* featured (boolean)
* rating
* productPartner → **User reference**
* createdAt

Each product is linked to the user who created it.

---

##  Authorization Rules

* Only logged‑in users can create products
* Only the **owner** of a product can:

  * Edit it
  * Delete it
* Unauthorized access returns proper HTTP status codes

---

##  API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`
* `POST /api/auth/logout`
* `GET /api/auth/me`

### Products

* `POST /api/products/add` (protected)
* `PUT /api/products/edit/:productId` (protected)
* `DELETE /api/products/delete/:productId` (protected)
* `GET /api/products` (public)
* `GET /api/products/my-products` (protected)

---

## 🛡 Frontend Route Protection

Protected routes use a **UserProtectedRoute** middleware that verifies authentication via backend:

```jsx
<UserProtectedRoute>
  <UserProfile />
</UserProtectedRoute>
```

This ensures users cannot access protected pages without a valid session.

---

##  How to Run Locally

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

##  Testing Checklist

* Login persists after refresh
* Unauthorized users redirected to login
* Product ownership enforced
* CRUD operations work as expected

---

##  Key Learning Outcomes

* Secure authentication using cookies
* Backend‑driven authorization
* Clean React component architecture
* Real‑world API protection patterns

---

##  Author

**Pradeep Borude**
BCA Student | Full‑Stack Developer (MERN)

