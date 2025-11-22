import axios from 'axios';

const BASE_URL = 'https://backend-zapa.onrender.com/api/productos'; 

class ProductosService {
    getAllProductos() {
        return axios.get(BASE_URL);
    }

    getProductoById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    createProducto(producto) {
        return axios.post(BASE_URL, producto);
    }

    updateProducto(id, producto) {
        return axios.put(`${BASE_URL}/${id}`, producto);
    }

    updateProductoParcial(id, cambios) {
        return axios.patch(`${BASE_URL}/${id}`, cambios);
    }

    deleteProducto(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }

    buscarPorMarca(nombreMarca) {
        return axios.get(`${BASE_URL}/marca/${nombreMarca}`);
    }

    buscarPorCategoria(nombreCategoria) {
        return axios.get(`${BASE_URL}/categoria/${nombreCategoria}`);
    }

    buscarPorGenero(nombreGenero) {
        return axios.get(`${BASE_URL}/genero/${nombreGenero}`);
    }

    buscarPorRangoDePrecio(min, max) {
        return axios.get(`${BASE_URL}/precio?min=${min}&max=${max}`);
    }

    buscarConDescuento(minimo) {
        return axios.get(`${BASE_URL}/descuento/${minimo}`);
    }
}

export default new ProductosService();
