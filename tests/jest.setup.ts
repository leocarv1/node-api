import supertest from "supertest";
import { server } from "../src/server/Server";
import { Sequelize } from "sequelize";

// beforeAll(async () => {
//     await Sequelize
// })



export const testServer = supertest(server)