import { ChevronDown, Trash2 } from 'lucide-react'
import { BudgetCardItem } from '../Form/BudgetContent/styled'
import { Form } from '../Form'
import { useEffect, useRef, useState } from 'react'
import { DivContainerFilter, InptSearch } from '../BudgetStatusFilter/styles'
import { useBudget } from '../../context/Budget'

export default function CardItem({
    item,
    onChange,
    onDelete
}) {
    const { updateItem } = useBudget()
    const [open, setOpen] = useState(false)
    const ref = useRef()

    const [search, setSearch] = useState('Unidade')
    const [selected, setSelected] = useState('Unidade')
    const options = [
        'Unidade',
        'Peça',
        'Kg',
        'M',
        'M²',
        'M³',
        'Litro',
        'Hora',
    ]

    useEffect(() => {
        updateItem(item.id, 'metricUnity', selected)

        if (!open) return
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
                setSearch(selected)
                updateItem(item.id, 'metricUnity', selected)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [open, selected, item.id, updateItem])

    const filteredOptions = options.filter(option => option.toLowerCase().includes(search.toLowerCase()))
    return (

        <BudgetCardItem key={item.id}>
            <header>
                <div>Item {item.id} </div>
                <div className='container-trash-icon'>
                    <Trash2 onClick={() => onDelete(item.id)} />
                </div>
            </header>

            <div className='budget-container-items'>
                <Form.ContainerInput>
                    <Form.Label text='Categoria' />
                    <Form.Input
                        typeInput='text'
                        placeholder='Ex.: Limpeza'
                        name='category'
                        value={item.category}
                        onChange={(e) => updateItem(item.id, 'category', e.target.value)}
                    />
                </Form.ContainerInput>

                <Form.ContainerInput>
                    <Form.Label text='Código/ID' />
                    <Form.Input
                        typeInput='text'
                        placeholder='Código do produto'
                        name='productCode'
                        value={item.code}
                        onChange={(e) => updateItem(item.id, 'code', e.target.value)}
                    />
                </Form.ContainerInput>


                <Form.ContainerInput size='small' >
                    <Form.Label text='Unidade' />
                    <DivContainerFilter ref={ref}>
                        <InptSearch>
                            <ChevronDown className='chevronDown-icon' />
                            <input
                                type='text'
                                name='metricUnity'
                                placeholder='Unidade de medida'
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
                                                updateItem(item.id, 'metricUnity', option)
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

                <Form.ContainerInput size='xx-large' >
                    <Form.Label text='Obs. do item' />
                    <Form.Input
                        typeInput='text'
                        placeholder='Ex.: Usado somente para limpeza'
                        name='obsItem'
                        value={item.obsItem}
                        onChange={(e) => updateItem(item.id, 'obsItem', e.target.value)}
                    />
                </Form.ContainerInput>

                <Form.ContainerInput >
                    <Form.Label text='Qtd. *' />
                    <Form.Input typeInput='number'
                        name='quantity'
                        min='1'
                        value={item.quantity}
                        onChange={(e) => {
                            onChange({
                                itemId: item.id,
                                field: 'quantity',
                                value: e.target.value,
                                minValue: 1,
                            })
                        }}
                    />
                </Form.ContainerInput>

                <Form.ContainerInput size='small'>
                    <Form.Label text='Preço Unit. *' />
                    <Form.Input typeInput='number'
                        name='unityPrice'
                        min='0'
                        value={item.unityPrice}
                        onChange={(e) => {
                            onChange({
                                itemId: item.id,
                                field: 'unityPrice',
                                value: e.target.value,
                                minValue: 0,
                            })
                        }}
                    />
                </Form.ContainerInput>

                <Form.ContainerInput size='small' >
                    <Form.Label text='Desc. (%)' />
                    <Form.Input typeInput='number'
                        name='itemDiscount'
                        min='0'
                        value={item.discount}
                        onChange={(e) => {
                            onChange({
                                itemId: item.id,
                                field: 'discount',
                                value: e.target.value,
                                minValue: 0,
                            })
                        }}
                    />
                </Form.ContainerInput>

                <Form.ContainerInput size='medium' >
                    <Form.Label text='Impostos sob produto (%)' />
                    <Form.Input typeInput='number'
                        name='itemTaxes'
                        min='0'
                        value={item.taxes}
                        onChange={(e) => {
                            onChange({
                                itemId: item.id,
                                field: 'taxes',
                                value: e.target.value,
                                minValue: 0,
                            })
                        }}
                    />
                </Form.ContainerInput>

                <Form.ContainerInput size='medium' >
                    <Form.Label text='Total' />
                    <Form.LockedLabel text={'R$ ' + item.total} />
                </Form.ContainerInput>

                <Form.ContainerInput size='medium' >
                    {item.discount > 0 && (
                        <div className='discount-card-item'>
                            {`Desconto (${item.discount}%)`}
                        </div>
                    )}
                    {item.taxes > 0 && (
                        <div className='taxes-card-item'>
                            {`Impostos (${item.taxes}%)`}
                        </div>
                    )}
                </Form.ContainerInput>
            </div>
        </BudgetCardItem>
    )
}
