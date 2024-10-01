const { Enrollment } = require('../models/enrollmentModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const webhook = async (request, response) => {
  let event = request.body;
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET_KEY;

  // Verify the webhook signature
  if (endpointSecret) {
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.error(`⚠️  Webhook signature verification failed:`, err.message);
      return response.sendStatus(400);
    }
  }

  // Acknowledge receipt of the event immediately
  response.sendStatus(200);

  // Handle the event based on the event type
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);

      // Enroll the user
      try {
        const newEnrollment = new Enrollment({
          course: paymentIntent.metadata.courseId,
          user: paymentIntent.metadata.userId,
        });

        await newEnrollment.save(); // Save the enrollment to the database
        console.log('New enrollment created:', newEnrollment);
      } catch (err) {
        console.error('Failed to enroll user:', err.message);
      }
      break;

    // Handle other event types
    case 'payment_intent.payment_failed':
      console.error('Payment failed:', event.data.object);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};

module.exports = { webhook };
