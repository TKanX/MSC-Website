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
      - [Refresh Token](#refresh-token)
    - [Admin Endpoints](#admin-endpoints)
      - [Get All Admins](#get-all-admins)
      - [Create Admin](#create-admin)
      - [Update Admin Email](#update-admin-email)
      - [Update Admin Password](#update-admin-password)
      - [Delete Admin](#delete-admin)
    - [About Endpoints](#about-endpoints)
      - [Get About William Andrew Goddard III](#get-about-william-andrew-goddard-iii)
      - [Get CV of William Andrew Goddard III](#get-cv-of-william-andrew-goddard-iii)
      - [Get About Materials and Process Simulation Center](#get-about-materials-and-process-simulation-center)
      - [Update About-Bio of William Andrew Goddard III](#update-about-bio-of-william-andrew-goddard-iii)
      - [Update About of William Andrew Goddard III](#update-about-of-william-andrew-goddard-iii)
      - [Update CV of William Andrew Goddard III](#update-cv-of-william-andrew-goddard-iii)
      - [Update Photo of William Andrew Goddard III](#update-photo-of-william-andrew-goddard-iii)
      - [Update About of Materials and Process Simulation Center](#update-about-of-materials-and-process-simulation-center)
    - [Members Endpoints](#members-endpoints)
      - [Get All Members](#get-all-members)
      - [Create Member](#create-member)
      - [Update Member](#update-member)
      - [Delete Member](#delete-member)
    - [Collaborators Endpoints](#collaborators-endpoints)
      - [Get All Collaborators](#get-all-collaborators)
      - [Create Collaborator](#create-collaborator)
      - [Update Collaborator](#update-collaborator)
      - [Delete Collaborator](#delete-collaborator)
      - [Get About Collaborators](#get-about-collaborators)
      - [Update About Collaborators](#update-about-collaborators)
    - [Research Endpoints](#research-endpoints)
      - [Get Research Areas](#get-research-areas)
      - [Get Research Area Details](#get-research-area-details)
      - [Get Research About](#get-research-about)
      - [Update Research Areas (JSON Patch)](#update-research-areas-json-patch)
      - [Update Research About](#update-research-about)
    - [Publications Endpoints](#publications-endpoints)
      - [Get All Publications](#get-all-publications)
      - [Get Crawl Status](#get-crawl-status)
      - [Request Re-Crawl](#request-re-crawl)
    - [Events Endpoints](#events-endpoints)
      - [Get Group Photo IDs](#get-group-photo-ids)
      - [Get Group Photo by ID](#get-group-photo-by-id)
      - [Add Group Photo](#add-group-photo)
      - [Update Group Photo Description](#update-group-photo-description)
      - [Update Group Photo Date](#update-group-photo-date)
      - [Remove Group Photo](#remove-group-photo)

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

#### Refresh Token

- **URL**: `/api/auth/refresh-token`
- **Method**: `POST`

- **Request Body**:

  ```json
  {
    "refreshToken": "JWT_REFRESH_TOKEN"
  }
  ```

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {
        "accessToken": "JWT_ACCESS_TOKEN"
      },
      "message": "Access token refreshed successfully."
    }
    ```

    > **Note:** The new access token will be returned in the response (`data` field).

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid refresh token.",
      "error": {
        "code": "INVALID_REFRESH_TOKEN",
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

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error refreshing token.",
      "error": {
        "code": "REFRESH_TOKEN_ERROR",
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
      "data": [],
      "message": "Admins retrieved successfully."
    }
    ```

    > **Note:** The list of admins will be returned in the response (`data` field).

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error getting admins.",
      "error": {
        "code": "GET_ADMINS_ERROR",
        "details": {}
      }
    }
    ```

#### Create Admin

- **URL**: `/api/admins`
- **Method**: `POST`

- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "password"
  }
  ```

  > **Note:** The password will be hashed and salted automatically before storing it in the database.

- **Response**:

  - **Status:** `201 Created`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "Admin created successfully."
    }
    ```

    > **Note:** The newly created admin data will be returned in the response (`data` field).

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

  - **Status:** `409 Conflict`

    ```json
    {
      "status": "error",
      "message": "Admin already exists.",
      "error": {
        "code": "ADMIN_EXISTS",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error creating admin.",
      "error": {
        "code": "CREATE_ADMIN_ERROR",
        "details": {}
      }
    }
    ```

#### Update Admin Email

- **URL**: `/api/admins/:id/email`
- **Method**: `PUT`

- **Request Parameters**:

  - `id`: The ID of the admin to update.

- **Request Body**:

  ```json
  {
    "email": "new_email@example.com"
  }
  ```

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "Admin email updated successfully."
    }
    ```

    > **Note:** The updated admin data will be returned in the response (`data` field).

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

  - **Status:** `409 Conflict`

    ```json
    {
      "status": "error",
      "message": "Email already in use.",
      "error": {
        "code": "EMAIL_IN_USE",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error updating admin email.",
      "error": {
        "code": "UPDATE_ADMIN_EMAIL_ERROR",
        "details": {}
      }
    }
    ```

#### Update Admin Password

- **URL**: `/api/admins/:id/password`
- **Method**: `PUT`

- **Request Parameters**:

  - `id`: The ID of the admin to update.

- **Request Body**:

  ```json
  {
    "password": "new_password"
  }
  ```

  > **Note:** The password will be hashed and salted automatically before storing it in the database.

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "Admin password updated successfully."
    }
    ```

    > **Note:** The updated admin data will be returned in the response (`data` field).

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
      "message": "Error updating admin password.",
      "error": {
        "code": "UPDATE_ADMIN_PASSWORD_ERROR",
        "details": {}
      }
    }
    ```

#### Delete Admin

- **URL**: `/api/admins/:id`
- **Method**: `DELETE`

- **Request Parameters**:

  - `id`: The ID of the admin to delete.

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "Admin deleted successfully."
    }
    ```

    > **Note:** The deleted admin data will be returned in the response (`data` field).

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
      "message": "Error deleting admin.",
      "error": {
        "code": "DELETE_ADMIN_ERROR",
        "details": {}
      }
    }
    ```

### About Endpoints

> **Note:** The following `PUT` endpoints are protected and require a valid JWT token to access.

#### Get About William Andrew Goddard III

- **URL**: `/api/about/wag`
- **Method**: `GET`

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "About WAG retrieved successfully."
    }
    ```

    > **Note:** The about information will be returned in the response (`data` field).

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error getting WAG.",
      "error": {
        "code": "GET_WAG_ERROR",
        "details": {}
      }
    }
    ```

#### Get CV of William Andrew Goddard III

- **URL**: `/api/about/wag/cv`
- **Method**: `GET`

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": "BASE64_ENCODED_CV",
      "message": "CV retrieved successfully."
    }
    ```

    > **Note:** The CV data will be returned in the response (`data` field) as a base64 encoded string.

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error getting CV.",
      "error": {
        "code": "GET_CV_ERROR",
        "details": {}
      }
    }
    ```

#### Get About Materials and Process Simulation Center

- **URL**: `/api/about/msc`
- **Method**: `GET`

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "About MSC retrieved successfully."
    }
    ```

    > **Note:** The about information will be returned in the response (`data` field).

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error getting MSC.",
      "error": {
        "code": "GET_MSC_ERROR",
        "details": {}
      }
    }
    ```

#### Update About-Bio of William Andrew Goddard III

- **URL**: `/api/about/wag/bio`
- **Method**: `PUT`

- **Request Body**:

  ```json
  {
    "bio": "New bio text."
  }
  ```

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "Bio updated successfully."
    }
    ```

    > **Note:** The updated bio data will be returned in the response (`data` field).

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid bio.",
      "error": {
        "code": "INVALID_BIO",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error updating bio.",
      "error": {
        "code": "UPDATE_BIO_ERROR",
        "details": {}
      }
    }
    ```

#### Update About of William Andrew Goddard III

- **URL**: `/api/about/wag/about`
- **Method**: `PUT`

- **Request Body**:

  ```json
  {
    "about": {}
  }
  ```

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "About updated successfully."
    }
    ```

    > **Note:** The updated about data will be returned in the response (`data` field).

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid about data.",
      "error": {
        "code": "INVALID_ABOUT",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error updating about.",
      "error": {
        "code": "UPDATE_ABOUT_ERROR",
        "details": {}
      }
    }
    ```

#### Update CV of William Andrew Goddard III

- **URL**: `/api/about/wag/cv`
- **Method**: `PUT`

- **Request Body**:

  ```json
  {
    "cv": "BASE64_ENCODED_CV"
  }
  ```

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "CV updated successfully."
    }
    ```

    > **Note:** The updated CV data will be returned in the response (`data` field).

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid CV data.",
      "error": {
        "code": "INVALID_CV",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error updating CV.",
      "error": {
        "code": "UPDATE_CV_ERROR",
        "details": {}
      }
    }
    ```

#### Update Photo of William Andrew Goddard III

- **URL**: `/api/about/wag/photo`
- **Method**: `PUT`

- **Request Body**:

  ```json
  {
    "photo": "BASE64_ENCODED_PHOTO"
  }
  ```

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "Photo updated successfully."
    }
    ```

    > **Note:** The updated photo data will be returned in the response (`data` field).

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid photo.",
      "error": {
        "code": "INVALID_PHOTO",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error updating photo.",
      "error": {
        "code": "UPDATE_PHOTO_ERROR",
        "details": {}
      }
    }
    ```

#### Update About of Materials and Process Simulation Center

- **URL**: `/api/about/msc`
- **Method**: `PUT`

- **Request Body**:

  ```json
  {
    "about": {}
  }
  ```

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "MSC updated successfully."
    }
    ```

    > **Note:** The updated about data will be returned in the response (`data` field).

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid MSC data.",
      "error": {
        "code": "INVALID_MSC",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error updating MSC.",
      "error": {
        "code": "UPDATE_MSC_ERROR",
        "details": {}
      }
    }
    ```

### Members Endpoints

> **Note:** The following `POST`, `PUT`, and `DELETE` endpoints are protected and require a valid JWT token to access.

#### Get All Members

- **URL**: `/api/members`
- **Method**: `GET`

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": [],
      "message": "Members retrieved successfully."
    }
    ```

    > **Note:** The list of members will be returned in the response (`data` field).

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error getting members.",
      "error": {
        "code": "GET_MEMBERS_ERROR",
        "details": {}
      }
    }
    ```

#### Create Member

- **URL**: `/api/members`
- **Method**: `POST`

- **Request Body**:

  ```json
  {
    "name": "Member Name",
    "position": "Member Position",
    "education": "Member Education",
    "area": "Member Area",
    "email": "member@example.com",
    "organization": "Member Organization",
    "country": "Member Country",
    "website": "Member Website",
    "photo": "BASE64_ENCODED_PHOTO"
  }
  ```

  > **Note:** Some fields are required (`name`, `position`, `education`, `area`, `email`), and the photo should be a base64 encoded string.

- **Response**:

  - **Status:** `201 Created`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "Member created successfully."
    }
    ```

    > **Note:** The newly created member data will be returned in the response (`data` field).

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid name.",
      "error": {
        "code": "INVALID_NAME",
        "details": {}
      }
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid position.",
      "error": {
        "code": "INVALID_POSITION",
        "details": {}
      }
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid education.",
      "error": {
        "code": "INVALID_EDUCATION",
        "details": {}
      }
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid area.",
      "error": {
        "code": "INVALID_AREA",
        "details": {}
      }
    }
    ```

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
      "message": "Invalid organization.",
      "error": {
        "code": "INVALID_ORGANIZATION",
        "details": {}
      }
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid country.",
      "error": {
        "code": "INVALID_COUNTRY",
        "details": {}
      }
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid website.",
      "error": {
        "code": "INVALID_WEBSITE",
        "details": {}
      }
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid photo.",
      "error": {
        "code": "INVALID_PHOTO",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error creating member.",
      "error": {
        "code": "CREATE_MEMBER_ERROR",
        "details": {}
      }
    }
    ```

#### Update Member

- **URL**: `/api/members/:id`
- **Method**: `PUT`

- **Request Parameters**:

  - `id`: The ID of the member to update.

- **Request Body**:

  ```json
  {
    "name": "Member Name",
    "position": "Member Position",
    "education": "Member Education",
    "area": "Member Area",
    "email": "member@example.com",
    "organization": "Member Organization",
    "country": "Member Country",
    "website": "Member Website",
    "photo": "BASE64_ENCODED_PHOTO"
  }
  ```

  > **Note:** Some fields are required (`name`, `position`, `education`, `area`, `email`), and the photo should be a base64 encoded string.

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "Member updated successfully."
    }
    ```

    > **Note:** The updated member data will be returned in the response (`data` field).

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid name.",
      "error": {
        "code": "INVALID_NAME",
        "details": {}
      }
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid position.",
      "error": {
        "code": "INVALID_POSITION",
        "details": {}
      }
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid education.",
      "error": {
        "code": "INVALID_EDUCATION",
        "details": {}
      }
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid area.",
      "error": {
        "code": "INVALID_AREA",
        "details": {}
      }
    }
    ```

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
      "message": "Invalid organization.",
      "error": {
        "code": "INVALID_ORGANIZATION",
        "details": {}
      }
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid country.",
      "error": {
        "code": "INVALID_COUNTRY",
        "details": {}
      }
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid website.",
      "error": {
        "code": "INVALID_WEBSITE",
        "details": {}
      }
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid photo.",
      "error": {
        "code": "INVALID_PHOTO",
        "details": {}
      }
    }
    ```

  - **Status:** `404 Not Found`

    ```json
    {
      "status": "error",
      "message": "Member not found.",
      "error": {
        "code": "MEMBER_NOT_FOUND",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error updating member.",
      "error": {
        "code": "UPDATE_MEMBER_ERROR",
        "details": {}
      }
    }
    ```

#### Delete Member

- **URL**: `/api/members/:id`
- **Method**: `DELETE`

- **Request Parameters**:

  - `id`: The ID of the member to delete.

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": null,
      "message": "Member deleted successfully."
    }
    ```

  - **Status:** `404 Not Found`

    ```json
    {
      "status": "error",
      "message": "Member not found.",
      "error": {
        "code": "MEMBER_NOT_FOUND",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error deleting member.",
      "error": {
        "code": "DELETE_MEMBER_ERROR",
        "details": {}
      }
    }
    ```

### Collaborators Endpoints

> **Note:** The following `POST`, `PUT`, and `DELETE` endpoints are protected and require a valid JWT token to access.

#### Get All Collaborators

- **URL**: `/api/collaborators`
- **Method**: `GET`

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": [],
      "message": "Collaborators retrieved successfully."
    }
    ```

    > **Note:** The list of collaborators will be returned in the response (`data` field).

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error getting collaborators.",
      "error": {
        "code": "GET_COLLABORATORS_ERROR",
        "details": {}
      }
    }
    ```

#### Create Collaborator

- **URL**: `/api/collaborators`
- **Method**: `POST`

- **Request Body**:

  ```json
  {
    "organization": "Collaborator Organization",
    "country": "Collaborator Country",
    "leader": "Collaborator Leader",
    "email": "collaborator@example.com",
    "website": "Collaborator Website",
    "latitude": 0.0,
    "longitude": 0.0
  }
  ```

  > **Note:** Some fields are required (`organization`, `country`, `leader`, `email`), and the latitude and longitude should be floating-point numbers.

- **Response**:

  - **Status:** `201 Created`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "Collaborator created successfully."
    }
    ```

    > **Note:** The newly created collaborator data will be returned in the response (`data` field).

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid organization.",
      "error": {
        "code": "INVALID_ORGANIZATION",
        "details": {}
      }
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid country.",
      "error": {
        "code": "INVALID_COUNTRY",
        "details": {}
      }
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid leader.",
      "error": {
        "code": "INVALID_LEADER",
        "details": {}
      }
    }
    ```

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
      "message": "Invalid website.",
      "error": {
        "code": "INVALID_WEBSITE",
        "details": {}
      }
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid coordinates.",
      "error": {
        "code": "INVALID_COORDINATES",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error creating collaborator.",
      "error": {
        "code": "CREATE_COLLABORATOR_ERROR",
        "details": {}
      }
    }
    ```

#### Update Collaborator

- **URL**: `/api/collaborators/:id`
- **Method**: `PUT`

- **Request Parameters**:

  - `id`: The ID of the collaborator to update.

- **Request Body**:

  ```json
  {
    "organization": "Collaborator Organization",
    "country": "Collaborator Country",
    "leader": "Collaborator Leader",
    "email": "collaborator@example.com",
    "website": "Collaborator Website",
    "latitude": 0.0,
    "longitude": 0.0
  }
  ```

  > **Note:** Some fields are required (`organization`, `country`, `leader`, `email`), and the latitude and longitude should be floating-point numbers.

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "Collaborator updated successfully."
    }
    ```

    > **Note:** The updated collaborator data will be returned in the response (`data` field).

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid organization.",
      "error": {
        "code": "INVALID_ORGANIZATION",
        "details": {}
      }
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid country.",
      "error": {
        "code": "INVALID_COUNTRY",
        "details": {}
      }
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid leader.",
      "error": {
        "code": "INVALID_LEADER",
        "details": {}
      }
    }
    ```

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
      "message": "Invalid website.",
      "error": {
        "code": "INVALID_WEBSITE",
        "details": {}
      }
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid coordinates.",
      "error": {
        "code": "INVALID_COORDINATES",
        "details": {}
      }
    }
    ```

  - **Status:** `404 Not Found`

    ```json
    {
      "status": "error",
      "message": "Collaborator not found.",
      "error": {
        "code": "COLLABORATOR_NOT_FOUND",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error updating collaborator.",
      "error": {
        "code": "UPDATE_COLLABORATOR_ERROR",
        "details": {}
      }
    }
    ```

#### Delete Collaborator

- **URL**: `/api/collaborators/:id`
- **Method**: `DELETE`

- **Request Parameters**:

  - `id`: The ID of the collaborator to delete.

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": null,
      "message": "Collaborator deleted successfully."
    }
    ```

  - **Status:** `404 Not Found`

    ```json
    {
      "status": "error",
      "message": "Collaborator not found.",
      "error": {
        "code": "COLLABORATOR_NOT_FOUND",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error deleting collaborator.",
      "error": {
        "code": "DELETE_COLLABORATOR_ERROR",
        "details": {}
      }
    }
    ```

#### Get About Collaborators

- **URL**: `/api/collaborators/about`
- **Method**: `GET`

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "About information retrieved successfully."
    }
    ```

    > **Note:** The about information will be returned in the response (`data` field).

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error getting about information.",
      "error": {
        "code": "GET_ABOUT_ERROR",
        "details": {}
      }
    }
    ```

#### Update About Collaborators

- **URL**: `/api/collaborators/about`
- **Method**: `PUT`

- **Request Body**:

  ```json
  {
    "about": {}
  }
  ```

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "About information updated successfully."
    }
    ```

    > **Note:** The updated about information will be returned in the response (`data` field).

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid about data.",
      "error": {
        "code": "INVALID_ABOUT",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error updating about information.",
      "error": {
        "code": "UPDATE_ABOUT_ERROR",
        "details": {}
      }
    }
    ```

### Research Endpoints

> **Note:** The following `PUT` endpoints are protected and require a valid JWT token to access.

#### Get Research Areas

- **URL**: `/api/research`
- **Method**: `GET`

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "Research areas retrieved successfully."
    }
    ```

    > **Note:** The research areas will be returned in the response (`data` field). Will not include details for each area.

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error getting research areas.",
      "error": {
        "code": "GET_RESEARCH_ERROR",
        "details": {}
      }
    }
    ```

#### Get Research Area Details

- **URL**: `/api/research/:id`
- **Method**: `GET`

- **Request Parameters**:

  - `id`: The ID of the research area to retrieve.

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "Research area details retrieved successfully."
    }
    ```

    > **Note:** The research area details will be returned in the response (`data` field).

  - **Status:** `404 Not Found`

    ```json
    {
      "status": "error",
      "message": "Research area not found.",
      "error": {
        "code": "RESEARCH_AREA_NOT_FOUND",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error getting research area details.",
      "error": {
        "code": "GET_RESEARCH_AREA_DETAILS_ERROR",
        "details": {}
      }
    }
    ```

#### Get Research About

- **URL**: `/api/research/about`
- **Method**: `GET`

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "Research about information retrieved successfully."
    }
    ```

    > **Note:** The research about information will be returned in the response (`data` field).

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error getting research about information.",
      "error": {
        "code": "GET_RESEARCH_ABOUT_ERROR",
        "details": {}
      }
    }
    ```

#### Update Research Areas (JSON Patch)

> **Note:** JSON Patch is a format for expressing a sequence of operations to apply to a JSON document, and is defined in [RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902).

- **URL**: `/api/research`
- **Method**: `PATCH`

- **Request Body**:

  ```json
  {
    "areas": {}
  }
  ```

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": null,
      "message": "Research areas updated successfully."
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid research areas.",
      "error": {
        "code": "INVALID_AREAS",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error updating research areas.",
      "error": {
        "code": "UPDATE_RESEARCH_AREAS_ERROR",
        "details": {}
      }
    }
    ```

#### Update Research About

- **URL**: `/api/research/about`
- **Method**: `PUT`

- **Request Body**:

  ```json
  {
    "about": {}
  }
  ```

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "Research about information updated successfully."
    }
    ```

    > **Note:** The updated research about information will be returned in the response (`data` field).

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid research about information.",
      "error": {
        "code": "INVALID_ABOUT",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error updating research about information.",
      "error": {
        "code": "UPDATE_RESEARCH_ABOUT_ERROR",
        "details": {}
      }
    }
    ```

### Publications Endpoints

> **Note:** The following `POST`, and `GET /api/publications/crawl-status` endpoints are protected and require a valid JWT token to access.

#### Get All Publications

- **URL**: `/api/publications`
- **Method**: `GET`

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": [],
      "message": "Publications retrieved successfully."
    }
    ```

    > **Note:** The list of publications will be returned in the response (`data` field).

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error getting publications.",
      "error": {
        "code": "GET_PUBLICATIONS_ERROR",
        "details": {}
      }
    }
    ```

#### Get Crawl Status

- **URL**: `/api/publications/crawl-status`
- **Method**: `GET`

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "Crawl status retrieved successfully."
    }
    ```

    > **Note:** The crawl status will be returned in the response (`data` field).

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error getting crawl status.",
      "error": {
        "code": "GET_CRAWL_STATUS_ERROR",
        "details": {}
      }
    }
    ```

#### Request Re-Crawl

- **URL**: `/api/publications/re-crawl`
- **Method**: `POST`

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": null,
      "message": "Crawling publications..."
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Crawl already in progress.",
      "error": {
        "code": "CRAWL_IN_PROGRESS",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error requesting re-crawl.",
      "error": {
        "code": "RE_CRAWL_ERROR",
        "details": {}
      }
    }
    ```

### Events Endpoints

> **Note:** The following `POST`, and `DELETE` endpoints are protected and require a valid JWT token to access.

#### Get Group Photo IDs

- **URL**: `/api/events/group-photos`
- **Method**: `GET`

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": [],
      "message": "Group photo IDs retrieved successfully."
    }
    ```

    > **Note:** The list of group photo IDs will be returned in the response (`data` field).

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error getting group photo IDs.",
      "error": {
        "code": "GET_GROUP_PHOTO_IDS_ERROR",
        "details": {}
      }
    }
    ```

#### Get Group Photo by ID

- **URL**: `/api/events/group-photos/:id`
- **Method**: `GET`

- **Request Parameters**:

  - `id`: The ID of the group photo to retrieve.

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "Group photo retrieved successfully."
    }
    ```

    > **Note:** The group photo data will be returned in the response (`data` field).

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid ID.",
      "error": {
        "code": "INVALID_ID",
        "details": {}
      }
    }
    ```

  - **Status:** `404 Not Found`

    ```json
    {
      "status": "error",
      "message": "Group photo not found.",
      "error": {
        "code": "GROUP_PHOTO_NOT_FOUND",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error getting group photo by ID.",
      "error": {
        "code": "GET_GROUP_PHOTO_BY_ID_ERROR",
        "details": {}
      }
    }
    ```

#### Add Group Photo

- **URL**: `/api/events/group-photos`
- **Method**: `POST`

- **Request Body**:

  ```json
  {
    "photo": "BASE64_ENCODED_PHOTO",
    "date": "YYYY-MM-DD",
    "description": "photo_description"
  }
  ```

- **Response**:

  - **Status:** `201 Created`

    ```json
    {
      "status": "success",
      "data": {},
      "message": "Group photo added successfully."
    }
    ```

    > **Note:** The newly created group photo id will be returned in the response (`data` field).

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid photo.",
      "error": {
        "code": "INVALID_PHOTO",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error adding group photo.",
      "error": {
        "code": "ADD_GROUP_PHOTO_ERROR",
        "details": {}
      }
    }
    ```

#### Update Group Photo Description

- **URL**: `/api/events/group-photos/:id/description`
- **Method**: `PUT`

- **Request Parameters**:

  - `id`: The ID of the group photo to update.

- **Request Body**:

  ```json
  {
    "description": "photo_description"
  }
  ```

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": null,
      "message": "Group photo description updated successfully."
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid ID.",
      "error": {
        "code": "INVALID_ID",
        "details": {}
      }
    }
    ```

  - **Status:** `404 Not Found`

    ```json
    {
      "status": "error",
      "message": "Group photo not found.",
      "error": {
        "code": "GROUP_PHOTO_NOT_FOUND",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error updating group photo description.",
      "error": {
        "code": "UPDATE_GROUP_PHOTO_DESCRIPTION_ERROR",
        "details": {}
      }
    }
    ```

#### Update Group Photo Date

- **URL**: `/api/events/group-photos/:id/date`
- **Method**: `PUT`

- **Request Parameters**:

  - `id`: The ID of the group photo to update.

- **Request Body**:

  ```json
  {
    "date": "YYYY-MM-DD"
  }
  ```

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": null,
      "message": "Group photo date updated successfully."
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid ID.",
      "error": {
        "code": "INVALID_ID",
        "details": {}
      }
    }
    ```

  - **Status:** `404 Not Found`

    ```json
    {
      "status": "error",
      "message": "Group photo not found.",
      "error": {
        "code": "GROUP_PHOTO_NOT_FOUND",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error updating group photo date.",
      "error": {
        "code": "UPDATE_GROUP_PHOTO_DATE_ERROR",
        "details": {}
      }
    }
    ```

#### Remove Group Photo

- **URL**: `/api/events/group-photos/:id`
- **Method**: `DELETE`

- **Request Parameters**:

  - `id`: The ID of the group photo to delete.

- **Response**:

  - **Status:** `200 OK`

    ```json
    {
      "status": "success",
      "data": null,
      "message": "Group photo deleted successfully."
    }
    ```

  - **Status:** `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Invalid ID.",
      "error": {
        "code": "INVALID_ID",
        "details": {}
      }
    }
    ```

  - **Status:** `404 Not Found`

    ```json
    {
      "status": "error",
      "message": "Group photo not found.",
      "error": {
        "code": "GROUP_PHOTO_NOT_FOUND",
        "details": {}
      }
    }
    ```

  - **Status:** `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error deleting group photo.",
      "error": {
        "code": "DELETE_GROUP_PHOTO_ERROR",
        "details": {}
      }
    }
    ```
