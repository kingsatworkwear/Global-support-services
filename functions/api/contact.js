export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();

    const naam = formData.get("naam");
    const email = formData.get("email");
    const telefoon = formData.get("telefoon");
    const bericht = formData.get("bericht");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
     headers: {
"Authorization": "Bearer " + context.env.RESEND_API_KEY,
"Content-Type": "application/json"
},
body: JSON.stringify({
  from: "Global Support Services <info@global-support-services.com>",
  to: ["info@global-support-services.com"],
  reply_to: email,
  subject: "Nieuwe offerteaanvraag van " + naam,
  html:
    "<h2>Nieuwe offerteaanvraag</h2>" +
    "<p><strong>Naam:</strong> " + naam + "</p>" +
    "<p><strong>E-mailadres:</strong> " + email + "</p>" +
    "<p><strong>Telefoonnummer:</strong> " + (telefoon || "Niet opgegeven") + "</p>" +
    "<p><strong>Bericht:</strong></p>" +
    "<p>" + bericht + "</p>"
})
    });

    const result = await response.json();
    if (!response.ok) {
      return new Response(
        JSON.stringify({
          success: false,
          message: result.message || "Er is iets misgegaan bij het versturen."
        }),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Uw aanvraag is ontvangen."
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Er is iets misgegaan bij het versturen."
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}
