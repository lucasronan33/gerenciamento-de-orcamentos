import { FormBudget } from '../FormBudget';

export const UserBasic = ({ user }) => {

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
                    onChange={(e) => { }}
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
                    value={user?.phone || ''}
                    onChange={(e) => { }}
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
                    value={user?.whatsapp || ''}
                    onChange={(e) => { }}
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
                    value={user?.cpf_cnpj || ''}
                    onChange={(e) => { }}
                />
            </FormBudget.ContainerInput>

        </>
    )
}