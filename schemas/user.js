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
  passwordHash: String,
  transactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Transaction'
  }],
  defaultCurrency: String,
  lastCountry: String,
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id

    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

export default User