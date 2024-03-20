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
    items: [ItemSchema],
   count:{
    type:Number,
    default:22
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

export default models.User || model('User',UserSchema)