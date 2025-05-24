import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import transcriptionRoute from './routes/transcription';

dotenv.config();

const app = express();

app.use('/transcription', transcriptionRoute);

app.get('/ping', (_req: Request, res: Response) => res.send('pong'));

app.use((err: Error, req: Request, res: Response) => {
    res.status(400).json({ error: err.message || 'Unknown error' });
});

export default app;
