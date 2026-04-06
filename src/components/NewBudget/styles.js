import styled from 'styled-components';

export const NavBudget = styled.div`
    max-width: 100%;
    width: 100%;
    overflow: auto;
    gap: 2vh;
    padding: 1vh 1.5vh;
    border-radius: 2vh;
    justify-content: center;
    align-items: center;
    background: #eee;

    @media (width<500px){
        justify-content: space-between;
    }
`