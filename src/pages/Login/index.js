import React from 'react';

import axios from '../../services/axios';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/example/actions';
import HeaderMain from '../../components/HeaderMain';
import CardOrc from '../../components/CardOrc/CardOrc';
import HeaderFilter from '../../components/HeaderFilter';
import Header from '../../components/Header';

export default function Login() {
    const dispatch = useDispatch();
    function handleClick(e) {
        e.preventDefault();

        dispatch(actions.clicaBotaoRequest());
    }

    return (
        <div>
            <Header />
            <HeaderMain />
            <HeaderFilter />
            <CardOrc />
        </div>
    );
}
