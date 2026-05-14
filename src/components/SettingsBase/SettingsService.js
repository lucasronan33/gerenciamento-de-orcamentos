import { FormBudget } from '../FormBudget'
import { useEffect, useMemo, useState } from 'react'
import '../../components/FormBudget/style.css'
import { useSettings } from '../SettingsContext'
import { show } from '../../services/axiosRoutes'
import { DatePicker } from '@mui/x-date-pickers'
import { validateDay } from '../../utils/schedule'
import dayjs from 'dayjs'

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
    const [date, setDate] = useState(null)

    const times = useMemo(() => {
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

    const timesHour = []
    for (let m = 10; m <= 60; m += 10) {
        timesHour.push(m)
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
                    <select value={settings.services.startHour} onChange={(e) => updateSubSettings('services', 'startHour', e.target.value)}>
                        {times.map((option, index) =>
                            <option key={index}>
                                {option}
                            </option>
                        )}
                    </select>
                    {'às'}
                    <select value={settings.services.endHour} onChange={(e) => updateSubSettings('services', 'endHour', e.target.value)}>
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
                            className={`date ${settings.services.workDays.includes(index)
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
                <select value={settings.services.stepHour} onChange={(e) => updateSubSettings(Number('services', 'stepHour', e.target.value))} >
                    {timesHour.map((option, index) =>
                        <option key={index} >
                            {option}
                        </option>
                    )}
                </select>
            </FormBudget.ContainerInput>
            <FormBudget.ContainerInput>
                <DatePicker
                    label='Selecione uma data'
                    onChange={setDate}
                    value={date}
                    shouldDisableDate={!settings.services.workDays}
                />
            </FormBudget.ContainerInput>

        </>
    )
}