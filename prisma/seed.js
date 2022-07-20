import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main () {
    await prisma.role.deleteMany();

    //create role
    const userRole = await prisma.role.create({
        data: {
            name: "USER"
        }
    });

    const adminRole = await prisma.role.create({
        data: {
            name: "ADMIN"
        }
    });

    console.log("Initial data: ", {userRole, adminRole});
}

main()
.catch((err) => {
    console.log(err);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});