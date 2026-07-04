import PropTypes from 'prop-types';


export function ButtonRoot({ children, type = 'button', ...rest }) {
  return <button type={type} {...rest}>{children}</button>;
}

ButtonRoot.propTypes = {
  children: PropTypes.node
}