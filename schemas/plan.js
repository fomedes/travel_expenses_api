import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const planSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  description: String,
  picture: String,
  plan_id: {
    type: Schema.Types.ObjectId,
    ref: 'Plan'
  },
  parentPlan: {
    type: Schema.Types.ObjectId,
    ref: 'Plan',
  },
  childPlans: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Plan',
    },
  ],
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Transaction',
    },
  ],
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

});

planSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    if (document.populated('childPlans')) {
      returnedObject.childPlans = document.childPlans;
    }
    if (document.populated('parentPlan')) {
      returnedObject.parentPlan = document.parentPlan;
    }
  },
});

planSchema.plugin(uniqueValidator)

const Plan = model('Plan', planSchema)

export default Plan