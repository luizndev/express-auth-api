const AppError = require('../utils/AppError');
const tokenService = require('../services/tokenService');

function extractBearerToken(authorization) {
    if (!authorization) {
        return null;
    }

    const [scheme, token] = authorization.split(' ');

    if (scheme?.toLowerCase() !== 'bearer' || !token) {
        return null;
    }

    return token;
}

function authMiddleware(req, res, next) {
    const token = extractBearerToken(req.headers.authorization);

    if (!token) {
        return next(new AppError('Token nao informado', 401));
    }

    try {
        const decodedToken = tokenService.verify(token);
        req.userId = decodedToken.id;
        return next();
    } catch (error) {
        return next(new AppError('Token invalido', 401));
    }
}

module.exports = authMiddleware;
