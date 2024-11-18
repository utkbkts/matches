import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    is_subscribed: {
      type: Boolean,
      default: false,
    },
    stripe_price_id: {
      type: String,
      required: true,
    },
    subscription_Interval: {
      type: String,
      required: true,
    },
    subscription_start_date: {
      type: Date,
      default: new Date(),
    },
    subscription_end_date: {
      type: Date,
      default: null,
    },
    trial_days: {
      type: Number,
      default: 0,
    },
    subscription_status: {
      type: String,
      enum: ["active", "inactive", "canceled", "past_due"],
      default: "inactive",
    },
    trial_end_date: {
      type: Date,
      default: null,
    },
    amount: {
      type: Number,
      default: 0,
    },
    subscription_type: {
      type: String,
      enum: ["Gold", "Platinum"],
      required: true,
    },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
