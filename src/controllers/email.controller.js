const { Resend } = require("resend");
const resend = new Resend("re_etuG3nzu_7MJVggpYJnbrtf1k5zHwpRUQ");

async function SendEmail(email) {
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Bienvenido a RC Service...",
      html: "<strong>un gusto que seas parte de </strong>",
    });

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { SendEmail };
