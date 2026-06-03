import { Form } from '..';
import { useClient } from '../../../context/Client';
import { maskCpfCnpj, maskPhone, onlyDigits } from '../../../utils/masks';

export function ClientInfo() {
    const { client, updateClient } = useClient()
    return (
        <>
            <Form.ContainerInput size='xx-large' >
                <Form.Label
                    text={'Nome Completo *'}
                    htmlFor={'name'}
                />
                <Form.Input
                    placeholder={'Insira o nome completo do cliente'}
                    typeInput={'text'}
                    id={'name'}
                    name={'name'}
                    value={client?.name || ''}
                    onChange={(e) => updateClient('name', e.target.value)}
                />
            </Form.ContainerInput>

            <Form.ContainerInput >
                <Form.Label
                    text={'Telefone *'}
                    htmlFor={'phone'}
                />
                <Form.Input
                    placeholder={'(00) 9 0000-0000'}
                    typeInput={'phone'}
                    id={'phone'}
                    name={'phone'}
                    value={maskPhone(client?.phone || '')}
                    onChange={(e) => updateClient('phone', onlyDigits(e.target.value).slice(0, 11))}
                />
            </Form.ContainerInput>

            <Form.ContainerInput size='medium' >
                <Form.Label
                    text={'WhatsApp'}
                    htmlFor={'whatsapp'}
                />
                <Form.Input
                    placeholder={'(00) 9 0000-0000'}
                    typeInput={'phone'}
                    id={'whatsapp'}
                    name={'whatsapp'}
                    value={maskPhone(client?.whatsapp || '')}
                    onChange={(e) => updateClient('whatsapp', onlyDigits(e.target.value).slice(0, 11))}
                />
            </Form.ContainerInput>

            <Form.ContainerInput >
                <Form.Label
                    text={'CPF/CNPJ'}
                    htmlFor={'cpf_cnpj'}
                />
                <Form.Input
                    placeholder={'000.000.000-00'}
                    typeInput={'text'}
                    id={'cpf_cnpj'}
                    name={'cpf_cnpj'}
                    value={maskCpfCnpj(client?.cpf_cnpj || '')}
                    onChange={(e) => updateClient('cpf_cnpj', onlyDigits(e.target.value).slice(0, 14))}
                />
            </Form.ContainerInput>

            <Form.ContainerInput>
                <Form.Label text='E-mail' />
                <Form.Input typeInput='email'
                    placeholder='contato@cliente.com'
                    name='email'
                    value={client?.email}
                    onChange={(e) => updateClient('email', e.target.value)}
                />
            </Form.ContainerInput>
        </>
    )
}