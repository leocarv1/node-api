import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cities - Create', () => {
    
    it('Try to create a register', async () => {
        
        const res = await testServer
        .post('/cities')
        .send({ 
            name: 'Testing' 
        });
        
        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('object');
    });
    
    it('Try to create a register with less than 3 caracters', async () => {
        
        const res = await testServer
        .post('/cities')
        .send({ 
            name: 'Ab' 
        });
        
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors.body.name');
    });
});