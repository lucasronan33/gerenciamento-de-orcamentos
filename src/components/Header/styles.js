import styled from 'styled-components';
import * as color from '../../config/colors'

export const Title = styled.div`
    font-size: clamp(2vh, 3vh, 5vh);
    font-weight: bolder;
`

export const Subtitle = styled.div`
    font-size: large;

    &.subtitle-header{
        color: ${color.secondaryTextDarkColor};
    }
`