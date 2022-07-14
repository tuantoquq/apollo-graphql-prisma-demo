import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
    Query: {
        // eslint-disable-next-line no-unused-vars
        getAllAnimals: async (parent, args) => {
            const listAnimal = await prisma.animal.findMany();
            return listAnimal;
        }
    },
    Mutation: {
        addAnimal: async (parent, args) => {
            const newAnimal = await prisma.animal.create({
                data: {
                    name: args.name,
                    fact: args.fact
                },
            });
            return newAnimal;
        },
        getAnimalById: async (parent, args) => {
            const animal = await prisma.animal.findUnique({
                where: {
                    id: args.id
                },
                select: {
                    id: true,
                    name: true,
                    fact: true
                }
            });
            return animal;
        },
        updateAnimal: async(parent, args) => {
            const animal = await prisma.animal.update({
                data: {
                    name: args.name,
                    fact: args.fact
                },
                where: {
                    id: args.id
                }
            });
            return animal;
        },
        deleteAnimalById: async (parent, args) => {
            const animal = await prisma.animal.delete({
                where: {
                    id: args.id
                }
            });
            return animal;
        }
    }
}

export default resolvers;