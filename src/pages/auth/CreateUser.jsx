import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Forms from "../../components/templates/Forms";
import { generarMensaje } from '../../utils/GenerarMensaje';
import UsuarioService from "../../services/UsuarioService";
import '../../style/pages/CreateUser.css'

const CreateUser = () => {
    const [form, setForm] = useState({ nombre: "", correo: "", contrasena: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.nombre || !form.correo || !form.contrasena) {
            generarMensaje('Completa todos los campos', 'warning');
            return;
        }

        setLoading(true);

        try {
            const usuario = {
                "nombre": form.nombre,
                "correo": form.correo,
                "contrasena": form.contrasena,
                rol: {
                    "id": 5
                }
            }
            const response = await UsuarioService.createUser(usuario);

            generarMensaje('Usuario creado!', 'success');

            // Redirigir al login después de crear usuario
            setTimeout(() => {
                navigate('/login');
            }, 800);

        } catch (error) {
            const msg = error.response?.data?.message || 'Error al crear usuario';
            generarMensaje(msg, 'error');
        } finally {
            setLoading(false);
        }
    };

    const createUserData = [
        {
            type: "text",
            text: [
                {
                    content: "Crear usuario",
                    variant: "h1",
                    className: "create-user-title",
                }
            ]
        },
        {
            type: "inputs",
            inputs: [
                {
                    type: "text",
                    placeholder: "Nombre usuario",
                    name: "nombre",
                    value: form.nombre,
                    onChange: handleChange,
                    required: true,
                    autoComplete: "off",
                    className: "create-user-input",
                },
                {
                    type: "email",
                    placeholder: "Correo Electrónico",
                    name: "correo",
                    value: form.correo,
                    onChange: handleChange,
                    required: true,
                    autoComplete: "off",
                    className: "create-user-input",
                },
                {
                    type: "password",
                    placeholder: "Contraseña",
                    name: "contrasena",
                    value: form.contrasena,
                    onChange: handleChange,
                    required: true,
                    autoComplete: "current-password",
                    className: "create-user-input",
                },
            ],
            className: "create-user-inputs"
        },
        {           
            type: "button",
            text: loading ? "Creando usuario..." : "Crear usuario",
            onClick: handleSubmit,
            disabled: loading,
            className: loading ? "create-user-button loading" : "create-user-button"
        },
        {
            type: "text",
            text: [
                {
                    content: (
                        <Link to="/login" className="create-user-link">
                            Ya tengo un usuario
                        </Link>
                    ),
                    variant: "p",
                    className: "create-user-text",
                },
            ],
        },
    ];

    return (
        <div className="create-user-page">
            <main className="create-user-container">
                <form onSubmit={handleSubmit} className="create-user-form">
                    <Forms content={createUserData} />
                </form>
            </main>
        </div>
    );
};

export default CreateUser;