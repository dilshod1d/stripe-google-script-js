const STRIPE_SECRET_KEY = "your_stripe_secret_key";

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const stripe = StripeApp.create(STRIPE_SECRET_KEY);

  try {
    // Create the payment intent
    const paymentIntent = stripe.createPaymentIntent({
      amount: 1000, // The amount to charge in cents
      currency: "usd",
      payment_method: data.paymentMethodId,
      confirm: true,
    });

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        clientSecret: paymentIntent.client_secret,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.message,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
