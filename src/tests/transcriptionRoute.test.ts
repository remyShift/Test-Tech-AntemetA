import request from 'supertest';
import app from '../app';

describe('POST /transcription', () => {
    it('should return 400 if no file is sent', async () => {
        const res = await request(app)
        .post('/transcription')
        .set('Content-Type', 'multipart/form-data');
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});
