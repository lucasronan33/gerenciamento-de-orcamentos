import React, { useState } from 'react'
import './style.css'
import { Container } from '../../styles/GlobalStyles'
import { FaPlus } from 'react-icons/fa'
import NewBudget from '../NewBudget'
import { Subtitle, Title } from './styles'
import { Button } from '../Button'
import { BudgetProvider } from '../BudgetContext'

export default function Header(props) {
    const [newBudget, setNewBudget] = useState(false)

    const handleBudget = () => {
        setNewBudget(true)
        document.body.style.overflow = 'hidden'
    }
    const handleIsVisible = () => {
        setNewBudget(false)
        document.body.removeAttribute('style')
    }

    return (
        <div className='header'>
            <BudgetProvider>
                <NewBudget isVisible={newBudget} handleIsVisible={handleIsVisible} {...props} />
            </BudgetProvider>
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