import { useEffect, useState } from 'react';
// import { useBudget } from '../../../context/Budget'
import { Client } from '../Client';
import { Button } from '../../Button';
import { Contact, Mail, Minus, Phone, Plus, RefreshCcw, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
// import { useClient } from '../../../context/Client';
import { fetchClientsRequest } from '../../../store/modules/client/actions';
import { Subtitle } from '../../Header/styles';
import { Card } from '../../DashboardsHeader/styles';
import { maskPhone } from '../../../utils/masks';
import { WhatsAppIcon } from '../../Icons/WhatsAppIcon';
import { CardIcons } from '../../Cards/styled';

export function BudgetContentClient() {
    const { isLoggedIn } = useSelector(state => state.auth)
    // const { budget, updateBudget, setBudget } = useBudget()
    const [isRegister, setIsRegister] = useState(false)
    const { success, clients, isLoadingClients } = useSelector(state => state.client || {})
    const dispatch = useDispatch()
    // const { setClient } = useClient()
    const [clientSelected, setClientSelected] = useState(false)
<<<<<<< HEAD
=======
    const [clientActive, setClientActive] = useState(false)
>>>>>>> feature-items

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(fetchClientsRequest())
    }, [isLoggedIn, isRegister, success, dispatch])
    return (
        <>
            {!isRegister
                ? (!clientSelected && (

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
            {clientSelected
<<<<<<< HEAD
                && <div className='box-client'>
                    <label className='initials-client-name'>
                        {clientSelected.name
                            .split(' ', 3)
                            .map(i => i[0].toUpperCase())
                            .join('')
                        }
                    </label>
                    <div className='container-client-infos'>
                        <h3>
                            {clientSelected.name}
                        </h3>
                        <div className='container-contact-client'>
                            {clientSelected.whatsapp && (
                                <Subtitle className='title-list-clients phone-client'>
                                    <WhatsAppIcon className='contact-icon whatsapp-icon' />
                                    {maskPhone(clientSelected?.whatsapp)}
                                </Subtitle>)}
                            {clientSelected.phone && (
                                <Subtitle className='title-list-clients phone-client'>
                                    <Phone className='contact-icon' />
                                    {maskPhone(clientSelected?.phone)}
                                </Subtitle>)}
                            {clientSelected.email && (
                                <Subtitle className='title-list-clients phone-client'>
                                    <Mail className='contact-icon' />
                                    {clientSelected.email}
                                </Subtitle>)}
                        </div>
                    </div>
                    <CardIcons className='icons-clients-list'>
                        <div
                            className='card-icon links'
                            onClick={() => setClientSelected(false)}
                        >
                            <Minus />
                        </div>
                    </CardIcons>
                </div>
            }
            {!clientSelected &&
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
                                <div className='box-client' key={index}>
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
                                        <div className='container-contact-client'>
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
                                    </div>
                                    <CardIcons className='icons-clients-list'>
                                        <div
                                            className='card-icon links'
                                            onClick={() => setClientSelected(client)}
                                        >
                                            <Plus />
                                        </div>
                                    </CardIcons>
                                </div>
                            ) : (
                                <div className='box-client'>
                                    <span >
                                        <Contact size={30} />
                                        Nenhum cliente registrado ainda
                                    </span>
                                </div>
                            )}
                    </div>


                </Card>}
            {!isRegister
                ? (!clientSelected && (

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
            {clientSelected
                && <div className='box-client'>
                    <label className='initials-client-name'>
                        {clientSelected.name
                            .split(' ', 3)
                            .map(i => i[0].toUpperCase())
                            .join('')
                        }
                    </label>
                    <div className='container-client-infos'>
                        <h3>
                            {clientSelected.name}
                        </h3>
                        <div className='container-contact-client'>
                            {clientSelected.whatsapp && (
                                <Subtitle className='title-list-clients phone-client'>
                                    <WhatsAppIcon className='contact-icon whatsapp-icon' />
                                    {maskPhone(clientSelected?.whatsapp)}
                                </Subtitle>)}
                            {clientSelected.phone && (
                                <Subtitle className='title-list-clients phone-client'>
                                    <Phone className='contact-icon' />
                                    {maskPhone(clientSelected?.phone)}
                                </Subtitle>)}
                            {clientSelected.email && (
                                <Subtitle className='title-list-clients phone-client'>
                                    <Mail className='contact-icon' />
                                    {clientSelected.email}
                                </Subtitle>)}
                        </div>
                    </div>
                    <CardIcons className='icons-clients-list'>
                        <div
                            className='card-icon links'
                            onClick={() => setClientSelected(false)}
                        >
                            <Minus />
                        </div>
                    </CardIcons>
                </div>
            }
=======
                && (
                    <div
                        className='box-client'
                        onClick={() => !clientActive ? setClientActive(clientSelected) : setClientActive(false)}
                    >
                        <label className='initials-client-name'>
                            {clientSelected.name
                                .split(' ', 3)
                                .map(i => i[0].toUpperCase())
                                .join('')
                            }
                        </label>
                        <div className='container-client-infos'>
                            <h3>
                                {clientSelected.name}
                            </h3>
                            {clientActive._id === clientSelected._id && (
                                <div className='container-contact-client column-client-list'>
                                    {clientSelected.whatsapp && (
                                        <Subtitle className='title-list-clients phone-client'>
                                            <WhatsAppIcon className='contact-icon whatsapp-icon' />
                                            {maskPhone(clientSelected?.whatsapp)}
                                        </Subtitle>)}
                                    {clientSelected.phone && (
                                        <Subtitle className='title-list-clients phone-client'>
                                            <Phone className='contact-icon' />
                                            {maskPhone(clientSelected?.phone)}
                                        </Subtitle>)}
                                    {clientSelected.email && (
                                        <Subtitle className='title-list-clients phone-client'>
                                            <Mail className='contact-icon' />
                                            {clientSelected.email}
                                        </Subtitle>)}
                                </div>
                            )}
                        </div>

                        <CardIcons className='icons-clients-list'>
                            <div
                                className='card-icon links'
                                onClick={() => setClientSelected(false)}
                            >
                                <Minus />
                            </div>
                        </CardIcons>
                    </div>
                )}
>>>>>>> feature-items
            {!clientSelected &&
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
<<<<<<< HEAD
                                <div className='box-client' key={index}>
=======
                                <div
                                    className='box-client' key={index}
                                    onClick={() => !clientActive ? setClientActive(client) : setClientActive(false)}
                                >
>>>>>>> feature-items
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
<<<<<<< HEAD
                                        <div className='container-contact-client'>
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
=======
                                        {clientActive._id === client._id && (
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
>>>>>>> feature-items
                                    </div>
                                    <CardIcons className='icons-clients-list'>
                                        <div
                                            className='card-icon links'
<<<<<<< HEAD
                                            onClick={() => setClientSelected(client)}
=======
                                            onClick={() => {
                                                setIsRegister(false)
                                                setClientSelected(client)
                                            }}
>>>>>>> feature-items
                                        >
                                            <Plus />
                                        </div>
                                    </CardIcons>
                                </div>
                            ) : (
                                <div className='box-client'>
                                    <span >
                                        <Contact size={30} />
                                        Nenhum cliente registrado ainda
                                    </span>
                                </div>
                            )}
                    </div>


                </Card>}
        </>
    )
}