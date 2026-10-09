import crypto from "crypto";

export const generarTokenCSRF = (req, res, next) => {
  if (!req.session.csrfToken) {
    req.session.csrfToken = crypto.randomBytes(32).toString("hex");
  }
  res.locals.csrfToken = req.session.csrfToken;
  next();
};

export const validarTokenCSRF = (req, res, next) => {
  const token = req.body._csrf;
  const esperado = req.session.csrfToken;
  if (
    !token ||
    !esperado ||
    token.length !== esperado.length ||
    !crypto.timingSafeEqual(Buffer.from(token), Buffer.from(esperado))
  ) {
    return res.status(403).send("Token CSRF inválido");
  }
  next();
};