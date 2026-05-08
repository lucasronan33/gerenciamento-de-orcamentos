import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import { Button } from '../../components/Button'
import { FormBudget } from '../../components/FormBudget'
import { registerRequest, registerReset } from '../../store/modules/auth/actions'
import { ContainerRegister, Main, RegisterContent } from './styled'

export default function Register() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        telefone: '',
    })
    const [formErrors, setFormErrors] = useState({})
    const dispatch = useDispatch()
    const { isLoading, isRegistered, isLoggedIn } = useSelector((state) => state.auth || {})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const sanitizeRegisterData = () => {
        const nome = validator.escape(validator.trim(formData.nome))
        const email = validator.normalizeEmail(validator.trim(formData.email)) || ''
        const telefone = validator.trim(formData.telefone).replace(/\D/g, '')

        return {
            nome,
            email,
            senha: formData.senha,
            confirmarSenha: formData.confirmarSenha,
            telefone,
        }
    }

    const validateRegisterData = (data) => {
        const errors = {}

        if (!validator.isLength(data.nome, { min: 2, max: 80 })) {
            errors.nome = 'Nome deve ter entre 2 e 80 caracteres.'
        }

        if (!validator.isEmail(data.email)) {
            errors.email = 'Informe um e-mail valido.'
        }

        if (!validator.isLength(data.senha, { min: 6, max: 72 })) {
            errors.senha = 'Senha deve ter entre 6 e 72 caracteres.'
        }

        if (data.senha !== data.confirmarSenha) {
            errors.confirmarSenha = 'Senha e confirmar senha devem ser iguais.'
        }

        if (data.telefone && !validator.isLength(data.telefone, { min: 10, max: 11 })) {
            errors.telefone = 'Telefone deve conter DDD e ter 10 ou 11 digitos.'
        }

        return errors
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const sanitizedData = sanitizeRegisterData()
        const errors = validateRegisterData(sanitizedData)

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return
        }

        setFormErrors({})
        dispatch(registerRequest({
            name: sanitizedData.nome,
            email: sanitizedData.email,
            password: sanitizedData.senha,
        }))
    }

    useEffect(() => {
        if (isRegistered || isLoggedIn) {
            navigate('/')
            dispatch(registerReset())
        }
    }, [dispatch, isLoggedIn, isRegistered, navigate])

    return (
        <ContainerRegister>
            <Main></Main>
            <RegisterContent>
                <h1>Registro</h1>

                <form onSubmit={handleSubmit}>
                    <FormBudget.Root>
                        <FormBudget.ContainerInput>
                            <FormBudget.Label name='nome' text='Nome' />
                            <FormBudget.Input
                                name='nome'
                                typeInput='text'
                                placeholder='Digite seu nome'
                                value={formData.nome}
                                onChange={handleChange}
                            />
                            {formErrors.nome && <span className='field-helper error'>{formErrors.nome}</span>}
                        </FormBudget.ContainerInput>

                        <FormBudget.ContainerInput>
                            <FormBudget.Label name='email' text='E-mail' />
                            <FormBudget.Input
                                name='email'
                                typeInput='email'
                                placeholder='Digite seu e-mail'
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {formErrors.email && <span className='field-helper error'>{formErrors.email}</span>}
                        </FormBudget.ContainerInput>

                        <FormBudget.ContainerInput>
                            <FormBudget.Label name='senha' text='Senha' />
                            <FormBudget.Input
                                name='senha'
                                typeInput={showPassword ? 'text' : 'password'}
                                placeholder='Digite sua senha'
                                value={formData.senha}
                                onChange={handleChange}
                            />
                            {formErrors.senha && <span className='field-helper error'>{formErrors.senha}</span>}
                        </FormBudget.ContainerInput>

                        <FormBudget.ContainerInput>
                            <FormBudget.Label name='confirmarSenha' text='Confirmar senha' />
                            <FormBudget.Input
                                name='confirmarSenha'
                                typeInput={showPassword ? 'text' : 'password'}
                                placeholder='Confirme sua senha'
                                value={formData.confirmarSenha}
                                onChange={handleChange}
                            />
                            {formErrors.confirmarSenha && <span className='field-helper error'>{formErrors.confirmarSenha}</span>}
                        </FormBudget.ContainerInput>

                        <FormBudget.ContainerInput>
                            <FormBudget.Label name='telefone' text='Telefone' />
                            <FormBudget.Input
                                name='telefone'
                                typeInput='tel'
                                placeholder='Digite seu telefone (opcional)'
                                value={formData.telefone}
                                onChange={handleChange}
                            />
                            {formErrors.telefone && <span className='field-helper error'>{formErrors.telefone}</span>}
                        </FormBudget.ContainerInput>

                        <div className='containerCheckbox'>
                            <input type='checkbox' id='handlePassword' onChange={(e) => setShowPassword(e.target.checked)} />
                            <label htmlFor='handlePassword'>Mostrar senha</label>
                        </div>

                        <div className='container-ButtonsRegister'>
                            <Button.Root className='btn-cancel' onClick={() => navigate('/login')}>
                                Voltar
                            </Button.Root>
                            <Button.Root type='submit' disabled={isLoading}>
                                {isLoading ? 'Registrando...' : 'Registrar'}
                            </Button.Root>
                        </div>
                    </FormBudget.Root>
                </form>
            </RegisterContent>
        </ContainerRegister>
    )
}
