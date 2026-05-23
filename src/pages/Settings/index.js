import { useState } from 'react'
import Header from '../../components/Header'
import './style.css'
import '../../components/FormBudget/style.css'
import { FormBudget } from '../../components/FormBudget'
import { NavBudget } from '../../components/NewBudget/styles'
import { Button } from '../../components/Button'
import { SettingsBase } from '../../components/SettingsBase'
import { SaveIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useSettings } from '../../context/Settings'
import { update } from '../../services/axiosRoutes'
import { toast } from 'react-toastify'
import { UserSettings } from '../../components/User'
import { normalizeErrors } from '../../store/modules/auth/sagas'

export default function Settings() {
    const { isLoading } = useSelector(state => state.auth || {})
    const { settings } = useSettings()

    const [active, setActive] = useState('Atendimento')
    const options = [
        'Atendimento',
        'Serviços',
        'Máquinas',
    ]
    const tabs = [
        { key: 'Atendimento', component: <SettingsBase.Service /> },
        { key: 'Serviços', component: <></> },
        { key: 'Máquinas', component: <></> },
    ]

    const handleButtonActive = (option) => {
        setActive(option)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formErrors = []

        // bloco de condições de erros
        // services não tem nenhuma verificação inicial

        if (formErrors.length > 0) return console.log(formErrors)

        try {
            await update(`/user/settings`, settings)
            toast.success('Configurações salvas com sucesso')
        } catch (error) {
            normalizeErrors(error).forEach((message) => toast.error(message))
        }

    }

    return (
        <div>
            <Header />
            <main className='settings-page'>
                <section className='settings-heading'>
                    <h1>Configurações</h1>
                    <p>Gerencie preferencias operacionais usadas no dia a dia do negocio.</p>
                </section>

                <section >
                    <form
                        className='container-settings'
                        onSubmit={handleSubmit}
                    >
                        <NavBudget className='nav-settings'>
                            {options.map((item) => (
                                <Button.Root
                                    key={item}
                                    onClick={() => handleButtonActive(item)}
                                    className={`button-nav-budget ${active === item ? 'active' : ''}`}
                                >
                                    {item}
                                </Button.Root>
                            ))}
                        </NavBudget>

                        <FormBudget.Root >
                            {tabs.map((tab) => (
                                <div
                                    key={tab.key}
                                    className={`tab-budget-content ${active === tab.key ? 'content-budget-active' : ''}`}
                                >
                                    {tab.component}
                                </div>
                            ))}
                        </FormBudget.Root>

                        <Button.Container>
                            <Button.Root
                                className='btn-save'
                                type='submit'
                                disabled={isLoading}
                                onClick={() => {

                                }} >
                                <Button.Icon icon={SaveIcon} />
                                {isLoading ? 'Salvando...' : 'Salvar'}
                            </Button.Root>
                        </Button.Container>
                    </form>
                </section>

                <UserSettings />

            </main>
        </div>
    )
}
