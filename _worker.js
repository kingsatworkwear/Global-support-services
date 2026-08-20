export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        const formData = await request.formData();

        const naam = formData.get("naam");
        const email = formData.get("email");
        const telefoon = formData.get("telefoon");
        const bericht = formData.get("bericht");

        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
           "Authorization": "Bearer " + env.RESEND_API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "Global Support Services <onboarding@resend.dev>",
            to: ["info@global-support-services.com"],
            reply_to: email,
            subject: "Nieuwe offerteaanvraag via website",
            html: `
              <h2>Nieuwe offerteaanvraag</h2>
              <p><strong>Naam:</strong> ${naam}</p>
              <p><strong>E-mail:</strong> ${email}</p>
              <p><strong>Telefoon:</strong> ${telefoon}</p>
              <p><strong>Bericht:</strong></p>
              <p>${bericht}</p>
            `
          })
        });

        if (!response.ok) {
          return Response.json({
            success: false,
            message: "Resend kon de e-mail niet versturen."
          }, { status: 500 });
        }

        return Response.json({
          success: true
        });

      } catch (error) {
        return Response.json({
          success: false,
          message: "Er is iets misgegaan bij het versturen."
        }, { status: 500 });
      }
    }

    return env.ASSETS.fetch(request);
  }
};