
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { sendDownloadLink } = require('../utils/email.utils');
const Joi = require('joi');

const paymentIntentSchema = Joi.object({
  amount: Joi.number().integer().min(1).required(),
  currency: Joi.string().length(3).required(),
  metadata: Joi.object()
});

const paymentSuccessSchema = Joi.object({
  email: Joi.string().email().required(),
  musicId: Joi.string().required()
});


exports.createPaymentIntent = async (req, res) => {
  try {
    const { error, value } = paymentIntentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { amount, currency, metadata } = value;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      error: 'An error occurred while processing your payment',
    });
  }
};

exports.handlePaymentSuccess = async (req, res) => {
  try {
    const { error, value } = paymentSuccessSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, musicId } = value;
    const downloadLink = await getDownloadLinkFromDatabase(musicId);

    if (!downloadLink) {
      return res.status(404).json({ error: 'Download link not found' });
    }

    await sendDownloadLink(email, downloadLink);
    res.status(200).json({ message: 'Payment successful, download link sent to email.' });
  } catch (error) {
    console.error('Error handling payment success:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};

async function getDownloadLinkFromDatabase(musicId) {
  // Implement this function to fetch the download link from your database
  return `http://yourdomain.com/download/${musicId}`;
}
