import { Form } from '../Form'
import { useEffect, useMemo, } from 'react'
import '../../components/Form/style.css'
import { useSettings } from '../../context/Settings'
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
            for (let m = 0; m < 60; m += Number(settings?.services?.stepHour)) {
                result.push(
                    `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
                )
            }

        }
        return result
    }, [settings?.services?.stepHour])

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
            <Form.ContainerInput>
                <Form.Label text='Preço/h (R$)' />
                <Form.Input
                    typeInput='number'
                    value={settings?.services?.priceHour}
                    onChange={(e) => updateSubSettings('services', 'priceHour', Number(e.target.value))}
                />
            </Form.ContainerInput>

            <Form.ContainerInput>
                <Form.Label text='Tempo min. atendimento (h)' />

                <select value={settings?.services?.minTimeService} onChange={(e) => updateSubSettings('services', 'minTimeService', e.target.value)} >
                    {workTimes.map((option, index) =>
                        <option key={index} >
                            {option}
                        </option>
                    )}
                </select>
            </Form.ContainerInput>

            <Form.ContainerInput>
                <Form.Label text='Horário de Atendimento' />
                <div className='opening-hours'>
                    <select value={settings?.services?.startHour} onChange={(e) => updateSubSettings('services', 'startHour', e.target.value)}>
                        {workTimes.map((option, index) =>
                            <option key={index}>
                                {option}
                            </option>
                        )}
                    </select>
                    {'às'}
                    <select value={settings?.services?.endHour} onChange={(e) => updateSubSettings('services', 'endHour', e.target.value)}>
                        {workTimes.map((option, index) =>
                            <option key={index}>
                                {option}
                            </option>
                        )}
                    </select>
                </div>
            </Form.ContainerInput>


            <Form.ContainerInput size='medium' >
                <Form.Label text={'Dias de atendimento'} />
                <div className='week-date'>

                    {weekDays.map((item, index) =>
                        <div
                            className={`date ${settings?.services?.workDays?.includes(index)
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
            </Form.ContainerInput>

            <Form.ContainerInput>
                <Form.Label text={'Intervalo entre horários (min)'} />
                <select value={settings?.services?.stepHour} onChange={(e) => updateSubSettings('services', 'stepHour', Number(e.target.value))} >
                    {timeStep.map((option, index) =>
                        <option key={index} >
                            {option}
                        </option>
                    )}
                </select>
            </Form.ContainerInput>

        </>
    )
}