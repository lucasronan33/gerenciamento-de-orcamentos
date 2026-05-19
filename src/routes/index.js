import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Page404 from "../pages/Page404";
import MyRoute from "./MyRoute";
import Login from '../pages/Login';
import Register from '../pages/Register';
import Settings from '../pages/Settings';
import FAQ from '../pages/FAQ';
import PresetItems from '../pages/PresetItems';
import About from '../pages/About';
import { Providers } from '../providers';

export default function Routers() {
    return (
        <Providers>
            <Routes>
                <Route element={
                    <MyRoute isPublicOnly>
                        <Login />
                    </MyRoute>
                } path='/login' />

                <Route element={
                    <MyRoute isPublicOnly>
                        <Register />
                    </MyRoute>
                } path='/register' />

                <Route element={
                    <MyRoute isPublicOnly>
                        <Register />
                    </MyRoute>
                } path='/register' />

                <Route element={
                    <MyRoute isClosed>
                        <Home />
                    </MyRoute>
                } path='/' />

                <Route element={
                    <MyRoute isClosed>
                        <Home />
                    </MyRoute>
                } path='/budget/:id' />

                <Route element={
                    <MyRoute isClosed>
                        <PresetItems />
                    </MyRoute>
                } path='/predefineditems' />

                <Route element={
                    <MyRoute isClosed>
                        <Settings />
                    </MyRoute>
                } path='user/settings' />

                <Route element={
                    <MyRoute isClosed>
                        <About />
                    </MyRoute>
                } path='/about' />

                <Route element={
                    <MyRoute isClosed>
                        <FAQ />
                    </MyRoute>
                } path='/faq' />

                <Route element={
                    <MyRoute >
                        <Page404 />
                    </MyRoute>
                } path='*' />
            </Routes>
        </Providers>
    )
}
