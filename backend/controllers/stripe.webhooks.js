import Stripe from "stripe";
import dotenv from "dotenv";
import Subscription from "../models/subscription.model.js";
import User from "../models/user.model.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Find the corresponding subscription in the database
    const subscription = await Subscription.findOne({
      stripe_price_id: session.id,
    });

    if (subscription) {
      // Update the subscription status to "active" when payment is successful
      subscription.subscription_status = "active";
      subscription.subscription_start_date = new Date();
      subscription.subscription_end_date = new Date(
        Date.now() +
          (subscription.subscription_Interval === "month"
            ? 30 * 24 * 60 * 60 * 1000
            : subscription.subscription_Interval === "year"
            ? 365 * 24 * 60 * 60 * 1000
            : 0)
      );
      subscription.is_subscribed = true;

      await subscription.save();

      // Update the user record with the subscription ID
      await User.findByIdAndUpdate(subscription.user, {
        currentSubscription: subscription._id,
      });
    }
  }

  res.status(200).send("Success");
};
