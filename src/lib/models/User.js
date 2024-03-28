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
   ref:{
    type:Schema.Types.ObjectId,
    ref:'Users'
   },
   password: String,
    items: [ItemSchema],
   count:{
    type:Number,
    default:0
   },
   subscribedOn: {type: Date, default: null},
   isPro:{
    type:Boolean,
    default:false
   },
   subscriptionEnds:{
    type:Date,
   }
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  if (this.subscribedOn && this.isModified("subscribedOn")) {
    this.subscriptionEnds = new Date(
      this.subscribedOn.getTime() + 30 * 24 * 60 * 60 * 1000
    );
  }
  next();
});
UserSchema.methods.canAddItem = function () {
  const itemLimit = this.isPro ? Infinity : 20;
  return this.count < itemLimit;
};

UserSchema.methods.addItem = async function () {
  if (this.canAddItem()) {
    this.count += 1;
    await this.save();
    return true;
  }
  return false;
};

UserSchema.methods.removeItem = async function () {
  this.count = Math.max(0, this.count - 1);
  await this.save();
};

export default models.User || model('User',UserSchema)