const Stripe = require("stripe");
const config = require("../config/config");
const { Console } = require("winston/lib/winston/transports");
const { stripeSecretKey, uiLink } = config.server;


class StripeService {
    constructor() {
        if (!StripeService.instance) {
            // const stripe = new Stripe('sk_test_51PN1C3AUwtDooBla0hTW8TRG5vXJYivos3wYNAJ6c4aaSnufBlqpuvkxQz2YfrUErdlH3GUg8MNHNcBMfSPiNJCz00mAmh3Hhx', {
            //     apiVersion: "2022-11-15",
            //   });

            this.stripe = new Stripe(stripeSecretKey, {
                apiVersion: "2022-11-15",
            });
            StripeService.instance = this;
        }

        return StripeService.instance;
    }

    static getInstance() {
        return this.instance || new StripeService();
    }

    async createCheckout(priceId, userId, pageName) {
        const session = await this.stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],

            mode: "subscription",
            success_url: `${uiLink}/${pageName}?subStatus=true`,
            cancel_url: `${uiLink}/${pageName}?subStatus=false`,
        });
        await this.saveSubscriptionToDB(session, userId);
        return session;
    }

    async updateSubscription(customerId, subscriptionId, pageName) {
        try {
            const session = await this.stripe.billingPortal.sessions.create({
                customer: customerId,
                return_url: `${uiLink}/${pageName}?subStatus=true`,
                flow_data: {
                    type: "subscription_update",
                    subscription_update: {
                        subscription: subscriptionId,
                    },
                    after_completion: {
                        type: "redirect",
                        redirect: {
                            return_url: `${uiLink}/${pageName}?subStatus=true`,
                        },
                    },
                },
            });
            return session;
        } catch (error) {
            throw new Error(`Failed to create billing session: ${error.message}`);
        }
    }

    async cancelSubscription(customerId, subscriptionId) {
        try {
            const session = await this.stripe.billingPortal.sessions.create({
                customer: customerId,
                return_url: `${uiLink}/settings`,
                flow_data: {
                    type: "subscription_cancel",
                    subscription_cancel: {
                        subscription: subscriptionId,
                    },
                    after_completion: {
                        type: "redirect",
                        redirect: {
                            return_url: `${uiLink}/settings`,
                        },
                    },
                },
            });
            return session;
        } catch (error) {
            throw new Error(`Failed to create billing session: ${error.message}`);
        }
    }
    async saveSubscriptionToDB(session, userId) {
        await SubscriptionSchema.create({ sessionId: session.id, userId: userId });
    }
    async updateSubscriptionToDB(customer, subscription, sessionId) {
        await SubscriptionSchema.findOneAndUpdate(
            { sessionId: sessionId },
            {
                customerId: customer,
                stripe_subscription: subscription,
            },
            { new: true }
        );
    }
    async listAllInvoices(customerId) {
        try {
            const invoices = await this.stripe.invoices.list({
                customer: customerId,
            });
            return invoices;
        } catch (error) {
            throw new Error(`Failed to get invoices: ${error.message}`);
        }
    }
    async getStripeInfo(userId) {
        try {
            const userInfo = await SubscriptionSchema.findOne({ userId });
            return userInfo;
        } catch (error) {
            throw new Error(`Failed to get invoices: ${error.message}`);
        }
    }
    async webhook(payload) {
        const event = payload;
        switch (event.type) {
            case "checkout.session.completed":
                {
                    const sessionId = event.data.object.id;
                    const session = await SubscriptionSchema.findOne({
                        sessionId: sessionId,
                    });
                    if (session) {
                        // get subscriptionId and customerId from event
                        const { customer, subscription } = event.data.object;
                        const { sessionId } = session;
                        // retrieve subscription from stripe based on subscriptionId
                        const subscriptionData = await this.stripe.subscriptions.retrieve(
                            subscription
                        );
                        // save subscription data in the db
                        await this.updateSubscriptionToDB(
                            customer,
                            subscriptionData,
                            sessionId
                        );
                    }
                }
                break;

            case "customer.subscription.updated":
                {
                    console.log({ event: event.data });
                    const { customer, id: subscription } = event.data.object;

                    const session = await SubscriptionSchema.findOne({
                        "stripe_subscription.id": subscription,
                        customerId: customer,
                    });

                    if (session) {
                        // get subscriptionId and customerId from event
                        const { sessionId } = session;
                        // retrieve subscription from stripe based on subscriptionId
                        const subscriptionData = await this.stripe.subscriptions.retrieve(
                            subscription
                        );

                        // save subscription data in the db
                        await this.updateSubscriptionToDB(
                            customer,
                            subscriptionData,
                            sessionId
                        );
                    }
                }

                break;

            default:
                console.log(`Unhandled Stripe event type: ${event.type}`);
        }
    }
    async getAllPayments() {
        try {
            const customers = await this.stripe.customers.list();

            // Iterate through each customer and get their payment data
            const customersWithTotalAmount = await Promise.all(
                customers.data.map(async (customer) => {
                    // Retrieve the payments associated with the customer
                    const payments = await this.stripe.paymentIntents.list({
                        customer: customer.id,
                    });

                    // Calculate the total amount spent by the customer
                    const totalAmount = payments.data.reduce(
                        (total, payment) => total + payment.amount_received,
                        0
                    );

                    return {
                        customer: customer,
                        totalAmount: totalAmount / 100, // Convert to dollars or your currency
                    };
                })
            );

            return customersWithTotalAmount;
        } catch (error) {
            throw new Error(`Failed to get invoices: ${error.message}`);
        }
    }

    async createPaymentIntent(amount, currency, description = '', paymentMethod = null, metadata = {}, returnUrl = '') {
        try {
            const paymentIntentParams = {
                amount: amount, // e.g., 1000 for $10.00
                currency: currency, // e.g., 'usd'
                description: description, // optional
                metadata: metadata,
                return_url: uiLink + '/checkout'
            };
            console.log(paymentIntentParams);

            if (paymentMethod) {
                paymentIntentParams.payment_method = paymentMethod;
                paymentIntentParams.confirm = true; // Automatically confirm the payment
            }

            const paymentIntent = await this.stripe.paymentIntents.create(paymentIntentParams);
            return paymentIntent;
        } catch (error) {
            console.error('Error creating payment intent:', error.message);
            throw new Error('Unable to create payment intent');
        }
    }

}
StripeService.instance = null;

module.exports = StripeService;
