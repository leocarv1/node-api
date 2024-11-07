import { server } from './server/Server';

const port = process.env.PORT || 3333;

server.listen(process.env.PORT || 3333, () => console.log(`App rodando na porta ${port}!`));