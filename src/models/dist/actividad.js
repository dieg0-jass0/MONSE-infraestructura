import { Schema, model } from "mongoose";

const actividad = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true },
    estado: { type: Boolean, default: false },
    usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  },
  { timestamps: true, versionKey: false }
);

// el nombre sigue siendo único, pero por usuario
actividad.index({ usuario: 1, nombre: 1 }, { unique: true });

export default model("actividad", actividad);