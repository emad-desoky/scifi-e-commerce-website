import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51QByq8Rx9JkW9yA5McCzT4Np41vsIPu4HcfwYLbpWgebMLMuF2bcKvjOP9nmNfCAaqVV465EGl4WWUu3E4zyMusi00jvP6ylVd", {
  typescript: true,
  apiVersion: "2024-09-30.acacia", // Make sure this version is correct
});

export async function POST(request: any) {
  try {
    const data = await request.json();
    const amount = Number(data.amount); // Ensure amount is a number

    // Validate the amount
    if (!amount || amount <= 0 || isNaN(amount)) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Ensure it is a whole number
      currency: "USD",
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 });
  } catch (error: any) {
    // Ensure that you return a proper message for any error
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
