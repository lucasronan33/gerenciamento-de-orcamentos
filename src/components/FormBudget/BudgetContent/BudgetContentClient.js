import { FormBudget } from '..';
import { useBudget } from '../../BudgetContext';

export function BudgetContentClient() {
    const { budget, updateBudget, setBudget } = useBudget()
    return (
        <>
            <FormBudget.ContainerInput size='large'>
                <FormBudget.Label text='Nome da Empresa' />
                <FormBudget.Input typeInput='text'
                    placeholder='Razão Social'
                    name='enterpriseName'
                    value={budget.client?.enterpriseName}
                    onChange={(e) => updateBudget('client', 'enterpriseName', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='CNPJ / CPF' />
                <FormBudget.Input typeInput='text'
                    placeholder='000.000.000-00'
                    name='cpf_cnpj'
                    value={budget.client?.cpf_cnpj}
                    onChange={(e) => updateBudget('client', 'cpf_cnpj', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='large'>
                <FormBudget.Label text='Rua' />
                <FormBudget.Input typeInput='text'
                    placeholder='Rua'
                    name='street'
                    value={budget.client?.address?.street}
                    onChange={(e) => setBudget(prev => ({
                        ...prev,
                        client: {
                            ...prev.client,
                            address: {
                                ...prev.client.address,
                                'street': e.target.value
                            }
                        }
                    }))}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='Número' />
                <FormBudget.Input typeInput='number'
                    placeholder='Número'
                    name='number'
                    value={budget.client?.address?.number}
                    onChange={(e) => setBudget(prev => ({
                        ...prev,
                        client: {
                            ...prev.client,
                            address: {
                                ...prev.client.address,
                                'number': e.target.value
                            }
                        }
                    }))}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='Cidade' />
                <FormBudget.Input typeInput='text'
                    name='city'
                    value={budget.client?.address?.city}
                    onChange={(e) => setBudget(prev => ({
                        ...prev,
                        client: {
                            ...prev.client,
                            address: {
                                ...prev.client.address,
                                'city': e.target.value
                            }
                        }
                    }))}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='small'>
                <FormBudget.Label text='Estado' />
                <FormBudget.Input typeInput='text'
                    placeholder='UF'
                    name='state'
                    value={budget.client?.address?.state}
                    onChange={(e) => setBudget(prev => ({
                        ...prev,
                        client: {
                            ...prev.client,
                            address: {
                                ...prev.client.address,
                                'state': e.target.value
                            }
                        }
                    }))}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='small'>
                <FormBudget.Label text='CEP' />
                <FormBudget.Input typeInput='text'
                    placeholder='0000-000'
                    name='zipCode'
                    value={budget.client?.address?.zipCode}
                    onChange={(e) => setBudget(prev => ({
                        ...prev,
                        client: {
                            ...prev.client,
                            address: {
                                ...prev.client.address,
                                'zipCode': e.target.value
                            }
                        }
                    }))}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='medium'>
                <FormBudget.Label text='Telefone' />
                <FormBudget.Input typeInput='tel'
                    placeholder='(00) 0 0000-0000'
                    name='phone'
                    value={budget.client?.phone}
                    onChange={(e) => updateBudget('client', 'phone', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='E-mail' />
                <FormBudget.Input typeInput='email'
                    placeholder='contato@empresa.com'
                    name='email'
                    value={budget.client?.email}
                    onChange={(e) => updateBudget('client', 'email', e.target.value)}
                />
            </FormBudget.ContainerInput>
        </>
    )
}