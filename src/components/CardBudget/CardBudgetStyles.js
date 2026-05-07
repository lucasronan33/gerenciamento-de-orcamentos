import styled from 'styled-components';

export const ContainerCardBudget = styled.div`
    padding: 3vh;
    display: flex;
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

    .clientName{
        padding-bottom: 3vh;
    }
`

export const DivTitle = styled.div`
    width: 100%;
    justify-content: space-between;
`
export const StatusBudget = styled.div`
    padding: 5px 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: small;
`

export const InfoCardBudget = styled.div`
    width: 100%;
    padding-block: 1vh;
    row-gap: 1vh;
    /* border-bottom:1px solid #ccc; */

    div{
        width: 100%;
        justify-content: space-between;
    
        h3{
            padding-bottom: 2vh;
        }
    }

    a{
        div{
            padding: 1.5vh;
            border: 1px solid #ccc;
            border-radius: 10px;
            gap: 1vh;

            svg{
                max-height: 100%;
            }
        }
    }
`

export const CardIcons = styled.div`

    width: 100%;
    justify-content: space-between;
    gap: 1vh;

    .viewOrc{
        width: 45%;
    }

    .links,.viewOrc{
        flex-grow: 1;
        padding: 1vh;
        border: 1px solid #ccc;
        border-radius: 10px;
        gap: 1vh;

        .trashIco{
            color: darkred;
        }

        svg{
            max-width: 100%;
            max-height: 100%;
        }
            
    }
`