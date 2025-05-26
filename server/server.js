import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const app = express(); // ✅ Define Express app here
app.use(express.json()); // ✅ For parsing application/json

app.use('/images', express.static('public/images'));


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log("Stripe key loaded?", !!process.env.STRIPE_SECRET_KEY);

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? '*****' : null);

// CORS configuration
const allowedOrigins = [
  "http://coffee-hub-kappa.vercel.app",
  'http://localhost:3000',
  'http://localhost:5174',
  'http://localhost:5173',
  'http://localhost:5175',
  'http://localhost:5176',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or server-to-server
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS policy does not allow access from this origin.'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  credentials: true,
}));

// Nodemailer transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify email credentials
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Transporter verification failed:", error.message);
  } else {
    console.log("✅ Server is ready to send emails");
  }
});

// ✅ Updated product catalog
const BASE_IMAGE_URL = process.env.BASE_IMAGE_URL;

const productCatalog = {
  Cappuccino: { price: "4.50", image: `${BASE_IMAGE_URL}/v1748173024/cappuccino_io3znk.jpg` },
  Espresso: { price: "3.00", image: `${BASE_IMAGE_URL}/v1748173141/americano-coffe_srr3d1.webp` },
  Black_Coffee: { price: "2.50", image: `${BASE_IMAGE_URL}/v1748173083/black-coffee_skeooa.jpg` },
  Americano: { price: "3.50", image: `${BASE_IMAGE_URL}/v1748173141/americano-coffe_srr3d1.webp` },
  Mocha: { price: "5.00", image: `${BASE_IMAGE_URL}/v1748173067/mocha-coffee-image_u51pmm.webp` },
  Latte: { price: "4.75", image: `${BASE_IMAGE_URL}/v1748173098/latte-image_v2tjsm.jpg` },
};


// Health check route
app.get('/', (req, res) => {
  res.status(200).send('✅ Backend server is running');
});

// Stripe Checkout route
app.post('/create-checkout-session', async (req, res) => {
  console.log("POST /create-checkout-session called");
  console.log("Request body:", req.body);
  
  let productInput = req.body.product;

  if (typeof productInput !== "string") {
    console.error("❌ Product name must be a string");
    return res.status(400).json({ error: "Product name must be a string" });
  }

  // Normalize function as before
  function normalizeKey(str) {
    return str.trim().toLowerCase().replace(/[_\s]+/g, '');
  }

  const normalizedInput = normalizeKey(productInput);
  console.log("Normalized input:", normalizedInput);

  const catalogKeys = Object.keys(productCatalog);
  console.log("Available catalog keys:", catalogKeys);

  const matchedKey = catalogKeys.find(key => normalizeKey(key) === normalizedInput);
  console.log("Matched key:", matchedKey);

  if (!matchedKey) {
    console.error("❌ Unknown product:", productInput);
    return res.status(400).json({ error: "Unknown product name" });
  }

  const productName = matchedKey.replace(/_/g, ' ');
  const product = { name: productName, ...productCatalog[matchedKey] };
  console.log("Resolved product:", product);

  // Continue with Stripe session creation (unchanged)
  try {
    const priceNumber = parseFloat(product.price.replace(/[^0-9.]/g, ""));
    if (isNaN(priceNumber)) {
      console.error("❌ Invalid price format:", product.price);
      return res.status(400).json({ error: "Invalid price format" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              images: product.image ? [product.image] : [],
            },
            unit_amount: Math.round(priceNumber * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    console.log("✅ Stripe session created:", session.url);
    res.json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe session error:", err.message);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});



// POST /contact route to send email with validation
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ Failed to send email:', err);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
