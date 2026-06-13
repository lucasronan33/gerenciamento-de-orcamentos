import { useEffect, useState } from 'react';
import { useBudget } from '../../../context/Budget'
import { Client } from '../Client';
import { Button } from '../../Button';
import { Contact, Mail, Minus, Phone, Plus, RefreshCcw, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientsRequest } from '../../../store/modules/client/actions';
import { Subtitle } from '../../Header/styles';
import { Card } from '../../DashboardsHeader/styles';
import { maskPhone } from '../../../utils/masks';
import { WhatsAppIcon } from '../../Icons/WhatsAppIcon';
import { CardIcons } from '../../Cards/styled';

export function BudgetContentClient() {
    const { isLoggedIn } = useSelector(state => state.auth)
    const { budget, setBudget } = useBudget()
    const [isRegister, setIsRegister] = useState(false)
    const { success, clients, isLoadingClients } = useSelector(state => state.client || {})
    const dispatch = useDispatch()
    const [clientActive, setClientActive] = useState(false)

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(fetchClientsRequest())
    }, [isLoggedIn, isRegister, success, dispatch])
    return (
        <>
            {!isRegister
                ? (!budget.client && (

                    <Button.Container>
                        <Button.Root onClick={() => setIsRegister(true)}  >Cadastrar novo Cliente</Button.Root>
                    </Button.Container>)
                ) : (<>
                    <Button.Container>
                        <Button.Root
                            className='btn-cancel'
                            onClick={() => setIsRegister(false)}
                        >
                            <Button.Icon icon={X} />
                            Cancelar
                        </Button.Root>
                    </Button.Container>
                    <Client.Register /></>
                )}
            {budget.client
                && (
                    <div
                        className='box-client'
                        onClick={() => !clientActive ? setClientActive(budget.client) : setClientActive(false)}
                    >
                        <label className='initials-client-name'>
                            {budget.client?.name && budget.client.name
                                .split(' ', 3)
                                .map(i => i[0].toUpperCase())
                                .join('')
                            }
                        </label>
                        <div className='container-client-infos'>
                            <h3>
                                {budget.client.name}
                            </h3>
                            {budget.client && clientActive._id === budget.client._id && (
                                <div className='container-contact-client column-client-list'>
                                    {budget.client.whatsapp && (
                                        <Subtitle className='title-list-clients phone-client'>
                                            <WhatsAppIcon className='contact-icon whatsapp-icon' />
                                            {maskPhone(budget.client?.whatsapp)}
                                        </Subtitle>)}
                                    {budget.client.phone && (
                                        <Subtitle className='title-list-clients phone-client'>
                                            <Phone className='contact-icon' />
                                            {maskPhone(budget.client?.phone)}
                                        </Subtitle>)}
                                    {budget.client.email && (
                                        <Subtitle className='title-list-clients phone-client'>
                                            <Mail className='contact-icon' />
                                            {budget.client.email}
                                        </Subtitle>)}
                                </div>
                            )}
                        </div>

                        <CardIcons className='icons-clients-list'>
                            <div
                                className='card-icon links'
                                onClick={() => setBudget(prev => {
                                    const copy = { ...prev }
                                    delete copy.client
                                    return copy
                                })}
                            >
                                <Minus />
                            </div>
                        </CardIcons>
                    </div>
                )}
            {!budget.client &&
                <Card className='hover-container'>
                    <Subtitle className='title-list-clients'>Clientes cadastrados</Subtitle>
                    <div className='container-clients'>
                        {isLoadingClients
                            ? <div className='box-client'>
                                <div className='box-client'>
                                    <span >
                                        <RefreshCcw size={30} />
                                        Carregando clientes...
                                    </span>
                                </div>
                            </div>
                            : clients.length > 0 ? clients.map((client, index) =>
                                <div
                                    className='box-client' key={index}
                                    onClick={() => !clientActive ? setClientActive(client) : setClientActive(false)}
                                >
                                    <label className='initials-client-name'>
                                        {client.name
                                            .split(' ', 3)
                                            .map(i => i[0].toUpperCase())
                                            .join('')
                                        }
                                    </label>
                                    <div className='container-client-infos'>
                                        <h3>
                                            {client.name}
                                        </h3>
                                        {budget.client && clientActive._id === client._id && (
                                            <div className='container-contact-client column-client-list'>
                                                {client.whatsapp && (
                                                    <Subtitle className='title-list-clients phone-client'>
                                                        <WhatsAppIcon className='contact-icon whatsapp-icon' />
                                                        {maskPhone(client?.whatsapp)}
                                                    </Subtitle>)}
                                                {client.phone && (
                                                    <Subtitle className='title-list-clients phone-client'>
                                                        <Phone className='contact-icon' />
                                                        {maskPhone(client?.phone)}
                                                    </Subtitle>)}
                                                {client.email && (
                                                    <Subtitle className='title-list-clients phone-client'>
                                                        <Mail className='contact-icon' />
                                                        {client.email}
                                                    </Subtitle>)}
                                            </div>
                                        )}
                                    </div >
                                    <CardIcons className='icons-clients-list'>
                                        <div
                                            className='card-icon links'
                                            onClick={() => {
                                                setIsRegister(false)
                                                setBudget(prev => ({
                                                    ...prev,
                                                    client: client
                                                }))
                                            }}
                                        >
                                            <Plus />
                                        </div>
                                    </CardIcons>
                                </div >
                            ) : (
                                <div className='box-client'>
                                    <span >
                                        <Contact size={30} />
                                        Nenhum cliente registrado ainda
                                    </span>
                                </div>
                            )
                        }
                    </div >


                </Card >}
        </>
    )
}