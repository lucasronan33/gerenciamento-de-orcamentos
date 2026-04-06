import React from "react";
import styled from "styled-components";

export const Card = styled.div`
    min-width: 200px;
    flex-grow: 1;
    padding: 3vh;
    display: flex;
    gap: 3vh;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    border-radius: 1.5vh;
    border: 1px solid #ccc;

    *{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap
    }

    &.card-filter{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        padding: 2vh 3vh;
    }
`
export const CardInfo = styled.div`
    width: fit-content;
    height: 5vh;
    flex-direction: column;
    align-items: start;
    flex-wrap: nowrap;
    gap: 0.5vh;

    p{
        font-size: 1.5vh;
    }
    p+p{
        font-size: x-large;
        font-weight: bolder;
        color: ${(props) => props.$color};
    }
    
    svg{
        width: 80%;
        height: 100%;
        color: ${(props) => props.$color}
    }
`