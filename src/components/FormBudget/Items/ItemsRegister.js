import { SaveIcon, X } from 'lucide-react';
import { FormBudget } from '..';
import { Button } from '../../Button';
import { useItem } from '../../../context/Item';
import { useSelector } from 'react-redux';

const units = [
    'Unidade',
    'Peça',
    'Kg',
    'M',
    'M²',
    'M³',
    'Litro',
    'Hora',
]
export function ItemsRegister() {
    const { item, updateItem } = useItem()
    const { isLoading } = useSelector(state => state.item || {})

    return (
        <form
            className='container-settings'
        >

            <FormBudget.ContainerInput>
                <FormBudget.Label text='Código/ID' />
                <FormBudget.Input
                    typeInput='text'
                    placeholder='Código do produto'
                    name='code'
                    value={item.code}
                    onChange={(e) => updateItem('code', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='Nome do Item/Produto' />
                <FormBudget.Input
                    typeInput='text'
                    placeholder='Ex.: Caneta'
                    name='name'
                    value={item.name}
                    onChange={(e) => updateItem('name', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='Categoria' />
                <FormBudget.Input
                    typeInput='text'
                    placeholder='Ex.: Escritório'
                    name='category'
                    value={item.category}
                    onChange={(e) => updateItem('category', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='small' >
                <FormBudget.Label text='Unidade' />
                <select
                    value={item.unity}
                    onChange={(e) => updateItem('unity', e.target.value)}>
                    {units.map((option, index) =>
                        <option key={index}>
                            {option}
                        </option>
                    )}
                </select>
            </FormBudget.ContainerInput>
            <FormBudget.ContainerInput size='small'>
                <FormBudget.Label text='Preço Unit. *' />
                <FormBudget.Input typeInput='number'
                    name='unityPrice'
                    min='0'
                    value={item.unityPrice}
                    onChange={(e) => updateItem('unityPrice', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='medium' >
                <FormBudget.Label text='Impostos sob produto (%)' />
                <FormBudget.Input typeInput='number'
                    name='itemTaxes'
                    min='0'
                    value={item.taxes}
                    onChange={(e) => updateItem('taxes', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='xx-large' >
                <FormBudget.Label text='Obs. do item' />
                <FormBudget.Input
                    typeInput='text'
                    placeholder='Ex.: Usado somente para limpeza'
                    name='obsItem'
                    value={item.obsItem}
                    onChange={(e) => updateItem('obsItem', e.target.value)}
                />
            </FormBudget.ContainerInput>


            <FormBudget.ContainerInput size='medium' >
                <FormBudget.Label text='Total' />
                <FormBudget.LockedLabel text={'R$ '} />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='medium' >
                {item.taxes > 0 && (
                    <div className='taxes-card-item'>
                        {`Impostos (${item.taxes}%)`}
                    </div>
                )}
            </FormBudget.ContainerInput>

            <Button.Container className='buttons-register'>
                <Button.Root
                    className='btn-cancel btn-save'
                    type='reset'
                >
                    <Button.Icon icon={X} />
                    Limpar
                </Button.Root>

                <Button.Root
                    className='btn-save'
                    type='submit' >
                    <Button.Icon icon={SaveIcon} />
                    {item._id
                        ? (!isLoading
                            ? 'Atualizar'
                            : 'Atualizando...'
                        )
                        : (!isLoading
                            ? 'Cadastrar'
                            : 'Cadastrando...'
                        )
                    }
                </Button.Root>
            </Button.Container>
        </form>
    )
}