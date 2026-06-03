import { SaveIcon, X } from 'lucide-react';
import { Form } from '..';
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

            <Form.ContainerInput>
                <Form.Label text='Código/ID' />
                <Form.Input
                    typeInput='text'
                    placeholder='Código do produto'
                    name='code'
                    value={item.code}
                    onChange={(e) => updateItem('code', e.target.value)}
                />
            </Form.ContainerInput>

            <Form.ContainerInput>
                <Form.Label text='Nome do Item/Produto' />
                <Form.Input
                    typeInput='text'
                    placeholder='Ex.: Caneta'
                    name='name'
                    value={item.name}
                    onChange={(e) => updateItem('name', e.target.value)}
                />
            </Form.ContainerInput>

            <Form.ContainerInput>
                <Form.Label text='Categoria' />
                <Form.Input
                    typeInput='text'
                    placeholder='Ex.: Escritório'
                    name='category'
                    value={item.category}
                    onChange={(e) => updateItem('category', e.target.value)}
                />
            </Form.ContainerInput>

            <Form.ContainerInput size='small' >
                <Form.Label text='Unidade' />
                <select
                    value={item.unity}
                    onChange={(e) => updateItem('unity', e.target.value)}>
                    {units.map((option, index) =>
                        <option key={index}>
                            {option}
                        </option>
                    )}
                </select>
            </Form.ContainerInput>
            <Form.ContainerInput size='small'>
                <Form.Label text='Preço Unit. *' />
                <Form.Input typeInput='number'
                    name='unityPrice'
                    min='0'
                    value={item.unityPrice}
                    onChange={(e) => updateItem('unityPrice', e.target.value)}
                />
            </Form.ContainerInput>

            <Form.ContainerInput size='medium' >
                <Form.Label text='Impostos sob produto (%)' />
                <Form.Input typeInput='number'
                    name='itemTaxes'
                    min='0'
                    value={item.taxes}
                    onChange={(e) => updateItem('taxes', e.target.value)}
                />
            </Form.ContainerInput>

            <Form.ContainerInput size='xx-large' >
                <Form.Label text='Obs. do item' />
                <Form.Input
                    typeInput='text'
                    placeholder='Ex.: Usado somente para limpeza'
                    name='obsItem'
                    value={item.obsItem}
                    onChange={(e) => updateItem('obsItem', e.target.value)}
                />
            </Form.ContainerInput>


            <Form.ContainerInput size='medium' >
                <Form.Label text='Total' />
                <Form.LockedLabel text={'R$ '} />
            </Form.ContainerInput>

            <Form.ContainerInput size='medium' >
                {item.taxes > 0 && (
                    <div className='taxes-card-item'>
                        {`Impostos (${item.taxes}%)`}
                    </div>
                )}
            </Form.ContainerInput>

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