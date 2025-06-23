
# YATRADO

_Transforming Journeys Into Seamless Adventures_

![Last Commit](https://img.shields.io/github/last-commit/your-username/yatrado?color=blue)
![EJS](https://img.shields.io/badge/ejs-52.8%25-lightgrey)
![Languages](https://img.shields.io/github/languages/count/your-username/yatrado)

---

## Built with the tools and technologies:

![Express](https://img.shields.io/badge/Express-black?logo=express&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-lightgrey)
![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-AA2929?logo=mongoose&logoColor=white)
![.env](https://img.shields.io/badge/.ENV-yellow)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![EJS](https://img.shields.io/badge/EJS-green)
![Passport](https://img.shields.io/badge/Passport-34D058?logo=passport)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white)

---

## 📖 Table of Contents

- [Overview](#overview)
- [Why YatraDo?](#why-yatrado)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)


---

## 🧭 Overview

**YatraDo** is a full-featured platform designed for building **location-based services** with a focus on scalability, security, and user engagement. It offers a robust backend with modular components, secure authentication, and media handling using Cloudinary.

The platform supports listings, reviews, bookings, and role-based access — making it ideal for travel or property management applications.

---

## ❓ Why YatraDo?

YatraDo simplifies building powerful and scalable travel or booking web applications by offering:

### ✨ Features

- 🧩 **Modular Architecture**: Clean separation of routes, controllers, models, and utilities for better maintainability.
- 🔒 **Secure Middleware**: Built-in authentication, authorization, and validation mechanisms.
- ☁️ **Cloud Image Storage**: Easy integration with Cloudinary for efficient image management.
- 📍 **Geolocation & Listings**: Dynamic property listings with location-based filtering.
- 📑 **Validation Schemas**: Data integrity ensured with robust validation strategies.
- 🚨 **Error Handling & Feedback**: Custom error classes and user alerts for smooth experience.

---

## ⚙️ Installation

```bash
git clone https://github.com/asjaga/YatraDo.git
cd YatraDo
npm install ---legacy-peer-deps
````

Create a `.env` file in the root directory and add your environment variables:

```env
TOKEN=your_mapbox_token
ATLAS_DB=your_mongodb_url
CLOUD_NAME=your_cloud_name of cloudinary
API_KEY=cloudianry_api_key
API_SECRET=your_secret of cloudinary
SECRET=your_session_secret
```

---

## 🚀 Usage

```bash
node app.js
```

Visit: `http://localhost:8080`

---

## 📁 Folder Structure

```
yatrado/
│
├── models/             # Mongoose schemas
├── routes/             # Express route handlers
├── controllers/        # Logic for each route
├── views/              # EJS templates
├── public/             # Static assets (CSS, JS)
├── utils/              # Helper functions and middleware
├── schemas/            # Joi validation schemas
├── .env                # Environment variables
├── app.js              # Express app setup
└── package.json        # Project metadata
```
