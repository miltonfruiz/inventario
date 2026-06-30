class Inventario {
  constructor() {
    this.productos = [];
  }

  crearProducto(nombre, cantidad, precio) {
    const producto = {
      nombre,
      cantidad,
      precio
    };
    this.productos.push(producto);
    return producto;
  }

  leerProductos() {
    return this.productos;
  }

  actualizarProducto(nombre, cantidad, precio) {
    const productoIndex = this.productos.findIndex(p => p.nombre === nombre);
    if (productoIndex !== -1) {
      this.productos[productoIndex].cantidad = cantidad;
      this.productos[productoIndex].precio = precio;
      return this.productos[productoIndex];
    } else {
      return null;
    }
  }

  eliminarProducto(nombre) {
    const productoIndex = this.productos.findIndex(p => p.nombre === nombre);
    if (productoIndex !== -1) {
      this.productos.splice(productoIndex, 1);
      return true;
    } else {
      return false;
    }
  }
}

const inventario = new Inventario();

function crear() {
  const nombre = 'Producto 1';
  const cantidad = 10;
  const precio = 100;
  const producto = inventario.crearProducto(nombre, cantidad, precio);
  console.log(`Producto creado: ${JSON.stringify(producto)}`);
}

function leer() {
  const productos = inventario.leerProductos();
  console.log(`Productos: ${JSON.stringify(productos)}`);
}

function actualizar() {
  const nombre = 'Producto 1';
  const cantidad = 20;
  const precio = 200;
  const producto = inventario.actualizarProducto(nombre, cantidad, precio);
  console.log(`Producto actualizado: ${JSON.stringify(producto)}`);
}

function eliminar() {
  const nombre = 'Producto 1';
  const resultado = inventario.eliminarProducto(nombre);
  console.log(`Producto eliminado: ${resultado}`);
}

crear();
leer();
actualizar();
leer();
eliminar();
leer();