import { ChevronDown } from 'lucide-react';
import { Form } from '..';
import { DivContainerFilter, InptSearch } from '../../HeaderFilter/styles';
import { useEffect, useRef, useState } from 'react';
import { useBudget } from '../../../context/Budget'

export function BudgetContentConditions() {
    const { budget, updateBudget } = useBudget()

    const [open, setOpen] = useState(false)
    const ref = useRef()

    const [search, setSearch] = useState('À vista')
    const [selected, setSelected] = useState('À vista')
    const options = [
        'À vista',
        'Boleto',
        'Pix',
        'Cartão de Débito',
        'Cartão de Crédito',
    ]

    useEffect(() => {
        updateBudget('conditions', 'paymentMethod', selected)
        if (!open) return

        function handleClickOutside(e) {

            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)

                setSearch(selected)
                updateBudget('conditions', 'paymentMethod', selected)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [
        open,
        selected,
        updateBudget
    ])

    const filteredOptions = options.filter(option => option.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <Form.ContainerInput>
                <Form.Label text='Forma de Pagamento' />
                <DivContainerFilter ref={ref}>
                    <InptSearch>
                        <ChevronDown className='chevronDown-icon' />
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
                                            updateBudget('conditions', 'paymentMethod', item)
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
            </Form.ContainerInput>

            <Form.ContainerInput size='large'>
                <Form.Label text='Prazo de entrega' />
                <Form.Input
                    typeInput='text'
                    placeholder='Ex.: 15 dias úteis'
                    name='shippingTime'
                    value={budget.conditions.shippingTime}
                    onChange={(e) => updateBudget('conditions', 'shippingTime', e.target.value)}

                />
            </Form.ContainerInput>

            <Form.ContainerInput size='xx-large'>
                <Form.Label text='Condições de Pagamento' />
                <Form.Input
                    typeInput='text'
                    placeholder='Ex.: 30% de entrada, 70% na entrega'
                    name='paymentConditions'
                    value={budget.conditions.paymentConditions}
                    onChange={(e) => updateBudget('conditions', 'paymentConditions', e.target.value)}

                />
            </Form.ContainerInput>

            <Form.ContainerInput size='xx-large'>
                <Form.Label text='Garantia' />
                <Form.Input
                    typeInput='text'
                    placeholder='Ex.: 12 meses contra defeitos de fabricação'
                    name='warranty'
                    value={budget.conditions.warranty}
                    onChange={(e) => updateBudget('conditions', 'warranty', e.target.value)}

                />
            </Form.ContainerInput>

            <Form.ContainerInput size='xx-large'>
                <Form.Label text='Observações' />
                <Form.TextArea
                    placeholder='Observações gerais sobre o orçamento...'
                    rows='3'
                    name='obsBudget'
                    value={budget.conditions.obsBudget}
                    onChange={(e) => updateBudget('conditions', 'obsBudget', e.target.value)}
                />
            </Form.ContainerInput>

            <Form.ContainerInput size='xx-large'>
                <Form.Label text='Termos e Condições' />
                <Form.TextArea
                    placeholder='Termos e condições gerais, política de cancelamento, etc...'
                    rows='7'
                    name='termsConditions'
                    value={budget.conditions.termsConditions}
                    onChange={(e) => updateBudget('conditions', 'termsConditions', e.target.value)}
                />
            </Form.ContainerInput>
        </>
    )
}
