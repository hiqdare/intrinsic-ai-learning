import { Router } from 'express';
const router = Router();
import { sign } from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import User, { findOne } from '../models/User';

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', [
  check('name', 'Name ist erforderlich').not().isEmpty(),
  check('email', 'Bitte geben Sie eine gültige E-Mail-Adresse ein').isEmail(),
  check('password', 'Bitte geben Sie ein Passwort mit mindestens 6 Zeichen ein').isLength({ min: 6 }),
  check('email').custom(value => {
    // Check if email ends with @yiagency.ch
    if (!value.endsWith('@yiagency.ch')) {
      throw new Error('Nur E-Mails mit der Domain yiagency.ch sind zugelassen');
    }
    return true;
  })
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }

  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    let user = await findOne({ email });
    if (user) {
      return res.status(400).json({ 
        success: false,
        message: 'Benutzer existiert bereits' 
      });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      role: role || 'student'
    });

    // Save user to database
    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    // Sign token
    sign(
      payload,
      process.env.JWT_SECRET || 'jwtSecret',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', [
  check('email', 'Bitte geben Sie eine gültige E-Mail-Adresse ein').isEmail(),
  check('password', 'Passwort ist erforderlich').exists()
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }

  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: 'Ungültige Anmeldeinformationen' 
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        message: 'Ungültige Anmeldeinformationen' 
      });
    }

    // Update last activity
    user.lastActivity = Date.now();
    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    // Sign token
    sign(
      payload,
      process.env.JWT_SECRET || 'jwtSecret',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

export default router;
