/**
 * @fileoverview Validation Utils
 * @description Utility functions for validation.
 */

const MAX_EMAIL_LENGTH = 254; // The maximum length of an email address

const LATITUDE_MIN = -90; // The minimum latitude value
const LATITUDE_MAX = 90; // The maximum latitude value
const LONGITUDE_MIN = -180; // The minimum longitude value
const LONGITUDE_MAX = 180; // The maximum longitude value

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Check if the email is valid (contains an @ symbol and a period)
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[^\s]{8,}$/; // Check if the password is valid (at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character)
const URL_REGEX = /^​(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/; // Check if the URL is valid (starts with http or https)
const BASE64_IMAGE_REGEX = /^data:image\/[a-z]+;base64,/; // Check if the image is valid (starts with data:image)

/**
 * @function validateEmail - Validate an email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
const validateEmail = (email) => {
  if (!email) {
    // Check if the email is empty
    return false;
  } else if (email.length > MAX_EMAIL_LENGTH) {
    // Check if the email is too long
    return false;
  } else {
    // Check if the email matches the regex pattern
    return EMAIL_REGEX.test(email);
  }
};

/**
 * @function validatePassword - Validate a password.
 * @param {string} password - The password to validate.
 * @returns {boolean} - True if the password is valid, false otherwise.
 */
const validatePassword = (password) => {
  if (!password) {
    // Check if the password is empty
    return false;
  } else {
    // Check if the password matches the regex pattern
    return PASSWORD_REGEX.test(password);
  }
};

/**
 * @function validateURL - Validate a URL.
 * @param {string} url - The URL to validate.
 * @returns {boolean} - True if the URL is valid, false otherwise.
 */
const validateURL = (url) => {
  if (!url) {
    // Check if the URL is empty
    return false;
  } else {
    // Check if the URL matches the regex pattern
    return URL_REGEX.test(url);
  }
};

/**
 * @function validateCoordinates - Validate latitude and longitude coordinates.
 * @param {number} latitude - The latitude coordinate to validate.
 * @param {number} longitude - The longitude coordinate to validate.
 * @returns {boolean} - True if the coordinates are valid, false otherwise.
 */
const validateCoordinates = (latitude, longitude) => {
  if (latitude === undefined || longitude === undefined) {
    // Check if the coordinates are undefined
    return false;
  } else if (latitude < LATITUDE_MIN || latitude > LATITUDE_MAX) {
    // Check if the latitude is out of range
    return false;
  } else if (longitude < LONGITUDE_MIN || longitude > LONGITUDE_MAX) {
    // Check if the longitude is out of range
    return false;
  } else {
    // The coordinates are valid
    return true;
  }
};

/**
 * @function validateBase64Image - Validate a base64 image.
 * @param {string} image - The base64 image to validate.
 * @returns {boolean} - True if the image is valid, false otherwise.
 */
const validateBase64Image = (image) => {
  if (!image) {
    // Check if the image is empty
    return false;
  } else {
    // Check if the image matches the regex pattern
    return BASE64_IMAGE_REGEX.test(image);
  }
};

module.exports = {
  validateEmail,
  validatePassword,
  validateURL,
  validateCoordinates,
  validateBase64Image,
};
