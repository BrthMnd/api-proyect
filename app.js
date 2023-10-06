/** @format */

const express = require("express");
const { CORS } = require("./config/cors.config"); // estas configuraciones no estan bien, es mejor directamente usar el paquete
const app = express();
const sesionRoutes = require("./routes/Usuarios/sesion.routes");
const rolRoutes = require("./routes/Usuarios/rol.routes");
const countriesRoutes = require("./routes/Ciudades/ciudades.routes");
const { enviarMensajeWhatsapp, enviarCorreo } = require("./InfoSender");
const { userExists } = require("./validations/userValidations");
const { connect, disconnect, notFound } = require("./middlewares");
const route = require("./routes/");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Welcome message for root endpoint
app.get("/", (req, res) => {
	res.send("Welcome to the app");
});

// Endpoint to send messages to WhatsApp
app.post("/send-message", async (req, res) => {
	const { phoneNumber, message } = req.body;
	if (!phoneNumber || !message) {
		return res.status(400).json({
			error: "Faltan datos, debe enviarse el telefono y el mensaje.",
		});
	}

	let sent = await enviarMensajeWhatsapp(phoneNumber, message);

	if (sent) {
		res.status(200).json({ success: true });
	} else {
		res.status(500).json({
			error: "Ocurrió un error mientras se enviaba el mensaje",
		});
	}
});

// Endpoint to send messages to email
app.post("/send-email", async (req, res) => {
	const { email, titulo, message } = req.body;
	if (!email || !titulo || !message) {
		return res.status(400).json({
			error:
				"Faltan datos, debe enviarse el correo, el titulo y el mensaje",
		});
	}
	if (userExists(email)) {
		let sent = await enviarCorreo(email, message, titulo);

		if (sent) {
			res.status(200).json({ success: true });
		} else {
			res.status(500).json({
				error: "Ocurrió un error mientras se enviaba el correo",
			});
		}
	} else {
		res.status(500).json({
			error: "El correo no esta registrado",
		});
	}
});

//MIDLEWARES
app.use(connect);
app.use((req, res, next) => {
	res.removeHeader("X-Powered-By");
	next();
});

// Use session controller for /users routes
app.use("/users", sesionRoutes);

// Use countries controller for /countries routes
app.use("/countries", countriesRoutes);

// Use role controller for /admin-rol routes
app.use("/admin-rol", rolRoutes);

app.use("/api", route);

app.use(disconnect);
app.use(notFound);

module.exports = app;
