import { Router } from "express";
import { requiereLogin } from "../middlewares/auth";
import { validarTokenCSRF } from "../middlewares/csrf";
import * as act from "../controllers/actividad.controller";
import * as usr from "../controllers/usuario.controller";

const router = Router();

router.get("/registro", usr.formRegistro);
router.post("/registro", validarTokenCSRF, usr.registrar);
router.get("/login", usr.formLogin);
router.post("/login", validarTokenCSRF, usr.login);
router.post("/logout", validarTokenCSRF, usr.logout);

router.get("/", requiereLogin, act.listar);
router.post("/actividad/add", requiereLogin, validarTokenCSRF, act.agregar);
router.get("/edit/:id", requiereLogin, act.formEditar);
router.post("/edit/:id", requiereLogin, validarTokenCSRF, act.editar);
router.post("/delete/:id", requiereLogin, validarTokenCSRF, act.eliminar);

router.get("/about", (req, res) => res.render("about"));
router.get("/lista", (req, res) => res.redirect("/"));

export default router;