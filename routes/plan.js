import express from 'express';
import Plan from '../schemas/plan.js';
import auth from './auth.js';


const router = express.Router();

router.use(auth);

router.post('/create', async (req, res) => {
  try {
    const plan = new Plan({
      ...req.body,
    });
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/find/:plan_id', async (req, res) => {
  try {
    const plan_id = req.params.plan_id;
    // Query the database to find the plan by their id
    const plan = await Plan.findById(plan_id);

    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving plan data' });
  }
});

router.get('/find/user/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;

    // Find all plans for the given user
    const plans = await Plan.find({ user_id: user_id });

    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/update/:plan_id', async (req, res) => {
  try {
    const plan_id = req.params.plan_id;
    
    const updatedPlan = await Plan.findByIdAndUpdate(
      plan_id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.json(updatedPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/delete/:plan_id', async (req, res) => {
  try {
    const plan_id = req.params.plan_id;

    const plan = await Plan.findByIdAndDelete(plan_id);

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;