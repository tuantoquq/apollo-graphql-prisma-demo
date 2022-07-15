import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';
import express from 'express';
import path from 'path';
import 'dotenv/config';
import resolvers from './resolvers.js';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from './middleware/authJwt.js';

const prisma = new PrismaClient();
const __dirname = path.resolve();
const app = express();
const PORT = process.env.SERVER_PORT || 4000;

const server = new ApolloServer({
    typeDefs: readFileSync(path.join(__dirname, 'src/schema.graphql'), 'utf-8'),
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            userId: req && req.headers.authorization ? verifyToken(req) : null,
        };
    },
});
await server.start();
server.applyMiddleware({ app });
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});
