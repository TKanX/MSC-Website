/**
 * @fileoverview Auth Controllers
 * @description Controllers for user authentication.
 */

const adminService = require('../services/adminService');

const jwtUtils = require('../utils/jwtUtils');
const validationUtils = require('../utils/validationUtils');

/**
 * @function loginAdmin - Login an admin.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Check if the email is valid
  if (!validationUtils.validateEmail(email)) {
    return res.badRequest('Invalid email address.', 'INVALID_EMAIL');
  }

  // Check if the password is valid
  if (!validationUtils.validatePassword(password)) {
    return res.badRequest('Invalid password.', 'INVALID_PASSWORD');
  }

  // Login the admin
  try {
    const admin = await adminService.loginAdmin(email, password);
    const secret = await adminService.getRefreshTokenSecret(
      admin.id,
      process.env.JWT_SECRET,
    );

    return res.success(
      {
        admin,
        refreshToken: jwtUtils.generateToken(
          {
            id: admin.id,
          },
          secret,
          '30d',
        ),
        accessToken: jwtUtils.generateToken(
          {
            id: admin.id,
          },
          process.env.JWT_SECRET,
          '15m',
        ),
      },
      'Admin logged in successfully.',
    );
  } catch (error) {
    if (error.message === 'Admin not found') {
      return res.notFound('Admin not found.', 'ADMIN_NOT_FOUND');
    }
    if (error.message === 'Invalid password') {
      return res.unauthorized('Invalid password.', 'INVALID_PASSWORD');
    }
    return res.internalServerError('Error logging in admin.', 'LOGIN_ERROR');
  }
};

/**
 * @function loginAdminOAuth - Login an admin using OAuth.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const loginAdminOAuth = async (req, res) => {
  const { token } = req.body;

  // Check if the token is valid
  if (!token) {
    return res.badRequest('Invalid token.', 'INVALID_TOKEN');
  }

  // Verify the token
  try {
    const payload = await jwtUtils.verifyGoogleToken(token);
    const admin = await adminService.getAdminByEmail(payload.email);
    if (!admin) {
      return res.notFound('Admin not found.', 'ADMIN_NOT_FOUND');
    }

    const secret = await adminService.getRefreshTokenSecret(
      admin.id,
      process.env.JWT_SECRET,
    );

    return res.success(
      {
        admin,
        refreshToken: jwtUtils.generateToken(
          {
            id: admin.id,
          },
          secret,
          '30d',
        ),
        accessToken: jwtUtils.generateToken(
          {
            id: admin.id,
          },
          process.env.JWT_SECRET,
          '15m',
        ),
      },
      'Admin logged in successfully.',
    );
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.unauthorized('Token expired.', 'TOKEN_EXPIRED');
    }
    if (error.name === 'JsonWebTokenError') {
      return res.badRequest('Invalid token.', 'INVALID_TOKEN');
    }
    return res.internalServerError('Error logging in admin.', 'LOGIN_ERROR');
  }
};

/**
 * @function refreshToken - Handle refresh token request.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const refreshToken = async (req, res) => {
  const { refreshToken: refreshTokenBody } = req.body;

  // Check if the refresh token is valid
  if (!refreshTokenBody) {
    return res.badRequest('Invalid refresh token.', 'INVALID_REFRESH_TOKEN');
  }

  // Verify the refresh token
  try {
    const id = jwtUtils.decodeToken(refreshTokenBody).id;
    const secret = await adminService.getRefreshTokenSecret(
      id,
      process.env.JWT_SECRET,
    );
    jwtUtils.verifyToken(refreshTokenBody, secret);

    // Generate a new access token
    const accessToken = jwtUtils.generateToken(
      { id },
      process.env.JWT_SECRET,
      '15m',
    );
    return res.success({ accessToken }, 'Access token refreshed successfully.');
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.unauthorized('Token expired.', 'TOKEN_EXPIRED');
    }
    if (error.name === 'JsonWebTokenError') {
      return res.badRequest('Invalid refresh token.', 'INVALID_REFRESH_TOKEN');
    }
    return res.internalServerError(
      'Error refreshing token.',
      'REFRESH_TOKEN_ERROR',
    );
  }
};

module.exports = {
  loginAdmin,
  loginAdminOAuth,
  refreshToken,
};
