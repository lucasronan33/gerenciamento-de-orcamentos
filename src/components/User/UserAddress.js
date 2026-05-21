import { FormBudget } from '../FormBudget';
import { useUser } from '../../context/User';
import { maskZipCode } from '../../utils/masks';

export const UserAddress = ({ user }) => {
    const { updateSubUser } = useUser()
    return (
        <>
            <FormBudget.ContainerInput size='xx-large' >
                <FormBudget.Label
                    text={'Rua'}
                    htmlFor={'street'}
                >
                </FormBudget.Label >
                <FormBudget.Input
                    placeholder={'ex.: Barão do Rio Branco'}
                    typeInput={'text'}
                    id={'street'}
                    value={user?.address?.street || ''}
                    onChange={(e) => updateSubUser('address', 'street', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput >
                <FormBudget.Label
                    text={'Número'}
                    htmlFor={'number'}
                >
                </FormBudget.Label >
                <FormBudget.Input
                    placeholder={'0000'}
                    typeInput={'number'}
                    id={'number'}
                    value={user?.address?.number || ''}
                    onChange={(e) => updateSubUser('address', 'number', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='medium' >
                <FormBudget.Label
                    text={'Cidade'}
                    htmlFor={'city'}
                >
                </FormBudget.Label >
                <FormBudget.Input
                    placeholder={'ex.: Joinville'}
                    typeInput={'text'}
                    id={'city'}
                    value={user?.address?.city || ''}
                    onChange={(e) => updateSubUser('address', 'city', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput >
                <FormBudget.Label
                    text={'Estado | UF'}
                    htmlFor={'state'}
                >
                </FormBudget.Label >
                <FormBudget.Input
                    placeholder={'ex.: SC'}
                    typeInput={'text'}
                    id={'state'}
                    value={user?.address?.state || ''}
                    onChange={(e) => updateSubUser('address', 'state', e.target.value)}
                />
            </FormBudget.ContainerInput >

            <FormBudget.ContainerInput >
                <FormBudget.Label
                    text={'CEP'}
                    htmlFor={'zipCode'}
                >
                </FormBudget.Label >
                <FormBudget.Input
                    placeholder={'00000-000'}
                    typeInput={'number'}
                    id={'zipCode'}
                    value={user?.address?.zipCode || ''}
                    onChange={(e) => updateSubUser('address', 'zipCode', maskZipCode(e.target.value))}
                />
            </FormBudget.ContainerInput>

        </>
    )
}
