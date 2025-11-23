import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Forms from "../../components/templates/Forms";
import { generarMensaje } from '../../utils/GenerarMensaje';
import UsuarioService from "../../services/UsuarioService";
import '../../style/pages/login.css'

const Login = () => {
    const [form, setForm] = useState({ email: "", clave: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.clave) {
            generarMensaje('Completa todos los campos', 'warning');
            return;
        }

        setLoading(true);

        try {
            const response = await UsuarioService.login(form);
            const { token, nombre, rol } = response.data;

            // GUARDAR EN LOCALSTORAGE (mejorado)
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({ nombre, rol, email: form.email }));

            // MENSAJE DE BIENVENIDA PERSONALIZADO
            generarMensaje(`¡Bienvenido ${nombre}!`, 'success');

            // REDIRECCIÓN SEGÚN ROL (mejorado)
            setTimeout(() => {
                if (rol.id === 2 || rol.id === 3) {
                    navigate('/admin/dashboard');
                } else if (rol.id === 5) {
                    navigate('/dashboard');
                } else {
                    navigate('/dashboard'); // Ruta por defecto
                }
            }, 1500);

        } catch (error) {
            const msg = error.response?.data?.message || 'Error al iniciar sesión';
            generarMensaje(msg, 'error');
            
            // Limpiar formulario en caso de error
            setForm({ email: "", clave: "" });
        } finally {
            setLoading(false);
        }
    };

    const loginData = [
        {
            type: "text",
            text: [
                {
                    content: "Inicio de Sesión",
                    variant: "h1",
                    className: "login-title",
                }
            ]
        },
        {
            type: "inputs",
            inputs: [
                {
                    type: "email",
                    placeholder: "Correo Electrónico",
                    name: "email",  
                    value: form.email,
                    onChange: handleChange,
                    required: true,
                    autoComplete: "off",
                    className: "login-input",
                },
                {
                    type: "password",
                    placeholder: "Contraseña",
                    name: "clave",   
                    value: form.clave,
                    onChange: handleChange,
                    required: true,
                    autoComplete: "current-password",
                    className: "login-input",
                },
            ],
            className: "login-inputs"
        },
        {           
            type: "button",
            text: loading ? "Iniciando..." : "Iniciar Sesión",
            onClick: handleSubmit,
            disabled: loading,
            className: loading ? "login-button loading" : "login-button"
        },
        {
            type: "text",
            text: [
                {
                    content: (
                        <Link to="/CreateUser" className="login-link">
                            Crear usuario
                        </Link>
                    ),
                    variant: "p",
                    className: "login-text",
                },
            ],
        },
        {
            type: "text",
            text: [
                {
                    content: (
                        <Link to="/forgot-password" className="login-link">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    ),
                    variant: "p",
                    className: "login-text",
                },
            ],
        },
    ];

    return (
        <div className="login-page">
            <main className="login-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <Forms content={loginData} />
                </form>
            </main>
        </div>
    );
};

export default Login;