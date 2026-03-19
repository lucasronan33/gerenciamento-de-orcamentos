import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Page404 from "../pages/Page404";
import MyRoute from "./MyRoute";

export default function Routers() {
    return (
        <Routes>
            <Route element={
                <MyRoute>
                    <Login />
                </MyRoute>
            } path='/' />

            <Route element={
                <MyRoute >
                    <Page404 />
                </MyRoute>
            } path='*' />
        </Routes>
    )
}