import React from 'react';

import axios from '../../services/axios';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/example/actions';
import Header from '../../components/Header';
import CardOrc from '../../components/CardOrc/CardOrc';
import HeaderFilter from '../../components/HeaderFilter';

export default function Login() {
    const dispatch = useDispatch();
    function handleClick(e) {
        e.preventDefault();

        dispatch(actions.clicaBotaoRequest());
    }

    return (
        <div>
            <Header />
            <HeaderFilter />
            <CardOrc />
        </div>
    );
}
