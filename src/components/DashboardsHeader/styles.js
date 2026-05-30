import styled from "styled-components";
import * as color from '../../config/colors'

export const Card = styled.div`
    background: ${color.secondaryDarkColor};
    min-width: 200px;
    flex-grow: 1;
    padding: 3vh;
    display: flex;
    gap: 3vh;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    border-radius: 1.5vh;
    border: 1px solid ${color.borderDarkColor};

    *{
        display: flex;
        align-items: center;
        flex-wrap: wrap
    }
    &.weekly-recipe{
        width: 100%;
        
        .title-card{
            color: slategray;
            font-weight: normal;
            font-size: 1.75vh;
        }
}

    &.card-filter{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        padding: 2vh 3vh;
    }

    &.hover-container:hover{
        box-shadow: -0.2vh 0.2vh 2vh ${color.blueHover};
    }
`
export const CardInfo = styled.div`
    width: fit-content;
    flex-direction: column;
    align-items: start;
    flex-wrap: nowrap;
    gap: 0.5vh;

    p{
        font-size: x-large;
        font-weight: bolder;
        color: ${(props) => props.$color2};
    }
    .subtitle-card{
        color: slategray;
        font-weight: normal;
        font-size: 1.5vh;
    }
    
    svg{
        color: ${(props) => props.$color1}
    }
`