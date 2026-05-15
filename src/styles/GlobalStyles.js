import {
    primaryColor,
} from "../config/colors";

import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
    box-sizing: border-box;
}
body{
        min-height: 100dvh;
        font-family: sans-serif;
        background-color: #fff;
    }
html,border-style,#root{
    height: 100%;
}
button{
    height: fit-content;
    display: flex;
    cursor: pointer;
    background: ${primaryColor};
    border: none;
    border-radius: 1.5vh;
    padding: 1.5vh 3vh;
    color: #fff;
    font-weight: bold;
    column-gap: 1.5vh;
    align-items: center;
    justify-content: center;
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
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    gap: 2vh;
    background-color: #fff;
    border-radius: 4px;
    `

export const Box = styled.div`
    display: flex;
    padding: 2vh;
    gap: 3vh;
    border: #ddd 1px solid;
    border-radius: 2vh;
    flex-wrap: wrap;
`