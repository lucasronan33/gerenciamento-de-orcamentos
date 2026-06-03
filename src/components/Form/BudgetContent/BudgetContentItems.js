import { useEffect, useMemo, useRef, useState } from 'react';
import { Form } from '..';
import { DivContainerFilter, InptSearch } from '../../HeaderFilter/styles';
import { ChevronDown, Plus } from 'lucide-react';
import { Title } from '../../Header/styles';
import { Button } from '../../Button';
import CardItem from '../../Cards/CardItem';
import { useSettings } from '../../../context/Settings'
import { useBudget } from '../../../context/Budget'

export function BudgetContentItems() {
    const [open, setOpen] = useState(false)
    const ref = useRef()

    const [search, setSearch] = useState('Sem Frete')
    const [selected, setSelected] = useState('Sem Frete')
    const options = [
        'Sem Frete',
        'CIF (por nossa conta)',
        'FOB (por conta do cliente)',
        'Valor Customizado',
    ]
    const { settings } = useSettings()
    const { budget, setBudget, updateTotals, updateBudget, updateItem, calcTotal } = useBudget()

    function addItem() {
        const newItem = {
            id: budget.items.length + 1,
            quantity: 1,
            unityPrice: 0,
            discount: 0,
            taxes: 0,
        }
        newItem.total = calcTotal(newItem)

        setBudget(prev => ({
            ...prev,
            items: [...prev.items, newItem]
        }))
    }

    const subtotal = useMemo(() => {
        const totals = Number(budget.items.reduce((acc, item) => {
            const value = Number(item.total) || 0
            return acc + value
        }, 0))
        const priceService = Number(budget.totals.priceService)

        const result = totals + priceService

        return result.toFixed(2)
    }, [
        budget.items,
        budget.totals.priceService,
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

    function changeValueInput({ itemId, field, value, minValue }) {
        const valueInput = value

        if (valueInput === '') {
            updateItem(itemId, field, '')
            return
        } else {
            const num = Number(valueInput)
            updateItem(itemId, field, num < minValue ? minValue : num)
        }
    }

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

        const priceHour = settings.services.priceHour
        const [hours, minutes] = budget.basic.timeService.split(':')

        const DecimalHourMinutes = Number(hours) + (Number(minutes) / 60)

        const price = priceHour * DecimalHourMinutes

        updateBudget('totals', 'priceService', price.toFixed(2))
    }, [
        budget.basic.timeService,
        settings.services.priceHour,
        updateBudget,
    ])

    useEffect(() => {
        if (budget.totals.shippingType) {
            setSearch(budget.totals.shippingType)
            setSelected(budget.totals.shippingType)
        }
    }, [budget.totals.shippingType])

    useEffect(() => {

        if (selected !== 'Valor Customizado' && budget.totals.shipping !== 0) updateTotals('shipping', 0)

        if (!open) return
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
                setSearch(selected)
                updateBudget('totals', 'shippingType', selected)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        if (budget.totals.shippingType === selected) return
        if (budget.totals.shippingType !== selected) updateBudget('totals', 'shippingType', selected)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }

    }, [
        open,
        selected,
        budget.totals.shipping,
        budget.totals.shippingType,
        updateBudget,
        updateTotals
    ])

    const filteredOptions = options.filter(option => option.toLowerCase().includes(search.toLowerCase()))
    return (
        <>
            <header>
                <Title>Itens do Orçamento</Title>

                <Button.Root
                    onClick={addItem}
                >
                    <Plus />
                    Adicionar Item
                </Button.Root>
            </header>

            <div className='budget-content-items'>
                {budget.items.length === 0 ? (
                    'Nenhum item adicionado. Clique em "Adicionar Item" para começar'
                ) : (
                    <div className='budget-container-items'>
                        {budget.items.map((item, index) => (
                            <CardItem
                                item={item}
                                key={item.id = index + 1}
                                onChange={changeValueInput}
                                onDelete={(id) => {
                                    setBudget(
                                        prev => ({
                                            ...prev,
                                            items: prev.items.filter(i => i.id !== item.id)
                                        })
                                    )

                                }}
                            />
                        )
                        )}
                    </div>
                )
                }</div>

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

                                updateTotals('discount', value)
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

                                updateTotals('taxes', value)
                            }
                        } />
                </Form.ContainerInput>

                <Form.ContainerInput size='large'>
                    <Form.Label text='Tipo do frete' />
                    <DivContainerFilter ref={ref}>
                        <InptSearch>
                            <ChevronDown className='chevronDown-icon' />
                            <input
                                type='text'
                                name='shippingType'
                                placeholder='Tipo de frete'
                                value={search}
                                onMouseDown={(e) => {
                                    setOpen(true)
                                    setSearch('')
                                }}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </InptSearch>

                        {open && (
                            <div className='dropDownMenu budget-menu'>
                                {filteredOptions.length > 0 ? (
                                    filteredOptions.map((option, index) => (
                                        <div
                                            key={index}
                                            className={`option ${option === selected ? 'selected' : ''}`}
                                            onMouseDown={() => {
                                                setSelected(option)
                                                setSearch(option)
                                                updateBudget('totals', 'shippingType', option)
                                                setOpen(false)
                                            }}
                                        >
                                            {option}
                                        </div>
                                    ))
                                ) : (
                                    <div> Nenhum resultado</div>
                                )}
                            </div>
                        )}
                    </DivContainerFilter>

                </Form.ContainerInput>
                {selected === 'Valor Customizado' && (
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

                                    updateTotals('shipping', value)
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
                {budget.totals.priceService > 0 && (
                    <div className='budget-subtotal-container'>
                        <span>Preço/h{` (${budget.basic.timeService})`}</span>
                        <span>  R$ {budget.totals.priceService} </span>
                    </div>
                )}
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
        </ >
    )
}
