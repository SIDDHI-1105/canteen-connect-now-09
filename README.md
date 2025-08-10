
# Canteen PWA

A Progressive Web App for easy, cashless, and organized canteen management.

---

## Overview

This Canteen PWA is a Vite + React + TypeScript web application designed to digitize and streamline the canteen ordering process.
It allows students and staff to browse menus, place orders, and make payments online, while admins can manage menus and process orders efficiently.

The app is installable on mobile/desktop, supports offline mode, and uses a simple PIN login system for quick access.

---

## Technologies Used

* Frontend: React, TypeScript, Tailwind CSS, shadcn-ui
* PWA Support: manifest.json, service-worker.js
* Build Tool: Vite
* State Management: Local Storage / Session Storage
* Backend: Node.js (API & File Uploads)
* Database: \[Specify database used]

---

## Key Files

### manifest.json

Defines app name, icons, theme color, start URL, and display mode for PWA installation.

### service-worker.js

Handles offline caching for faster load times and no-network support.

---

## Student-Facing Features

### 1. User Authentication

* Register/Login using:

  * Toll Number for students
  * Employee ID for teachers/staff
* Set 4–6 digit PIN during registration
* Login with PIN only (no password required)
* Secure logout and session-based login

### 2. Menu Browsing

* Single-page menu with categories:

  * Breakfast
  * Lunch
  * Snacks
  * Drinks
  * Dinner
  * Desserts
  * Specials
* Each item shows name, description, price, and availability

### 3. Add to Cart

* Add/remove items instantly
* Adjust quantity and auto-calculate subtotal
* Cart stored in session/localStorage

### 4. Place Order

* Review items, confirm total, and proceed to payment

### 5. Static QR Payment and Screenshot Upload

* Display static UPI QR code (GPay, PhonePe, Paytm)
* Upload screenshot of payment
* Screenshot linked to the specific order in the database

### 6. Order Tracking

* Order Status: Preparing → Ready → Completed
* Payment Status: Pending / Verified
* Displays timestamps and ordered items

### 7. Order History

* View past orders with receipts
* Download payment screenshots
* Rating feature removed

---

## Admin/Station-Facing Features

### 1. Admin Authentication

* Separate login for each seller/store
* Role-based access to menus and orders

### 2. Menu Management

* Add, edit, delete menu items
* Update price, category, and availability
* Mark items as Out of Stock
* Menu edit bug fixed

### 3. Order Management

* View all student orders with:

  * Student info (Toll No./Employee ID)
  * Ordered items
  * Payment screenshot
* Admin can now view uploaded payment screenshots
* Update order status: Preparing → Ready → Completed
* Update payment status: Pending → Verified

---

## Local Development Setup

```
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## Deployment

* Deploy directly from Lovable → Share → Publish
* For a custom domain, go to Project → Settings → Domains → Connect Domain

---

## PWA Features

* Add to Home Screen
* Works offline with cached menu and cart
* Fast load times via service worker
* Mobile-friendly UI

---

## Changelog

* Removed Rate Order feature
* Fixed Edit Menu bug
* Fixed Admin Payment Screenshot View issue

---
