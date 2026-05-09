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

export const ConfirmDeleteModal = styled.div`
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3vh;

    .confirm-delete-overlay{
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        border-radius: 0;
        background: rgba(0, 0, 0, 0.35);
    }

    .confirm-delete-content{
        position: relative;
        width: min(100%, 420px);
        padding: 3vh;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 2vh;
        border-radius: 1.5vh;
        background: #fff;
        box-shadow: 0 2vh 4vh rgba(0, 0, 0, 0.2);
    }

    .confirm-delete-content h2,
    .confirm-delete-content p{
        justify-content: flex-start;
        text-align: left;
    }

    .confirm-delete-content p{
        color: #555;
        line-height: 1.5;
    }

    .confirm-delete-content strong{
        display: inline;
        color: #222;
    }

    .confirm-delete-actions{
        display: flex;
        justify-content: flex-end;
        gap: 1.5vh;
    }

    .btn-delete{
        background: #e74d3c;
    }

    @media (width < 500px){
        .confirm-delete-actions{
            flex-direction: column;
        }

        .confirm-delete-actions button{
            width: 100%;
        }
    }
`
