const userRepository = require('../repositories/userRepository');
const passwordService = require('./passwordService');
const tokenService = require('./tokenService');
const AppError = require('../utils/AppError');

function isBlank(value) {
    return typeof value !== 'string' || value.trim().length === 0;
}

function normalizeEmail(email) {
    return email.trim().toLowerCase();
}

function validateRegisterData(data) {
    const { name, email, password, confirmPassword } = data;

    if ([name, email, password, confirmPassword].some(isBlank)) {
        throw new AppError('Todos os campos são obrigatórios', 400);
    }

    if (password !== confirmPassword) {
        throw new AppError('As senhas não coincidem', 400);
    }
}

function validateLoginData(data) {
    const { email, password } = data;

    if ([email, password].some(isBlank)) {
        throw new AppError('Email e senha são obrigatorios', 400);
    }
}

async function register(data) {
    validateRegisterData(data);

    const email = normalizeEmail(data.email);
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
        throw new AppError('Usuario já existe', 409);
    }

    const password = await passwordService.hash(data.password);
    const user = await userRepository.create({
        name: data.name.trim(),
        email,
        password,
    });

    return {
        token: tokenService.sign(user),
    };
}

async function login(data) {
    validateLoginData(data);

    const user = await userRepository.findByEmail(normalizeEmail(data.email));

    if (!user) {
        throw new AppError('Email ou senha inválidos', 401);
    }

    const passwordMatches = await passwordService.compare(data.password, user.password);

    if (!passwordMatches) {
        throw new AppError('Email ou senha inválidos', 401);
    }

    return {
        token: tokenService.sign(user),
    };
}

async function getProfile(userId) {
    const user = await userRepository.findById(userId);

    if (!user) {
        throw new AppError('Usuario não encontrado', 404);
    }

    return user;
}

module.exports = {
    register,
    login,
    getProfile,
};
