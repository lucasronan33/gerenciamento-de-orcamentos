import React from 'react';

import axios from '../../services/axios';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/example/actions';
import Cards from '../../components/Header/Cards/Cards';
import CardOrc from '../../components/CardOrc/CardOrc';

export default function Login() {
    const dispatch = useDispatch();
    function handleClick(e) {
        e.preventDefault();

        dispatch(actions.clicaBotaoRequest());
    }

    return (
        <div>
            <Cards />
            <CardOrc />
        </div>
    );
}
