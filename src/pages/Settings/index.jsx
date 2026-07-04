import Header from '../../components/Header'
import './style.css'
import '../../components/Form/style.css'
import { Button } from '../../components/Button'
import { FileText, Home, Users } from 'lucide-react'
import { UserSettings } from '../../components/User'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useBudget } from '../../context/Budget'


export default function Settings() {
    const { setBudgetOpen } = useBudget()
    const navigate = useNavigate()

    const iconsMenu = [
        {
            title: 'Home',
            icon: Home,
            action: () => navigate('/')
        },
        {
            title: 'Novo orçamento',
            icon: FileText,
            action: () => setBudgetOpen(true)
        },
        {
            title: 'Novo cliente',
            icon: Users,
            action: () => navigate('/clients')
        },
    ]
    return (
        <div>
            <Header />
            <main className='settings-page'>
                <section className='settings-heading'>
                    <h1>Configurações</h1>
                    <p>Gerencie preferencias operacionais usadas no dia a dia do negocio.</p>
                </section>
                <UserSettings />

            </main>
            <Button.FixedMenu children={iconsMenu} />
        </div>
    )
}
