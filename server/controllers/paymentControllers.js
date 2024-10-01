const { Enrollment } = require('../models/enrollmentModel');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


 const webhook= (request, response) => {
     let event = request.body;
     const endpointSecret=process.env.STRIPE_ENDPOINT_SECRET_KEY
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
      return res.sendStatus(400);
    }
  }
     const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
  
   const enrollUser = async () => {
    const mewEnrollment = new Enrollment({
      course: paymentIntent.metadata.courseId,
      user:paymentIntent.metadata.userId
    })
     await save(newEnrollment)
     console.log(newEnrollment)
     response.send(newEnrollment);
   }
   enrollUser()
   
   
};

module.exports= {webhook}