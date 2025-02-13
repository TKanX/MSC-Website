/**
 * @fileoverview Admin Routes
 * @description Routes for admin management.
 */

const express = require('express');
const router = express.Router();

const rateLimiter = require('../utils/rateLimiter');

const adminControllers = require('../controllers/adminControllers');

router.use(rateLimiter());

router.get('/', adminControllers.getAdmins);

router.post('/', adminControllers.createAdmin);

router.put('/:id/email', adminControllers.updateAdminEmail);
router.put('/:id/password', adminControllers.updateAdminPassword);

router.delete('/:id', adminControllers.deleteAdmin);

module.exports = router;
