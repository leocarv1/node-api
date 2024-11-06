import express from 'express';
import 'dotenv/config'

import './shared/services/translations'
import { router } from './routes'

// Banco de Dados
import '../server/database/index'

const server = express();

server.use(express.json())
server.use(router);

export { server };