import ErrorHandler from "../utils/error.handler.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import Subscription from "../models/subscription.model.js";
import User from "../models/user.model.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const subscriptionCreateStripe = async (req, res, next) => {
  try {
    const { planId, planAmount, planCurrency, planInterval, trialDays } =
      req.body;

    if (
      !planId ||
      !planAmount ||
      !planCurrency ||
      !planInterval ||
      !trialDays
    ) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: planCurrency,
            product_data: {
              name: planId,
            },
            unit_amount: planAmount,
            recurring: {
              interval: planInterval,
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: trialDays,
      },
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    const subscription = await Subscription.create({
      user: req.user._id,
      subscription_type: planId,
      stripe_price_id: session.id,
      trial_days: trialDays,
      amount: planAmount / 100,
      is_subscribed: true,
      subscription_status: "active",
      subscription_Interval: planInterval,
      subscription_start_date: new Date(),
      subscription_end_date: new Date(
        Date.now() +
          (planInterval === "month"
            ? 30 * 24 * 60 * 60 * 1000
            : planInterval === "year"
            ? 365 * 24 * 60 * 60 * 1000
            : 0)
      ),
      trial_end_date:
        trialDays > 0
          ? new Date(Date.now() + trialDays * 24 * 60 * 60 * 1000)
          : null,
    });

    await User.findByIdAndUpdate(req.user._id, {
      currentSubscription: subscription._id,
    });

    res.status(201).json({ url: session.url, subscription });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};

export default { subscriptionCreateStripe };
