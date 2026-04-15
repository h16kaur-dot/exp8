const router = require('express').Router();
const { protect, requireRole } = require('../middleware/auth');
const User = require('../models/User');

// Any authenticated user
router.get('/dashboard', protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}`, role: req.user.role });
});

// Admin only
router.get('/admin', protect, requireRole('admin'), async (req, res) => {
  const users = await User.find({}, 'username role');
  res.json({ users });
});

module.exports = router;
