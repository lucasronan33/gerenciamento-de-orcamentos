import { GoogleLogin } from '@react-oauth/google'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import validator from 'validator'
import { googleLoginRequest, loginRequest } from '../../store/modules/auth/actions'
import { Button } from '../Button'
import { Form } from '../Form'

export default function LoginContent({ modalVisible, setModalVisible }) {

    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
    const hasGoogleClientId = Boolean(googleClientId?.trim())

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [formErrors, setFormErrors] = useState({})
    const dispatch = useDispatch()
    const { isLoading, isLoggedIn } = useSelector((state) => state.auth || {})
    const navigate = useNavigate()
    const location = useLocation()
    const redirectTo = location.state?.prevPath

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
            const nextPath = typeof redirectTo === 'string' && redirectTo.startsWith('/') ? redirectTo : '/'
            navigate(nextPath, { replace: true })
        }
    }, [isLoggedIn, navigate, redirectTo])

    useEffect(() => {
        if (modalVisible !== 'login') {
            return
        }
    }, [
        modalVisible
    ])

    return (
        <motion.form
            onMouseUp={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            onSubmit={() => handleSubmit}
            className='z-99 bg-accent/50 flex min-h-[70vh] w-full max-w-xl flex-col items-center justify-around rounded-[2vh] p-[4vh] shadow-[-1vh_2vh_3vh_rgba(0,0,0,0.2)]'
        >
            <header className='flex flex-row items-center justify-center pb-3'>
                <h1 className='text-5xl font-extrabold'>Login</h1>
                <div className='h-[4vh] self-start justify-self-start'></div>
            </header>
            <div className='
            w-full
            flex
            flex-1
            flex-col
            place-items-center
            place-content-start
            '>
                <div className='w-full flex flex-col gap-[1vh] py-5'>
                    <Form.Label name='email' text='E-mail' />
                    <Form.Input
                        name='email'
                        typeInput='email'
                        placeholder='Digite seu e-mail para fazer login'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {formErrors.email && <span className='text-sm font-semibold text-[#e74d3c]'>{formErrors.email}</span>}
                </div>
                <div className='w-full flex flex-col gap-[1vh] py-5'>
                    <Form.Label name='password' text='Senha' />
                    <Form.Input
                        name='password'
                        typeInput={showPassword ? 'text' : 'password'}
                        placeholder='Digite sua senha para fazer login'
                        value={formData.password}
                        onChange={handleChange}
                        endIcon={showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        onEndIconClick={() => setShowPassword((prevState) => !prevState)}
                        aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                        title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    />
                    {formErrors.password && <span className='text-sm font-semibold text-[#e74d3c]'>{formErrors.password}</span>}
                </div>
                <div className='flex h-fit w-full flex-row flex-wrap items-center justify-between gap-y-4 pb-[7vh]'>
                    <Link className='text-base text-[#aaa] underline' to='forgot-password'>
                        Esqueci minha senha
                    </Link>
                </div>

                {hasGoogleClientId ? (
                    <GoogleLogin
                        theme='filled_blue'
                        onSuccess={(credentialResponse) => {
                            dispatch(googleLoginRequest({
                                credential: credentialResponse.credential
                            }))
                        }}
                        onError={() => toast.error('Nao foi possivel iniciar o login com Google.')}
                    />
                ) : (
                    <span className='text-sm font-semibold text-[#e74d3c]'>
                        Login com Google indisponivel no momento.
                    </span>
                )}

            </div>
            <div className='mt-4 flex w-full flex-col justify-center items-center gap-6 sm:flex-row'>
                <Button.Secondary
                    onClick={() => setModalVisible('register')}>
                    Cadastre-se
                </Button.Secondary>
                <Button.Primary
                    type='submit'
                    disabled={isLoading}
                >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                </Button.Primary>
            </div>
        </motion.form>
    )
}

