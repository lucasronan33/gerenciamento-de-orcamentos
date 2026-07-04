import React, { useEffect } from 'react'
import './style.css'
import { Plus } from 'lucide-react'
import NewBudget from '../NewBudget'
import { Subtitle, Title } from './styles'
import { Button } from '../Button'
import Sidebar from '../Sidebar'
import { useBudget } from '../../context/Budget'
import { useDispatch, useSelector } from 'react-redux'
import { budgetReset } from '../../store/modules/budget/actions'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const { budgetOpen, setBudgetOpen, setBudget, initialState } = useBudget()
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        if (!budgetOpen) {
            document.body.removeAttribute('style')
            dispatch(budgetReset())
            setBudget(initialState)
            return
        }
        if (budgetOpen) {
            document.body.style.overflow = 'hidden'
            return
        }
    }, [
        budgetOpen,
        initialState,
        dispatch,
        setBudget
    ])

    return (
        <div className='header'>
            {budgetOpen && (
                <NewBudget />
            )}
            <div className='container'>
                <div className='container-logo-title'>
                    <Sidebar />
                    <div
                        className='logo'
                        onClick={() => navigate('/')}
                    />
                    <div className='container-title'>
                        <Subtitle className='subtitle-header'>
                            Bem-vindo ao ORCA
                        </Subtitle>
                        <Title>
                            {user.name}
                        </Title>
                    </div>
                </div>
                <Button.Root className='button-header' onClick={() => {
                    setBudgetOpen(true)
                }}>
                    <Plus />
                    Novo Orçamento
                </Button.Root>

            </div>
        </div>
    )
}
