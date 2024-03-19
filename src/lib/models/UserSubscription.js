import { Schema, model, models } from "mongoose";

const SubscriptionSchema = new Schema(
   { 
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
  },
  stripeCustomerId: {
    type: String,
    unique: true,
    sparse: true,
    map: 'stripe_customer_id'
  },
  stripeSubscriptionId: {
    type: String,
    unique: true,
    sparse: true,
    map: 'stripe_subscription_id'
  },
  stripePriceId: {
    type: String,
    sparse: true,
    map: 'stripe_price_id'
  },
  stripeCurrentPeriodEnd: {
    type: Date,
    sparse: true,
    map: 'stripe_current_period_end'
  }
}
);

const UserSubscription = models.UserSubscription || model("UserSubscription", SubscriptionSchema)

export default UserSubscription