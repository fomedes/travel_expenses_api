import express from 'express';
import Transaction from '../schemas/transactions.js';
import auth from './auth.js';

const router = express.Router();

router.use(auth);

router.post('/create', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const transaction = new Transaction({
      ...req.body
    });    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/find/:transaction_id', async (req, res) => {
  try {
    const transaction_id = req.params.transaction_id;
    // Query the database to find the transaction by their id
    const transaction = await Transaction.findById(transaction_id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving transaction data' });
  }
});

router.get('/find/user/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const transactions = await Transaction.find({ user_id: user_id });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/find/plan/:plan_id', async (req, res) => {
  try {
    const plan_id = req.params.plan_id;

    const transactions = await Transaction.find({ plan_id: plan_id });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/update/:transaction_id', async (req, res) => {
  try {
    const transaction_id = req.params.transaction_id;
    
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transaction_id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/delete/:transaction_id', async (req, res) => {
  try {
    const transaction_id = req.params.transaction_id;

    const transaction = await Transaction.findByIdAndDelete(transaction_id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
