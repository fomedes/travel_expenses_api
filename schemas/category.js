import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const categorySchema = new Schema({
  title: String ,
  icon: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

});

categorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

categorySchema.plugin(uniqueValidator)

const Category = model('Category', categorySchema)

export default Category