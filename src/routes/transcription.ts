import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { transcribeWav } from '../utils/transcribeWav';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('audio'), async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const ext = req.file.originalname.split('.').pop();
    if (ext !== 'wav') {
        return res.status(400).json({ error: 'Only .wav files are allowed' });
    }

    transcribeWav(req.file.buffer, process.env.OPENAI_API_KEY!)
        .then(transcription => {
            console.log('Transcription:', transcription);
            res.json({ transcription })
        })
        .catch(error => {
            console.error('Whisper API error:', error);
            next(error);
        });
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({ error: err.message || 'Unknown error' });
});

export default router;
