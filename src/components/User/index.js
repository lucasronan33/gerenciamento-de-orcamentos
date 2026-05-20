import { toast } from 'react-toastify';
import { UserAddress } from './UserAddress';
import { UserBasic } from './UserBasic';
import { UserPrivacy } from './UserPrivacy';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SaveIcon } from 'lucide-react';
import { Button } from '../Button';
import { FormBudget } from '../FormBudget';
import { NavBudget } from '../NewBudget/styles';
import { update } from '../../services/axiosRoutes';
import { useSettings } from '../../context/Settings'
import { useUser } from '../../context/User';

export const UserSettings = () => {
    const { isLoading } = useSelector(state => state.auth || {})
    const { settings } = useSettings()
    const { user, fetchUser } = useUser()
    const [userConfig, setUserConfig] = useState({})

    const [active, setActive] = useState('Básico')
    const options = [
        'Básico',
        'Endereço',
        'Privacidade',
    ]
    const tabs = [
        { key: 'Básico', component: <UserBasic /> },
        { key: 'Endereço', component: <UserAddress /> },
        { key: 'Privacidade', component: <UserPrivacy /> },
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
            toast.error(error)
        }

    }

    return (

        <section >
            <form
                className='container-settings'
                onSubmit={handleSubmit}
            >
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
        </section >
    )
}