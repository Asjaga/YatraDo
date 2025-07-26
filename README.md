# YatraDo

YatraDo is a full-stack web application designed for discovering, listing, and booking accommodations. It serves as a platform connecting property owners (hosts) with travelers (customers), offering a seamless experience from browsing to booking. The application features user authentication, property management, a booking system, reviews, and interactive maps.

## Key Features

*   **Dual User Roles:** Separate authentication and dashboards for **Customers** (travelers) and **Owners** (hosts).
*   **CRUD for Listings:** Hosts can create, read, update, and delete their property listings, including uploading images.
*   **Comprehensive Booking System:** Customers can book properties for specific dates, and the system automatically calculates the duration and total cost.
*   **Booking Management:**
    *   **Customers:** View their booking history, check the status (Processing, Confirmed, Cancelled), and cancel their bookings.
    *   **Hosts:** Manage incoming bookings for their properties, with options to confirm or cancel requests.
*   **Search & Filter:** Users can search for listings by keywords or filter them by categories like Adventure, Beach, Luxury, etc.
*   **Reviews and Ratings:** Authenticated users can post reviews and star ratings for listings they've experienced.
*   **Interactive Maps:** Integrates Mapbox GL to display the location of each property on an interactive map.
*   **Cloud Image Storage:** Utilizes Cloudinary for efficient cloud-based storage and delivery of listing images.
*   **Responsive UI:** Designed with Bootstrap to ensure a consistent experience across desktop and mobile devices.

## Tech Stack

*   **Backend:** Node.js, Express.js
*   **Frontend:** EJS (Embedded JavaScript templates), Bootstrap, CSS3, JavaScript
*   **Database:** MongoDB with Mongoose ODM
*   **Authentication:** Passport.js (with `passport-local` and `passport-local-mongoose`) for session-based authentication.
*   **Image Handling:** Cloudinary for cloud storage, Multer for handling file uploads.
*   **Mapping:** Mapbox API for geocoding and interactive maps.
*   **Middleware:** Express-session, connect-mongo for session storage, connect-flash for flash messages, Joi for schema validation.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm installed on your machine.
*   A MongoDB account (local or Atlas).
*   A Cloudinary account.
*   A Mapbox account.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/asjaga/YatraDo.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd YatraDo
    ```

3.  **Install NPM packages:**
    ```sh
    npm install --legacy-peer-deps
    ```

4.  **Create a `.env` file** in the root directory and add the following environment variables with your credentials:
    ```env
    # MongoDB Connection String
    ATLAS_DB=mongodb+srv://<user>:<password>@cluster.mongodb.net/yatraDo

    # Session Secret
    SECRET=mysupersecretcode

    # Cloudinary Credentials
    CLOUD_NAME=<your_cloud_name>
    API_KEY=<your_cloudinary_api_key>
    API_SECRET=<your_cloudinary_api_secret>

    # Mapbox Access Token
    TOKEN=<your_mapbox_access_token>
    ```

5.  **(Optional) Initialize the Database:**
    To populate the database with sample listings and reviews, you can run the initialization script:
    ```sh
    node init/index.js
    ```

6.  **Start the server:**
    ```sh
    node app.js
    ```
    The application will be running at `http://localhost:8080`.

## Project Structure

The repository is organized following the MVC (Model-View-Controller) pattern:

```
└── asjaga-yatrado/
    ├── app.js              # Main application entry point
    ├── cloudConfig.js      # Cloudinary configuration
    ├── middleware.js       # Custom middleware functions
    ├── controller/         # Handles business logic (request/response)
    │   ├── listings.js
    │   ├── users.js
    │   └── ...
    ├── models/             # Mongoose schemas for the database
    │   ├── listing.js
    │   ├── user.js
    │   └── ...
    ├── public/             # Static assets (CSS, JS, images)
    │   ├── css/
    │   └── js/
    ├── routes/             # Defines the API endpoints and routes
    │   ├── listing.js
    │   ├── user.js
    │   └── ...
    ├── views/              # EJS templates for the UI
    │   ├── index.ejs
    │   ├── view.ejs
    │   └── ...
    └── utils/              # Utility functions (error handling, validation schemas)
        ├── ExpressError.js
        ├── joischema.js
        └── wrapAsync.js
