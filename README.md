# NEST CRUD API with JWT Authentication

This repository demonstrates CRUD (Create, Read, Update, Delete) operations on users and posts, with two different authentication methods: JWT (JSON Web Tokens) and session-based authentication.


## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- Session-based Authentication
- bcrypt (password hashing)
- RESTful API principles

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/adnan-maliik/nest-crud.git
   ```


3. Set up environment variables:
   
   - Create a `.env` file in the root directory.
   - Add the following environment variables and provide appropriate values:

     ```env
     # MongoDB connection
     MONGODB_URI=your-mongodb-connection-string

     # JWT secret key
     JWT_SECRET=your-secret-key

     # Session secret key
     SESSION_SECRET=your-secret-key
     ```

## Installation Packages

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
