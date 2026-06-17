import { StyledCardDashboard } from './styled'

export const CardDashboard = ({ data }) => {
    const Icon = data.icon
    return (

        <StyledCardDashboard $color1={data.colorIcon} $color2={data.colorText}>
            <div className='background-icon'>
                <Icon />
                <div />
            </div>
            <p className='subtitle-card'>{data.title}</p>
            <p>{data.content}</p>
        </StyledCardDashboard>
    )
}