import { FormBudget } from '../FormBudget';
import { useUser } from '../../context/User';
import { maskCpfCnpj, maskPhone, onlyDigits } from '../../utils/masks';

export const UserBasic = ({ user }) => {
    const { updateUser } = useUser()

    return (
        <>
            <FormBudget.ContainerInput size='xx-large' >
                <FormBudget.Label
                    text={'Nome Completo *'}
                    htmlFor={'name'}
                >
                </FormBudget.Label >
                <FormBudget.Input
                    placeholder={'Insira seu nome completo'}
                    typeInput={'text'}
                    id={'name'}
                    value={user?.name || ''}
                    onChange={(e) => updateUser('name', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput >
                <FormBudget.Label
                    text={'Telefone *'}
                    htmlFor={'phone'}
                >
                </FormBudget.Label >
                <FormBudget.Input
                    placeholder={'(00) 9 0000-0000'}
                    typeInput={'phone'}
                    id={'phone'}
                    value={maskPhone(user?.phone || '')}
                    onChange={(e) => updateUser('phone', onlyDigits(e.target.value).slice(0, 11))}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='medium' >
                <FormBudget.Label
                    text={'WhatsApp'}
                    htmlFor={'whatsapp'}
                >
                </FormBudget.Label >
                <FormBudget.Input
                    placeholder={'(00) 9 0000-0000'}
                    typeInput={'phone'}
                    id={'whatsapp'}
                    value={maskPhone(user?.whatsapp || '')}
                    onChange={(e) => updateUser('whatsapp', onlyDigits(e.target.value).slice(0, 11))}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput >
                <FormBudget.Label
                    text={'CPF/CNPJ'}
                    htmlFor={'cpf_cnpj'}
                >
                </FormBudget.Label >
                <FormBudget.Input
                    placeholder={'000.000.000-00'}
                    typeInput={'text'}
                    id={'cpf_cnpj'}
                    value={maskCpfCnpj(user?.cpf_cnpj || '')}
                    onChange={(e) => updateUser('cpf_cnpj', onlyDigits(e.target.value).slice(0, 14))}
                />
            </FormBudget.ContainerInput>

        </>
    )
}
