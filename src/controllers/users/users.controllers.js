const { ObjectId } = require("mongodb");
const { UserModel } = require("../../models/Users/users.models.js");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const { CreateAccess } = require("../../libs/jwt.js");
class User_Controller {
  Get(req, res, next) {
    UserModel.find({})
      .populate("Rols")
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "Error al obtener el permiso" });
      })
      .finally(() => next());
  }

  // //__________________________________________________________________________________________

  async GetById(req, res, next) {
    const id = req.params.id;

    try {
      const result = await UserModel.find({
        _id: new ObjectId(id),
      });

      res.status(200).send(result);
    } catch (error) {
      console.log("Error: " + error);
      res.status(500).json({ error: "Error al obtener el usuario" });
    } finally {
      next();
    }
  }

  //__________________________________________________________________________________________

  Post(req, res, next) {
    const result = new UserModel(req.body);
    result
      .save()
      .then((result) => res.status(201).json(result))
      .catch((error) =>
        res.status(500).json({
          error: "Error al agregar un permiso ",
          err: error.message,
        })
      )
      .finally(() => next());
  }

  //__________________________________________________________________________________________

  async Put(req, res, next) {
    const id = req.params.id;

    try {
      const result = await UserModel.findOneAndUpdate(
        { _id: new ObjectId(id) },
        req.body,
        { new: true }
      );
      if (result) {
        res.status(200).json({ message: "Permiso actualizado ", result });
      } else {
        res.status(500).json({ error: "Error al actualizar" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      next();
    }
  }

  //__________________________________________________________________________________________

  async Delete(req, res, next) {
    const id = req.params.id;

    try {
      const result = await UserModel.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (result) {
        res.status(200).send({ message: "Rol borrado con éxito" });
      } else {
        res.status(404).send({ error: "Rol no encontrado" });
      }
    } catch (error) {
      console.error("Error al eliminar el Rol -> " + error.message);
      res
        .status(500)
        .send({ error: "Error interno del servidor", err: error.message });
    } finally {
      next();
    }
  }
  async Login(req, res, next) {
    const { password, userName } = req.body;

    try {
      const Usuario = await UserModel.findOne({ userName: userName });
      if (!Usuario) return res.status(404).send("El usuario no existe");

      const Coincide = await bycrypt.compare(password, Usuario.password);
      if (!Coincide) return res.status(400).send("La contraseña es incorrecta");

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
      res.status(500).json({ message: "Bad", error: error });
    } finally {
      next();
    }
  }
  Logout(req, res, next) {
    res.cookie("token", "", { expires: new Date(0) });
    res.status(200).send("Sesión Cerrada");
    next();
  }
  async register(req, res, next) {
    const { password, userName } = req.body;

    try {
      const passwordHash = await bycrypt.hash(password, 10);
      const newUser = await UserModel({
        userName,
        password: passwordHash,
      });
      const UsuarioGuardado = await newUser.save();
      const Token = await CreateAccess({ id: UsuarioGuardado._id });
      console.log(Token);
      res.cookie("token", Token, {
        sameSite: "none",
        secure: true,
        httpOnly: true,
      });
      res
        .status(200)
        .json({
          message: "Usuario Registrado",
          result: UsuarioGuardado,
          token: Token,
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Bad", error: error });
    } finally {
      next();
    }
  }
  async VerifyToken(req, res, next) {
    const { token } = req.cookies;

    try {
      if (!token) return res.status(400).json({ message: "Unauthorized" });

      const verify = jwt.verify(token, process.env.SECRET_KEY);
      if (!verify) return res.status(400).json({ message: "Unauthorized" });

      const user = await UserModel.findById({ _id: new ObjectId(verify.id) });
      if (!user) return res.status(400).json({ message: "Unauthorized" });

      return res.status(200).json({
        id: user._id,
        email: user.userName,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Bad", error: error });
    } finally {
      next();
    }
  }
}
module.exports = { User_Controller };
