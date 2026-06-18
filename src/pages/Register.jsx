import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
 
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
 
import { registerUser } from '@/services/UserService'
import { validateRegister } from '@/utils/validations'

function maskCPF(value) {
    return value
        .replace(/\D/g, '')
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

function maskTelefone(value) {
    return value
        .replace(/\D/g, '')
        .slice(0, 11)
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{1,4})$/, '$1-$2')
}

const INITIAL = {
    nome: '', email: '', cpf: '',
    dataNascimento: '', telefone: '',
    senha: '', confirmaSenha: ''
}

export function Register() {
    const navigate = useNavigate();
    const [form, setForm]   = useState(INITIAL);
    const [errors, setErrors]   = useState({});
    const [touched, setTouched] = useState({});

    const set = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }))
        if (touched[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: validateRegister({ ...form, [field]: value })[field]
            }))
        }
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }))
        setErrors(prev => ({ ...prev, [field]: validateRegister(form)[field] }))
    };

    const inputProps = (field) => ({
        value: form[field],
        onBlur: () => handleBlur(field),
        'aria-invalid': !!(touched[field] && errors[field]),
        className: touched[field] && errors[field]
            ? 'border-red-400 focus-visible:ring-red-300'
            : ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        setTouched(Object.fromEntries(Object.keys(INITIAL).map(key => [key, true])));

        const validationErrors = validateRegister(form);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;
 
        const registered = registerUser({
            nome: form.nome,
            email: form.email,
            cpf: form.cpf,
            dataNascimento: form.dataNascimento,
            telefone: form.telefone,
            senha: form.senha,
        })
 
        if (!registered) {
            setErrors(prev => ({ ...prev, email: 'Este e-mail já está cadastrado.' }))
            return
        }
 
        toast.success('Cadastro realizado!', {
            description: 'Faça login para continuar.',
            duration: 3000,
        });

        setTimeout(() => navigate('/login'), 1500);
    };

    const ErrorMsg = ({ field }) =>
        touched[field] && errors[field]
            ? <p className="text-xs text-red-500">{errors[field]}</p> 
            : null;

    return (
        <main className="min-h-full bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 shadow-md p-8 flex flex-col gap-6">
                <div className="text-center">
                    <h1 className="text-xl font-bold text-gray-900">
                        Criar conta
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Preencha os dados para se registrar
                    </p>
                </div>

                <Separator />

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="nome" className="text-sm font-medium text-gray-700">
                            Nome completo
                        </Label>
                        <Input
                            id="nome"
                            type="text"
                            autoComplete="name"
                            onChange={e => set('nome', e.target.value)}
                            {...inputProps('nome')}
                        />
                        <ErrorMsg field="nome" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            E-mail
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="email@email.com"
                            autoComplete="email"
                            onChange={e => set('email', e.target.value)}
                            {...inputProps('email')}
                        />
                        <ErrorMsg field="email" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="cpf" className="text-sm font-medium text-gray-700">
                            CPF
                        </Label>
                        <Input
                            id="cpf"
                            type="text"
                            placeholder="000.000.000-00"
                            autoComplete="off"
                            onChange={e => set('cpf', maskCPF(e.target.value))}
                            {...inputProps('cpf')}
                        />
                        <ErrorMsg field="cpf" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="dataNascimento" className="text-sm font-medium text-gray-700">
                            Data de nascimento
                        </Label>
                        <Input
                            id="dataNascimento"
                            type="date"
                            autoComplete="bday"
                            onChange={e => set('dataNascimento', e.target.value)}
                            {...inputProps('dataNascimento')}
                        />
                        <ErrorMsg field="dataNascimento" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="telefone" className="text-sm font-medium text-gray-700">
                            Telefone
                        </Label>
                        <Input
                            id="telefone"
                            type="tel"
                            placeholder="(00) 00000-0000"
                            autoComplete="tel"
                            onChange={e => set('telefone', maskTelefone(e.target.value))}
                            {...inputProps('telefone')}
                        />
                        <ErrorMsg field="telefone" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="senha" className="text-sm font-medium text-gray-700">
                            Senha
                        </Label>
                        <Input
                            id="senha"
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            autoComplete="new-password"
                            onChange={e => set('senha', e.target.value)}
                            {...inputProps('senha')}
                        />
                        <ErrorMsg field="senha" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="confirmaSenha" className="text-sm font-medium text-gray-700">
                            Confirmar senha
                        </Label>
                        <Input
                            id="confirmaSenha"
                            type="password"
                            placeholder="Repita a senha"
                            autoComplete="new-password"
                            onChange={e => set('confirmaSenha', e.target.value)}
                            {...inputProps('confirmaSenha')}
                        />
                        <ErrorMsg field="confirmaSenha" />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-sky-400 hover:bg-sky-500 text-white font-semibold h-11 rounded-lg mt-1">
                        Criar conta
                    </Button>
                </form>

                <p className="text-center text-sm text-gray-500">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="text-sky-400 font-medium hover:underline">
                        Faça o login.
                    </Link>
                </p>
            </div>
        </main>
    );
}