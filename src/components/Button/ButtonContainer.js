import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContainerButton = styled.div`
  width: 100%;
  display: grid;
  gap: 1vh 3vh;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-content: end;
`


export function ButtonContainer({ children }) {
  return <ContainerButton >{children}</ContainerButton>
}

ButtonContainer.propTypes = {
  children: PropTypes.node
}