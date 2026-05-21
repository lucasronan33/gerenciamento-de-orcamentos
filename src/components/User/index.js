import validator from 'validator'
import { toast } from 'react-toastify';
import { UserAddress } from './UserAddress';
import { UserBasic } from './UserBasic';
import { UserPrivacy } from './UserPrivacy';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveIcon } from 'lucide-react';
import { Button } from '../Button';
import { FormBudget } from '../FormBudget';
import { NavBudget } from '../NewBudget/styles';
import { useUser } from '../../context/User';
import { updateUserRequest } from '../../store/modules/auth/actions';
import { isValidCpfCnpj } from '../../utils/documents';

export const UserSettings = () => {
    const { isLoading, isLoggedIn } = useSelector((state) => state.auth || {})
    const { user, fetchUser, setUser } = useUser()
    const dispatch = useDispatch()

    const [active, setActive] = useState('Básico')
    const options = [
        'Básico',
        'Endereço',
        'Privacidade',
    ]
    const tabs = [
        { key: 'Básico', component: <UserBasic user={user} /> },
        { key: 'Endereço', component: <UserAddress user={user} /> },
        { key: 'Privacidade', component: <UserPrivacy user={user} /> },
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

        if (data.password && !validator.isLength(data.password, { min: 8, max: 50 })) {
            errors.push(<div><strong> Senha: </strong>deve ter entre 8 e 50 caracteres.</div>)
        }

        if (data.password && !data.currentPassword) {
            errors.push(<div><strong> Senha atual: </strong>obrigatoria para alterar senha.</div>)
        }

        if (data.currentPassword && !data.password) {
            errors.push(<div><strong> Nova senha: </strong>obrigatoria ao informar a senha atual.</div>)
        }

        // if (data.senha !== data.confirmarSenha) {
        //     errors.push(<div><strong> Senha: </strong>e confirmar senha devem ser iguais.</div>)
        // }

        if (data.phone && !validator.matches(data.phone, /^\d{11}$/)) {
            errors.push(<div><strong> Telefone: </strong>deve estar no formato (DD) 9 XXXX-XXXX.</div>)
        }

        if (data.cpf_cnpj && !/^\d+$/.test(data.cpf_cnpj)) {
            errors.push(<div><strong> CPF/CNPJ: </strong>deve conter apenas numeros.</div>)
        }

        if (data.cpf_cnpj && !isValidCpfCnpj(data.cpf_cnpj)) {
            errors.push(<div><strong> CPF/CNPJ: </strong>o cpf ou cnpj inserido nao e valido.</div>)
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
            setUser((prev) => ({
                ...prev,
                password: '',
                currentPassword: '',
            }))
        }
    }

    useEffect(() => {
        async function getData() {
            const data = await fetchUser()
            console.log('render')
            setUser(data)
        }
        getData()
    }, [fetchUser, setUser])

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
