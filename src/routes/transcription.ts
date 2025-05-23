import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('audio'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const ext = req.file.originalname.split('.').pop();
    if (ext !== 'wav') {
        return res.status(400).json({ error: 'Only .wav files are allowed' });
    }
    res.json({ transcription: 'fake transcription' });
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
    }
    next(err);
});

export default router;
