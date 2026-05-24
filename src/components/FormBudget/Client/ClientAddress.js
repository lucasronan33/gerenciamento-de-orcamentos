import { FormBudget } from '..';
import { useClient } from '../../../context/Client';
import { maskZipCode } from '../../../utils/masks';

export function CLientAddress() {
    const { client, updateSubClient } = useClient()
    return (
        <>
            <FormBudget.ContainerInput size='xx-large' >
                <FormBudget.Label
                    text={'Rua'}
                    htmlFor={'street'}
                />
                <FormBudget.Input
                    placeholder={'ex.: Barão do Rio Branco'}
                    typeInput={'text'}
                    id={'street'}
                    name={'street'}
                    value={client?.address?.street || ''}
                    onChange={(e) => updateSubClient('address', 'street', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput >
                <FormBudget.Label
                    text={'Número'}
                    htmlFor={'number'}
                />
                <FormBudget.Input
                    placeholder={'0000'}
                    typeInput={'number'}
                    id={'number'}
                    name={'number'}
                    value={client?.address?.number || ''}
                    onChange={(e) => updateSubClient('address', 'number', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='medium' >
                <FormBudget.Label
                    text={'Cidade'}
                    htmlFor={'city'}
                />
                <FormBudget.Input
                    placeholder={'ex.: Joinville'}
                    typeInput={'text'}
                    id={'city'}
                    name={'city'}
                    value={client?.address?.city || ''}
                    onChange={(e) => updateSubClient('address', 'city', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput >
                <FormBudget.Label
                    text={'Estado | UF'}
                    htmlFor={'state'}
                />
                <FormBudget.Input
                    placeholder={'ex.: SC'}
                    typeInput={'text'}
                    id={'state'}
                    name={'state'}
                    value={client?.address?.state || ''}
                    onChange={(e) => updateSubClient('address', 'state', e.target.value)}
                />
            </FormBudget.ContainerInput >

            <FormBudget.ContainerInput >
                <FormBudget.Label
                    text={'CEP'}
                    htmlFor={'zipCode'}
                />
                <FormBudget.Input
                    placeholder={'00000-000'}
                    typeInput={'number'}
                    id={'zipCode'}
                    name={'zipCode'}
                    value={client?.address?.zipCode || ''}
                    onChange={(e) => updateSubClient('address', 'zipCode', maskZipCode(e.target.value))}
                />
            </FormBudget.ContainerInput>
        </>
    )
}