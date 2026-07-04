import React, { useState } from 'react';
import './style.css';
import { Subtitle, Title } from '../Header/styles';
import { NavBudget } from './styles';
import { Button } from '../Button';
import { Form } from '../Form';
import validator from 'validator'
import { useBudget } from '../../context/Budget'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { budgetReset, createBudgetRequest, updateBudgetRequest } from '../../store/modules/budget/actions';

export default function NewBudget() {
  const dispatch = useDispatch()
  const { budget, setBudget, initialState, budgetOpen, setBudgetOpen } = useBudget()
  const [active, setActive] = useState('Básico')
  const options = [
    'Básico',
    'Cliente',
    'Itens',
    'Condições',
  ]
  const tabs = [
    { key: 'Básico', component: <Form.Content.Basic /> },
    { key: 'Cliente', component: <Form.Content.Client /> },
    { key: 'Itens', component: <Form.Content.Items /> },
    { key: 'Condições', component: <Form.Content.Conditions /> },
  ]

  const handleButtonActive = (option) => {
    setActive(option)
  }
  const handleCancel = () => {
    dispatch(budgetReset())
    setBudgetOpen(false)
    setBudget(initialState)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = []

    if (!budget.client || !Object.keys(budget.client).length > 0) formErrors.push({
      field: 'CLIENTE',
      message: 'Nenhum cliente selecionado!'
    })

    if (!budget.items || !budget.items.length > 0) formErrors.push({
      field: 'ITENS',
      message: 'Nenhum item selecionado!'
    })

    if (!budget.basic.date || !validator.isDate(budget.basic.date, {
      format: 'DD-MM-YYYY',
      strictMode: true,
    })) formErrors.push({
      field: 'DATA',
      message: 'Data ou formato da data invalido',
    })

    if (budget.basic.validUntil && !validator.isDate(budget.basic.validUntil, {
      format: 'DD-MM-YYYY',
      strictMode: true,
    })) formErrors.push({
      field: 'VALIDO ATÉ',
      message: 'Data ou formato da data invalido',
    })

    if (!budget.basic.title || budget.basic.title === '') formErrors.push({
      field: 'NOME',
      message: 'Nome é um campo obrigatório',
    })

    if (budget.basic.time && !validator.isTime(budget.basic.time)) formErrors.push({
      field: 'HORÁRIO',
      message: 'Horario ou formato do horario invalido',
    })

    if (formErrors.length > 0) {
      formErrors.forEach(value => toast.error(<div>
        <strong>{value.field}: </strong>{value.message} </div>,
        { autoClose: 5000, hideProgressBar: true }))
      return
    }

    try {
      if (budget._id) {
        dispatch(updateBudgetRequest(budget))
      } else {
        dispatch(createBudgetRequest(budget))
      }
      if (budgetOpen) {
        setBudgetOpen(false)
      }
    } catch (err) {
      toast.error(err.message)
    }
  };

  if (!budgetOpen) return;
  return (
    <div className="span-newBudget" onMouseDown={handleCancel}>
      <div className="container-newBudget" onMouseDown={(e) => e.stopPropagation()}>
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

        <div className='container-buttons-budget'>
          <Button.Root onClick={handleCancel} className='btn-cancel'>Cancelar</Button.Root>
          <Button.Root
            onClick={handleSubmit}
            type='submit'>
            {budget._id
              ? (
                'Atualizar Orçamento'
              )
              : (
                'Criar Orçamento'
              )}
          </Button.Root>
        </div>

      </div>
    </div>
  );
}