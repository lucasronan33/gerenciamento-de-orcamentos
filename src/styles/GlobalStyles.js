import * as color from "../config/colors";

import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root{
    --successColor:${color.successColor};
    --infoColor:${color.infoColor};
    --errorColor:${color.errorColor};
    --warningColor:${color.warningColor};
    --primaryColor:${color.primaryColor};
    --primaryDarkColor:${color.primaryDarkColor};
    --secondaryDarkColor:${color.secondaryDarkColor};
    --buttonDarkColor:${color.buttonDarkColor};
    --borderDarkColor:${color.borderDarkColor};
    --inputHoverColor:${color.inputHoverColor};
    --blueDocument:${color.blueDocument};
    --blueHover:${color.blueHover};
    --purpleHover:${color.purpleHover};
    --sentColor:${color.sentColor};
    --approvedColor:${color.approvedColor};
    --rejectedColor:${color.rejectedColor};
    --finishedColor:${color.finishedColor};
    --sentDarkColor:${color.sentDarkColor};
    --approvedDarkColor:${color.approvedDarkColor};
    --rejectedDarkColor:${color.rejectedDarkColor};
    --finishedDarkColor:${color.finishedDarkColor};
}
*{
    margin: 0;
    padding: 0;
    outline: none;
    border: 0 solid;
    background: none;
    background-color: none;
    box-sizing: border-box;
}
body{
        min-height: 100dvh;
        font-family: 'Inter';
        background-color: ${color.primaryDarkColor};
        color: white;
    }
html,border-style,#root{
    height: 100%;
}
button{
    height: fit-content;
    display: flex;
    cursor: pointer;
    background: ${color.blueDocument};
    border: none;
    border-radius: 1.5vh;
    padding: 1.5vh 3vh;
    color: ${color.primaryDarkColor};
    font-weight: bold;
    column-gap: 1.5vh;
    align-items: center;
    justify-content: center;

    &:hover{
        box-shadow: -0.2vh 0.2vh 1vh ${color.blueDocument};
        transition: 0.2s;
    }
}
a{
    text-decoration: none;
    color: initial;
}
ul{
    list-style: none;
}
p{
    display: block !important;
}
`

export const Container = styled.section`
    max-width: 90%;
    margin: auto;
    padding-block: 30px;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    gap: 2vh;
    border-radius: 4px;
    `

export const Box = styled.div`
    display: flex;
    padding: 2vh;
    gap: 3vh;
    border:1px solid ${color.borderDarkColor};
    border-radius: 2vh;
    flex-wrap: wrap;
`
