import express from 'express';
import User from '../schemas/user.js';


const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/find/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // Query the database to find the user by their id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user data' });
  }
});

router.get('/usernames', async (req, res) => {
  try {
    const usernames = await User.find({}, 'username');

    if (usernames.length === 0) {
      return res.status(404).json({ error: 'No usernames found' });
    }

    res.json(usernames);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving usernames' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the database to find the user by their email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Replace this with your actual password validation logic
    if (user.password !== password) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Generate an access token
    const token = Jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Set the token in a cookie
    res.cookie('access_token', token, { httpOnly: true, maxAge: 3600000 }); // Max age in milliseconds
    res.json({ userId: user.id });

    // Respond with the userId and access token
  } catch (error) {
    res.status(500).json({ error: 'Error during authentication' });
  }
});

export default router;
