# Blogify

Blogify is a modern blogging platform built with Node.js, Express, and MongoDB. It allows users to create, edit, and view blogs. The application supports user authentication and provides a clean, responsive interface with features such as blog creation, user profiles, and an intuitive layout.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Overview
Blogify is a simple yet powerful blogging platform that allows users to:
- Register, sign in, and manage their profiles.
- Create and publish blogs with text and images.
- View blogs created by others.
- Edit and delete their own blogs.
- A responsive and user-friendly interface powered by Bootstrap and EJS templates.

## Features
- **User Authentication**: Users can sign up, log in, and log out securely.
- **Blog Management**: Users can create, update, and delete their blogs.
- **Image Uploads**: Supports uploading images for blogs.
- **Responsive Design**: Fully responsive layout that works well on both desktop and mobile devices.
- **Dynamic Templates**: EJS templating engine used for rendering dynamic content.
- **User Profiles**: Display user information and their blogs on their profile page.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript Templates), Bootstrap
- **Database**: MongoDB with Mongoose ORM
- **File Uploads**: Multer (for handling image uploads)
- **Authentication**: JWT (JSON Web Tokens) for user authentication

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/blogify.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd blogify
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Set Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   ```

5. **Run the Application**:
   Start the application with:
   ```bash
   npm start
   ```
   For development, use:
   ```bash
   npm run dev
   ```

6. **Access the Application**:
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

1. **Register a New Account**: Navigate to the signup page and create a new account.
2. **Log In**: Use the sign-in page to log into your account.
3. **Create a New Blog**: Once logged in, navigate to the "Add Blog" page to create a new blog.
4. **View Blogs**: Visit the homepage to view a list of all blogs. Click on individual blogs to read them.
5. **Edit or Delete Blogs**: Edit or delete blogs you have created from your profile page.

## Folder Structure

```
blogify/
├── controllers/          # Controllers handling logic for routes
│   ├── blogController.js
│   ├── userController.js
├── middleware/           # Middleware functions (authentication, etc.)
│   └── authentication.js
├── models/               # Mongoose models (schemas for blogs and users)
│   ├── blog.js
│   ├── user.js
├── node_modules/         # Project dependencies
├── public/               # Public assets (images, CSS, JS)
│   ├── images/           # Uploaded images
│   └── uploads/          # Temporary file uploads
├── routes/               # Routes defining the app's URL structure
│   ├── blog.js           # Blog-related routes
│   ├── user.js           # User-related routes (auth)
├── views/                # EJS views/templates
│   ├── partials/         # Reusable view partials (header, footer, etc.)
│   ├── addBlog.ejs       # View for adding a new blog
│   ├── home.ejs          # Home page for displaying blogs
│   ├── signin.ejs        # Sign-in page
│   ├── signup.ejs        # Sign-up page
│   └── viewBlog.ejs      # View for displaying individual blogs
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── app.js                # Main application entry point
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

## Screenshots
### Home Page
![Home Page](http://localhost:8000/)

### Add Blog Page
![Add Blog Page](http://localhost:8000/blog/add-new)

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes.
4. Push to the branch and create a Pull Request.

## License
This project is licensed under the MIT License.
