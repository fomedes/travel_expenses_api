import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../schemas/user.js';


const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the database to find the user by their email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({ error: `Authentication failed: wrong password entered` });
    }

    // Generate an access token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Set the token in a cookie
    res.cookie('access_token', token, { httpOnly: true, maxAge: 3600000 }); // Max age in milliseconds
    res.json({ userId: user.id });

    // Respond with the userId and access token
  } catch (error) {
    console.error('Authentication Error:', error);
    res.status(500).json({ error: 'Error during authentication' });
  }
});

export default router;
