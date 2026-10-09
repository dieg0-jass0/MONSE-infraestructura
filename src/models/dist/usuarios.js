import { Schema, model } from "mongoose";

const usuarioSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    correo: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default model("Usuario", usuarioSchema);