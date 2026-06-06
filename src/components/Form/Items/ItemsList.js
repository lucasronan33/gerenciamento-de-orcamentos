import { Card } from '../../DashboardsHeader/styles';
import { Subtitle } from '../../Header/styles';
import { Edit, Package, RefreshCcw, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useItem } from '../../../context/Item';
import { Button } from '../../Button';
import { CardIcons, ConfirmDeleteModal } from '../../Cards/styled';
import { deleteItemRequest, fetchItemsRequest } from '../../../store/modules/item/actions';

export function ItemsList() {
    const { isLoggedIn } = useSelector(state => state.auth)
    const { success, items, isLoadingItems } = useSelector(state => state.item || {})
    console.log('items: ', items)
    const dispatch = useDispatch()
    const { setItem } = useItem()
    const [itemToDelete, setItemToDelete] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    function handleDelete(client) {
        if (!isLoggedIn) return
        setIsDeleting(true)
        dispatch(deleteItemRequest(client))
        setIsDeleting(false)
        setItemToDelete(null)
    }

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(fetchItemsRequest())
    }, [success, isLoggedIn, dispatch])

    return (
        <Card className='hover-container'>
            <Subtitle className='title-list-clients'>Itens cadastrados</Subtitle>
            <div className='container-clients'>
                {isLoadingItems
                    ? <div className='box-client'>
                        <div className='box-client'>
                            <span >
                                <RefreshCcw size={30} />
                                Carregando itens...
                            </span>
                        </div>
                    </div>
                    : items.length > 0 ? items.map((item, index) =>
                        <div className='box-client' key={item._id}>
                            <div className='container-client-infos'>
                                <h3>
                                    {item.name}
                                </h3>
                                <div className='container-contact-client'>
                                    {item.category && (
                                        <Subtitle className='title-list-clients phone-client'>
                                            {item?.category}
                                        </Subtitle>)}
                                    {item.total && (
                                        <Subtitle className='title-list-clients phone-client'>
                                            {'| '}
                                            {`R$ ${item.total}/${item.unity}`}
                                        </Subtitle>)}
                                </div>
                            </div>
                            <CardIcons className='icons-clients-list'>
                                <div
                                    className='card-icon links'
                                    onClick={() => setItem(item)}
                                >
                                    <Edit />
                                </div>

                                <div
                                    className='card-icon trash-icon links'
                                    onClick={() => {
                                        setItemToDelete(item)
                                    }}
                                >
                                    <Trash2 className='trashIco' />
                                </div>
                            </CardIcons>

                        </div>
                    ) : (
                        <div className='box-client'>
                            <span >
                                <Package size={30} />
                                Nenhum (item, produto ou serviço) registrado ainda
                            </span>
                        </div>
                    )}
            </div>
            {itemToDelete && (
                <ConfirmDeleteModal>
                    <button
                        type='button'
                        className='confirm-delete-overlay'
                        aria-label='Fechar confirmacao'
                        onClick={() => setItemToDelete(null)}
                    />
                    <div className='confirm-delete-content'>
                        <h2>Excluir item?</h2>
                        <p>
                            Esta ação vai remover o item
                            <strong> {itemToDelete.name} </strong>
                            da sua lista.
                        </p>
                        <div className='confirm-delete-actions'>
                            <Button.Root
                                className='btn-cancel'
                                onClick={() => setItemToDelete(null)}
                                disabled={isDeleting}
                            >
                                Cancelar
                            </Button.Root>
                            <Button.Root
                                className='btn-delete'
                                onClick={() => handleDelete(itemToDelete)}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Excluindo...' : 'Excluir'}
                            </Button.Root>
                        </div>
                    </div>
                </ConfirmDeleteModal>
            )}


        </Card>
    )
}