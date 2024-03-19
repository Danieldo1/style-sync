import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import User from "@/lib/models/User";
import UserSubscription from "@/lib/models/UserSubscription";
import connectDB from "@/lib/connectDB";

export async function POST(req) {
  await connectDB();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2023-10-16",
  });
  const sig = req.headers.get("stripe-signature") || "";
  const signingSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET || "";

  // Read the request body as text
  const body = await req.text();
  // Convert the text to a buffer
 // const reqBuffer = Buffer.from(reqText);

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, signingSecret);
  } catch (err) {
    return new NextResponse(`Webhook Error: ${err.message}`, {
      status: 400,
    });
  }
const session = event.data.object;

if(event.type === "checkout.session.completed"){
    const subscription = await stripe.subscriptions.retrieve(session.subscription);
    if(!session?.metadata?.userId){
        return new NextResponse("Unauthorized no userId", { status: 401 });
    }
    await UserSubscription.create({
        userId: session.metadata.userId,
        stripeCustomerId: session.customer,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    })
}

if(event.type === "invoice.payment_succeeded"){
    const subscription = await stripe.subscriptions.retrieve(session.subscription);
    await UserSubscription.findOneAndUpdate(
        {stripeSubscriptionId: subscription.id},
        {
            $set: {
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                stripePriceId: subscription.items.data[0].price.id
            }
        }
    )
}

//   switch (event.type) {
//     case "customer.subscription.deleted":
//       subscription = event.data.object;
//       status = subscription.status;
//       console.log(`Subscription status is ${status}.`);
//       // Then define and call a method to handle the subscription deleted.
//       const handleSubscriptionDeleted = async (subscription) => {
//           const user = await User.findOne({ email: subscription.customer_email});
//           if (user) {
//               user.isPro = false;
//               user.subscribedOn = null;
//               user.subscriptionEnds = null;
//               await user.save();
//           } else {
//               console.log(`User with email ${subscription.customer_email} not found.`);
//           }
//       }
//       handleSubscriptionDeleted(subscription);
//       break;
//     case "customer.subscription.created":
//       subscription = event.data.object;
//       status = subscription.status;
//       console.log(`Subscription status is ${status}.`);
//       // Then define and call a method to handle the subscription created
//       const handleSubscriptionCreated = async (subscription) => {
//           const user = await User.findOne({ email: subscription.customer_email},{
//             $set: {
//                 isPro: true,
//                 subscribedOn: new Date(),
//                 subscriptionEnds: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//             },
//           })
//           await user.save();
//       }
//       handleSubscriptionCreated(subscription);
//       break;
//     case "customer.subscription.updated":
//       subscription = event.data.object;
//       status = subscription.status;
//       console.log(`Subscription status is ${status}.`);
//       // Then define and call a method to handle the subscription updated.
//       const handleSubscriptionUpdated = async (subscription) => {
//           const user = await User.findOne({ email: subscription.customer_email});
//           if (user) {
//             user.subscriptionEnds = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
//             await user.save();
//           } else {
//             console.log("User not found");
//           }
//         }
//          handleSubscriptionCreated(subscription);
//       break;
//     default:
//       // Unexpected event type
//       console.log(`Unhandled event type ${event.type}.`);
//   }

  return new NextResponse(null, { status: 200 });
}