import "dotenv/config";
import express from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import indexRouter from "./routes/index.routes";
import { generarTokenCSRF } from "./middlewares/csrf";

const app = express();

app.set("views", path.join(__dirname, "views"));
app.engine("hbs", engine({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: MongoStore.create({
      mongoUrl: process.env.URI_MONGODB,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 30,
      secure: process.env.NODE_ENV === "production",
    },
  })
);

app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario;
  next();
});
app.use(generarTokenCSRF);
app.use(indexRouter);

export default app;