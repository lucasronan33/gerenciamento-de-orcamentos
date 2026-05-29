import { SaveIcon } from 'lucide-react';
import { FormBudget } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../Button';
import { NavBudget } from '../../NewBudget/styles';
import { useEffect, useState } from 'react';
import { ClientAddress } from './ClientAddress';
import { ClientInfo } from './ClientInfo';
import validator from 'validator'
import { clientReset, fetchClientsRequest, registerClientRequest } from '../../../store/modules/client/actions';
import { isValidCpfCnpj } from '../../../utils/documents';
import { toast } from 'react-toastify';
import { useClient } from '../../../context/Client';

export function ClientRegister() {
    const { client } = useClient()
    const { isLoggedIn } = useSelector(state => state.auth || {})
    const { isLoading, success } = useSelector(state => state.client || {})
    const dispatch = useDispatch()
    const [active, setActive] = useState('Inf. Básicas')
    const options = [
        'Inf. Básicas',
        'Endereço',
    ]
    const tabs = [
        { key: 'Inf. Básicas', component: <ClientInfo /> },
        { key: 'Endereço', component: <ClientAddress /> },
    ]

    const handleButtonActive = (option) => {
        setActive(option)
    }

    const validateClientData = (data) => {
        const errors = []

        if (!data.name || !validator.isLength(data.name, { min: 2, max: 80 })) {
            errors.push({
                field: 'Nome',
                message: 'deve ter entre 2 e 80 caracteres.'
            })
        }

        if (!data.phone || !validator.matches(data.phone, /^\d{11}$/)) {
            errors.push({
                field: 'Telefone',
                message: 'deve estar no formato (DD) 9 XXXX-XXXX.'
            })
        }

        if (data.email && !validator.isEmail(data.email)) {
            errors.push({
                field: 'Email',
                message: 'deve ser um e-mail valido.'
            })
        }

        if (data.cpf_cnpj && !/^\d+$/.test(data.cpf_cnpj)) {
            errors.push({
                field: 'CPF/CNPJ',
                message: 'deve conter apenas numeros.'
            })
        }

        if (data.cpf_cnpj && !isValidCpfCnpj(data.cpf_cnpj)) {
            errors.push({
                field: 'CPF / CNPJ',
                message: 'o cpf ou cnpj inserido nao e valido.'
            })
        }

        return errors
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const errors = validateClientData(client)

        if (errors.length > 0) {
            errors.forEach(value => toast.error(<div>
                <strong>{value.field}: </strong>{value.message} </div>,
                { autoClose: 5000, hideProgressBar: true }))
            return
        }

        if (!isLoggedIn) {
            toast.error('Você precisa estar logado para cadastrar/atualizar um cliente!')
            return
        }
        dispatch(registerClientRequest(client))
    }

    useEffect(() => {
        if (success) {
            dispatch(clientReset())
        }
    }, [success, dispatch])

    useEffect(() => {
        return () => {
            dispatch(clientReset())
        }
    }, [dispatch])
    return (
        <form
            onSubmit={handleSubmit}
            className='container-settings'
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
                    disabled={isLoading} >
                    <Button.Icon icon={SaveIcon} />
                    {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                </Button.Root>
            </Button.Container>
        </form>
    )
}