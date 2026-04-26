import { useEffect, useRef, useState } from 'react';
import { FormBudget } from '..';
import { DivContainerFilter, InptSearch } from '../../HeaderFilter/styles';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { Title } from '../../Header/styles';
import { Button } from '../../Button';
import { FaPlus } from 'react-icons/fa';

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

    useEffect(() => {
        console.log('teste')

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

                {/* CRIAR FUNÇÃO PARA ADICIONAR NOVO ITEM AO ORÇAMENTO */}
                <Button.Root onClick={() => { }}>
                    <FaPlus />
                    Adicionar Item
                </Button.Root>
            </header>
            <div className='budget-content-items'>Nenhum item adicionado. Clique em "Adicionar Item" para começar</div>

            <div className='budget-container-items'>
                <FormBudget.ContainerInput>
                    <FormBudget.Label text='Desconto Global (%)' />
                    <FormBudget.Input typeInput='number' min='0' />
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput>
                    <FormBudget.Label text='Impostos (%)' />
                    <FormBudget.Input typeInput='number' min='0' />
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput>
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
            </div>
            <div className='budget-total-subtotal-container'>
                <div className='budget-subtotal-container'>
                    <label>Subtotal</label>
                    <label>R$0.00</label>
                </div>
                <div className='budget-total-container'>
                    <label>Total</label>
                    <label>R$0.00</label>
                </div>
            </div>
        </ >
    )
}