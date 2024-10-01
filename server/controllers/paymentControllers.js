const { Enrollment } = require('../models/enrollmentModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const webhook = async (request, response) => {
  let event = request.body;
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET_KEY;

  if (endpointSecret) {
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400); // Use response instead of res
    }
  }

  // Handle the event based on the event type
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);

    // Enroll the user
    try {
      const newEnrollment = new Enrollment({
        course: paymentIntent.metadata.courseId,
        user: paymentIntent.metadata.userId,
      });

      await newEnrollment.save(); // Save the enrollment to the database
      console.log(newEnrollment);

      response.status(200).send(newEnrollment);
    } catch (err) {
      console.error('Failed to enroll user:', err.message);
      response.status(500).send('Internal Server Error');
    }
  } else {
    response.sendStatus(400); // Return a 400 for unsupported events
  }
};

module.exports = { webhook }