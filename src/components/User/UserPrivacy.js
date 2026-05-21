import { FormBudget } from '../FormBudget';
import { useUser } from '../../context/User';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const UserPrivacy = ({ user }) => {
    const { updateUser } = useUser()
    const [showPassword, setShowPassword] = useState(false)
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    return (
        <>
            <FormBudget.ContainerInput size='xx-large' >
                <FormBudget.Label
                    text={'Email *'}
                    htmlFor={'email'}
                >
                </FormBudget.Label >
                <FormBudget.Input
                    placeholder={'Insira seu nome completo'}
                    typeInput={'text'}
                    id={'email'}
                    value={user?.email || ''}
                    onChange={(e) => updateUser('email', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput >
                <FormBudget.Label name='currentPassword' text='Senha atual' />
                <FormBudget.Input
                    id='currentPassword'
                    typeInput={showCurrentPassword ? 'text' : 'password'}
                    placeholder='Digite sua senha atual'
                    value={user?.currentPassword || ''}
                    onChange={(e) => updateUser('currentPassword', e.target.value)}
                    endIcon={showCurrentPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    onEndIconClick={() => setShowCurrentPassword((prevState) => !prevState)}
                    aria-label={showCurrentPassword ? 'Ocultar senha atual' : 'Mostrar senha atual'}
                    title={showCurrentPassword ? 'Ocultar senha atual' : 'Mostrar senha atual'}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput >
                <FormBudget.Label name='password' text='Senha' />
                <FormBudget.Input
                    id='password'
                    typeInput={showPassword ? 'text' : 'password'}
                    placeholder='Digite sua senha'
                    value={user?.password || ''}
                    onChange={(e) => updateUser('password', e.target.value)}

                    endIcon={showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    onEndIconClick={() => setShowPassword((prevState) => !prevState)}
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                />
            </FormBudget.ContainerInput>

        </>
    )
}
