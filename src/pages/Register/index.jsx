import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import validator from 'validator'
import { Button } from '../../components/Button'
import { Form } from '../../components/Form'
import { registerRequest, registerReset } from '../../store/modules/auth/actions'

export default function RegisterContent({ modalVisible, setModalVisible }) {
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
    const location = useLocation()
    const redirectTo = location.state?.prevPath

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const sanitizeRegisterData = () => {
        const nome = validator.trim(formData.nome)
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
            const nextPath = typeof redirectTo === 'string' && redirectTo.startsWith('/') ? redirectTo : '/'
            navigate(nextPath, { replace: true })
            dispatch(registerReset())
        }
    }, [dispatch, isLoggedIn, isRegistered, navigate, redirectTo])

    useEffect(() => {
        if (modalVisible !== 'register') {
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
            className='
            z-99
            relative
            m-auto
            bg-accent/50
            flex
            min-h-[70vh]
            w-full
            max-w-xl
            flex-col
            items-center
            justify-around
            rounded-[2vh]
            p-[4vh]
            shadow-[-1vh_2vh_3vh_rgba(0,0,0,0.2)]
            '
        >
            <header className='flex flex-row items-center justify-center pb-3'>
                <h1 className='text-4xl sm:text-5xl font-extrabold'>Cadastro</h1>
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
                <div className='w-full flex flex-col gap-[1vh] py-3'>
                    <Form.Label name='nome' text='Nome' />
                    <Form.Input
                        name='nome'
                        typeInput='text'
                        placeholder='Digite seu nome'
                        value={formData.nome}
                        onChange={handleChange}
                    />
                    {formErrors.nome && <span className='field-helper error'>{formErrors.nome}</span>}
                </div>

                <div className='w-full flex flex-col gap-[1vh] py-3'>
                    <Form.Label name='email' text='E-mail' />
                    <Form.Input
                        name='email'
                        typeInput='email'
                        placeholder='Digite seu e-mail'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {formErrors.email && <span className='field-helper error'>{formErrors.email}</span>}
                </div>

                <div className='w-full flex flex-col gap-[1vh] py-3'>
                    <Form.Label name='senha' text='Senha' />
                    <Form.Input
                        name='senha'
                        typeInput={showPassword ? 'text' : 'password'}
                        placeholder='Digite sua senha'
                        value={formData.senha}
                        onChange={handleChange}
                        endIcon={showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        onEndIconClick={() => setShowPassword((prevState) => !prevState)}
                        aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                        title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    />
                    {formErrors.senha && <span className='field-helper error'>{formErrors.senha}</span>}
                </div>

                <div className='w-full flex flex-col gap-[1vh] py-3'>
                    <Form.Label name='confirmarSenha' text='Confirmar senha' />
                    <Form.Input
                        name='confirmarSenha'
                        typeInput={showPassword ? 'text' : 'password'}
                        placeholder='Confirme sua senha'
                        value={formData.confirmarSenha}
                        onChange={handleChange}
                        endIcon={showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        onEndIconClick={() => setShowPassword((prevState) => !prevState)}
                        aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                        title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    />
                    {formErrors.confirmarSenha && <span className='field-helper error'>{formErrors.confirmarSenha}</span>}
                </div>

                <div className='w-full flex flex-col gap-[1vh] py-3'>
                    <Form.Label name='telefone' text='Telefone' />
                    <Form.Input
                        name='telefone'
                        typeInput='tel'
                        placeholder='Digite seu telefone (opcional)'
                        value={formData.telefone}
                        onChange={handleChange}
                    />
                    {formErrors.telefone && <span className='field-helper error'>{formErrors.telefone}</span>}
                </div>

                <div className='mt-4 flex w-full flex-col justify-center gap-6 sm:flex-row-reverse'>
                    <Button.Primary type='submit' disabled={isLoading}>
                        {isLoading ? 'Cadastrando...' : 'Cadastrar-se'}
                    </Button.Primary>
                    <Button.Cancel className='btn-cancel' onClick={() => setModalVisible('login')}>
                        Voltar
                    </Button.Cancel>
                </div>
            </div>
        </motion.form>
    )
}
