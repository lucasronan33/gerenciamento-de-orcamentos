import React from "react";
import { Nav } from "./styles";
import { FaHome, FaSignInAlt, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {

    const botaoClickado = useSelector(state => state.example.botaoClickado)

    return (
        <Nav>
            <Link to="/">
                <FaHome size={24} />
            </Link>
            <Link to="/login">
                <FaUserAlt size={24} />
            </Link>
            <Link to="/logout">
                <FaSignInAlt size={24} />
            </Link>
            {botaoClickado ? 'Clickado' : 'Não clickado'}
        </Nav>
    )
}