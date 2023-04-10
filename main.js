document.addEventListener("DOMContentLoaded", () => {
  const stripe = Stripe(
    "pk_test_51Mt78QHvVLNAitmVOHdUhRPDzJqtpoGo8DBk21bjxO66Kzwgw7bGXT2V4qS04y5RuEANLwhcMGeaQUkpJHffeDhp00xYkfMaKd"
  );
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
    console.log("payment form submit");

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
      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycby450LbXDYdDEyyo8qBFf7vE4pny_Tgr6sum8Zbz4geClySDsj8Gk3i5msb7pC6rMn6Hg/exec",
        {
          redirect: "follow",
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
        }
      );

      const result = await response.json();
      if (result.success) {
        console.log("Payment successful:", result);
      } else {
        console.error("Payment failed:", result.error);
      }
    }
  });
});
