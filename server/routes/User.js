const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for hashing
const jwt = require('jsonwebtoken'); // Import the JWT library
const nodemailer = require('nodemailer'); // For sending reset emails
const { v4: uuidv4 } = require('uuid');


// User signup
router.post('/signup', [
  body('email').isEmail().withMessage('Invalid Email Address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  // Add other validation rules for name, passwordConfirm, phoneNumber, etc. here if needed
], async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errorMessages = validationErrors.array().map(error => error.msg);
    return res.status(400).json({ error: errorMessages });
  }

  const {
    name,
    email,
    password,
    passwordConfirm,
    phoneNumber,
  } = req.body;

  if (!name || !email || !password || !passwordConfirm || !phoneNumber) {
    return res.status(400).json({ error: 'All required fields must be provided for signup.' });
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({ error: 'Passwords do not match. Please try again.' });
  }

  // Hash the password
  bcrypt.hash(password, saltRounds, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error('Error hashing the password:', hashErr);
      return res.status(500).json({ error: 'An error occurred while creating the user.' });
    }

    const createUserSQL = `
      INSERT INTO User (
        name, email, password, passwordConfirm, avatarUrl,
        phoneNumber, passwordChangedAt, passwordResetToken, passwordResetExpires
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const defaultAvatarUrl = 'https://via.placeholder.com/150'; // Replace with your default URL

    const values = [
      name,
      email,
      hashedPassword, // Use the hashed password here
      hashedPassword,
      defaultAvatarUrl,
      phoneNumber,
      null,
      null,
      null,
    ];

    db.query(createUserSQL, values, (err, results) => {
      if (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
      } else {
        res.json({ id: results.insertId });
      }
    });
  });
});


// User login
router.post('/login', [
  body('email').isEmail().withMessage('Invalid Email Address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errorMessages = validationErrors.array().map(error => error.msg);
    return res.status(400).json({ error: errorMessages });
  }

  const { email, password } = req.body;

  // Retrieve the user's data from the database based on their email
  const findUserSQL = 'SELECT id, email, password, active FROM User WHERE email = ?';
  db.query(findUserSQL, [email], async (err, results) => {
    if (err) {
      console.error('Error finding user:', err);
      return res.status(500).json({ error: 'An error occurred during login.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found. Please check your credentials.' });
    }

    const user = results[0];

    if (!user.active) {
      return res.status(401).json({ error: 'User account is not active.' });
    }

    // Compare the provided password with the stored hashed password
    bcrypt.compare(password, user.password, (compareErr, isMatch) => {
      if (compareErr) {
        console.error('Error comparing passwords:', compareErr);
        return res.status(500).json({ error: 'An error occurred during login.' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid password. Please check your credentials.' });
      }

      // Generate a JWT token for the user
      const token = jwt.sign({ userId: user.id }, 'fef3074c02924421d70c917bac709d9a6d5b5de57eeb87c74e40d33c80e902e7', { expiresIn: '1h' });

      res.json({ token });
    });
  });
});


// Logout route
router.post('/logout', (req, res) => {
  // Get the token from the request (you may need to adapt this to your specific implementation)
  const token = req.headers.authorization.split(' ')[1];

  // Check if the token is already in the TokenBlacklist table
  const checkTokenSQL = 'SELECT COUNT(*) as count FROM TokenBlacklist WHERE token = ?';
  db.query(checkTokenSQL, [token], (err, results) => {
    if (err) {
      console.error('Error checking token:', err);
      return res.status(500).json({ error: 'An error occurred during logout.' });
    }

    if (results[0].count > 0) {
      return res.status(401).json({ error: 'Token is already invalidated. User is logged out.' });
    }

    // If the token is not in the TokenBlacklist, add it
    const addToBlacklistSQL = 'INSERT INTO TokenBlacklist (token) VALUES (?)';
    db.query(addToBlacklistSQL, [token], (err) => {
      if (err) {
        console.error('Error adding token to blacklist:', err);
        return res.status(500).json({ error: 'An error occurred during logout.' });
      }

      // Respond with a success message indicating the user has logged out
      res.json({ message: 'Logout successful' });
    });
  });
});

// Request a password reset
router.post('/request-password-reset', async (req, res) => {
  const { email } = req.body;

  // Check if the email exists in the User table 
  const findUserSQL = 'SELECT id, name, email FROM User WHERE email = ?';
  db.query(findUserSQL, [email], (err, results) => {
    if (err) {
      console.error('Error finding user:', err);
      return res.status(500).json({ error: 'An error occurred during the password reset request.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found. Please check your email address.' });
    }

    const user = results[0];

    // Generate a unique reset token (you should create a function for this)
    const resetToken = uuidv4()

    // Store the reset token and expiration timestamp in the User table
    const updateResetTokenSQL = 'UPDATE User SET passwordResetToken = ?, passwordResetExpires = ? WHERE email = ?';
    const resetTokenExpiration = new Date();
    resetTokenExpiration.setHours(resetTokenExpiration.getHours() + 1); // Set the expiration to 1 hour from now
    db.query(updateResetTokenSQL, [resetToken, resetTokenExpiration, email], (err) => {
      if (err) {
        console.error('Error updating reset token:', err);
        return res.status(500).json({ error: 'An error occurred during the password reset request.' });
      }

      // Send an email to the user with a link to reset their password
      sendPasswordResetEmail(user, resetToken);

      res.json({ message: 'Password reset email sent.' });
    });
  });
});


// Function to send a password reset email (you should configure this with your email service)
function sendPasswordResetEmail(user, resetToken) {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f64f4adb7f07aa",
      pass: "ebc85fc0648d0e"
    }
  });

  const mailOptions = {
    from: 'FoodDelivery@YourService.com',
    to: user.email,
    subject: 'Password Reset Request',
    text: `You have requested a password reset. Please click the following link to reset your password: https://yourapp.com/user/reset-password/${resetToken}`,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending password reset email:', error);
    } else {
      console.log('Password reset email sent:', info.response);
    }
  });
}


// Reset user's password
router.post('/reset-password', async (req, res) => {
  const { resetToken, newPassword } = req.body;

  // Check if the reset token is valid and not expired
  const findUserSQL = 'SELECT id, email, passwordResetToken, passwordResetExpires FROM User WHERE passwordResetToken = ? AND passwordResetExpires > NOW()';
  db.query(findUserSQL, [resetToken], (err, results) => {
    if (err) {
      console.error('Error checking reset token:', err);
      return res.status(500).json({ error: 'An error occurred during the password reset process.' });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired reset token.' });
    }

    const user = results[0];

    // Hash the new password before updating it in the database
    bcrypt.hash(newPassword, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.error('Error hashing the password:', hashErr);
        return res.status(500).json({ error: 'An error occurred during the password reset process.' });
      }

      // Update the user's password in the User table
      const updatePasswordSQL = 'UPDATE User SET password = ?, passwordResetToken = NULL, passwordResetExpires = NULL WHERE email = ?';
      db.query(updatePasswordSQL, [hashedPassword, user.email], (updateErr) => {
        if (updateErr) {
          console.error('Error updating password:', updateErr);
          return res.status(500).json({ error: 'An error occurred during the password reset process.' });
        }

        // Respond with a success message
        res.json({ message: 'Password reset successful' });
      });
    });
  });
});



module.exports = router;
