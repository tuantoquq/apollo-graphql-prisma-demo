import { ResponseStatus } from '../constants/ResponseStatus.js';
import CustomError from '../error/CustomError.js';

// eslint-disable-next-line no-unused-vars
export const getAllAnimals = async (parent, args, context) => {
    try {
        const listAnimal = await context.prisma.animal.findMany();
        return listAnimal;
    } catch (err) {
        console.log(err);
    }
};

export const addAnimal = async (parent, args, context) => {
    try {
        const userId = context.userId;
        if (userId === null) {
            return {
                status: ResponseStatus.AUTH_ERROR,
                message: 'No token provide',
            };
        }
        const newAnimal = await context.prisma.animal.create({
            data: {
                name: args.name,
                fact: args.fact,
            },
        });
        return {
            status: ResponseStatus.SUCCESS,
            message: 'Add animal successfully',
            data: newAnimal,
        };
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
export const updateAnimal = async (parent, args, context) => {
    try {
        const animal = await context.prisma.animal.update({
            data: {
                name: args.name,
                fact: args.fact,
            },
            where: {
                id: args.id,
            },
        });
        return animal;
    } catch (err) {
        console.log(err);
    }
};
export const deleteAnimalById = async (parent, args, context) => {
    try {
        const animal = await context.prisma.animal.delete({
            where: {
                id: args.id,
            },
        });
        return animal;
    } catch (err) {
        console.log(err);
    }
};
export const getAnimalById = async (parent, args, context) => {
    try {
        const animal = await context.prisma.animal.findUnique({
            where: {
                id: args.id,
            },
            select: {
                id: true,
                name: true,
                fact: true,
            },
        });
        return animal;
    } catch (err) {
        console.log(err);
    }
};
