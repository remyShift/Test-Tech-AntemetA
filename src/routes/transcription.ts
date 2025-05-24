import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { transcribeWav } from '../utils/transcribeWav';
import { validateFile } from '../utils/fileValidation';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('audio'), async (req, res, next) => {
    validateFile(req.file)
        .then(() => {
            const file = req.file!;
            transcribeWav(file.buffer, process.env.OPENAI_API_KEY!)
                .then(transcription => {
                    console.log('Transcription:', transcription);
                    res.json({ transcription })
                })
                .catch(error => {
                    console.error('Whisper API error:', error.message);
                    next(error);
                });
        })
        .catch(error => {
            console.error('File validation error:', error.message);
            next(error);
        });
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({ error: err.message || 'Unknown error' });
});

export default router;
