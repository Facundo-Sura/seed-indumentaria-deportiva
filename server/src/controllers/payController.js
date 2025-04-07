require("dotenv").config;
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const processPayment = async (req, res) => {
  const { productId, amount } = req.body;

  try {
    const body = await req.json()
    const session = await stripe.checkout.session.Create({
      seccess_url:"http://localhost:5000/create-session",
      line_items:[{
        price_data:{
          currency: "usd",
          product_data:{
            name: body.name,
            imagen: [body.image],
            size: body.size,
          },
          
        unit_amount: body.price,
        },
        quantity: body.quantity,
      },
    ],
    metadata: {
      productId: body.id,
    },
    mode: "payment",
    })
    console.log({session});
    
    res.status(200).json({session})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};

module.exports = {
  processPayment,
};
