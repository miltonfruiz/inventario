import React, { useState, useEffect } from 'react';

interface Producto {
  id: number;
  nombre: string;
  cantidad: number;
}

const App: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/productos')
      .then(response => response.json())
      .then(data => setProductos(data));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('http://localhost:5000/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, cantidad }),
    })
      .then(response => response.json())
      .then(data => setProductos([...productos, data]));
  };

  const handleDelete = (id: number) => {
    fetch(`http://localhost:5000/productos/${id}`, { method: 'DELETE' })
      .then(() => setProductos(productos.filter(producto => producto.id !== id)));
  };

  return (
    <div>
      <h1>Inventario</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={event => setNombre(event.target.value)} />
        </label>
        <label>
          Cantidad:
          <input type="number" value={cantidad} onChange={event => setCantidad(parseInt(event.target.value))} />
        </label>
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            {producto.nombre} - {producto.cantidad}
            <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;