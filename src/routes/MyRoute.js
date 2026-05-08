import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
export default function MyRoute({ children, isClosed, isPublicOnly, ...rest }) {
    const location = useLocation()
    const { isCheckingAuth, isLoggedIn } = useSelector((state) => state.auth || {})

    if (isCheckingAuth && isClosed) {
        return null
    }

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
                to='/'
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
    isClosed: PropTypes.bool,
    isPublicOnly: PropTypes.bool,
}
