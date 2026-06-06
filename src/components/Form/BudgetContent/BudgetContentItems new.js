import { useEffect, useMemo, useState } from 'react';
import { useBudget } from '../../../context/Budget'
import { Items } from '../Items';
import { Button } from '../../Button';
import { Minus, Package, Plus, RefreshCcw, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsRequest } from '../../../store/modules/item/actions';
import { Subtitle } from '../../Header/styles';
import { Card } from '../../DashboardsHeader/styles';
import { CardIcons } from '../../Cards/styled';
import { Form } from '..';

export function BudgetContentItems2() {
    const { isLoggedIn } = useSelector(state => state.auth)
    const { budget, updateTotals, setBudget, updateItem } = useBudget()
    const [isRegister, setIsRegister] = useState(false)
    const { success, items, isLoadingItems } = useSelector(state => state.item || {})
    const dispatch = useDispatch()

    const subtotal = useMemo(() => {

        const value = budget.items.reduce(
            (prev, current) => prev + current.quantity * current.total, 0)

        updateTotals('subtotal', value)
        return value

    }, [
        budget.items,
        updateTotals,
    ])

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(fetchItemsRequest())
    }, [isLoggedIn, isRegister, success, dispatch])

    return (
        <>
            {!isRegister
                ? (

                    <Button.Container>
                        <Button.Root onClick={() => setIsRegister(true)}  >Cadastrar novo Item</Button.Root>
                    </Button.Container>
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
                    <Items.Register /></>
                )}
            {budget.items.length > 0
                && budget.items.map(item => (
                    <div className='box-client'                    >
                        <div className='container-client-infos'>
                            <h3>
                                {item.name}
                            </h3>
                            <div className='container-contact-client column-client-list'>
                                {item.category && (
                                    <Subtitle className='title-list-clients phone-client'>
                                        {item?.category}
                                    </Subtitle>)}
                                {item.unityPrice && (
                                    <Subtitle className='title-list-clients phone-client'>
                                        {'| '}
                                        {`R$ ${item.unityPrice}/${item.unity}`}
                                    </Subtitle>)}
                            </div>
                            <Form.Root >
                                <Form.ContainerInput>
                                    <Form.Label text='Quant.' />
                                    <Form.Input
                                        typeInput='number'
                                        name='quantity'
                                        value={item.quantity}
                                        onChange={(e) => updateItem(item._id, 'quantity', Number(e.target.value))}
                                    />
                                </Form.ContainerInput>
                                <Form.ContainerInput>
                                    <Form.Label text='Total' />
                                    <Form.LockedLabel
                                        typeInput='number'
                                        name='total'
                                        text={`R$ ${(item.quantity * item.unityPrice).toFixed(2)}`}
                                    />
                                </Form.ContainerInput>
                            </Form.Root>
                        </div>

                        <CardIcons className='icons-clients-list'>
                            <div
                                className='card-icon links'
                                onClick={() => setBudget(prev => ({
                                    ...prev,
                                    items: prev.items.filter(i => i._id !== item._id)
                                }))
                                }
                            >
                                <Minus />
                            </div>
                        </CardIcons>
                    </div>
                ))
            }
            <Card className='hover-container'>
                <Form.Root>
                    <Form.ContainerInput>
                        <Form.Label text='Subtotal' />
                        <Form.LockedLabel
                            typeInput='number'
                            name='subtotal'
                            text={`R$ ${subtotal.toFixed(2)}`}
                        />
                    </Form.ContainerInput>
                </Form.Root>
            </Card>
            <Card className='hover-container'>
                <Subtitle className='title-list-clients'>Items/Serviços cadastrados</Subtitle>
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
                        : items.length > 0 ? items.map((item, index) => (
                            <div className='box-client' key={index} >
                                <div className='container-client-infos'>
                                    <h3>
                                        {item.name}
                                    </h3>
                                    <div className='container-contact-client column-client-list'>
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
                                </div >
                                <CardIcons className='icons-clients-list'>
                                    <div
                                        className='card-icon links'
                                        onClick={() => {
                                            budget.items.includes(item)
                                                ? setBudget(prev => ({
                                                    ...prev,
                                                    items: prev.items.map(i => {
                                                        if (i._id === item._id) {
                                                            i.quantity++
                                                        }
                                                        return i
                                                    })
                                                }))
                                                : setBudget(prev => ({
                                                    ...prev,
                                                    items: [...prev.items, item]
                                                })
                                                )
                                        }}
                                    >
                                        <Plus />
                                    </div>
                                </CardIcons>
                            </div >
                        )
                        ) : (
                            <div className='box-client'>
                                <span >
                                    <Package size={30} />
                                    Nenhum (item, produto ou serviço) registrado ainda
                                </span>
                            </div>
                        )
                    }
                </div >


            </Card >


        </>
    )
}
