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


    --radius: 0.75rem;

    --background: rgb(7, 14, 22);
    --foreground: rgb(246, 249, 252);

    --surface: rgb(14, 23, 32);
    --surface-2: rgb(22, 32, 43);

    --card: rgb(14, 23, 32);
    --card-foreground: rgb(246, 249, 252);
    --popover: rgb(14, 23, 32);
    --popover-foreground: rgb(246, 249, 252);

    --primary: rgb(0, 205, 253);
    --primary-foreground: rgb(7, 14, 22);

    --brand: rgb(0, 205, 253);
    --brand-foreground: rgb(7, 14, 22);
    --brand-soft: rgb(0, 54, 73);

    --secondary: rgb(27, 37, 48);
    --secondary-foreground: rgb(246, 249, 252);
    --muted: rgb(27, 37, 48);
    --muted-foreground: rgb(156, 166, 177);
    --accent: rgb(7, 51, 63);
    --accent-foreground: rgb(246, 249, 252);
    --destructive: rgb(249, 65, 68);
    --destructive-foreground: rgb(246, 249, 252);
    --border: rgba(255, 255, 255, 0.1);
    --input: rgba(255, 255, 255, 0.12);
    --ring: rgb(0, 205, 253);
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
    cursor: pointer;
}
a{
    text-decoration: none;
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
