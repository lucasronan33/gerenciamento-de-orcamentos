import { HiOutlineChevronDown } from 'react-icons/hi';
import { FormBudget } from '..';
import { DivContainerFilter, InptSearch } from '../../HeaderFilter/styles';
import { useEffect, useRef, useState } from 'react';

export function BudgetContentConditions() {

    const [open, setOpen] = useState(false)
    const ref = useRef()

    const [search, setSearch] = useState('À vista')
    const [selected, setSelected] = useState('À vista')
    const options = [
        'À vista',
    ]

    useEffect(() => {
        if (!open) return
        function handleClickOutside(e) {

            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)

                setSearch(selected)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [open, selected])

    const filteredOptions = options.filter(option => option.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <FormBudget.ContainerInput>
                <FormBudget.Label text='Forma de Pagamento' />
                <DivContainerFilter ref={ref}>
                    <InptSearch>
                        <HiOutlineChevronDown className='chevronDown-icon' />
                        <input
                            type='text'
                            name='paymentMethod'
                            placeholder='Filtrar por Forma de Pagamento'
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

            <FormBudget.ContainerInput size='large'>
                <FormBudget.Label text='Prazo de entrega' />
                <FormBudget.Input typeInput='text' placeholder='Ex.: 15 dias úteis' name='deliveryTime' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='xx-large'>
                <FormBudget.Label text='Condições de Pagamento' />
                <FormBudget.Input typeInput='text' placeholder='Ex.: 30% de entrada, 70% na entrega' name='paymentConditions' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='xx-large'>
                <FormBudget.Label text='Garantia' />
                <FormBudget.Input typeInput='text' placeholder='Ex.: 12 meses contra defeitos de fabricação' name='warranty' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='xx-large'>
                <FormBudget.Label text='Observações' />
                <FormBudget.TextArea placeholder='Observações gerais sobre o orçamento...' rows='3' name='obsBudget' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='xx-large'>
                <FormBudget.Label text='Termos e Condições' />
                <FormBudget.TextArea placeholder='Termos e condições gerais, política de cancelamento, etc...' rows='7' name='termsConditions' />
            </FormBudget.ContainerInput>
        </>
    )
}