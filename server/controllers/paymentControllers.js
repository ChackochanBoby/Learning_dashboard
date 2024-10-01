const { Enrollment } = require('../models/enrollmentModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentSession = async (req, res, next) => {
  try {
      const userId=req.user.id
      const { title,image,price,id } = req.body
      const Item = [{
          price_data: {
              currency: "inr",
          product_data: {
              name: title,
              images: [image],
          },
          unit_amount: Number(price)*100
          },
          quantity:1

      }]

      const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: Item,
          mode: "payment",
          success_url:`${process.env.CLIENT_BASE_URL}/payment/success`,
          cancel_url: `${process.env.CLIENT_BASE_URL}/payment/success`,
          metadata: {
              userId: userId,
              courseId:id
          }
      }
      )
      console.log(session)
      res.json({success:true,sessionId:session.id})
      
  } catch (error) {
      next(error)
  }
}


const webhook = async (request, response) => {
  console.log(request.body)
  console.log("Raw Body:", request.body.toString()); // Add this line for debugging
  let event
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
          learner: paymentIntent.metadata.userId,
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

module.exports = {createPaymentSession, webhook };
