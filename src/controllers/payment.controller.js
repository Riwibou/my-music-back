
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { sendDownloadLink } = require('../utils/email.utils');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, metadata } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata
    });
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

exports.handlePaymentSuccess = async (req, res) => {
  const { email, musicId } = req.body;
  // Generate a download link from the database using musicId
  const downloadLink = await getDownloadLinkFromDatabase(musicId);
  await sendDownloadLink(email, downloadLink);
  res.status(200).send({ message: 'Payment successful, download link sent to email.' });
};

async function getDownloadLinkFromDatabase(musicId) {
  // Implement this function to fetch the download link from your database
  return `http://yourdomain.com/download/${musicId}`;
}
