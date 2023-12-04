import bcrypt from 'bcrypt';
import express from 'express';
import User from '../schemas/user.js';


const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, username, email, passwordHash } = req.body;
    const hashedPassword = await bcrypt.hash(passwordHash, 10);

    const user = new User({
      name,
      username,
      email,
      passwordHash: hashedPassword,
    });
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


export default router;
