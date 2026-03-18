import {
    primaryColor,
    primaryDarkColor,
    errorColor,
    infoColor,
    warningColor
} from "../config/colors";

import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}
body{
    /* width: 415px;
    height: 915px;
    margin: 0 auto; */
    font-family: sans-serif;
    /* background-color: ${primaryDarkColor}; */
}
html,border-style,#root{
    height: 100%;
}
button{
    cursor: pointer;
    background: ${primaryColor};
    border: none;
    padding: 10px 20px;
    color: #fff;
    border-radius: 4px;
    font-weight: 700;
}
a{
    text-decoration: none;
    color: initial;
}
ul{
    list-style: none;
}
`

export const Container = styled.section`
    max-width: 90%;
    margin: 30px auto;
    display: flex;
    flex-wrap: wrap;
    gap: 2vh;
    /* justify-content: space-between; */
    background-color: #fff;
    /* padding-block: 5vh; */
    border-radius: 4px;
    /* box-shadow: 0 0 10px rgba(0,0,0,0.1); */
`