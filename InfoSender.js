/** @format */

const { Client, LocalAuth } = require("whatsapp-web.js");
const nodemailer = require("nodemailer");
const qrcode = require("qrcode-terminal");
const { formatPhoneNumber } = require("./utils/Functions");
require("dotenv").config();

/**
 * Envia un mensaje a un número de teléfono a través de WhatsApp.
 * @param {string} numero - El número de teléfono al que se enviará el mensaje.
 * @param {string} mensaje - El mensaje que se enviará.
 */
async function enviarMensajeWhatsapp(numero, mensaje) {
	try {
		const client = new Client({
			authStrategy: new LocalAuth({
				clientId: "VERIFICACION",
			}),
		});

		client.on("qr", (qr) => {
			console.log("Conectando");
			qrcode.generate(qr, { small: true });
		});
		client.on("ready", () => {
			console.log("Cliente listo");
		});

		await client.initialize();

		const numeroEstandarizado = formatPhoneNumber(numero);
		await client.sendMessage(numeroEstandarizado, mensaje).then((res) => {
			console.log("Mensaje enviado:", mensaje);
		});
		setTimeout(() => {
			client.destroy();
		}, 10000);
	} catch (error) {
		console.error("Error al enviar el mensaje:", error);
		return false;
	}
	return true;
}

async function enviarCorreo(correo, mensaje, titulo) {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.GOOGLE_ACC_USER,
				pass: process.env.GOOGLE_ACC_PASWORD,
			},
		});

		const info = await transporter.sendMail({
			from: process.env.GOOGLE_ACC_USER,
			to: correo,
			subject: titulo,
			text: mensaje,
		});

		console.log(info);
	} catch (error) {
		console.error("Error al enviar el mensaje:", error);
		return false;
	}
	return true;
}

module.exports = { enviarMensajeWhatsapp, enviarCorreo };
