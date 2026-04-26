import propTypes from 'prop-types';
import styled from 'styled-components';

const FormBudget = styled.div`
    display: grid;
    padding: 0.5vh;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 3vh;
`

export function FormBudgetRoot({ children }) {
    return (
        <FormBudget>
            {children}
        </FormBudget>
    )
}

FormBudgetRoot.propTypes = {
    children: propTypes.node
}