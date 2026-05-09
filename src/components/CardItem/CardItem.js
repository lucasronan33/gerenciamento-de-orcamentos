import { ChevronDown, Trash2 } from 'lucide-react'
import { BudgetCardItem } from '../FormBudget/BudgetContent/styled'
import { FormBudget } from '../FormBudget'
import { useEffect, useRef, useState } from 'react'
import { DivContainerFilter, InptSearch } from '../HeaderFilter/styles'
import { useBudget } from '../BudgetContext'

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
                <FormBudget.ContainerInput>
                    <FormBudget.Label text='Categoria' />
                    <FormBudget.Input
                        typeInput='text'
                        placeholder='Ex.: Limpeza'
                        name='category'
                        value={item.category}
                        onChange={(e) => updateItem(item.id, 'category', e.target.value)}
                    />
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput>
                    <FormBudget.Label text='Código/ID' />
                    <FormBudget.Input
                        typeInput='text'
                        placeholder='Código do produto'
                        name='productCode'
                        value={item.code}
                        onChange={(e) => updateItem(item.id, 'code', e.target.value)}
                    />
                </FormBudget.ContainerInput>


                <FormBudget.ContainerInput size='small' >
                    <FormBudget.Label text='Unidade' />
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
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput size='xx-large' >
                    <FormBudget.Label text='Obs. do item' />
                    <FormBudget.Input
                        typeInput='text'
                        placeholder='Ex.: Usado somente para limpeza'
                        name='obsItem'
                        value={item.obsItem}
                        onChange={(e) => updateItem(item.id, 'obsItem', e.target.value)}
                    />
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput >
                    <FormBudget.Label text='Qtd. *' />
                    <FormBudget.Input typeInput='number'
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
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput size='small'>
                    <FormBudget.Label text='Preço Unit. *' />
                    <FormBudget.Input typeInput='number'
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
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput size='small' >
                    <FormBudget.Label text='Desc. (%)' />
                    <FormBudget.Input typeInput='number'
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
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput size='medium' >
                    <FormBudget.Label text='Impostos sob produto (%)' />
                    <FormBudget.Input typeInput='number'
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
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput size='medium' >
                    <FormBudget.Label text='Total' />
                    <FormBudget.LockedLabel text={'R$ ' + item.total} />
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput size='medium' >
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
                </FormBudget.ContainerInput>
            </div>
        </BudgetCardItem>
    )
}
