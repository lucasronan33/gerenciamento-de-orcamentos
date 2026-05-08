import React, { useEffect, useState } from 'react'
import './style.css'
import { FaPlus } from 'react-icons/fa'
import NewBudget from '../NewBudget'
import { Subtitle, Title } from './styles'
import { Button } from '../Button'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../services/axios'
import Sidebar from '../Sidebar'

export default function Header(props) {
    const [newBudget, setNewBudget] = useState(false)
    const [budgetData, setBudgetData] = useState(null)
    const { id } = useParams()
    const isNew = id === 'new'
    const isView = id === 'view'

    const navigate = useNavigate()

    const handleIsVisible = () => {
        setNewBudget(false)
        setBudgetData(null)
        navigate('/')
        document.body.removeAttribute('style')
    }
    useEffect(() => {

        if (isNew) {
            setNewBudget(true)
            setBudgetData(null)
            document.body.style.overflow = 'hidden'
            return
        }

        async function getData() {
            try {
                if (id) {
                    const { data } = await axios.get(`/budgets/${id}`)
                    setBudgetData(data)
                    setNewBudget(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getData()

        if (!id) return
    }, [id, isNew, isView])

    return (
        <div className='header'>
            <NewBudget
                isVisible={newBudget}
                handleIsVisible={handleIsVisible}
                budgetData={budgetData}
                isNew={isNew}
                id={id}
                key={id}
                {...props} />
            <div className='container'>
                <div className='container-logo-title'>
                    <Sidebar />
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
                <Button.Root className='button-header' onClick={() => navigate('budget/new')}>
                    <FaPlus />
                    Novo Orçamento
                </Button.Root>

            </div>
        </div>
    )
}
