import { useEffect, useState } from 'react'
import { FormBudget } from '../../components/FormBudget'
import { ContainerLogin, LoginContent, Main } from './styled'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import { loginRequest } from '../../store/modules/auth/actions'

export default function Login() {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [formErrors, setFormErrors] = useState({})
    const dispatch = useDispatch()
    const { isLoading, isLoggedIn } = useSelector((state) => state.auth || {})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const email = validator.normalizeEmail(validator.trim(formData.email)) || ''
        const password = formData.password
        const errors = {}

        if (!validator.isEmail(email)) errors.email = 'Informe um e-mail valido.'
        if (!password) errors.password = 'Informe sua senha.'

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return
        }

        setFormErrors({})
        dispatch(loginRequest({ email, password }))
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn, navigate])

    return (
        <ContainerLogin>
            <Main></Main>
            <LoginContent>
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <FormBudget.Root>
                        <FormBudget.ContainerInput >
                            <FormBudget.Label name='email' text='E-mail' />
                            <FormBudget.Input
                                name='email'
                                typeInput='email'
                                placeholder='Digite seu e-mail para fazer login'
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {formErrors.email && <span className='field-helper error'>{formErrors.email}</span>}
                        </FormBudget.ContainerInput>
                        <FormBudget.ContainerInput >
                            <FormBudget.Label name='password' text='Senha' />
                            <FormBudget.Input
                                name='password'
                                typeInput={showPassword ? 'text' : 'password'}
                                placeholder='Digite sua senha para fazer login'
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {formErrors.password && <span className='field-helper error'>{formErrors.password}</span>}
                        </FormBudget.ContainerInput>
                        <div className='container-LinksLogin'>
                            <Link className='forgotPassword' to='forgot-password' >
                                Esqueci minha senha
                            </Link>
                            <div className='containerCheckbox'>
                                <input type='checkbox' id='handlePassword' onChange={(e) => setShowPassword(e.target.checked)} />
                                <label htmlFor='handlePassword'>Mostrar senha</label>
                            </div>
                        </div>

                        <div className='container-ButtonsLogin'>
                            <Button.Root className='btn-cancel' onClick={() => navigate('/cadastro')} >
                                Cadastre-se
                            </Button.Root>
                            <Button.Root type='submit' disabled={isLoading}>
                                {isLoading ? 'Entrando...' : 'Entrar'}
                            </Button.Root>
                        </div>
                    </FormBudget.Root>

                </form>
            </LoginContent>
        </ContainerLogin>
    )
}
