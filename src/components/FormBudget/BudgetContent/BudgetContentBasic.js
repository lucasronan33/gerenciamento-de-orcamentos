import React, { useState, useRef, useEffect } from 'react';
import '../style.css'

import { HiOutlineChevronDown } from 'react-icons/hi';
import { FormBudget } from '..';
import { DivContainerFilter, InptSearch } from '../../HeaderFilter/styles';

export function BudgetContentBasic() {
    const [open, setOpen] = useState(false)
    const ref = useRef()

    const [search, setSearch] = useState('Rascunho')
    const [selected, setSelected] = useState('Rascunho')
    const options = [
        'Rascunho',
        'Enviado',
        'Aprovado',
        'Rejeitado',
        'Finalizado',
    ]

    useEffect(() => {
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
    }, [selected])

    const filteredOptions = options.filter(option => option.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <FormBudget.ContainerInput>
                <FormBudget.Label text='Numero do Orçamento *' />
                <FormBudget.Input typeInput='text' placeholder='Numero do Orçamento' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='Nome do Cliente *' />
                <FormBudget.Input typeInput='text' placeholder='Nome do Cliente' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='meidum'>
                <FormBudget.Label text='Status do Orçamento' />
                <DivContainerFilter ref={ref}>
                    <InptSearch>
                        <HiOutlineChevronDown className='chevronDown-icon' />
                        <input
                            type='text'
                            placeholder='Filtrar por status do Orçamento'
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

            <FormBudget.ContainerInput>
                <FormBudget.Label text='Data *' />
                <FormBudget.Input typeInput='date' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='Valido até *' />
                <FormBudget.Input typeInput='date' />
            </FormBudget.ContainerInput>
        </>
    )
}