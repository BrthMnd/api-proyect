const { transporter } = require("../libs/emailConfig");

const SendEmail = async (userEmail, subject, html) => {
  try {
    const mailOptions = {
      from: transporter.senderEmail,
      to: userEmail,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Correo enviado correctamente");
  } catch (error) {
    console.error("Error al enviar el correo: ", error);
  }
};
function TemplateEmail(email, details, token, url = "confirmacion_correo/") {
  return `
    <head>
        <link rel="stylesheet" href="./style.css">
    </head>

    <body>
        <div id="email___content">
            <img src="*" alt="Rc service Logo">
            <h2>Hola <span style="font-weight: bold">${email}</span></h2>
            <p>${details}</p>
            <a target="_blank" href="http://localhost:5173/${url}${token}">Click aquí</a>
        </div>
    </body>
    `;
}

module.exports = { SendEmail, TemplateEmail };
