import request from 'supertest';
import app from '../app';
import path from 'path';

jest.mock('../utils/transcribeWav', () => ({
	transcribeWav: jest.fn().mockResolvedValue('Simulated transcription mock'),
}));

describe('POST /transcription', () => {
	it('should return 400 if no file is sent', async () => {
		const res = await request(app)
			.post('/transcription')
			.set('Content-Type', 'multipart/form-data');
		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty('error');
	});
});

it('should return 400 if the file is not a .wav', async () => {
	const res = await request(app)
		.post('/transcription')
		.attach('audio', path.join('src', 'audio', 'samples', 'sample1.mp3'))
		.set('Content-Type', 'multipart/form-data');

	expect(res.statusCode).toBe(400);
	expect(res.body).toHaveProperty('error');
	expect(res.body.error).toBe('Only .wav files are allowed');
});

it('should return the correct transcription for a known and small .wav file', async () => {
	const res = await request(app)
		.post('/transcription')
		.attach('audio', path.join('src', 'audio', 'samples', 'helloworld.wav'))
		.set('Content-Type', 'multipart/form-data');

	expect(res.statusCode).toBe(200);
	expect(res.body).toHaveProperty('transcription');
	expect(res.body.transcription).toBe('Simulated transcription mock');
}, 20000);

it('should return the correct transcription for a known and large .wav file', async () => {
	const res = await request(app)
		.post('/transcription')
		.attach('audio', path.join('src', 'audio', 'samples', 'sample1.wav'))
		.set('Content-Type', 'multipart/form-data');

	expect(res.statusCode).toBe(200);
	expect(res.body).toHaveProperty('transcription');
	expect(res.body.transcription).toBe('Simulated transcription mock');
}, 20000);

it('should return 400 if the file is too large', async () => {
	const res = await request(app)
		.post('/transcription')
		.attach('audio', path.join('src', 'audio', 'samples', 'sample2.wav'))
		.set('Content-Type', 'multipart/form-data');

	expect(res.statusCode).toBe(400);
	expect(res.body).toHaveProperty('error');
	expect(res.body.error).toBe('File size exceeds 10485760 limit');
});
