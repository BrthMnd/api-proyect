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
    ("Correo enviado correctamente");
  } catch (error) {
    console.error("Error al enviar el correo: ", error);
  }
};
function TemplateEmail(email, details, token, url = "confirmacion_correo/") {
  return `
  <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Correo de Confirmación</title>
</head>
<body style="font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #000000; text-align: center;">
  <div id="email___content" style="max-width: 600px; margin: 40px auto; padding: 20px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1); border-radius: 8px; border: 1px solid #d1d9e6;">
    <img src="https://rcservice.onrender.com/api/img/LogoRc.png" alt="Rc service Logo" style="max-width: 100px; height: 100px; display: block; margin: 0 auto 20px; border-radius: 50%; background: radial-gradient(black 60%, transparent 60%);">
    <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">Hola <strong style="font-weight: bold;">${email}</strong></h2>
    <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">${details}</p>
    <a href="http://localhost:5173/${url}${token}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s ease;">Haz clic aquí para continuar</a>
    <p class="footer" style="font-size: 12px; color: #777; margin-top: 20px;">Si no solicitaste este correo, por favor ignóralo.</p>
  </div>
</body>
</html>




  
    `;
}
function NotificationTemplate(email, details) {
  return `
  <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Correo de Confirmación</title>
</head>
  <body style="font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #000000; text-align: center;">
    <div id="email___content" style="max-width: 600px; margin: 40px auto; padding: 20px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1); border-radius: 8px; border: 1px solid #d1d9e6;">
      <img src="https://rcservice.onrender.com/api/img/LogoRc.png" alt="Rc service Logo" style="max-width: 100px; height: 100px; display: block; margin: 0 auto 20px; border-radius: 50%; background: radial-gradient(black 60%, transparent 60%);">
      <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">Hola <strong style="font-weight: bold;">${email}</strong></h2>
      <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">${details}</p>
    </div>
  </body>
</html>
    `;
}

module.exports = { SendEmail, TemplateEmail, NotificationTemplate };
