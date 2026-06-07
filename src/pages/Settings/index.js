import Header from '../../components/Header'
import './style.css'
import '../../components/Form/style.css'
import { Button } from '../../components/Button'
import { FileText, Home, Users } from 'lucide-react'
import { UserSettings } from '../../components/User'

const iconsMenu = [
    {
        title: 'Home',
        icon: Home,
        path: '/'
    },
    {
        title: 'Novo orçamento',
        icon: FileText,
        path: '/budget/new'
    },
    {
        title: 'Novo cliente',
        icon: Users,
        path: '/clients'
    },
]

export default function Settings() {

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
