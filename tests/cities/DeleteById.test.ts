import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';

describe('Cities - DeleteById', () => {
    
    it('Delete register', async () => {
        
        const res = await testServer
        .post('/cities')
        .send({ name: 'Testing' });
        
        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        
        const resApagada = await testServer
        .delete(`/cities/${res.body}`)
        .send();
        
        expect(resApagada.statusCode).toEqual(StatusCodes.OK);
    });
    it('Try to delete a register that not exists', async () => {
        
        const res1 = await testServer
        .delete('/cities/99999')
        .send();
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.default');
    });
});