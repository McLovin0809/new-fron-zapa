import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';   // si quieres enlazar a detalles o edición
import ProductoService from '../../services/ProductoService.jsx';

const ProductosList = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = () => {
        ProductoService.getAllProductos()
            .then(response => {
                setProductos(response.data);
            })
            .catch(error => {
                console.log('Error fetching productos:', error);
            });
    };

    return (
        <div>
            <h2>Productos List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.idProducto}>
                            <td>{producto.nombre}</td>
                            <td>${producto.precio}</td>
                            <td>{producto.stock}</td>
                            <td>
                                {/* Ejemplo de enlaces a otras rutas */}
                                <Link to={`/productos/${producto.idProducto}`}>Ver</Link> |{" "}
                                <Link to={`/productos/edit/${producto.idProducto}`}>Editar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductosList;
