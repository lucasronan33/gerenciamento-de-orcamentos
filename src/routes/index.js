import { Route, Routes } from "react-router-dom";

import About from '../pages/About';
import { Clients } from '../pages/Clients';
import FAQ from '../pages/FAQ';
import Home from "../pages/Home";
import Landing from '../pages/Landing';
import Page404 from "../pages/Page404";
import PresetItems from '../pages/PresetItems';
import Register from '../pages/Register';
import Settings from '../pages/Settings';
import { Providers } from '../providers';
import MyRoute from "./MyRoute";

export default function Routers() {
    return (
        <Providers>
            <Routes>
                <Route element={
                    <MyRoute isPublicOnly>
                        <Landing />
                    </MyRoute>
                } path='/login' />

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
                        <Clients />
                    </MyRoute>
                } path='/clients' />

                <Route element={
                    <MyRoute isClosed>
                        <PresetItems />
                    </MyRoute>
                } path='/predefineditems' />

                <Route element={
                    <MyRoute isClosed>
                        <Settings />
                    </MyRoute>
                } path='/user/settings' />

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
