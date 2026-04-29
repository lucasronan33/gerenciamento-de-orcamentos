import { useEffect, useRef, useState } from 'react';
import { FormBudget } from '..';
import { DivContainerFilter, InptSearch } from '../../HeaderFilter/styles';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { Title } from '../../Header/styles';
import { Button } from '../../Button';
import { FaPlus } from 'react-icons/fa';
import { BudgetCardItem } from './styled';
import { Trash2 } from 'lucide-react';
import CardItem from '../../CardItem/CardItem';

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
    const [items, setItems] = useState([])
    const [priceSubtotal, setPriceSubtotal] = useState(0)
    const [priceTotal, setPriceTotal] = useState(0)
    const [taxes, setTaxes] = useState(0)

    function updateItem(id, field, value) {


        setItems(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    const updated = { ...item, [field]: value }

                    let priceTotalItem =
                        (updated.quantity * updated.unityPrice -
                            updated.quantity * updated.unityPrice * (updated.discount / 100))

                    priceTotalItem *= (updated.itemTaxes / 100) + 1

                    updated.priceTotalItem = priceTotalItem.toFixed(2)

                    return updated
                } else { return item }
            })
        })
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

        const subtotal = items.reduce((acc, item) => {
            const value = Number(item.priceTotalItem) || 0
            return acc + value
        }, 0)
        return subtotal.toFixed(2)
    }

    useEffect(() => {
        const subtotal = calcPriceSubtotal()
        setPriceSubtotal(subtotal)
    }, [items])
    useEffect(() => {

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

                <Button.Root onClick={() => {
                    const newItem = {
                        id: items.length + 1,
                        quantity: 1,
                        unityPrice: 0,
                        discount: 0,
                        itemTaxes: 0,
                    }

                    let priceTotalItem =
                        (newItem.quantity * newItem.unityPrice -
                            newItem.quantity * newItem.unityPrice * (newItem.discount / 100))

                    priceTotalItem *= (newItem.itemTaxes / 100)

                    newItem.priceTotalItem = priceTotalItem.toFixed(2)
                    setItems(prev => [...prev, newItem])
                }}>
                    <FaPlus />
                    Adicionar Item
                </Button.Root>
            </header>

            {/* SEPARA EM UM NOVO COMPONENTE O CARD ITEM */}

            <div className='budget-content-items'>
                {items.length === 0 ? (
                    'Nenhum item adicionado. Clique em "Adicionar Item" para começar'
                ) : (
                    <div className='budget-container-items'>
                        {items.map((item) => (
                            <CardItem
                                item={item}
                                key={item.id}
                                onChange={changeValueInput}
                                onDelete={(id) => {
                                    setItems(prev =>
                                        prev.filter(i => i.id !== id)
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
                    <FormBudget.Input typeInput='number' min='0' />
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput>
                    <FormBudget.Label text='Impostos (%)' />
                    <FormBudget.Input typeInput='number' min='0' />
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput size='large'>
                    <FormBudget.Label text='Tipo do frete' />
                    <DivContainerFilter ref={ref}>
                        <InptSearch>
                            <HiOutlineChevronDown className='chevronDown-icon' />
                            <input
                                type='text'
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
                        <FormBudget.Input typeInput='number' />
                    </FormBudget.ContainerInput>
                )}
            </div>
            <div className='budget-total-subtotal-container'>
                <div className='budget-subtotal-container'>
                    <label>Subtotal</label>
                    <label>R$ {priceSubtotal} </label>
                </div>
                <div className='budget-total-container'>
                    <label>Total</label>
                    <label> R$ {priceTotal.toFixed(2)}</label>
                </div>
            </div>
        </ >
    )
}