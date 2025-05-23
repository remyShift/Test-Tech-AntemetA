import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import { OpenAI } from 'openai';
import tmp from 'tmp';

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

    // Crée un fichier temporaire
    const tmpFile = tmp.fileSync({ postfix: '.wav' });
    fs.writeFileSync(tmpFile.name, req.file.buffer);

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    openai.audio.transcriptions.create({
        file: fs.createReadStream(tmpFile.name),
        language: 'en',
        model: "whisper-1"
    }).then(response => {
        res.json({ transcription: response.text });
        tmpFile.removeCallback();
    }).catch(error => {
        tmpFile.removeCallback();
        fs.unlinkSync(tmpFile.name);
        console.error('Whisper API error:', error);
        next(error);
    });
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({ error: err.message || 'Unknown error' });
});

export default router;
