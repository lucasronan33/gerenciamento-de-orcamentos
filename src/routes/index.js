import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Page404 from "../pages/Page404";
import MyRoute from "./MyRoute";
import { BudgetProvider } from '../components/BudgetContext';

export default function Routers() {
    return (
        <BudgetProvider>
            <Routes>
                <Route element={
                    <MyRoute>
                        <Home />
                    </MyRoute>
                } path='/' />

                <Route element={
                    <MyRoute>
                        <Home />
                    </MyRoute>
                } path='/budget/:id' />

                <Route element={
                    <MyRoute >
                        <Page404 />
                    </MyRoute>
                } path='*' />
            </Routes>
        </BudgetProvider>
    )
}