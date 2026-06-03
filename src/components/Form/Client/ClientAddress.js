import { Form } from '..';
import { useClient } from '../../../context/Client';
import { maskZipCode } from '../../../utils/masks';

export function ClientAddress() {
    const { client, updateSubClient } = useClient()
    return (
        <>
            <Form.ContainerInput size='xx-large' >
                <Form.Label
                    text={'Rua'}
                    htmlFor={'street'}
                />
                <Form.Input
                    placeholder={'ex.: Barão do Rio Branco'}
                    typeInput={'text'}
                    id={'street'}
                    name={'street'}
                    value={client?.address?.street || ''}
                    onChange={(e) => updateSubClient('address', 'street', e.target.value)}
                />
            </Form.ContainerInput>

            <Form.ContainerInput >
                <Form.Label
                    text={'Número'}
                    htmlFor={'number'}
                />
                <Form.Input
                    placeholder={'0000'}
                    typeInput={'number'}
                    id={'number'}
                    name={'number'}
                    value={client?.address?.number || ''}
                    onChange={(e) => updateSubClient('address', 'number', e.target.value)}
                />
            </Form.ContainerInput>

            <Form.ContainerInput size='medium' >
                <Form.Label
                    text={'Cidade'}
                    htmlFor={'city'}
                />
                <Form.Input
                    placeholder={'ex.: Joinville'}
                    typeInput={'text'}
                    id={'city'}
                    name={'city'}
                    value={client?.address?.city || ''}
                    onChange={(e) => updateSubClient('address', 'city', e.target.value)}
                />
            </Form.ContainerInput>

            <Form.ContainerInput >
                <Form.Label
                    text={'Estado | UF'}
                    htmlFor={'state'}
                />
                <Form.Input
                    placeholder={'ex.: SC'}
                    typeInput={'text'}
                    id={'state'}
                    name={'state'}
                    value={client?.address?.state || ''}
                    onChange={(e) => updateSubClient('address', 'state', e.target.value)}
                />
            </Form.ContainerInput >

            <Form.ContainerInput >
                <Form.Label
                    text={'CEP'}
                    htmlFor={'zipCode'}
                />
                <Form.Input
                    placeholder={'00000-000'}
                    typeInput={'number'}
                    id={'zipCode'}
                    name={'zipCode'}
                    value={client?.address?.zipCode || ''}
                    onChange={(e) => updateSubClient('address', 'zipCode', maskZipCode(e.target.value))}
                />
            </Form.ContainerInput>
        </>
    )
}