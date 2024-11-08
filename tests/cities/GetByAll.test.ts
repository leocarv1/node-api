import { StatusCodes } from 'http-status-codes';
import { testServer } from "../jest.setup"

describe('Cities - GetById', () => {
    
    it('Get all register', async () => {
        
        const res = await testServer
        .post('/cities')
        .send({ name: 'Testing' });
        
        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        
        const resBuscada = await testServer
        .get('/cities')
        .send();
        
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});
