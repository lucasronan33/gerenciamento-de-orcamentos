import './style.css'
import { Card } from '../../DashboardsHeader/styles';
import { Subtitle } from '../../Header/styles';
import { CardIcons } from '../../CardBudget/CardBudgetStyles';
import { Edit, Mail, Phone, Trash2 } from 'lucide-react';
import { maskPhone } from '../../../utils/masks';
import { WhatsAppIcon } from '../../Icons/WhatsAppIcon';

export function ClientsList({ clients }) {

    const initials = clients.map(client => {
        const initial = client.name
            .split(' ', 2)
            .map(i => i[0].toUpperCase())
            .join('')

        return initial
    })

    return (
        <Card className='hover-container'>
            <Subtitle className='title-list-clients'>Clientes cadastrados</Subtitle>
            {clients && (
                <div className='container-clients'>
                    {clients.map((client, index) =>
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
                                    {(client.email || client.phone) && (
                                        <Subtitle className='title-list-clients phone-client'>
                                            {client.email
                                                ? <>
                                                    <Mail className='contact-icon' />
                                                    {client.email}
                                                </>
                                                : <>
                                                    <Phone className='contact-icon' />
                                                    {maskPhone(client?.phone)}
                                                </>
                                            }
                                        </Subtitle>)}
                                </div>
                            </div>
                            <CardIcons className='icons-clients-list'>
                                <div
                                    className='card-icon viewOrc'
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
                    )}
                </div>
            )}
        </Card>
    )
}