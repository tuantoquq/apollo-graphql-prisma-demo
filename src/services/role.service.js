export const addRole = async (parent, args, context) => {
    try {
        const newRole = await context.prisma.role.create({
            data: {
                name: args.name.toUpperCase(),
            },
        });

        return newRole;
    } catch (err) {
        console.log(err);
    }
};
