import { useState } from 'react'
import Header from '../../components/Header'
import './style.css'
import '../../components/FormBudget/style.css'
import { FormBudget } from '../../components/FormBudget'
import { NavBudget } from '../../components/NewBudget/styles'
import { Button } from '../../components/Button'
import { SettingsBase } from '../../components/SettingsBase'

export default function Settings() {
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

    return (
        <div>
            <Header />
            <main className='settings-page'>
                <section className='settings-heading'>
                    <h1>Configurações</h1>
                    <p>Gerencie preferencias operacionais usadas no dia a dia do negocio.</p>
                </section>

                <section >
                    <div className='container-settings'>
                        <NavBudget>
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
                    </div>
                </section>
            </main>
        </div>
    )
}
