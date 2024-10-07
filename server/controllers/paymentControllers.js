const { Enrollment } = require("../models/enrollmentModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymentSession = async (req, res, next) => {
  try {
    const { id } = req.user;
    const product = req.body;
    console.log(product);
    const Item = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: product.title,
            images: [product.image],
          },
          unit_amount: Number(product.price) * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: Item,
      mode: "payment",
      success_url: `${process.env.CLIENT_BASE_URL}/payment/success`,
      cancel_url: `${process.env.CLIENT_BASE_URL}/payment/success`,
      metadata: {
        userId: id,
        courseId: product.id,
      },
    });
    console.log(session);
    res.json({ success: true, sessionId: session.id });
  } catch (error) {
    next(error);
  }
};

const webhook = async (request, response) => {
  let event;
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET_KEY;

  // Verify the webhook signature
  if (endpointSecret) {
    const signature = request.headers["stripe-signature"];
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

  response.sendStatus(200);


  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      // Enroll the user
      try {
        const newEnrollment = new Enrollment({
          course: session.metadata.courseId,
          learner: session.metadata.userId,
        });

        await newEnrollment.save(); // Save the enrollment to the database
        console.log("New enrollment created:", newEnrollment);
      } catch (err) {
        console.error("Failed to enroll user:", err.message);
      }
      break;

    // Handle other event types
    case "payment_intent.payment_failed":
      console.error("Payment failed:", event.data.object);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};

module.exports = { createPaymentSession, webhook };
