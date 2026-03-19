import React from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
export default function MyRoute({ children, isClosed, isPublicOnly, ...rest }) {
    const location = useLocation()
    const isLoggedIn = false

    if (isClosed && !isLoggedIn) {
        return (
            <Navigate
                to='/login'
                state={{ prevPath: location.pathname }}
                replace
            />
        )
    }
    if (isPublicOnly && isLoggedIn) {
        return (
            <Navigate
                to='/home'
                replace />
        )
    }

    return children
}

MyRoute.defaultProps = {
    isClosed: false,
}

MyRoute.propTypes = {
    children: PropTypes.node.isRequired,
    isClosed: PropTypes.bool
}