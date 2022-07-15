import jwt from 'jsonwebtoken';
import { ResponseStatus } from '../constants/ResponseStatus.js';
import CustomError from '../error/CustomError.js';

const { verify, TokenExpiredError } = jwt;

const CatchExpiredTokenError = (err) => {
    if (err instanceof TokenExpiredError) {
        throw new CustomError(
            ResponseStatus.AUTH_ERROR,
            'Unauthorized! Token is expired',
        );
    }
    throw new CustomError(ResponseStatus.AUTH_ERROR, 'Unauthorized! Invalid token');
};

export const verifyToken = (context) => {
    let bearerToken = context.req.headers.authorization;
    if (bearerToken !== undefined && bearerToken.startsWith('Bearer ')) {
        let token = context.req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new CustomError(ResponseStatus.AUTH_ERROR, 'No token provide');
        }

        try{
            const user = verify(token, process.env.ACCESS_JWT_SECRET);
            return user;
        }catch(err){
            CatchExpiredTokenError(err);
        }
    } else {
        throw new CustomError(ResponseStatus.AUTH_ERROR, 'Invalid token provide');
    }
};
