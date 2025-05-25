import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import transcriptionRoute from './routes/transcription';

dotenv.config();

const app = express();

app.use('/transcription', transcriptionRoute);

app.get('/ping', (_req: Request, res: Response) => res.send('pong'));

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(400).json({ error: err.message || 'Internal Server Error' });
});

export default app;
