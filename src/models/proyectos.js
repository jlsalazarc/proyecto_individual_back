const { Schema, model, models } = require('mongoose');

const proyectoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El campo nombre es requerido.'],
    minlength: [5 , 'El nombre es muy corto.'],
    maxlength: 15
  },
  descripcion: {
    type: String,
    required: 'El campo descripción es requerido.',
    min: 1,
    max: 5000,
  },
  objetivo: {
    type: String,
    required: 'El campo objetivo es requerido.',
    min: 1,
    max: 5000,
  },
  fechaLanzamiento: {
    type: Date,
    default: new Date(),
  },
  salesman: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }

}, {
  timestamps: true,
});

const Proyecto = model('Proyecto', proyectoSchema);

module.exports = Proyecto;
