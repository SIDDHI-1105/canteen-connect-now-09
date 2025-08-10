# Canteen PWA

A Progressive Web App for easy and cashless canteen management.

---


## Overview

The **Canteen PWA** is built to make ordering food in the canteen faster and more convenient.
Students and staff can:

* Browse the menu
* Place orders
* Make online payments
* Track order status in real time

Admins can:

* Manage and update menus
* Adjust item availability
* Verify and process orders

The app also works in offline mode and can be installed on both mobile and desktop devices.


---

## Technologies Used

* Frontend: HTML, CSS, JavaScript, React, Tailwind CSS, shadcn-ui
* Backend: PHP
* Database: MySQL
* PWA Support: manifest.json, service-worker.js AND MORE
* Build Tool: Vite

---

## Student Features

* Register/Login using Toll Number (students) or Employee ID (staff) with a 4–6 digit PIN
* Browse menu items under categories (Breakfast, Lunch, Snacks, Drinks, Dinner, Desserts, Specials)
* Add/remove items from cart and adjust quantities
* Place orders and pay via static UPI QR code
* Upload payment screenshot linked to the order
* Track order and payment status
* View past orders and download receipts (Rating feature removed)

---

## Admin Features

* Separate login for each seller/store with role-based access
* Add, edit, delete menu items and update availability
* View orders with student/staff details and payment screenshots
* Update order status (Preparing, Ready, Completed)
* Mark payment as Pending or Verified

---

## Local Development Setup

```
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project folder
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## PWA Features

* Installable on mobile and desktop
* Works offline with cached menu and cart
* Fast load times via service worker

:)
