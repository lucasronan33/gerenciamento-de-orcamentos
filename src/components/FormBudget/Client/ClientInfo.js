import { FormBudget } from '..';
import { useClient } from '../../../context/Client';
import { maskCpfCnpj, maskPhone, onlyDigits } from '../../../utils/masks';

export function ClientInfo() {
    const { client, updateClient } = useClient()
    return (
        <>
            <FormBudget.ContainerInput size='xx-large' >
                <FormBudget.Label
                    text={'Nome Completo *'}
                    htmlFor={'name'}
                />
                <FormBudget.Input
                    placeholder={'Insira o nome completo do cliente'}
                    typeInput={'text'}
                    id={'name'}
                    name={'name'}
                    value={client?.name || ''}
                    onChange={(e) => updateClient('name', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput >
                <FormBudget.Label
                    text={'Telefone *'}
                    htmlFor={'phone'}
                />
                <FormBudget.Input
                    placeholder={'(00) 9 0000-0000'}
                    typeInput={'phone'}
                    id={'phone'}
                    name={'phone'}
                    value={maskPhone(client?.phone || '')}
                    onChange={(e) => updateClient('phone', onlyDigits(e.target.value).slice(0, 11))}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='medium' >
                <FormBudget.Label
                    text={'WhatsApp'}
                    htmlFor={'whatsapp'}
                />
                <FormBudget.Input
                    placeholder={'(00) 9 0000-0000'}
                    typeInput={'phone'}
                    id={'whatsapp'}
                    name={'whatsapp'}
                    value={maskPhone(client?.whatsapp || '')}
                    onChange={(e) => updateClient('whatsapp', onlyDigits(e.target.value).slice(0, 11))}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput >
                <FormBudget.Label
                    text={'CPF/CNPJ'}
                    htmlFor={'cpf_cnpj'}
                />
                <FormBudget.Input
                    placeholder={'000.000.000-00'}
                    typeInput={'text'}
                    id={'cpf_cnpj'}
                    name={'cpf_cnpj'}
                    value={maskCpfCnpj(client?.cpf_cnpj || '')}
                    onChange={(e) => updateClient('cpf_cnpj', onlyDigits(e.target.value).slice(0, 14))}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='E-mail' />
                <FormBudget.Input typeInput='email'
                    placeholder='contato@cliente.com'
                    name='email'
                    value={client?.email}
                    onChange={(e) => updateClient('email', e.target.value)}
                />
            </FormBudget.ContainerInput>
        </>
    )
}