import { StatusCodes } from 'http-status-codes';
import { testServer } from "../jest.setup"

describe('Cities - GetById', () => {
    
    it('Get register by id', async () => {
        
        const res = await testServer
        .post('/cities')
        .send({ name: 'Testing' });
        
        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        
        const resBuscada = await testServer
        .get(`/cities/${res.body.id}`)
        .send();
        
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('name');
    });
    it('Try to get an non-exists register', async () => {
        
        const res = await testServer
        .get('/cities/99999')
        .send();
        
        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.default');
    });
});
