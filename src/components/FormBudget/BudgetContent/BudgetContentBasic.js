import { FormBudget } from '..';

export function BudgetContentBasic() {
    return (
        <>
            <FormBudget.ContainerInput>
                <FormBudget.Label text='Numero do Orçamento *' />
                <FormBudget.Input typeInput='text' placeholder='Numero do Orçamento' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='Nome do Cliente *' />
                <FormBudget.Input typeInput='text' placeholder='Nome do Cliente' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='Data *' />
                <FormBudget.Input typeInput='date' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='Valido até *' />
                <FormBudget.Input typeInput='date' />
            </FormBudget.ContainerInput>
        </>
    )
}