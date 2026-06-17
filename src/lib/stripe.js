import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  "seeker-pro": "price_1TjR1sQirFgl6Wvl6pet41uF",
  "seeker-elite": "price_1TjR32QirFgl6WvlZP73MMLp",
  "recruiter-growth": "price_1TjR3hQirFgl6WvlnRMus7PT",
  "recruiter-enterprise": "price_1TjR4cQirFgl6Wvlmq5e6j8S",
};