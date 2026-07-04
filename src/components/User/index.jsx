import validator from 'validator'
import { toast } from 'react-toastify';
import { UserAddress } from './UserAddress';
import { UserBasic } from './UserBasic';
import { UserPrivacy } from './UserPrivacy';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveIcon } from 'lucide-react';
import { Button } from '../Button';
import { Form } from '../Form';
import { NavBudget } from '../NewBudget/styles';
import { useUser } from '../../context/User';
import { updateUserRequest } from '../../store/modules/auth/actions';
import { isValidCpfCnpj } from '../../utils/documents';

export const UserSettings = () => {
    const { isLoading, isLoggedIn, user: dataUser } = useSelector((state) => state.auth || {})
    const { user, setUser } = useUser()
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
            errors.push({
                field: 'Nome',
                message: 'deve ter entre 2 e 80 caracteres.',
            })
        }

        if (!validator.isEmail(data.email)) {
            errors.push({
                field: 'Email',
                message: 'deve ser um e-mail valido.',
            })
        }

        if (data.password && !validator.isLength(data.password, { min: 8, max: 50 })) {
            errors.push({
                field: 'Senha',
                message: 'deve ter entre 8 e 50 caracteres.',
            })
        }

        if (data.password && !data.currentPassword) {
            errors.push({
                field: 'Senha atual',
                message: 'obrigatória para alterar senha.',
            })
        }

        if (data.currentPassword && !data.password) {
            errors.push({
                field: 'Nova senha',
                message: 'obrigatória para alterar senha.',
            })
        }

        if (data.phone && !validator.matches(data.phone, /^\d{11}$/)) {
            errors.push({
                field: 'Telefone',
                message: 'deve estar no formato (DD) 9 XXXX-XXXX.',
            })
        }

        if (data.cpf_cnpj && !/^\d+$/.test(data.cpf_cnpj)) {
            errors.push({
                field: 'CPF/CNPJ',
                message: 'deve conter apenas numeros.',
            })
        }

        if (data.cpf_cnpj && !isValidCpfCnpj(data.cpf_cnpj)) {
            errors.push({
                field: 'CPF/CNPJ',
                message: 'o cpf ou cnpj inserido nao e valido.',
            })
        }

        return errors
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!isLoggedIn) return
        const errors = validateUserData(user)

        if (errors.length > 0) {
            errors.forEach(value => toast.error(<div>
                <strong>{value.field}: </strong>{value.message} </div>,
                { autoClose: 5000, hideProgressBar: true }))
            return
        }

        dispatch(updateUserRequest(user))
        setUser((prev) => ({
            ...prev,
            password: '',
            currentPassword: '',
        }))
    }

    useEffect(() => {
        if (!isLoggedIn) return
        setUser(dataUser)
    }, [isLoggedIn, dataUser, setUser])

    return (

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

                <Form.Root >
                    {tabs.map((tab) => (
                        <div
                            key={tab.key}
                            className={`tab-budget-content ${active === tab.key ? 'content-budget-active' : ''}`}
                        >
                            {tab.component}
                        </div>
                    ))}
                </Form.Root>

                <Button.Container>
                    <Button.Root
                        className='btn-save'
                        type='submit'
                        disabled={isLoading} >
                        <Button.Icon icon={SaveIcon} />
                        {isLoading ? 'Salvando...' : 'Salvar'}
                    </Button.Root>
                </Button.Container>
            </form>
        </section >
    )
}
