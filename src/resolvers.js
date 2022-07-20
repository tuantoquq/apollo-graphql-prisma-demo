import { addRole } from './services/role.service.js';
import { register, login } from './services/user.service.js';
import {
    getAllAnimals,
    addAnimal,
    updateAnimal,
    deleteAnimalById,
    getAnimalById,
    searchAnimal,
    getAllWithPagination
} from './services/animal.service.js';

const resolvers = {
    Query: {
        getAllAnimals,
        searchAnimal,
        getAnimalById,
        getAllWithPagination
    },
    Mutation: {
        addAnimal,
        updateAnimal,
        deleteAnimalById,
        addRole,
        register,
        login,
    },
};

export default resolvers;
