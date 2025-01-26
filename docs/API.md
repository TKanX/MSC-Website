# API Documentation

The API documentation provides detailed information about the backend API endpoints and their usage.

## 📚 Table of Contents

- [API Documentation](#api-documentation)
  - [📚 Table of Contents](#-table-of-contents)
  - [Authentication](#authentication)
  - [Rate Limiting](#rate-limiting)
  - [📂 Endpoints](#-endpoints)
    - [Authentication Endpoints](#authentication-endpoints)
      - [Admin Login](#admin-login)
      - [Admin Login (OAuth)](#admin-login-oauth)
    - [Admin Endpoints](#admin-endpoints)
      - [Get All Admins](#get-all-admins)

## Authentication

The API uses JWT (JSON Web Token) for authentication. To access protected routes, the client must include a valid JWT token in the `Authorization` header of the HTTP request. (Access tokens are valid for 15 minutes, and refresh tokens are valid for 30 days.)

## Rate Limiting

The API has specific rate limits for different functionalities to ensure fair usage and performance. The limits are as follows:

- **Authentication**: 15 requests/hour per IP.
- **Other Endpoints**: 150 requests/5 minutes per IP.

> **Note:** If the rate limit is exceeded, the server will respond with a `429 Too Many Requests` status code, indicating that the user has made too many requests in a given timeframe. Users should manage their request rates accordingly to avoid interruptions in service.

## 📂 Endpoints

### Authentication Endpoints

#### Admin Login

- **URL**: `/api/auth/login`
- **Method**: `POST`

- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "password"
  }
  ```

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {
        "admin": {},
        "refreshToken": "JWT_TOKEN",
        "accessToken": "JWT_TOKEN"
      },
      "message": "Admin logged in successfully."
    }
    ```

    > **Note:** The admin data, refresh token, and access token will be returned in the response (`data` field). The access token should be used to access protected routes, and the refresh token should be used to generate a new access token when it expires.

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid email address.",
      "error": {
        "code": "INVALID_EMAIL",
        "details": {}
      }
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid password.",
      "error": {
        "code": "INVALID_PASSWORD",
        "details": {}
      }
    }
    ```

  - **Status:** `401 Unauthorized`

    ```json
    {
      "status": "error",
      "message": "Invalid password.",
      "error": {
        "code": "INVALID_PASSWORD",
        "details": {}
      }
    }
    ```

  - **Status:** `404 Not Found`

    ```json
    {
      "status": "error",
      "message": "Admin not found.",
      "error": {
        "code": "ADMIN_NOT_FOUND",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error logging in admin.",
      "error": {
        "code": "LOGIN_ERROR",
        "details": {}
      }
    }
    ```

#### Admin Login (OAuth)

- **URL**: `/api/auth/oauth`
- **Method**: `POST`

- **Request Body**:

  ```json
  {
    "token": "OAUTH_TOKEN"
  }
  ```

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {
        "admin": {},
        "refreshToken": "JWT_TOKEN",
        "accessToken": "JWT_TOKEN"
      },
      "message": "Admin logged in successfully."
    }
    ```

    > **Note:** The admin data, refresh token, and access token will be returned in the response (`data` field). The access token should be used to access protected routes, and the refresh token should be used to generate a new access token when it expires.

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid token.",
      "error": {
        "code": "INVALID_TOKEN",
        "details": {}
      }
    }
    ```

  - **Status:** `401 Unauthorized`

    ```json
    {
      "status": "error",
      "message": "Token expired.",
      "error": {
        "code": "TOKEN_EXPIRED",
        "details": {}
      }
    }
    ```

  - **Status:** `404 Not Found`

    ```json
    {
      "status": "error",
      "message": "Admin not found.",
      "error": {
        "code": "ADMIN_NOT_FOUND",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error logging in admin.",
      "error": {
        "code": "LOGIN_ERROR",
        "details": {}
      }
    }
    ```

### Admin Endpoints

> **Note:** The following admin endpoints are protected and require a valid JWT token to access.

#### Get All Admins

- **URL**: `/api/admins`
- **Method**: `GET`

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {
        "admins": []
      },
      "message": "Admins retrieved successfully."
    }
    ```

    > **Note:** The list of admins will be returned in the response (`data` field).

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error in getting admins.",
      "error": {
        "code": "GET_ADMINS_ERROR",
        "details": {}
      }
    }
    ```