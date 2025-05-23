import request from 'supertest';
import app from '../app';
import path from 'path';

describe('POST /transcription', () => {
    it('should return 400 if no file is sent', async () => {
        const res = await request(app)
        .post('/transcription')
        .set('Content-Type', 'multipart/form-data');
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});

it('should return 200 with a fake transcription', async () => {
    const res = await request(app)
        .post('/transcription')
        .attach('audio', path.join(__dirname, 'sample.wav'));

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('transcription');
    expect(res.body.transcription).toBe('fake transcription');
});
