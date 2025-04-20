// Google OAuth Configuration for intrinsic.ai learning
// This file contains the configuration for Google OAuth with domain restriction

const googleOAuth = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.NODE_ENV === 'production' 
    ? 'https://api.intrinsic.yiagency.ch/api/auth/google/callback'
    : 'http://localhost:5000/api/auth/google/callback',
  scope: ['profile', 'email'],
  // Restrict to yiagency.ch domain
  hostedDomain: 'yiagency.ch',
  // Function to validate email domain
  validateDomain: (email) => {
    if (!email) return false;
    return email.endsWith('@yiagency.ch');
  }
};

module.exports = googleOAuth;
