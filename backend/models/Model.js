const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  categoria: { type: String }
});

const proveedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String },
  telefono: { type: String },
  email: { type: String }
});

const ventaSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
  cantidad: { type: Number, required: true },
  total: { type: Number, required: true }
});

const compraSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
  proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor' },
  cantidad: { type: Number, required: true },
  total: { type: Number, required: true }
});

const Producto = mongoose.model('Producto', productoSchema);
const Proveedor = mongoose.model('Proveedor', proveedorSchema);
const Venta = mongoose.model('Venta', ventaSchema);
const Compra = mongoose.model('Compra', compraSchema);

module.exports = { Producto, Proveedor, Venta, Compra };