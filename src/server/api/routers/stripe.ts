import {createTRPCRouter, protectedProcedure,} from "~/server/api/trpc";
import {Stripe} from "stripe";
import {env} from "~/env.mjs";

const stripe = new Stripe(env.STRIPE_SECRET_KEY as string, {} as Stripe.StripeConfig);

export const stripeRouter = createTRPCRouter({
  createPaymentIntent: protectedProcedure.query(async ({ctx: {auth, db}}) => {
    // const session = await stripe.checkout.sessions.create({
    //   mode: 'payment',
    //   payment_method_types: ['card'],
    //   line_items: [{
    //     price: "price_1NE9d2LhRJsx7HKWhBh87gvU",
    //     quantity: 20
    //   }, {
    //     price: "price_1NE9cnLhRJsx7HKWuJ88Osps",
    //     quantity: 20
    //   }
    //   ],
    //   success_url: `http://localhost:3000`,
    //   cancel_url: `http://localhost:3000`,
    // })
    // console.log(session)
    return;
  }),
});
