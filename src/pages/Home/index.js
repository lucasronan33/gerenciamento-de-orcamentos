import React, { useEffect, useState } from 'react';

import './style.css'

import axios from '../../services/axios';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/example/actions';
import HeaderMain from '../../components/HeaderMain';
import HeaderFilter from '../../components/HeaderFilter';
import Header from '../../components/Header';
import { Container } from '../../styles/GlobalStyles';
import CardBudget from '../../components/CardBudget/CardBudget';

export default function Home() {
    const [budgets, setBudgets] = useState([])

    const dispatch = useDispatch();
    function handleClick(e) {
        e.preventDefault();

        dispatch(actions.clicaBotaoRequest());
    }

    useEffect(() => {
        async function getData() {
            const response = await axios.get('/budgets')
            setBudgets(response.data)
            console.log('response: ', response.data)
        }
        getData()
    }, [])

    return (
        <div>
            <Header />
            <HeaderMain />
            <HeaderFilter />
            <div className='content'>
                {budgets.map(budget => (
                    <CardBudget key={budget._id} budget={budget} />
                ))}
            </div>
        </div>
    );
}
