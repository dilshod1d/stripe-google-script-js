document.addEventListener("DOMContentLoaded", () => {
  const stripe = Stripe("your_stripe_publishable_key");
  const elements = stripe.elements();

  const cardElement = elements.create("card");
  cardElement.mount("#card-element");

  cardElement.on("change", (event) => {
    const displayError = document.getElementById("card-errors");
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = "";
    }
  });

  const form = document.getElementById("payment-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get form field values
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const state = document.getElementById("state").value;
    const county = document.getElementById("county").value;
    const dobDay = document.getElementById("dob-day").value;
    const dobMonth = document.getElementById("dob-month").value;
    const dobYear = document.getElementById("dob-year").value;
    const sos = document.getElementById("sos").value;
    const sosAddress = document.getElementById("sos-address").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    // Create the payment method with Stripe
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Error creating payment method:", error);
    } else {
      // Send the payment method ID to the Google App Script backend
      // Make sure to replace 'YOUR_GOOGLE_APP_SCRIPT_WEB_APP_URL' with the actual Web App URL that was generated when you deployed the Apps Script project.
      const response = await fetch("YOUR_GOOGLE_APP_SCRIPT_WEB_APP_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          firstName,
          lastName,
          state,
          county,
          dobDay,
          dobMonth,
          dobYear,
          sos,
          sosAddress,
          gender,
        }),
      });

      const result = await response.json();
      if (result.success) {
        console.log("Payment successful:", result);
      } else {
        console.error("Payment failed:", result.error);
      }
    }
  });
});
