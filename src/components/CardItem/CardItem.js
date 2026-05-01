import { Trash2 } from 'lucide-react'
import { BudgetCardItem } from '../FormBudget/BudgetContent/styled'
import { FormBudget } from '../FormBudget'
import { useEffect, useRef, useState } from 'react'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { DivContainerFilter, InptSearch } from '../HeaderFilter/styles'

export default function CardItem({
    item,
    onChange,
    onDelete
}) {
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
                    <FormBudget.Input typeInput='text' placeholder='Ex.: Limpeza' name='category' />
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput>
                    <FormBudget.Label text='Código/ID' />
                    <FormBudget.Input typeInput='text' placeholder='Código do produto' name='productCode' />
                </FormBudget.ContainerInput>


                <FormBudget.ContainerInput size='small' >
                    <FormBudget.Label text='Unidade' />
                    <DivContainerFilter ref={ref}>
                        <InptSearch>
                            <HiOutlineChevronDown className='chevronDown-icon' />
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

                <FormBudget.ContainerInput size='xx-large' >
                    <FormBudget.Label text='Obs. do item' />
                    <FormBudget.Input typeInput='text' placeholder='Ex.: Usado somente para limpeza' name='obsItem' />
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
                        value={item.itemTaxes}
                        onChange={(e) => {
                            onChange({
                                itemId: item.id,
                                field: 'itemTaxes',
                                value: e.target.value,
                                minValue: 0,
                            })
                        }}
                    />
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput size='medium' >
                    <FormBudget.Label text='Total' />
                    <FormBudget.LockedLabel text={'R$ ' + item.priceTotalItem} />
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput size='medium' >
                    {item.discount > 0 && (
                        <div className='discount-card-item'>
                            {`Desconto (${item.discount}%)`}
                        </div>
                    )}
                    {item.itemTaxes > 0 && (
                        <div className='taxes-card-item'>
                            {`Impostos (${item.itemTaxes}%)`}
                        </div>
                    )}
                </FormBudget.ContainerInput>
            </div>
        </BudgetCardItem>
    )
}