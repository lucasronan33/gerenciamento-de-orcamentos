import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Page404 from "../pages/Page404";
import MyRoute from "./MyRoute";

export default function Routers() {
    return (
        <Routes>
            <Route element={
                <MyRoute>
                    <Home />
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