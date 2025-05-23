import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
    res.status(400).json({ error: 'No file uploaded' });
});

export default router;
