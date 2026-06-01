import { StyledCardDashboard } from './styled'

export const CardDashboard = ({ data }) => {
    const Icon = data.icon
    return (

        <StyledCardDashboard $color1={data.colorIcon} $color2={data.colorText}>
            <Icon />
            <p className='subtitle-card'>{data.title}</p>
            <p>{data.content}</p>
        </StyledCardDashboard>
    )
}