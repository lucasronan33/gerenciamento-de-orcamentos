import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Subtitle, Title } from '../Header/styles';
import { NavBudget } from './styles';
import { Button } from '../Button';
import { FormBudget } from '../FormBudget';
import validator from 'validator'
import { store, update } from '../../services/axiosRoutes';
import { useBudget } from '../../context/Budget'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

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

    if (!budget.basic.date || !validator.isDate(budget.basic.date, {
      format: 'DD-MM-YYYY',
      strictMode: true,
    })) formErrors.push(
      <div>
        <strong>DATA: </strong>Data ou formato da data invalido
      </div>
    )
    if (!budget.basic.validUntil || !validator.isDate(budget.basic.validUntil, {
      format: 'DD-MM-YYYY',
      strictMode: true,
    })) formErrors.push(
      <div>
        <strong>VALIDO ATÉ: </strong>Data ou formato da data invalido
      </div>
    )
    if (!dayjs(budget.basic.date, 'DD-MM-YYYY').isBefore(dayjs(budget.basic.validUntil, 'DD-MM-YYYY'))) formErrors.push(
      <div>
        <strong>VALIDO ATÉ: </strong>A data não pode ser anterior a data agendada!
      </div>
    )
    if (!budget.basic.name || budget.basic.name === '') formErrors.push(
      <div>
        <strong>NOME: </strong>Nome é um campo obrigatório
      </div>
    )
    if (!budget.basic.time || !validator.isTime(budget.basic.time)) formErrors.push(
      <div>
        <strong>HORÁRIO: </strong>Horario ou formato do horario invalido
      </div>)
    if (budget.client.email && !validator.isEmail(budget.client.email)) formErrors.push(
      <div>
        <strong>EMAIL: </strong>email invalido
      </div>
    )

    if (formErrors.length > 0) {
      formErrors.map(value => toast.error(value, { autoClose: 5000, hideProgressBar: true }))
      return
    }
    try {
      if (budgetData) {
        const response = await update(`/budgets/${id}`, budget)
        toast.success(<div>Orçamento <strong>{response.data.basic.code}</strong> atualizado com sucesso!</div>)
      } else {
        const response = await store(`/budgets`, budget)
        toast.success(<div>Orçamento <strong>{response.data.basic.code}</strong> criado com sucesso!</div>)
      }
      fetchBudgets()
      navigate('/')
      handleIsVisible(false)

    } catch (err) {
      console.log(err)
      toast.error(err.message)
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
