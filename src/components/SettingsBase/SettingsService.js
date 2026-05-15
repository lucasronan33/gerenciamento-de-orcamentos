import { FormBudget } from '../FormBudget'
import { useEffect, useMemo, } from 'react'
import '../../components/FormBudget/style.css'
import { useSettings } from '../SettingsContext'
import { show } from '../../services/axiosRoutes'

const weekDays = [
    'D',
    'S',
    'T',
    'Q',
    'Q',
    'S',
    'S',
]

export const SettingsService = () => {
    const { updateSubSettings, settings, initialState, setSettings } = useSettings()

    const workTimes = useMemo(() => {
        const result = []
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += Number(settings.services.stepHour)) {
                result.push(
                    `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
                )
            }

        }
        return result
    }, [settings.services.stepHour])

    const minTimeStep = 5
    const timeStep = []
    for (let m = minTimeStep; m <= 60; m += minTimeStep) {
        timeStep.push(m)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await show('/user/settings')

                setSettings(response.data)
            } catch (error) {
                setSettings(initialState)
            }
        }
        fetchData()
    }, [setSettings, initialState])

    return (
        <>
            <FormBudget.ContainerInput>
                <FormBudget.Label text='Preço/h (R$)' />
                <FormBudget.Input
                    typeInput='number'
                    value={settings.services.priceHour}
                    onChange={(e) => updateSubSettings('services', 'priceHour', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='Tempo min. atendimento (h)' />

                <select value={settings.services.minTimeService} onChange={(e) => updateSubSettings('services', 'minTimeService', e.target.value)} >
                    {workTimes.map((option, index) =>
                        <option key={index} >
                            {option}
                        </option>
                    )}
                </select>
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='Horário de Atendimento' />
                <div className='opening-hours'>
                    <select value={settings.services.startHour} onChange={(e) => updateSubSettings('services', 'startHour', e.target.value)}>
                        {workTimes.map((option, index) =>
                            <option key={index}>
                                {option}
                            </option>
                        )}
                    </select>
                    {'às'}
                    <select value={settings.services.endHour} onChange={(e) => updateSubSettings('services', 'endHour', e.target.value)}>
                        {workTimes.map((option, index) =>
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
                            className={`date ${settings.services.workDays?.includes(index)
                                ? 'date-active'
                                : 'date-inactive'
                                }`}
                            key={index}
                            onClick={() => updateSubSettings('services', 'workDays', prev => prev.includes(index)
                                ? prev.filter(day => day !== index)
                                : [...prev, index])}>
                            {item}
                        </div>
                    )}
                </div>
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text={'Intervalo entre horários (min)'} />
                <select value={settings.services.stepHour} onChange={(e) => updateSubSettings('services', 'stepHour', Number(e.target.value))} >
                    {timeStep.map((option, index) =>
                        <option key={index} >
                            {option}
                        </option>
                    )}
                </select>
            </FormBudget.ContainerInput>

        </>
    )
}