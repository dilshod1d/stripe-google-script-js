function createPaymentIntent(amount, currency) {
  var apiKey =
    "sk_test_51Mt78QHvVLNAitmVFnjtG0pRPCzyFVSAXrwuVq9piq8x9WDBJCcYkYmxbqzEmI92MN3qKs2xAjI3uRBr3VqSjrxX00nEDHxMRq"; // Replace with your actual Stripe secret key
  var url = "https://api.stripe.com/v1/payment_intents";
  var options = {
    method: "post",
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    payload: "amount=" + amount + "&currency=" + currency,
  };

  var response = UrlFetchApp.fetch(url, options);
  var responseObject = JSON.parse(response.getContentText());
  return responseObject;
}

AKfycbxielRfw0O_z3xtWx9t1L8qUZIH0jiQzxm2IH--27wv4b0tEytitp9modV_wWmTnWwxmw
https://script.google.com/macros/s/AKfycbxielRfw0O_z3xtWx9t1L8qUZIH0jiQzxm2IH--27wv4b0tEytitp9modV_wWmTnWwxmw/exec