const express = require("express")
const { userAuth } = require("../../middlewares/userMiddllewares");
const { webhook } = require("../../controllers/paymentControllers");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router()

router.post("/create-payment-session", userAuth, async (req, res, next) => {
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
})

router.post("/webhook", webhook)





module.exports={paymentRouter:router}