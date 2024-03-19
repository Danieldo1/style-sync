
import {NextResponse,NextRequest } from 'next/server'
import Stripe from 'stripe'
import User from '@/lib/models/User'
import UserSubscription from '@/lib/models/UserSubscription'
import connectDB from '@/lib/connectDB'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
})

export async function GET(req) {
 try{
    await connectDB();
    const userEmail = req.nextUrl.searchParams.get("email");
 
 const userInfo = await User.findOne({email: userEmail});
 const userId = userInfo._id;
 if(!userInfo || !userId){
     return new NextResponse("Unauthorized", { status: 401 });
 }
 const subscription = await UserSubscription.findOne({userId: userId});

 if(subscription && subscription.stripeSubscriptionId){
 const stripeSubscription =  await stripe.billingPortal.sessions.create({
     customer: subscription.stripeCustomerId || "",
     return_url: `${process.env.NEXTAUTH_URL}/dashboard`,
 })
 return new NextResponse(JSON.stringify({ url: stripeSubscription.url }), {
     status: 200,
 })
}
// TODO chnage dashboard route
const stripeSession = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  mode: "subscription",
  success_url: `${process.env.NEXTAUTH_URL}/success`,
  cancel_url: `${process.env.NEXTAUTH_URL}/dashboard`,
  billing_address_collection: "auto",
  customer_email: userEmail,
  line_items: [
    {
      price_data: {
        currency: "USD",
        product_data: {
          name: "StyleSyncPro Membership",
          description:
            "Subscription to StyleSyncPro, get unlimited access to all features",
        },
        unit_amount: 1000,
        recurring: {
          interval: "month",
        },
      },
      quantity: 1,
    },
  ],
  metadata: {
    userId: userId.toString(),
  },
});
return new NextResponse(JSON.stringify({ url: stripeSession.url }), {
  status: 200,
});
 } catch (error) {
     console.log(error);
     return new NextResponse("Internal Server Error", { status: 500 });
 }



}