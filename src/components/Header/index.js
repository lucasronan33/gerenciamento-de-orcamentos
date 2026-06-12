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

export default function Header() {
    const { budgetOpen, setBudgetOpen, setBudget, initialState } = useBudget()
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

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
                    <div className='logo' ></div>
                    <div className='container-title'>
                        <Subtitle>
                            Bem-vindo ao ORCAmentos
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
