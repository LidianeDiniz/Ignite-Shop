import Stripe from 'stripe';

console.log(process.env.STRIPE_SECRET_KEY)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,{
apiVersion: '2022-11-15',
appInfo: {
    name: 'Iginte Shop',
}

})