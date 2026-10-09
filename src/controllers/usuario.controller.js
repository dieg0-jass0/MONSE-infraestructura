import bcrypt from "bcryptjs";
import Usuario from "../models/dist/usuarios";

export const formRegistro = (req, res) => res.render("registro");
export const formLogin = (req, res) => res.render("login");

export const registrar = async (req, res) => {
  const { nombre, correo, clave } = req.body;
  if (!nombre?.trim() || !correo?.trim() || !clave || clave.length < 8) {
    return res.status(400).render("registro", {
      error: "Completa todo; la contraseña debe tener mínimo 8 caracteres",
    });
  }
  try {
    const passwordHash = await bcrypt.hash(clave, 12);
    await Usuario.create({ nombre, correo, passwordHash });
    res.redirect("/login");
  } catch (e) {
    console.log(e);
    const error = e.code === 11000 ? "Ese correo ya está registrado" : "Error al registrar";
    res.status(400).render("registro", { error });
  }
};

export const login = async (req, res, next) => {
  const { correo, clave } = req.body;
  const usuario = await Usuario.findOne({ correo: (correo || "").toLowerCase().trim() });
  const correcta = usuario && (await bcrypt.compare(clave || "", usuario.passwordHash));
  if (!correcta) {
    return res.status(401).render("login", { error: "Correo o contraseña incorrectos" });
  }
  req.session.regenerate((err) => {
    if (err) return next(err);
    req.session.usuario = { id: usuario._id.toString(), nombre: usuario.nombre };
    req.session.save((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  });
};

export const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
};