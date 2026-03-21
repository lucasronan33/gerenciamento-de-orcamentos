import React from "react";
import styled from "styled-components";

export const DivContainerFilter = styled.div`
    flex-grow: 1;
    flex-direction: column;
    position: relative;

    .dropDownMenu{
        width: 100%;
        position: absolute;
        z-index: 2;
        top: 90%;
        background-color: #f5f5f5;
        border-radius: 0 0 1vh 1vh;
        overflow: auto;

        *{
            width: 100%;
            padding: 1vh 2.5vh;
            justify-content: start;

            &:hover{
                background-color: #ccc;
            }
        }
    }
`

export const InptSearch = styled.div`
    width: 100%;
    background-color:#f5f5f5;
    border-radius: 1vh;
    height: 5vh;
    position: relative;

    svg{
        width: auto;
        height: 2.5vh;
        padding-inline: 2.5vh;
        z-index: 1;
        position: absolute;
        stroke: #aaa;

        &.search-icon{
            left: 0;
        }
        &.chevronDown-icon{
            right: 0;
        }
    }

    input{
        width: 100%;
        height: 100%;
        border: 0;
        background: none;
        flex-grow: 1;
        z-index: 2;
        position: absolute;
        padding-inline: 2.5vh;
        border-radius: 1vh;
        left: 0;

        &.input-search{
            padding-inline: 7.5vh;
        }

        &:focus{
            outline: #555 1px solid;
            box-shadow: 0px 0px 10px #aaa;
        }
    }
`