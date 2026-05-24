import { SaveIcon } from 'lucide-react';
import { FormBudget } from '..';
import { useSelector } from 'react-redux';
import { Button } from '../../Button';
import { Card } from '../../DashboardsHeader/styles';
import { NavBudget } from '../../NewBudget/styles';
import { useState } from 'react';
import { CLientAddress } from './ClientAddress';
import { ClientInfo } from './ClientInfo';

export function ClientRegister() {
    const { isLoading } = useSelector(state => state.auth || {})
    const [active, setActive] = useState('Inf. Básicas')
    const options = [
        'Inf. Básicas',
        'Endereço',
    ]
    const tabs = [
        { key: 'Inf. Básicas', component: <ClientInfo /> },
        { key: 'Endereço', component: <CLientAddress /> },
    ]

    const handleButtonActive = (option) => {
        setActive(option)
    }
    return (
        <Card className='hover-container'>
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
                    {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                </Button.Root>
            </Button.Container>
        </Card>
    )
}