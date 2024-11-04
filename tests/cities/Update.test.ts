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
        
        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Try to update a non-exist register', async () => {
        
        const res = await testServer
        .put('/cities/99999')
        .send({ name: 'Caxias' });
        
        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });
});
