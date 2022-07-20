import client from "../config/prismaClient.js";

export const addRole = async (_, args) => {
    try {
        const newRole = await client.role.create({
            data: {
                name: args.name.toUpperCase(),
            },
        });
        return newRole;
    } catch (err) {
        console.log(err);
    }
};
    