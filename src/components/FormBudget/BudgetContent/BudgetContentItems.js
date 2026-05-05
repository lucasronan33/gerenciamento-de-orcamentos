import { useEffect, useRef, useState } from 'react';
import { FormBudget } from '..';
import { DivContainerFilter, InptSearch } from '../../HeaderFilter/styles';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { Title } from '../../Header/styles';
import { Button } from '../../Button';
import { FaPlus } from 'react-icons/fa';
import CardItem from '../../CardItem/CardItem';
import { useBudget } from '../../BudgetContext';

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
    const { budget, setBudget, updateTotals, updateItem, calcTotal } = useBudget()

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

    function calcPriceSubtotal() {

        const subtotal = budget.items.reduce((acc, item) => {
            const value = Number(item.total) || 0
            return acc + value
        }, 0).toFixed(2)
        return subtotal
    }
    function calcPriceTotal() {
        const subtotal = calcPriceSubtotal()

        let total = Number(subtotal) + Number(budget.totals.shipping)
        total -= (total * (budget.totals.discount / 100))
        total *= ((budget.totals.taxes / 100) + 1)
        return (total.toFixed(2))
    }

    const calValueTaxes = () => {
        let valueTaxes = Number(budget.totals.subtotal) + Number(budget.totals.shipping)
        valueTaxes -= (valueTaxes * (budget.totals.discount / 100))
        valueTaxes *= (budget.totals.taxes / 100)

        return valueTaxes.toFixed(2)
    }

    const calValueDiscount = () => {
        let valueDiscount = Number(budget.totals.subtotal) + Number(budget.totals.shipping)
        valueDiscount *= (budget.totals.discount / 100)

        return valueDiscount.toFixed(2)
    }

    useEffect(() => {

        const subtotal = calcPriceSubtotal()
        updateTotals('subtotal', subtotal)

        const total = calcPriceTotal()
        updateTotals('total', total)

    }, [budget.items])

    useEffect(() => {

        if (selected !== 'Valor Customizado') updateTotals('shipping', 0)
        if (!open) return
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
                setSearch(selected)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }

    }, [open, selected])

    const filteredOptions = options.filter(option => option.toLowerCase().includes(search.toLowerCase()))
    return (
        <>
            <header>
                <Title>Itens do Orçamento</Title>

                <Button.Root
                    onClick={addItem}
                >
                    <FaPlus />
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
                <FormBudget.ContainerInput>
                    <FormBudget.Label text='Desconto Global (%)' />
                    <FormBudget.Input typeInput='number'
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
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput>
                    <FormBudget.Label text='Impostos (%)' />
                    <FormBudget.Input typeInput='number'
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
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput size='large'>
                    <FormBudget.Label text='Tipo do frete' />
                    <DivContainerFilter ref={ref}>
                        <InptSearch>
                            <HiOutlineChevronDown className='chevronDown-icon' />
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
                                    filteredOptions.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`option ${item === selected ? 'selected' : ''}`}
                                            onMouseDown={() => {
                                                setSelected(item)
                                                setSearch(item)
                                                setOpen(false)
                                            }}
                                        >
                                            {item}
                                        </div>
                                    ))
                                ) : (
                                    <div> Nenhum resultado</div>
                                )}
                            </div>
                        )}
                    </DivContainerFilter>

                </FormBudget.ContainerInput>
                {selected === 'Valor Customizado' && (
                    <FormBudget.ContainerInput>
                        <FormBudget.Label text='Valor do Frete' />
                        <FormBudget.Input typeInput='number'
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
                    </FormBudget.ContainerInput>
                )}
            </div>
            <div className='budget-total-subtotal-container'>
                <div className='budget-subtotal-container'>
                    <label>Subtotal</label>
                    <label>R$ {budget.totals.subtotal} </label>
                </div>
                {budget.totals.shipping > 0 && (
                    <div className='budget-subtotal-container'>
                        <label>Frete</label>
                        <label>R$ {budget.totals.shipping} </label>
                    </div>
                )}
                {budget.totals.discount > 0 && (
                    <div className='budget-subtotal-container discount'>
                        <label>{`Desconto (${budget.totals.discount}%)`}</label>
                        <label> - R$ {calValueDiscount()} </label>
                    </div>
                )}
                {budget.totals.taxes > 0 && (
                    <div className='budget-subtotal-container taxes'>
                        <label>{`Impostos (${budget.totals.taxes}%)`}</label>
                        <label>R$ {calValueTaxes()} </label>
                    </div>
                )}
                <div className='budget-total-container'>
                    <label>Total</label>
                    <label> R$ {budget.totals.total}</label>
                </div>
            </div>
        </ >
    )
}