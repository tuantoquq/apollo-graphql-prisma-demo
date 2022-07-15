import { addRole } from './services/role.service.js';
import { register, login } from './services/user.service.js';
import {
    getAllAnimals,
    addAnimal,
    updateAnimal,
    deleteAnimalById,
    getAnimalById,
} from './services/animal.service.js';

const resolvers = {
    Query: {
        getAllAnimals,
    },
    Mutation: {
        addAnimal,
        getAnimalById,
        updateAnimal,
        deleteAnimalById,
        addRole,
        register,
        login,
    },
};

export default resolvers;
