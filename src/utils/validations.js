const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;
const CPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const TELEFONE = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

export function validateLogin({ login, senha }) {
    const errors = {};

    if (!login.trim()) {
        errors.login = 'O e-mail é obrigatório.';
    } else if (!EMAIL.test(login)) {
        errors.login = 'Informe um e-mail válido.';
    }

    if (!senha.trim()) {
        errors.senha = 'A senha é obrigatória.';
    } else if (senha.length < MIN_PASSWORD_LENGTH) {
        errors.senha = `A senha deve ter no mínimo ${MIN_PASSWORD_LENGTH} caracteres.`;
    }

    return errors;
}

export function validateRegister(fields) {
    const errors = {};

    if (!fields.nome.trim()) {
        errors.nome = "Informe seu nome completo.";
    }

    if (!fields.email.trim()) {
        errors.email = "O e-mail é obrigatório.";
    } else if (!EMAIL.test(fields.email)) {
        errors.email = "Informe um e-mail válido.";
    }

    if (!fields.senha.trim()) {
        errors.senha = "A senha é obrigatória.";
    } else if (fields.senha.length < MIN_PASSWORD_LENGTH) {
        errors.senha = `A senha deve ter no mínimo ${MIN_PASSWORD_LENGTH} caracteres.`;
    }

    if (!fields.confirmaSenha.trim()) {
        errors.confirmaSenha = "Confirme sua senha.";
    } else if (fields.senha !== fields.confirmaSenha) {
        errors.confirmaSenha = "As senhas não coincidem.";
    }

    if (!fields.cpf.trim()) {
        errors.cpf = "O CPF é obrigatório.";
    } else if (!CPF.test(fields.cpf)) {
        errors.cpf = "Informe o CPF no formato 000.000.000-00.";
    }

    if (!TELEFONE.test(fields.telefone)) {
        errors.telefone = "Informe o telefone no formato (00) 00000-0000.";
    }

    if (!fields.dataNascimento) {
        errors.dataNascimento = "Informe sua data de nascimento.";
    }

    return errors;
}