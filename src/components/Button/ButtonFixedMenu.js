import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import * as colors from '../../config/colors'

const ContainerFixedMenu = styled.div`
    display: flex;
    position: fixed;
    bottom: 2vh;
    right: 2vh;
    flex-direction: column;
    gap: 2vh;
    transition: 1s;

    @keyframes rotate-button-plus {
        from{
            rotate: 0;
        }
        to{
            rotate: 45deg;
        }
    }

    @keyframes rotate-button-plus-reverse {
        from{
            rotate: 45deg;
        }
        to{
            rotate: 0;
        }
    }
    &.container-fixed-closed >.button-plus{
        animation: rotate-button-plus-reverse 0.2s forwards;
    }
    &.container-fixed-open >.button-plus{
        background: ${colors.blueHover};
        color: ${colors.blueDocument};
        animation: rotate-button-plus 0.2s forwards;

        &:hover{
        background: ${colors.purpleHover};
        color: ${colors.buttonDarkColor};
        }
    }

    .button-fixed-menu{
        width: fit-content;
        aspect-ratio: 1 / 1;
        display: flex;
        padding: 1.5vh;
        border-radius: 50%;
        color: ${colors.blueHover};
        background: ${colors.blueDocument};
        cursor: pointer;

        &:hover{
            color: ${colors.blueDocument};
            background: ${colors.blueHover};
        }
    }
`

export function ButtonFixedMenu({ children }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <ContainerFixedMenu
            className={menuOpen ? 'container-fixed-open' : 'container-fixed-closed'}
        >
            {menuOpen
                ? <>{children?.map((item, index) => {
                    const Icon = item.icon
                    return (
                        <div
                            key={index}
                            className='button-fixed-menu'
                            onClick={() => {
                                setMenuOpen(false)
                                navigate(item.path)
                            }}
                        >
                            <Icon />
                        </div>
                    )
                }
                )}
                    <div
                        className='button-fixed-menu button-plus'
                        onClick={() => menuOpen ? setMenuOpen(false) : setMenuOpen(true)}
                    >
                        <Plus />
                    </div>
                </>
                : <div
                    className='button-fixed-menu button-plus'
                    onClick={() => menuOpen ? setMenuOpen(false) : setMenuOpen(true)}
                >
                    <Plus />
                </div>
            }
        </ContainerFixedMenu>
    )
}