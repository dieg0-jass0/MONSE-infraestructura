import Actividad from "../models/dist/actividad";

export const listar = async (req, res) => {
  const actividades = await Actividad.find({ usuario: req.session.usuario.id })
    .sort({ createdAt: -1 })
    .lean();
  res.render("index", { actividades });
};

export const agregar = async (req, res) => {
  const { nombre, descripcion, estado } = req.body;
  await Actividad.create({
    nombre,
    descripcion,
    estado: estado === "true",
    usuario: req.session.usuario.id,
  });
  res.redirect("/");
};

export const formEditar = async (req, res) => {
  const act = await Actividad.findOne({
    _id: req.params.id,
    usuario: req.session.usuario.id,
  }).lean();
  if (!act) return res.redirect("/");
  res.render("edit", { act });
};

export const editar = async (req, res) => {
  const { nombre, descripcion, estado } = req.body;
  await Actividad.findOneAndUpdate(
    { _id: req.params.id, usuario: req.session.usuario.id },
    { nombre, descripcion, estado: estado === "true" }
  );
  res.redirect("/");
};

export const eliminar = async (req, res) => {
  await Actividad.findOneAndDelete({
    _id: req.params.id,
    usuario: req.session.usuario.id,
  });
  res.redirect("/");
};