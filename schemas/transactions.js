import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
  title: String,
  date: Date,
  category: String,
  amount: Number,
  currency: String,
  country: String,
  description: String,
  split: Boolean,
  user: {
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
