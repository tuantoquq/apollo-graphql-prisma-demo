import { ResponseStatus } from '../constants/ResponseStatus.js';
import CustomError from '../error/CustomError.js';
import client from '../config/prismaClient.js';
import { verifyToken } from '../middleware/authJwt.js';

// eslint-disable-next-line no-unused-vars
export const getAllAnimals = async (_, args) => {
    try {
        const listAnimal = await client.animal.findMany();
        return listAnimal;
    } catch (err) {
        console.log(err);
    }
};

export const addAnimal = async (_, args, context) => {
    try {
        const user = verifyToken(context);
        const newAnimal = await client.animal.create({
            data: {
                name: args.name,
                fact: args.fact,
                createBy: user.id
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
export const updateAnimal = async (_, args) => {
    try {
        const animal = await client.animal.update({
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
export const deleteAnimalById = async (_, args) => {
    try {
        const animal = await client.animal.delete({
            where: {
                id: args.id,
            },
        });
        return animal;
    } catch (err) {
        console.log(err);
    }
};
export const getAnimalById = async (_, args) => {
    try {
        const animal = await client.animal.findUnique({
            where: {
                id: args.id,
            },
            select: {
                id: true,
                name: true,
                fact: true,
                createBy: true
            },
        });
        return animal;
    } catch (err) {
        console.log(err);
    }
};

export const searchAnimal = async (_ ,args ) => {
    try {
        const listAnimal = await client.animal.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: args.key
                        }
                    },
                    {
                        fact: {
                            contains: args.key
                        }
                    }
                ]
            }
        });
        return {
            status: ResponseStatus.SUCCESS,
            message: 'search animal successfully',
            data: listAnimal,
        };
    } catch(err) {
        return {
            status: ResponseStatus.OTHER_ERROR,
            message: err.message,
        };
    }
}
export const getAllWithPagination = async (_ , args) => {
    try{
        const offset = args.offset === undefined ? 1 : args.offset;
        const limit = args.limit === undefined ? 10 : args.limit;
        const listAnimal = await client.animal.findMany({
            skip: (offset-1)*limit,
            take: limit
        });
        return {
            status: ResponseStatus.SUCCESS,
            message: "get animal with pagination successfully",
            data: listAnimal
        };
    }catch(err){
        return {
            status: ResponseStatus.OTHER_ERROR,
            message: err.message
        };
    }
}
