import { FormBudget } from '..';

export function BudgetContentClient() {
    return (
        <>
            <FormBudget.ContainerInput size='large'>
                <FormBudget.Label text='Nome da Empresa' />
                <FormBudget.Input typeInput='text' placeholder='Razão Social' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='CNPJ / CPF' />
                <FormBudget.Input typeInput='text' placeholder='000.000.000-00' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='large'>
                <FormBudget.Label text='Endereço' />
                <FormBudget.Input typeInput='text' placeholder='Rua, Numero, Complemento' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='Cidade' />
                <FormBudget.Input typeInput='text' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='small'>
                <FormBudget.Label text='Estado' />
                <FormBudget.Input typeInput='text' placeholder='UF' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='small'>
                <FormBudget.Label text='CEP' />
                <FormBudget.Input typeInput='text' placeholder='0000-000' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='medium'>
                <FormBudget.Label text='Telefone' />
                <FormBudget.Input typeInput='tel' placeholder='(00) 0 0000-0000' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='E-mail' />
                <FormBudget.Input typeInput='email' placeholder='contato@empresa.com' />
            </FormBudget.ContainerInput>
        </>
    )
}