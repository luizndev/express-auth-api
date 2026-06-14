const authService = require('../services/authService');

async function register(req, res) {
    const result = await authService.register(req.body);

    return res.status(201).json({
        message: 'Usuario criado com sucesso',
        token: result.token,
    });
}

async function login(req, res) {
    const result = await authService.login(req.body);

    return res.status(200).json({
        message: 'Login realizado com sucesso',
        token: result.token,
    });
}

async function profile(req, res) {
    const user = await authService.getProfile(req.userId);

    return res.status(200).json({ user });
}

module.exports = {
    register,
    login,
    profile,
};
