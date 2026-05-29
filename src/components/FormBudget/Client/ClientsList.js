import './style.css'
import { Card } from '../../DashboardsHeader/styles';
import { Subtitle } from '../../Header/styles';
import { CardIcons } from '../../CardBudget/CardBudgetStyles';
import { Contact, Edit, Mail, Phone, RefreshCcw, Trash2 } from 'lucide-react';
import { maskPhone } from '../../../utils/masks';
import { WhatsAppIcon } from '../../Icons/WhatsAppIcon';
import { useEffect } from 'react';
import { fetchClientsRequest } from '../../../store/modules/client/actions';
import { useDispatch, useSelector } from 'react-redux';

export function ClientsList() {
    const { success, clients, isLoadingClients } = useSelector(state => state.client || {})
    const dispatch = useDispatch()

    const initials = clients.map(client => {
        const initial = client.name
            .split(' ', 3)
            .map(i => i[0].toUpperCase())
            .join('')

        return initial
    })

    useEffect(() => {
        if (success) {
            dispatch(fetchClientsRequest())
            return
        }
        dispatch(fetchClientsRequest())
    }, [success, dispatch])

    return (
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
                                {initials[index]}
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
                                >
                                    <Edit />
                                </div>

                                <div
                                    className='card-icon trash-icon links'
                                >
                                    <Trash2 className='trashIco' />
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
        </Card>
    )
}