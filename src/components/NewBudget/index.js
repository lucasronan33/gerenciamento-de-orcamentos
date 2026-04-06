import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Subtitle, Title } from '../Header/styles';
import { NavBudget } from './styles';
import { Button } from '../Button';
import { FormBudget } from '../FormBudget';

export default function NewBudget({ isVisible }) {
  const [active, setActive] = useState('Básico')
  const options = [
    'Básico',
    'Cliente',
    'Itens',
    'Condições',
  ]
  const tabs = [
    { key: 'Básico', component: <FormBudget.Content.Basic /> },
    { key: 'Cliente', component: <FormBudget.Content.Client /> },
    { key: 'Itens', component: <FormBudget.Content.Items /> },
    { key: 'Condições', component: <FormBudget.Content.Conditions /> },
  ]

  if (!isVisible) return;
  const handleButtonActive = (option) => {
    setActive(option)
    console.log(active)
  }

  return (
    <div className="span-newBudget">
      <form className="container-newBudget">
        <div className="header-budget">
          <Title>Novo Orçamento</Title>
          <Subtitle>Preencha as informações do orçamento</Subtitle>
        </div>

        <NavBudget>
          {options.map((item) => (
            <Button.Root
              key={item}
              onClick={() => handleButtonActive(item)}
              className={`button-nav-budget ${active === item ? 'active' : ''}`}
            >
              {item}
            </Button.Root>
          ))}
        </NavBudget>

        <FormBudget.Root>
          {tabs.map((tab) => (
            <div
              key={tab.key}
              className={`tab-budget-content ${active === tab.key ? 'content-budget-active' : ''}`}
            >
              {tab.component}
            </div>
          ))}
        </FormBudget.Root>

        <div className='container-buttons-budget'>
          <Button.Root className='btn-cancel'>Cancelar</Button.Root>
          <Button.Root>Criar Orçamento</Button.Root>
        </div>

      </form>
    </div>
  );
}

NewBudget.defaultProps = {
  isVisible: false,
};

NewBudget.propTypes = {
  isVisible: PropTypes.bool,
};
