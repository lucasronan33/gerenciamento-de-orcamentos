import React from 'react'
import './style.css'
import { Container } from '../../styles/GlobalStyles'

export default function Header() {

    return (
        <div className='header'>
            <Container>
                <div className='logo' />
                <div className='title'>
                    <h2>
                        <b>Gerenciamento de Orçamentos</b>
                    </h2>
                    <text>Crie e gerencie seus orçamentos de forma simples</text>
                </div>

                <button>Novo orçamento</button>
            </Container>
        </div>
    )
}