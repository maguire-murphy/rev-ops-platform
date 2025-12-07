import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
});

export const STRIPE_OAUTH_URL = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.STRIPE_CLIENT_ID}&scope=read_write`;

export async function exchangeStripeToken(code: string) {
    const response = await stripe.oauth.token({
        grant_type: "authorization_code",
        code,
    });
    return response;
}
