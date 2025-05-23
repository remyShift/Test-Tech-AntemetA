import express, { Request, Response } from 'express';
import transcriptionRoute from './routes/transcription';

const app = express();

app.use('/transcription', transcriptionRoute);

app.get('/ping', (_req: Request, res: Response) => res.send('pong'));

export default app;
