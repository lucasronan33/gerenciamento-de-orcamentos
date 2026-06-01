import './style.css'
import { Card } from '../../DashboardsHeader/styles';
import { Subtitle } from '../../Header/styles';
import { Contact, Edit, Mail, Phone, RefreshCcw, Trash2 } from 'lucide-react';
import { maskPhone } from '../../../utils/masks';
import { WhatsAppIcon } from '../../Icons/WhatsAppIcon';
import { useEffect, useState } from 'react';
import { deleteClientRequest, fetchClientsRequest } from '../../../store/modules/client/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useClient } from '../../../context/Client';
import { Button } from '../../Button';
import { CardIcons, ConfirmDeleteModal } from '../../Cards/styled';

export function ClientsList() {
    const { success, clients, isLoadingClients } = useSelector(state => state.client || {})
    const dispatch = useDispatch()
    const { setClient } = useClient()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    function handleDelete(client) {
        setIsDeleting(true)
        dispatch(deleteClientRequest(client))
        setIsDeleting(false)
        setIsDeleteModalOpen(false)
    }

    useEffect(() => {
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
                                    onClick={() => setClient(client)}
                                >
                                    <Edit />
                                </div>

                                <div
                                    className='card-icon trash-icon links'
                                    onClick={() => {
                                        setIsDeleteModalOpen(true)
                                    }}
                                >
                                    <Trash2 className='trashIco' />
                                </div>
                            </CardIcons>
                            {isDeleteModalOpen && (
                                <ConfirmDeleteModal>
                                    <button
                                        type='button'
                                        className='confirm-delete-overlay'
                                        aria-label='Fechar confirmacao'
                                        onClick={() => setIsDeleteModalOpen(false)}
                                    />
                                    <div className='confirm-delete-content'>
                                        <h2>Excluir orcamento?</h2>
                                        <p>
                                            Esta ação vai remover o cliente
                                            <strong> {client.name} </strong>
                                            da sua lista.
                                        </p>
                                        <div className='confirm-delete-actions'>
                                            <Button.Root
                                                className='btn-cancel'
                                                onClick={() => setIsDeleteModalOpen(false)}
                                                disabled={isDeleting}
                                            >
                                                Cancelar
                                            </Button.Root>
                                            <Button.Root
                                                className='btn-delete'
                                                onClick={() => handleDelete(client)}
                                                disabled={isDeleting}
                                            >
                                                {isDeleting ? 'Excluindo...' : 'Excluir'}
                                            </Button.Root>
                                        </div>
                                    </div>
                                </ConfirmDeleteModal>
                            )}
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