import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function MyRoute({ children, isClosed, ...rest }) {
    const isLoggedIn = false

    if (isClosed && !isLoggedIn) {
        return (
            <Navigate
                to='/login'
                state={{ prevPath: rest.location.pathname }}
            />
        )
    }

    return children
}

MyRoute.defaultProps = {
    isClosed: false,
}

MyRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
        .isRequired,
    isClosed: PropTypes.bool
}