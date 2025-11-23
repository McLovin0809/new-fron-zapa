import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Forms from '../components/templates/Forms';
import { generarMensaje } from '../utils/GenerarMensaje';
import UsuarioService from "../services/UsuarioService";
import '../style/pages/login.css'

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
            
            // guardamos el usuario en localStorage
            localStorage.setItem("user", JSON.stringify(response.data));
            
            generarMensaje('¡Bienvenido!', 'success');

            setTimeout(() => {
                navigate('/dashboard');
            }, 800);

        } catch (error) {
            const msg = error.response?.data?.message || 'Error al iniciar sesión';
            generarMensaje(msg, 'error');
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