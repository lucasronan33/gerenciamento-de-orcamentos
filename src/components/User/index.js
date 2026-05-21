import validator from 'validator'
import { toast } from 'react-toastify';
import { UserAddress } from './UserAddress';
import { UserBasic } from './UserBasic';
import { UserPrivacy } from './UserPrivacy';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveIcon } from 'lucide-react';
import { Button } from '../Button';
import { FormBudget } from '../FormBudget';
import { NavBudget } from '../NewBudget/styles';
import { useUser } from '../../context/User';
import { updateUserRequest } from '../../store/modules/auth/actions';

export const UserSettings = () => {
    const { isLoading, isLoggedIn } = useSelector((state) => state.auth || {})
    const { user } = useUser()
    const dispatch = useDispatch()

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

    const validateUserData = (data) => {
        const errors = []

        if (!validator.isLength(data.name, { min: 2, max: 80 })) {
            errors.push(<div><strong> Nome: </strong>deve ter entre 2 e 80 caracteres.</div>)
        }

        if (!validator.isEmail(data.email)) {
            errors.push(<div><strong> Email: </strong>deve ser um e-mail valido.</div>)
        }

        if (data.password && !validator.isLength(data.password, { min: 6, max: 72 })) {
            errors.push(<div><strong> Senha: </strong>deve ter entre 6 e 72 caracteres.</div>)
        }

        // if (data.senha !== data.confirmarSenha) {
        //     errors.push(<div><strong> Senha: </strong>e confirmar senha devem ser iguais.</div>)
        // }

        if (data.phone && !validator.isLength(data.phone, { min: 10, max: 11 })) {
            errors.push(<div><strong> Telefone: </strong>deve conter DDD e ter 10 ou 11 digitos.</div>)
        }

        return errors
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const errors = validateUserData(user)

        if (errors.length > 0) {
            errors.forEach(value => toast.error(value, { autoClose: 5000, hideProgressBar: true }))
            return
        }

        if (isLoggedIn) {
            dispatch(updateUserRequest(user))
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