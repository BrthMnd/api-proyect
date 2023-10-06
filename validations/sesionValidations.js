/** @format */

const Joi = require("joi");
const { translateString } = require("../utils/Functions");

const validatePermiso = async (req, res, next) => {
	const schema = Joi.object({
		permiso: Joi.string().trim().required(),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		let translatedError = await translateString(error.details[0].message);
		return res.status(400).json({ error: translatedError });
	}

	next();
};

const validateRole = async (req, res, next) => {
	const schema = Joi.object({
		nombreRol: Joi.string().trim().required(),
	});

	let { rol } = req.body;

	const { error } = schema.validate(rol);
	if (error) {
		let translatedError = await translateString(error.details[0].message);
		return res.status(400).json({ error: translatedError });
	}

	next();
};

const validateUser = async (req, res, next) => {
	const schema = Joi.object({
		correo: Joi.string().email().required(),
		contraseña: Joi.string().required(),
	});

	const { error } = req.body.data
		? schema.validate(req.body.data)
		: schema.validate(req.body);

	if (error) {
		let translatedError = await translateString(error.details[0].message);
		console.log(translatedError);
		return res.status(400).json({ error: translatedError });
	}

	next();
};

const validateAssignPermisoToUser = async (req, res, next) => {
	const schema = Joi.object({
		id_usuario: Joi.string().required(),
		id_permiso: Joi.string().required(),
	});

	const { error } = schema.validate(req.params);
	if (error) {
		let translatedError = await translateString(error.details[0].message);
		return res.status(400).json({ error: translatedError });
	}

	next();
};

const validateAssignRoleToUser = async (req, res, next) => {
	const schema = Joi.object({
		userId: Joi.string().required(),
		roleId: Joi.string().required(),
	});

	const { error } = schema.validate(req.params);
	if (error) {
		let translatedError = await translateString(error.details[0].message);
		return res.status(400).json({ error: translatedError });
	}

	next();
};

module.exports = {
	validatePermiso,
	validateRole,
	validateUser,
	validateAssignPermisoToUser,
	validateAssignRoleToUser,
};
