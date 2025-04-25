import passport, { serializeUser, deserializeUser, use } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';
import { clientID as _clientID, clientSecret as _clientSecret, callbackURL as _callbackURL, scope as _scope, hostedDomain as _hostedDomain, validateDomain } from '../config/googleOAuth';
require('dotenv').config();


// Serialize user for session
serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Configure Google Strategy
use(new GoogleStrategy({
  clientID: _clientID,
  clientSecret: _clientSecret,
  callbackURL: _callbackURL,
  scope: _scope,
  hostedDomain: _hostedDomain
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Extract email from profile
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
    
    // Validate email domain
    if (!email || !validateDomain(email)) {
      return done(null, false, { message: 'Nur E-Mails mit der Domain yiagency.ch sind zugelassen.' });
    }
    
    // Check if user exists
    let user = await User.findOne({ email });
    
    if (user) {
      // Update user information if needed
      user.lastActivity = Date.now();
      if (!user.avatar && profile.photos && profile.photos[0]) {
        user.avatar = profile.photos[0].value;
      }
      await user.save();
      return done(null, user);
    }
    
    // Create new user
    const newUser = new User({
      name: profile.displayName,
      email: email,
      // No password needed for OAuth users
      password: 'google-oauth-' + Math.random().toString(36).substring(2),
      role: 'student', // Default role
      avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
      lastActivity: Date.now()
    });
    
    await newUser.save();
    return done(null, newUser);
  } catch (err) {
    return done(err, null);
  }
}));

export default passport;
