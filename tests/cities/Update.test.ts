import { StatusCodes } from 'http-status-codes';
import { testServer } from "../jest.setup"

describe('Cities - UpdateById', () => {
    
    it('Update register', async () => {
        
        const res = await testServer
        .post('/cities')
        .send({ name: 'Testing' });
        
        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        
        const resAtualizada = await testServer
        .put(`/cities/${res.body}`)
        .send({ name: 'Caxias' });
        
        expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
    it('Try to update a non-exist register', async () => {
        
        const res = await testServer
        .put('/cities/99999')
        .send({ name: 'Caxias' });
        
        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('msg');
    });
});
