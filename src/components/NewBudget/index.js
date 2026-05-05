import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Subtitle, Title } from '../Header/styles';
import { NavBudget } from './styles';
import { Button } from '../Button';
import { FormBudget } from '../FormBudget';
import validator from 'validator'
import axios from '../../services/axios';

export default function NewBudget({ isVisible, handleIsVisible }) {
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = []

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());

    if (!data.clientName || data.clientName === '') formErrors.push({ clientName: 'Nome é um campo obrigatório' })
    if (!data.date || !validator.isDate(data.date)) formErrors.push({ date: 'Data ou formato da data invalido' })
    if (!data.validity || !validator.isDate(data.validity)) formErrors.push({ validity: 'Data ou formato da data invalido' })
    if (!data.time || !validator.isTime(data.time)) formErrors.push({ time: 'Horario ou formato do horario invalido' })
    if (data.email && !validator.isEmail(data.email)) formErrors.push({ email: 'email invalido' })

    if (formErrors.length > 0) return console.log(formErrors)
    try {
      const response = await axios.post(`/budgets`, {
        budgetNumber: data.budgetNumber,
        budgetStatus: data.budgetStatus,
        date: data.date,
        time: data.time,
        validity: data.validity,
        clientName: data.clientName,
        tel: data.tel,
        email: data.email,
        cpf_cnpj: data.cpf_cnpj,
        street: data.street,
        streetNumber: data.streetNumber,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        items: data.items,
        paymentMethod: data.paymentMethod,
        deliveryTime: data.deliveryTime,
        paymentConditions: data.paymentConditions,
        warranty: data.warranty,
        obsBudget: data.obsBudget,
        termsConditions: data.termsConditions,
        shippingType: data.shippingType,
        taxes: data.taxes,
        globalDiscount: data.globalDiscount,
        shippingFee: data.shippingFee,
      })

      console.log(response.data)
    } catch (err) {
      console.log(err.response?.data || err.message)
    }
  };

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
