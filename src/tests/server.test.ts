import request from 'supertest';
import app from '../app';

describe('Test server with a basic route', () => {
    it('should respond to GET /ping with 200 OK and pong response', async () => {
        const res = await request(app).get('/ping');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('pong');
    });
});
