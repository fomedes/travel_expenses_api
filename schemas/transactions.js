import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  plan_id: {
    type: Schema.Types.ObjectId,
    ref: 'Plan'
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  country: String,
  currency: String,
  currencySymbol: String,
  amount: Number,
  accountCurrencyAmount: Number,
  split: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

transactionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Transaction = model('Transaction', transactionSchema)

export default Transaction
