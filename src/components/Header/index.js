import React, { useState } from 'react'
import './style.css'
import { Container } from '../../styles/GlobalStyles'
import { FaPlus } from 'react-icons/fa'
import NewBudget from '../NewBudget'
import { Subtitle, Title } from './styles'
import { Button } from '../Button'

export default function Header() {
    const [newBudget, setNewBudget] = useState(false)

    console.log(newBudget)
    const handleBudget = () => {
        setNewBudget(true)
    }

    return (
        <div className='header'>
            <NewBudget isVisible={newBudget} />
            <div className='container'>
                <div className='container-logo-title'>
                    <div className='logo' />
                    <div className='container-title'>
                        <Title>
                            Gerenciamento de Orçamentos
                        </Title>
                        <Subtitle>
                            Crie e gerencie seus orçamentos de forma simples
                        </Subtitle>
                    </div>
                </div>
                <Button.Root className='button-header' onClick={handleBudget}>
                    <FaPlus />
                    Novo Orçamento
                </Button.Root>

            </div>
        </div>
    )
}