const { transporter } = require("../../libs/emailConfig.js");
const { ObjectId } = require("mongodb");
const { UserModel } = require("../../models/Users/users.models.js");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const {
  CreateAccess,
  CreateConfirmToken,
  GetConfirmToken,
} = require("../../libs/jwt.js");
const {
  ProveedoresModels,
} = require("../../models/Proveedores/provedores.models.js");
const { Employed_Model } = require("../../models/Users/employed.models.js");
const {
  TemplateEmail,
  SendEmail,
  NotificationTemplate,
} = require("../../tools/template.tools.js");
const { EncodeToken, DecodeToken } = require("../../tools/encode.tools.js");

const CorreoConfirmacion = async (userEmail) => {
  try {
    const mailOptions = {
      from: transporter.senderEmail,
      to: userEmail,
      subject: "Bienvenido a la aplicación",
      html: `
      <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Correo de Bienvenido</title>
</head>
<body style="font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #000000; text-align: center;">
    <div id="email___content" style="max-width: 600px; margin: 40px auto; padding: 20px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1); border-radius: 8px; border: 1px solid #d1d9e6;">
    <img src="https://rcservice.onrender.com/api/img/LogoRc.png" alt="Rc service Logo" style="max-width: 100px; height: 100px; display: block; margin: 0 auto 20px; border-radius: 50%; background: radial-gradient(black 60%, transparent 60%);">
    <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">Bienvenido a nuestra aplicación</h2>
        <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">Gracias por registrarte. Estamos emocionados de tenerte a bordo.</p>
        
        <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">¡Esperamos que disfrutes de tu experiencia!</p>
        </div>
        </body>
      </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    ("Correo enviado correctamente");
  } catch (error) {
    console.error("Error al enviar el correo: ", error);
  }
};

const CorreoConfirmacionEmpleado = async (userEmail, password) => {
  try {
    const mailOptions = {
      from: transporter.senderEmail,
      to: userEmail,
      subject: "Bienvenido a la aplicación",
      html: `
      <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
</head>
<body style="font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #000000; text-align: center;">
    <div id="email___content" style="max-width: 600px; margin: 40px auto; padding: 20px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1); border-radius: 8px; border: 1px solid #d1d9e6;">
<img src="https://rcservice.onrender.com/api/img/LogoRc.png" alt="Rc service Logo" style="max-width: 100px; height: 100px; display: block; margin: 0 auto 20px; border-radius: 50%; background: radial-gradient(black 60%, transparent 60%);">
      <h1 style="color: #333; font-size: 24px; margin-bottom: 10px;>Bienvenido a nuestra aplicación como rol Empleado</h1>
      <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">Estamos emocionados de tenerte a bordo, tu usuario y contraseña, asignados son los siguientes: </p>
      <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">Usuario: ${userEmail}</p>
      <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">Contraseña: ${password}</p>
      
      <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">¡Esperamos que tengas una excelente experiencia como Empleado!</p>
      </div>
  </body>
</html>
    `,
    };

    await transporter.sendMail(mailOptions);
    ("Correo enviado correctamente");
  } catch (error) {
    console.error("Error al enviar el correo: ", error);
  }
};

class User_Controller {
  Get(req, res, next) {
    UserModel.find({})
      .populate("roleRef")
      .then((result) => {
        return res.status(200).send(result);
      })
      .catch((error) => {
        return res.status(500).json({ error: "Error al obtener el permiso" });
      });
  }

  // Get_proveedores(req, res, next) {
  //   UserModel.find({ role: "Proveedores" })
  //     .populate({
  //       path: "roleRef",
  //       populate: { path: "categoriaServicio" },
  //     })
  //     .then((result) => {
  //       res.status(200).send(result);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       res.status(500).json({ error: error });
  //     })
  //     .finally(() => next());
  // }

  // //__________________________________________________________________________________________

  async GetById(req, res, next) {
    const id = req.params.id;

    try {
      const result = await UserModel.find({
        _id: new ObjectId(id),
      }).populate("roleRef");

      res.status(200).send(result);
    } catch (error) {
      "Error: " + error;
      res.status(500).json({ error: "Error al obtener el usuario" });
    }
  }

  //__________________________________________________________________________________________

  async PostEmployed(req, res, next) {
    const { nombre, documento, telefono, direccion, password, email } =
      req.body;

    try {
      //Guarda la contraseña sin encriptar
      const passwordPlain = password;
      const passwordHash = await bycrypt.hash(password, 10);
      const employed = new Employed_Model({
        nombre,
        documento,
        telefono,
        direccion,
      });
      const employed_created = await employed.save();

      if (!employed_created)
        return res.status(400).send("error al crear empleado");

      const user = UserModel({
        email,
        password: passwordHash,
        role: "Employed",
        roleRef: new ObjectId(employed_created._id),
      });
      const user_created = await user.save();

      if (!user_created) return res.status(400).send("hubo algún error");

      res.status(201).json({
        message: "GOOD",
        Employed: employed_created,
        User: user_created,
      });
      CorreoConfirmacionEmpleado(user_created.email, passwordPlain);
    } catch (error) {
      error;
      res.status(500).send(error);
    }
  }

  //__________________________________________________________________________________________

  async Put(req, res, next) {
    const id = req.params.id;
    const { nombre, documento, direccion, telefono, categoriaServicio } =
      req.body;
    try {
      const result = await UserModel.findOne({ _id: new ObjectId(id) });

      if (result.role == "Proveedores") {
        const providerUpdated = await ProveedoresModels.findOneAndUpdate(
          { _id: new ObjectId(result.roleRef) },
          { nombre, documento, direccion, telefono, categoriaServicio },
          { new: true }
        );
        res
          .status(200)
          .json({ message: "actualizado con éxito", User: providerUpdated });
      } else if (result.role == "Employed") {
        const employedUpdated = await Employed_Model.findOneAndUpdate(
          { _id: new ObjectId(result.roleRef) },
          { nombre, documento, direccion, telefono },
          { new: true }
        );
        res
          .status(200)
          .json({ message: "actualizado con éxito", User: employedUpdated });
      } else {
        res.status(404).json({ message: "Rol indefinido" });
      }
    } catch (err) {
      err;
      res.status(500).json({ message: "Ha ocurrido un error.", error: err });
    } finally {
      next();
    }
  }

  //__________________________________________________________________________________________

  async Delete(req, res, next) {
    const id = req.params.id;

    try {
      const userDeleted = await UserModel.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (result) {
        res.status(200).send({ message: "Usuario borrado con éxito" });
      } else {
        res.status(404).send({ error: "Usuario no encontrado" });
      }
    } catch (error) {
      console.error("Error al eliminar el Usuario -> " + error.message);
      res
        .status(500)
        .send({ error: "Error interno del servidor", err: error.message });
    }
  }
  // LOGIN
  async Login(req, res, next) {
    const { password, email } = req.body;

    try {
      const Usuario = await UserModel.findOne({ email: email }).populate(
        "roleRef"
      );
      if (!Usuario) return res.status(404).send("El usuario no existe");

      const Coincide = await bycrypt.compare(password, Usuario.password);

      if (!Coincide) {
        return res
          .status(400)
          .json({ response: "La contraseña es incorrecta ", status: Coincide });
      }

      const Token = await CreateAccess({ id: Usuario._id });
      Token;
      res.cookie("token", Token, {
        sameSite: "none",
        secure: true,
      });
      res
        .status(200)
        .json({ message: "Bienvenido", result: Usuario, token: Token });
    } catch (error) {
      error;
      res.status(500).json({ message: "Bad", error });
    }
  }
  Logout(req, res, next) {
    res.cookie("token", "", { expires: new Date(0) });
    res.status(200).send("Sesión Cerrada");
  }
  async registerVerify(req, res, next) {
    try {
      const { email, password } = req.body;
      const verifyUser = await UserModel.findOne({ email: email });
      if (verifyUser)
        return res
          .status(409)
          .json({ message: "El usuario ya esta registrado" });

      const randomNumber = Math.floor(Math.random() * 9000) + 1000;
      const tokenCode = await CreateConfirmToken({
        code: randomNumber,
        email: email,
        password,
      });
      tokenCode;
      if (!tokenCode) {
        res.status(500).json({ message: "Error al crear token de acceso" });
      }
      const tok = EncodeToken(tokenCode);
      ("con encode");
      tok;
      const template = TemplateEmail(
        email,
        "Para confirmar tu cuenta, ingresa al siguiente enlace",
        tok
      );
      SendEmail(email, "Confirmacion de correo", template);
      res.status(200).json({ message: "Continuando con el registro" });
    } catch (error) {
      error;
      res.status(500).json({ message: "A ocurrido un error", error });
    }
  }
  async VerifyConfirmToken(req, res, next) {
    ("Verificando paso...");
    const { token } = req.params;
    try {
      const tokenDecode = DecodeToken(token);
      tokenDecode;
      ("arriba ");
      const confirmed = await GetConfirmToken(tokenDecode);
      confirmed;
      if (!confirmed) {
        return res
          .status(400)
          .json({ message: "No fue confirmado", error: confirmed });
      }
      return res
        .status(200)
        .json({ message: "Continuando con el registro", data: confirmed });
    } catch (error) {
      return res.status(500).json({ message: "A ocurrido un error", error });
    }
  }
  async CreateCodeToken(req, res, next) {
    const { email } = req.body;
    try {
      const response_user = await UserModel.findOne({ email });
      if (!response_user)
        return res.status(400).json({
          message: "El E-mail ingresado no existe en el aplicativo",
          error: response_user,
        });

      const randomNumber = String(Math.floor(Math.random() * 9000) + 1000);
      randomNumber;

      const key = await bycrypt.hash(randomNumber, 10);
      key;

      const keyToken = await CreateConfirmToken({ key, email });
      ("mira");

      const template = await TemplateEmail(
        email,
        `Código de verificación de recuperación de contraseña es: <strong>${randomNumber}</strong>`,
        EncodeToken(keyToken),
        "recuperar_correo/"
      );
      await SendEmail(
        email,
        "Código de verificación contraseña",
        template,
        "recuperar_correo/"
      );

      return res
        .status(200)
        .json({ message: "Continuando con el cambio de contraseña" });
    } catch (error) {
      error;
      return res.status(500).json({ message: "A ocurrido un error", error });
    }
  }

  async VerifyCodeToken(req, res) {
    try {
      const { tokenKey } = req.params;
      const { code } = req.body;

      const isConfirmed = await GetConfirmToken(DecodeToken(tokenKey));
      isConfirmed;
      if (!isConfirmed)
        return res
          .status(400)
          .json({ message: "Error del Token", error: isConfirmed });

      const codeIsConfirmed = await bycrypt.compare(code, isConfirmed.key);
      codeIsConfirmed;
      if (!codeIsConfirmed)
        return res.status(400).json({
          message: "El codigo ingresado es invalido",
          error: codeIsConfirmed,
        });

      ("all right");

      //Devuelvo el email
      res.status(200).json({
        message: "Continuando con el cambio de contraseña",
        email: isConfirmed.email,
      });
    } catch (error) {
      error;
      res.status(500).json({ message: "A ocurrido un error", error });
    }
  }
  async UpdatePassword(req, res) {
    try {
      const { email, password } = req.body;
      const passwordHash = await bycrypt.hash(password, 10);
      const response_user = await UserModel.findOneAndUpdate(
        { email },
        { password: passwordHash },
        { new: true }
      );
      response_user;
      if (!response_user) {
        return res
          .status(400)
          .json({ message: "Error al actualizar", error: email });
      }

      SendEmail(
        email,
        "Cambio de contrasena",
        NotificationTemplate(email, "Contrasena actualizada con exito.")
      );
      res.status(200).json({ message: "actualizado con éxito." });
    } catch (error) {
      error;
      res.status(500).json({ message: "A ocurrido un error", error });
    }
  }
  async register(req, res, next) {
    const {
      nombre,
      documento,
      email,
      password,
      direccion,
      telefono,
      categoriaServicio,
    } = req.body;
    req.body;
    try {
      const passwordHash = await bycrypt.hash(password, 10);
      passwordHash;

      const comprobando = await ProveedoresModels.findOne({
        documento: documento,
      });
      if (comprobando) {
        comprobando;
        return res.status(409).json({
          message: "Documento ya se encuentra en la base de datos",
          error: comprobando,
        });
      }
      const verifyUser = await UserModel.findOne({ email: email });
      if (verifyUser)
        return res.status(409).json({
          message: `Invalido, la cuenta ${email} ya esta asociada a otro documento`,
        });

      const provider = await ProveedoresModels({
        nombre,
        documento,
        direccion,
        telefono,
        categoriaServicio,
      });

      const saveProvider = await provider.save();
      if (!saveProvider) {
        return res.status(400).json({
          message: "A ocurrido un error",
          error: saveProvider,
        });
      }
      const newUser = await UserModel({
        email,
        password: passwordHash,
        role: ProveedoresModels.modelName,
        roleRef: saveProvider._id,
      });
      const saveUser = await newUser.save();
      saveUser;

      const Token = await CreateAccess({ id: saveUser._id });
      res.cookie("token", Token, {
        sameSite: "none",
        secure: true,
        httpOnly: true,
      });

      CorreoConfirmacion(saveUser.email);
      res.status(200).json({
        message: "Usuario Registrado",
        user: {
          email: saveUser.email,
          role: saveUser.role,
        },
        provider: saveProvider,
        token: Token,
      });
    } catch (error) {
      error;
      return res.status(500).json({
        message: "A ocurrido un error",
        error: error,
      });
    }
  }
  async VerifyToken(req, res, next) {
    try {
      const { token } = req.cookies;
      req.cookie;
      "Estamos verificando el token: " + token;
      if (!token)
        return res.status(400).json({ message: "Acceso no autorizado" });

      const verify = await jwt.verify(token, process.env.SECRET_KEY);
      if (!verify)
        return res
          .status(400)
          .json({ message: "Acceso no autorizado, Verificación invalida " });

      const user = await UserModel.findById({
        _id: new ObjectId(verify.id),
      }).populate({
        path: "roleRef",
      });
      let provider = null;
      if (!user)
        return res.status(400).json({
          message:
            "Acceso no autorizado, Verificación no hace referencia a ningún usuario ",
        });
      if (user.role == "Proveedores") {
        provider = await ProveedoresModels.findById({
          _id: new ObjectId(user.roleRef._id),
        })
          .populate("categoriaServicio")
          .populate("id_calificacion");
      }
      ("🐱‍👤 por aqui");
      user;
      const forJson = {
        id: user._id,
        id_provider: user.roleRef._id,
        email: user.email,
        role: user.role,
        name: user.roleRef.nombre,
        cc: user.roleRef.documento,
        phone: user.roleRef.telefono,
        direction: user.roleRef.direccion,
      };
      if (user.role == "Proveedores") {
        forJson.score = provider.id_calificacion;
        forJson.category = provider ? provider.categoriaServicio : "";
      }
      return res.status(200).json(forJson);
    } catch (error) {
      error;
      res.status(500).json({ message: "Bad", error });
    }
  }
  async VerifyTokenMobile(req, res, next) {
    const { token } = req.body;
    try {
      "Estamos verificando el token: " + token;
      if (!token) return res.status(400).json({ message: "Unauthorized 1" });

      const verify = await jwt.verify(token, process.env.SECRET_KEY);
      if (!verify) return res.status(400).json({ message: "Unauthorized 2" });

      const user = await UserModel.findById({
        _id: new ObjectId(verify.id),
      }).populate({ path: "roleRef", populate: { path: "id_calificacion" } });
      if (!user) return res.status(400).json({ message: "Unauthorized 3" });

      return res.status(200).json({
        id: user._id,
        id_provider: user.roleRef._id,
        email: user.email,
        name: user.roleRef.nombre,
        cc: user.roleRef.documento,
        phone: user.roleRef.telefono,
        role: user.role,
        direction: user.roleRef.direccion,
        score: user.roleRef.id_calificacion,
      });
    } catch (error) {
      error;
      res.status(500).json({ message: "Bad", error });
    }
  }
}
module.exports = { User_Controller };
