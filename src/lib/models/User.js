import {Schema,model, models} from 'mongoose'

const ItemSchema = new Schema(
  {
    category: { type: String, required: true },
    colors: { type: [String], required: true },
    pattern: String,
    photoUrl: { type: String, required: true },
  },
  { _id: false } 
);
const UserSchema = new Schema(
  {
    email: String,
    name: String,
    items: [ItemSchema],
  },
  {
    timestamps: true,
  }
);

export default models.User || model('User',UserSchema)