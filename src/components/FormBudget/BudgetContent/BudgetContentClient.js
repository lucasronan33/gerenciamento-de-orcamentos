import { FormBudget } from '..';

export function BudgetContentClient() {
    return (
        <>
            <FormBudget.ContainerInput size='large'>
                <FormBudget.Label text='Nome da Empresa' />
                <FormBudget.Input typeInput='text' placeholder='Razão Social' name='enterpriseName' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='CNPJ / CPF' />
                <FormBudget.Input typeInput='text' placeholder='000.000.000-00' name='cpf_cnpj' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='large'>
                <FormBudget.Label text='Endereço' />
                <FormBudget.Input typeInput='text' placeholder='Rua, Numero, Complemento' name='address' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='Cidade' />
                <FormBudget.Input typeInput='text' name='city' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='small'>
                <FormBudget.Label text='Estado' />
                <FormBudget.Input typeInput='text' placeholder='UF' name='state' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='small'>
                <FormBudget.Label text='CEP' />
                <FormBudget.Input typeInput='text' placeholder='0000-000' name='zip' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='medium'>
                <FormBudget.Label text='Telefone' />
                <FormBudget.Input typeInput='tel' placeholder='(00) 0 0000-0000' name='tel' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='E-mail' />
                <FormBudget.Input typeInput='email' placeholder='contato@empresa.com' name='email' />
            </FormBudget.ContainerInput>
        </>
    )
}