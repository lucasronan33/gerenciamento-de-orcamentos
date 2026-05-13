import { FormBudget } from '../FormBudget'
import { useEffect, useMemo, useState } from 'react'
import '../../components/FormBudget/style.css'
import { Button } from '../Button'
import { SaveIcon } from 'lucide-react'
import { useSettings } from '../SettingsContext'
// import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const weekDays = [
    'D',
    'S',
    'T',
    'Q',
    'Q',
    'S',
    'S',
]

export const SettingsServicve = () => {
    const { updateSettings, settings } = useSettings()
    const [priceHour, setPriceHour] = useState(settings.priceHour || 0)
    const [workDays, setWorkDays] = useState(settings.workDays || [])
    const [startHour, setStartHour] = useState(settings.startHour || '00:00')
    const [endHour, setEndHour] = useState(settings.endHour || '00:00')
    const [stepHour, setStepHour] = useState(settings.stepHour || 30)
    const [minTimeService, setMinTimeService] = useState(settings.minTimeService || '00:00')
    // const { id } = useParams()
    const { isLoading } = useSelector(state => state.auth || {})

    const times = useMemo(() => {
        const result = []
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += Number(stepHour)) {
                result.push(
                    `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
                )
            }

        }
        return result
    }, [stepHour])

    const timesHour = []
    for (let m = 10; m <= 60; m += 10) {
        timesHour.push(m)
    }

    useEffect(() => {

        console.log(settings)
    }, [
        settings
    ])

    return (
        <>
            <FormBudget.ContainerInput>
                <FormBudget.Label text='Preço/h (R$)' />
                <FormBudget.Input
                    typeInput='number'
                    value={priceHour}
                    onChange={(e) => setPriceHour(Number(e.target.value))}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='Tempo min. atendimento (h)' />

                <select value={minTimeService} onChange={(e) => setMinTimeService(e.target.value)} >
                    {times.map((option, index) =>
                        <option key={index} >
                            {option}
                        </option>
                    )}
                </select>
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='Horário de Atendimento' />
                <div className='opening-hours'>
                    <select value={startHour} onChange={(e) => setStartHour(e.target.value)}>
                        {times.map((option, index) =>
                            <option key={index}>
                                {option}
                            </option>
                        )}
                    </select>
                    {'às'}
                    <select value={endHour} onChange={(e) => setEndHour(e.target.value)}>
                        {times.map((option, index) =>
                            <option key={index}>
                                {option}
                            </option>
                        )}
                    </select>
                </div>
            </FormBudget.ContainerInput>


            <FormBudget.ContainerInput size='medium' >
                <FormBudget.Label text={'Dias de atendimento'} />
                <div className='week-date'>

                    {weekDays.map((item, index) =>
                        <div
                            className={`date ${workDays.includes(index) ? 'date-active' : 'date-inactive'}`}
                            key={index}
                            onClick={() => setWorkDays(prev => prev.includes(index)
                                ? prev.filter(day => day !== index)
                                : [...prev, index])}>
                            {item}
                        </div>
                    )}
                </div>
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text={'Intervalo entre horários (min)'} />
                <select value={stepHour} onChange={(e) => setStepHour(Number(e.target.value))} >
                    {timesHour.map((option, index) =>
                        <option key={index} >
                            {option}
                        </option>
                    )}
                </select>
            </FormBudget.ContainerInput>

            <Button.Container>
                <Button.Root className='btn-save'
                    disabled={isLoading}
                    onClick={() => {
                        updateSettings('services', {
                            workDays,
                            priceHour,
                            endHour,
                            startHour,
                            minTimeService
                        })

                    }} >
                    <Button.Icon icon={SaveIcon} />
                    {isLoading ? 'Salvando...' : 'Salvar'}
                </Button.Root>
            </Button.Container>
        </>
    )
}