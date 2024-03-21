import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  email:{
    type: String,
    unique: true
  },
  password: String,
  transactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Transaction'
  }],
  country: String,
  defaultCurrency: {
      name: {
        type: String,
      },
      code: {
        type: String,
        uppercase: true,
      },
 },
  lastCountry: String,
  lastCurrency: String,
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id

    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.password
  }
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

export default User