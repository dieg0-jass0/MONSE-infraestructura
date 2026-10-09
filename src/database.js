import mongoose from "mongoose";

try {
  process.loadEnvFile();
} catch (error) {
  console.error("no se pudo leer el archivo .env", error.message);
}

mongoose.connect(process.env.URI_MONGODB)
  .then(() => console.log("mongodb conectado"))
  .catch((error) => console.error("error al conectar con mongodb", error.message));