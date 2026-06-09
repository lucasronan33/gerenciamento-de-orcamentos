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
import { useSettings } from '../../../context/Settings';

const shippingOptions = [
    {
        value: 'SF',
        text: 'Sem Frete'
    },
    {
        value: 'CIF',
        text: 'CIF (por nossa conta)'
    },
    {
        value: 'FOB',
        text: 'FOB (por conta do cliente)'
    },
    {
        value: 'custom',
        text: 'Valor Customizado'
    },
]

export function BudgetContentItems() {
    const { isLoggedIn } = useSelector(state => state.auth)
    const { settings } = useSettings()
    const { budget, updateTotals, setBudget, updateItem } = useBudget()
    const [isRegister, setIsRegister] = useState(false)
    const { success, items, isLoadingItems } = useSelector(state => state.item || {})
    const dispatch = useDispatch()

    const subtotal = useMemo(() => {

        const value = budget.items.reduce(
            (prev, current) => prev + current.quantity * current.total, 0)
        return value

    }, [
        budget.items,
    ])


    const total = useMemo(() => {
        let value = Number(subtotal) + Number(budget.totals.shipping)
        value -= (value * (budget.totals.discount / 100))
        value *= ((budget.totals.taxes / 100) + 1)
        return value.toFixed(2)

    }, [
        subtotal,
        budget.totals.discount,
        budget.totals.taxes,
        budget.totals.shipping,
    ])

    const calValueTaxes = () => {
        let valueTaxes = Number(subtotal) + Number(budget.totals.shipping)
        valueTaxes -= (valueTaxes * (budget.totals.discount / 100))
        valueTaxes *= (budget.totals.taxes / 100)

        return valueTaxes.toFixed(2)
    }

    const calValueDiscount = () => {
        let valueDiscount = Number(subtotal) + Number(budget.totals.shipping)
        valueDiscount *= (budget.totals.discount / 100)

        return valueDiscount.toFixed(2)
    }

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
                    <div
                        key={item._id}
                        className='box-client'
                    >
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


                <div className='budget-container-items'>
                    <Form.ContainerInput>
                        <Form.Label text='Desconto Global (%)' />
                        <Form.Input typeInput='number'
                            name='globalDiscount'
                            min='0'
                            value={budget.totals.discount}
                            onChange={
                                (e) => {
                                    let value = e.target.value
                                    if (value < 0) value = ''

                                    updateTotals('discount', Number(value))
                                }
                            } />
                    </Form.ContainerInput>

                    <Form.ContainerInput>
                        <Form.Label text='Impostos (%)' />
                        <Form.Input typeInput='number'
                            name='taxes'
                            min='0'
                            value={budget.totals.taxes}
                            onChange={
                                (e) => {
                                    let value = e.target.value
                                    if (value < 0) value = ''

                                    updateTotals('taxes', Number(value))
                                }
                            } />
                    </Form.ContainerInput>

                    <Form.ContainerInput size='large'>
                        <Form.Label text='Tipo do frete' />
                        <select
                            value={budget.totals.shippingType}
                            onChange={(e) => {
                                updateTotals('shippingType', e.target.value)
                            }}
                        >
                            {shippingOptions.map(value => (
                                <option
                                    key={value.value}
                                    value={value.value}>
                                    {value.text}
                                </option>
                            ))}
                        </select>

                    </Form.ContainerInput>
                    {budget.totals.shippingType === 'custom' && (
                        <Form.ContainerInput>
                            <Form.Label text='Valor do Frete' />
                            <Form.Input typeInput='number'
                                name='shippingFee'
                                min='0'
                                value={budget.totals.shipping}
                                onChange={
                                    (e) => {
                                        let value = e.target.value
                                        if (value < 0) value = ''

                                        updateTotals('shipping', Number(value))
                                    }
                                } />
                        </Form.ContainerInput>
                    )}
                </div>

                <div className='budget-total-subtotal-container'>
                    <div className='budget-subtotal-container'>
                        <span>Subtotal</span>
                        <span>R$ {subtotal} </span>
                    </div>
                    {budget.totals.shipping > 0 && (
                        <div className='budget-subtotal-container'>
                            <span>Frete</span>
                            <span>R$ {budget.totals.shipping} </span>
                        </div>
                    )}
                    {budget.totals.discount > 0 && (
                        <div className='budget-subtotal-container discount'>
                            <span>{`Desconto (${budget.totals.discount}%)`}</span>
                            <span> - R$ {calValueDiscount()} </span>
                        </div>
                    )}
                    {budget.totals.taxes > 0 && (
                        <div className='budget-subtotal-container taxes'>
                            <span>{`Impostos (${budget.totals.taxes}%)`}</span>
                            <span>R$ {calValueTaxes()} </span>
                        </div>
                    )}
                    <div className='budget-total-container'>
                        <span>Total</span>
                        <span> R$ {total}</span>
                    </div>
                </div>
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
                            <div className='box-client' key={item._id} >
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
