const { transporter } = require("../../libs/emailConfig.js");
const { ObjectId } = require("mongodb");
const { UserModel } = require("../../models/Users/users.models.js");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const { CreateAccess } = require("../../libs/jwt.js");
const {
  ProveedoresModels,
} = require("../../models/Proveedores/provedores.models.js");
const { Employed_Model } = require("../../models/Users/employed.models.js");

const CorreoConfirmacion = async (userEmail) => {
  try {
    const mailOptions = {
      from: transporter.senderEmail,
      to: userEmail,
      subject: "Bienvenido a la aplicación",
      html: `
        <h1>Bienvenido a nuestra aplicación</h1>
        <p>Gracias por registrarte. Estamos emocionados de tenerte a bordo.</p>
        <img src="../../assets/img/LogoRc.png" alt="Logo de la aplicación" width="200" height="200">
        <p>¡Esperamos que disfrutes de tu experiencia!</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Correo enviado correctamente");
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
      <h1>Bienvenido a nuestra aplicación como rol Empleado</h1>
      <p>Estamos emocionados de tenerte a bordo, tu usuario y contraseña, asignados son los siguietes: </p>
      <p>Usuario: ${userEmail}</p>
      <p>Contraseña: ${password}</p>
      <img src="../../assets/img/LogoRc.png" alt="Logo de la aplicación" width="200" height="200">
      <p>¡Esperamos que tengas una excelente experiencia como Empleado!</p>
    `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Correo enviado correctamente");
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
      })
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
      console.log("Error: " + error);
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
      console.log(error);
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
      console.log(err);
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
      console.log(Token);
      res.cookie("token", Token, {
        sameSite: "none",
        secure: true,
      });
      res
        .status(200)
        .json({ message: "Bienvenido", result: Usuario, token: Token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Bad", error });
    } 
  }
  Logout(req, res, next) {
    res.cookie("token", "", { expires: new Date(0) });
    res.status(200).send("Sesión Cerrada");
  }
  async registerVerify(req, res, next) {
    const { email } = req.body;
    try {
      const verifyUser = await UserModel.findOne({ email: email });
      if (verifyUser)
        return res
          .status(409)
          .json({ message: "El usuario ya esta registrado" });
      res.status(200).json({ message: "Continuando con el registro" });
    } catch (error) {
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
    console.log(req.body);
    try {
      const passwordHash = await bycrypt.hash(password, 10);
      console.log(passwordHash);

      const comprobando = await ProveedoresModels.findOne({
        documento: documento,
      });
      if (comprobando) {
        console.log(comprobando);
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
      console.log(saveUser);

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
      console.log(error);
      return res.status(500).json({
        message: "A ocurrido un error",
        error: error,
      });
    } 
  }
  async VerifyToken(req, res, next) {
    try {
      const { token } = req.cookies;
      console.log(req.cookie);
      console.log("Estamos verificando el token: " + token);
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
        }).populate("categoriaServicio");
      }
      console.log("🐱‍👤 por aqui");
      console.log(user);
      return res.status(200).json({
        id: user._id,
        id_provider: user.roleRef._id,
        email: user.email,
        role: user.role,
        name: user.roleRef.nombre,
        cc: user.roleRef.documento,
        phone: user.roleRef.telefono,
        direction: user.roleRef.direccion,
        score: user.roleRef.id_calificacion,
        category: provider ? provider.categoriaServicio : "",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Bad", error });
    } 
  }
  async VerifyTokenMobile(req, res, next) {
    const { token } = req.body;
    try {
      console.log("Estamos verificando el token: " + token);
      if (!token) return res.status(400).json({ message: "Unauthorized 1" });

      const verify = await jwt.verify(token, process.env.SECRET_KEY);
      if (!verify) return res.status(400).json({ message: "Unauthorized 2" });

      const user = await UserModel.findById({
        _id: new ObjectId(verify.id),
      }).populate("roleRef");
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
      console.log(error);
      res.status(500).json({ message: "Bad", error });
    } 
  }
}
module.exports = { User_Controller };
