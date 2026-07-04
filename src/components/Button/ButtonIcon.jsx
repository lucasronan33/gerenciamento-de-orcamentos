import PropTypes from 'prop-types';

export function ButtonIcon({ icon: Icon }) {
  return <Icon />;
}

ButtonIcon.propTypes = {
  icon: PropTypes.node
}