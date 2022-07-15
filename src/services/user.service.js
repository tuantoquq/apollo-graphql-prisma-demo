import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ResponseStatus } from '../constants/ResponseStatus.js';
import CustomError from '../error/CustomError.js';

const { hashSync, compareSync } = bcrypt;
const { sign } = jwt;

export const register = async (parent, args, context) => {
    try {
        const userRole = await context.prisma.role.findUnique({
            where: {
                name: 'USER',
            },
        });
        const newUser = await context.prisma.user.create({
            data: {
                email: args.email,
                password: hashSync(args.password),
                roleId: userRole.id,
                fullName: args.fullName,
            },
        });
        return {
            status: ResponseStatus.SUCCESS,
            message: 'Register successfully',
            data: newUser,
        };
    } catch (err) {
        return {
            status: ResponseStatus.OTHER_ERROR,
            message: err.message,
        };
    }
};

export const login = async (parent, args, context) => {
    try {
        const user = await context.prisma.user.findUnique({
            where: {
                email: args.email,
            },
        });
        if (!user) {
            return {
                status: ResponseStatus.INVALID_PARAM,
                message: 'Email not found',
            };
        }

        if (compareSync(args.password, user.password)) {
            const accessExpire = process.env.ACCESS_TOKEN_EXPIRATION;
            const refreshExpire = process.env.REFRESH_TOKEN_EXPIRATION;
            const userInfo = {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
            };

            const accessToken = sign(userInfo, process.env.ACCESS_JWT_SECRET, {
                expiresIn: accessExpire,
            });
            const refreshToken = sign(userInfo, process.env.REFRESH_JWT_SECRET, {
                expiresIn: refreshExpire,
            });
            return {
                status: ResponseStatus.SUCCESS,
                message: 'Login successfully',
                data: {
                    token: accessToken,
                    tokenExpire: parseInt(accessExpire),
                    refreshToken: refreshToken,
                    refreshTokenExpire: parseInt(refreshExpire),
                },
            };
        } else {
            return {
                status: ResponseStatus.INVALID_PARAM,
                message: 'Invalid email or password',
            };
        }
    } catch (err) {
        if (err instanceof CustomError) {
            return {
                status: err.status,
                message: err.message,
            };
        }
        return {
            status: ResponseStatus.OTHER_ERROR,
            message: err.message,
        };
    }
};
