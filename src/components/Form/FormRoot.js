import propTypes from 'prop-types';
import styled from 'styled-components';

const Form = styled.div`
    width: 100%;
    display: grid;
    padding: 0.5vh;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 3vh;
    
    span{
        display: flex;
    }
`

export function FormRoot({ children }) {
    return (
        <Form>
            {children}
        </Form>
    )
}

FormRoot.propTypes = {
    children: propTypes.node
}