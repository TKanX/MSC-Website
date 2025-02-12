/**
 * @fileoverview Routes Index
 * @description Index file for routes.
 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.render('pages/home');
});

router.get('/about', (req, res) => {
  return res.redirect('/about/wag');
});

router.get('/about/wag', (req, res) => {
  return res.render('pages/about-wag');
});

router.get('/about/msc', (req, res) => {
  return res.render('pages/about-msc');
});

router.get('/members', (req, res) => {
  return res.render('pages/members');
});

router.get('/collaborators', (req, res) => {
  return res.render('pages/collaborators');
});

router.get('/research', (req, res) => {
  return res.render('pages/research');
});

router.get('/publications', (req, res) => {
  return res.render('pages/publications');
});

router.get('/events/photos', (req, res) => {
  return res.render('pages/events-photos');
});

router.get('/events/calendar', (req, res) => {
  return res.render('pages/events-calendar');
});

router.get('/contact', (req, res) => {
  return res.render('pages/contact');
});

router.use('/admin', require('./admin'));

router.get('/404', (req, res) => {
  return res.render('pages/404', { path: req.query.path || '/' });
});

router.get('/403', (req, res) => {
  return res.render('pages/403', { path: req.query.path || '/' });
});

router.get('*', (req, res) => {
  return res.redirect(`/404?path=${req.path}`);
});

module.exports = router;
