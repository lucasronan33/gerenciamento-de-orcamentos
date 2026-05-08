import { useEffect, useMemo, useState } from 'react'
import { Edit, Plus, Save, Trash2, X } from 'lucide-react'
import Header from '../../components/Header'
import { Button } from '../../components/Button'
import { FormBudget } from '../../components/FormBudget'
import './style.css'

const emptySetting = {
    key: '',
    value: '',
    description: '',
}

const initialSettings = [
    {
        id: 'currency',
        key: 'Moeda padrao',
        value: 'BRL',
        description: 'Moeda utilizada nos orcamentos e relatorios.',
    },
    {
        id: 'business-hours',
        key: 'Horario comercial',
        value: '08:00 - 18:00',
        description: 'Janela padrao para agendamentos.',
    },
]

export default function Settings() {
    const [settings, setSettings] = useState(() => {
        const savedSettings = localStorage.getItem('budget-settings')
        return savedSettings ? JSON.parse(savedSettings) : initialSettings
    })
    const [formData, setFormData] = useState(emptySetting)
    const [editingId, setEditingId] = useState(null)
    const [errors, setErrors] = useState({})

    const isEditing = useMemo(() => Boolean(editingId), [editingId])

    useEffect(() => {
        localStorage.setItem('budget-settings', JSON.stringify(settings))
    }, [settings])

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const validate = () => {
        const nextErrors = {}

        if (!formData.key.trim()) nextErrors.key = 'Informe o nome da configuracao.'
        if (!formData.value.trim()) nextErrors.value = 'Informe o valor da configuracao.'

        setErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }

    const resetForm = () => {
        setFormData(emptySetting)
        setEditingId(null)
        setErrors({})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return

        if (isEditing) {
            setSettings((prevState) => prevState.map((setting) => (
                setting.id === editingId
                    ? { ...setting, ...formData }
                    : setting
            )))
            resetForm()
            return
        }

        setSettings((prevState) => [
            ...prevState,
            {
                id: crypto.randomUUID(),
                ...formData,
            },
        ])
        resetForm()
    }

    const handleEdit = (setting) => {
        setEditingId(setting.id)
        setFormData({
            key: setting.key,
            value: setting.value,
            description: setting.description,
        })
        setErrors({})
    }

    const handleDelete = (id) => {
        setSettings((prevState) => prevState.filter((setting) => setting.id !== id))

        if (editingId === id) {
            resetForm()
        }
    }

    return (
        <div>
            <Header />
            <main className='settings-page'>
                <section className='settings-heading'>
                    <h1>Configuracoes</h1>
                    <p>Gerencie preferencias operacionais usadas no dia a dia do negocio.</p>
                </section>

                <form className='settings-form' onSubmit={handleSubmit}>
                    <FormBudget.Root>
                        <FormBudget.ContainerInput>
                            <FormBudget.Label text='Nome' />
                            <FormBudget.Input
                                name='key'
                                typeInput='text'
                                placeholder='Ex: Tempo minimo entre atendimentos'
                                value={formData.key}
                                onChange={handleChange}
                            />
                            {errors.key && <span className='field-helper error'>{errors.key}</span>}
                        </FormBudget.ContainerInput>

                        <FormBudget.ContainerInput>
                            <FormBudget.Label text='Valor' />
                            <FormBudget.Input
                                name='value'
                                typeInput='text'
                                placeholder='Ex: 15 minutos'
                                value={formData.value}
                                onChange={handleChange}
                            />
                            {errors.value && <span className='field-helper error'>{errors.value}</span>}
                        </FormBudget.ContainerInput>

                        <FormBudget.ContainerInput>
                            <FormBudget.Label text='Descricao' />
                            <FormBudget.Input
                                name='description'
                                typeInput='text'
                                placeholder='Explique quando essa configuracao sera usada'
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </FormBudget.ContainerInput>
                    </FormBudget.Root>

                    <div className='settings-actions'>
                        {isEditing && (
                            <Button.Root className='btn-cancel' onClick={resetForm}>
                                <X />
                                Cancelar
                            </Button.Root>
                        )}
                        <Button.Root type='submit'>
                            {isEditing ? <Save /> : <Plus />}
                            {isEditing ? 'Salvar alteracoes' : 'Criar configuracao'}
                        </Button.Root>
                    </div>
                </form>

                <section className='settings-list'>
                    {settings.map((setting) => (
                        <article className='settings-item' key={setting.id}>
                            <div>
                                <h2>{setting.key}</h2>
                                <strong>{setting.value}</strong>
                                {setting.description && <p>{setting.description}</p>}
                            </div>
                            <div className='settings-item-actions'>
                                <Button.Root onClick={() => handleEdit(setting)}>
                                    <Edit />
                                </Button.Root>
                                <Button.Root className='btn-cancel' onClick={() => handleDelete(setting.id)}>
                                    <Trash2 />
                                </Button.Root>
                            </div>
                        </article>
                    ))}
                </section>
            </main>
        </div>
    )
}
