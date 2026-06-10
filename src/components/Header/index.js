import React, { useEffect } from 'react'
import './style.css'
import { Plus } from 'lucide-react'
import NewBudget from '../NewBudget'
import { Subtitle, Title } from './styles'
import { Button } from '../Button'
import Sidebar from '../Sidebar'
import { useDispatch } from 'react-redux'
import { useBudget } from '../../context/Budget'

export default function Header() {
    const dispatch = useDispatch()
    const { budgetOpen, setBudgetOpen } = useBudget()
    useEffect(() => {

        if (!budgetOpen) {
            document.body.removeAttribute('style')
            return
        }
        if (budgetOpen) {
            document.body.style.overflow = 'hidden'
            return
        }
    }, [
        budgetOpen
    ])

    return (
        <div className='header'>
            {budgetOpen && (
                <NewBudget />
            )}
            <div className='container'>
                <div className='container-logo-title'>
                    <Sidebar />
                    <svg className='logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 406.9 349.07"><path className="cls-1" d="M368.46,209.77c-12.53-27.15-28.09-50.27-41.79-63.66-20.38-21.46-47.66-37.52-78.79-45.41-8-34.84-31.16-100.7-44-100.7s-36,65.86-44,100.7A165.37,165.37,0,0,0,87,140.18C71.89,151.79,53.09,178,38.45,209.77c-20.76,45-49.34,136.1-34.2,139.21,7.94,1.63,31.31-19.78,54.75-47a147.86,147.86,0,0,0,41,47.07c-7.6-8.29-11.87-17.62-11.87-27.49,0-11.84,6.14-22.91,16.81-32.33,20.31,11.37,57,19,98.92,19s78.62-7.6,98.93-19c10.67,9.42,16.81,20.49,16.81,32.33,0,9.88-4.28,19.21-11.88,27.51a148.24,148.24,0,0,0,40.69-46.51c23.26,26.94,46.36,48,54.24,46.42C417.79,345.87,389.21,254.77,368.46,209.77ZM111.21,245.21c-2.58,4.48-23.46-2.73-33.48-8.52s-16.05-14.11-13.46-18.58,16.19-9.28,26.21-3.5S113.8,240.73,111.21,245.21ZM330,236.69c-10,5.79-30.9,13-33.48,8.52s10.71-24.81,20.73-30.6,23.63-1,26.21,3.5S340,230.91,330,236.69Z" /></svg>
                    <div className='container-title'>
                        <Title>
                            Gerenciamento de Orçamentos
                        </Title>
                        <Subtitle>
                            Crie e gerencie seus orçamentos de forma simples
                        </Subtitle>
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
