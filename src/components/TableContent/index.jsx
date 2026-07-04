import { FileText, Package, Users } from 'lucide-react';
import { Container } from '../../styles/GlobalStyles';
import { Card } from '../DashboardsHeader/styles';
import React, { useState } from 'react';
import { Button } from '../Button';
import { NavBudget } from '../NewBudget/styles';
import { Form } from '../Form';
import { BudgetsList } from './BudgetsList';

const navHeader = [
    {
        title: 'Orçamentos',
        icon: FileText,
    },
    {
        title: 'Clientes',
        icon: Users,
    },
    {
        title: 'Itens/Serviços',
        icon: Package,
    },
]


const tabs = [
    { key: 'Orçamentos', component: <BudgetsList /> },
    { key: 'Clientes', component: <></> },
    { key: 'Itens/Serviços', component: <></> },
]

export default function TableContent() {
    const [active, setActive] = useState('Orçamentos')

    const handleButtonActive = (option) => {
        setActive(option)
    }
    return (
        <Container>
            <Card>

                <NavBudget>
                    {navHeader.map((item) => {
                        const Icon = item.icon
                        return (
                            <Button.Root
                                key={item.title}
                                onClick={() => handleButtonActive(item.title)}
                                className={`button-nav-budget ${active === item.title ? 'active' : ''}`}
                            >
                                <Icon />
                                {item.title}
                            </Button.Root>
                        )
                    })
                    }
                </NavBudget>

                <Form.Root >
                    {tabs.map((tab) => (
                        <div
                            key={tab.key}
                            className={`tab-budget-content ${active === tab.key ? 'content-budget-active' : ''}`}
                        >
                            {tab.component}
                        </div>
                    ))}
                </Form.Root>
            </Card>
        </Container>
    )
}