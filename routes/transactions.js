import express from 'express';
import Transaction from '../schemas/transactions.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/find/:transactionId', async (req, res) => {
  try {
    const transactionId = req.params.transactionId;
    // Query the database to find the transaction by their id
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving transaction data' });
  }
});

router.get('/find/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all transactions for the given user
    const transactions = await Transaction.find({ user: userId });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
