import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Subtitle, Title } from '../Header/styles';
import { NavBudget } from './styles';
import { Button } from '../Button';
import { FormBudget } from '../FormBudget';
import validator from 'validator'
import { store, update } from '../../services/axiosRoutes';
import { useBudget } from '../BudgetContext';
import { useNavigate } from 'react-router-dom';

export default function NewBudget({
  isVisible,
  handleIsVisible,
  budgetData,
  isNew,
  id,
}) {
  const navigate = useNavigate()
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

  const { fetchBudgets, initialState, budget, setBudget } = useBudget()

  const handleButtonActive = (option) => {
    setActive(option)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = []

    if (!budget.basic.name || budget.basic.name === '') formErrors.push({ name: 'Nome é um campo obrigatório' })
    if (!budget.basic.date || !validator.isDate(budget.basic.date)) formErrors.push({ date: 'Data ou formato da data invalido' })
    if (!budget.basic.validUntil || !validator.isDate(budget.basic.validUntil)) formErrors.push({ validUntil: 'Data ou formato da data invalido' })
    if (!budget.basic.time || !validator.isTime(budget.basic.time)) formErrors.push({ time: 'Horario ou formato do horario invalido' })
    if (budget.client.email && !validator.isEmail(budget.client.email)) formErrors.push({ email: 'email invalido' })

    if (formErrors.length > 0) {
      setBudget(prev => ({
        ...prev,
        formErrors
      }))
      return console.log(formErrors)
    }
    try {
      if (budgetData) {
        console.log(budget)
        const response = await update(`/budgets/${id}`, budget)
        console.log('response: ', response.data)
      } else {
        console.log(budget)
        const response = await store(`/budgets`, budget)
        console.log('response: ', response.data)
      }
      fetchBudgets()
      navigate('/')
      handleIsVisible(false)

    } catch (err) {
      console.log(err.response?.data || err.message)
    }
  };

  useEffect(() => {
    if (isNew) {
      setBudget(initialState)
      return
    }
    if (budgetData) {
      setBudget(budgetData)
    }
  }, [budgetData, isNew, setBudget, initialState])

  if (!isVisible) return;
  return (
    <div className="span-newBudget" onMouseDown={() => handleIsVisible(false)}>
      <form className="container-newBudget" onMouseDown={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
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

        <FormBudget.Root >
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
          <Button.Root onClick={() => handleIsVisible(false)} className='btn-cancel'>Cancelar</Button.Root>
          <Button.Root type='submit'>Criar Orçamento</Button.Root>
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
