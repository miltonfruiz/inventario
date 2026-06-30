// Importaciones necesarias
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Conexión a la base de datos
mongoose.connect('mongodb://localhost/inventario', { useNewUrlParser: true, useUnifiedTopology: true });

// Esquema y modelo para los productos
const productoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  cantidad: Number,
  precio: Number
});
const Producto = mongoose.model('Producto', productoSchema);

// Esquema y modelo para los usuarios
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String
});
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Función para generar token
const generarToken = (usuario) => {
  return jwt.sign({ id: usuario._id }, 'secretkey', { expiresIn: '1h' });
};

// Función para verificar token
const verificarToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Acceso denegado. No tiene token');
  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.usuario = decoded;
    next();
  } catch (ex) {
    return res.status(400).send('Token inválido');
  }
};

// Rutas protegidas con JWT
const app = express();
app.use(express.json());

// Registro de usuarios
app.post('/api/usuarios', async (req, res) => {
  const { nombre, email, password } = req.body;
  const usuario = new Usuario({ nombre, email, password: bcrypt.hashSync(password, 10) });
  await usuario.save();
  const token = generarToken(usuario);
  res.send({ token });
});

// Inicio de sesión
app.post('/api/inicio-sesion', async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(400).send('Usuario no encontrado');
  if (!bcrypt.compareSync(password, usuario.password)) return res.status(400).send('Contraseña incorrecta');
  const token = generarToken(usuario);
  res.send({ token });
});

// Ruta protegida para obtener productos
app.get('/api/productos', verificarToken, async (req, res) => {
  const productos = await Producto.find();
  res.send(productos);
});

// Ruta protegida para crear productos
app.post('/api/productos', verificarToken, async (req, res) => {
  const { nombre, descripcion, cantidad, precio } = req.body;
  const producto = new Producto({ nombre, descripcion, cantidad, precio });
  await producto.save();
  res.send(producto);
});

// Ruta protegida para actualizar productos
app.put('/api/productos/:id', verificarToken, async (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion, cantidad, precio } = req.body;
  const producto = await Producto.findByIdAndUpdate(id, { nombre, descripcion, cantidad, precio }, { new: true });
  res.send(producto);
});

// Ruta protegida para eliminar productos
app.delete('/api/productos/:id', verificarToken, async (req, res) => {
  const id = req.params.id;
  await Producto.findByIdAndRemove(id);
  res.send({ mensaje: 'Producto eliminado' });
});

// Iniciar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});