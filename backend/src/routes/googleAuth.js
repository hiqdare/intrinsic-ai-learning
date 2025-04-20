const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   GET api/auth/google
// @desc    Authenticate with Google
// @access  Public
router.get('/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    hostedDomain: 'yiagency.ch' // Restrict to yiagency.ch domain
  })
);

// @route   GET api/auth/google/callback
// @desc    Google auth callback
// @access  Public
router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login',
    session: false 
  }),
  (req, res) => {
    // Create JWT token
    const payload = {
      user: {
        id: req.user.id,
        role: req.user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'jwtSecret',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        
        // Redirect to frontend with token
        res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth-callback?token=${token}`);
      }
    );
  }
);

// @route   GET api/auth/verify-domain
// @desc    Verify if email domain is allowed
// @access  Public
router.post('/verify-domain', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'E-Mail ist erforderlich'
      });
    }
    
    // Check if email ends with @yiagency.ch
    const isAllowed = email.endsWith('@yiagency.ch');
    
    res.json({
      success: true,
      isAllowed,
      message: isAllowed 
        ? 'Domain ist zugelassen' 
        : 'Nur E-Mails mit der Domain yiagency.ch sind zugelassen'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

module.exports = router;
