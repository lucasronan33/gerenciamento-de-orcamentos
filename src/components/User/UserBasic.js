import { Form } from '../Form';
import { useUser } from '../../context/User';
import { maskCpfCnpj, maskPhone, onlyDigits } from '../../utils/masks';

export const UserBasic = ({ user }) => {
    const { updateUser } = useUser()

    return (
        <>
            <Form.ContainerInput size='xx-large' >
                <Form.Label
                    text={'Nome Completo *'}
                    htmlFor={'name'}
                >
                </Form.Label >
                <Form.Input
                    placeholder={'Insira seu nome completo'}
                    typeInput={'text'}
                    id={'name'}
                    value={user?.name || ''}
                    onChange={(e) => updateUser('name', e.target.value)}
                />
            </Form.ContainerInput>

            <Form.ContainerInput >
                <Form.Label
                    text={'Telefone *'}
                    htmlFor={'phone'}
                >
                </Form.Label >
                <Form.Input
                    placeholder={'(00) 9 0000-0000'}
                    typeInput={'phone'}
                    id={'phone'}
                    value={maskPhone(user?.phone || '')}
                    onChange={(e) => updateUser('phone', onlyDigits(e.target.value).slice(0, 11))}
                />
            </Form.ContainerInput>

            <Form.ContainerInput size='medium' >
                <Form.Label
                    text={'WhatsApp'}
                    htmlFor={'whatsapp'}
                >
                </Form.Label >
                <Form.Input
                    placeholder={'(00) 9 0000-0000'}
                    typeInput={'phone'}
                    id={'whatsapp'}
                    value={maskPhone(user?.whatsapp || '')}
                    onChange={(e) => updateUser('whatsapp', onlyDigits(e.target.value).slice(0, 11))}
                />
            </Form.ContainerInput>

            <Form.ContainerInput >
                <Form.Label
                    text={'CPF/CNPJ'}
                    htmlFor={'cpf_cnpj'}
                >
                </Form.Label >
                <Form.Input
                    placeholder={'000.000.000-00'}
                    typeInput={'text'}
                    id={'cpf_cnpj'}
                    value={maskCpfCnpj(user?.cpf_cnpj || '')}
                    onChange={(e) => updateUser('cpf_cnpj', onlyDigits(e.target.value).slice(0, 14))}
                />
            </Form.ContainerInput>

        </>
    )
}
