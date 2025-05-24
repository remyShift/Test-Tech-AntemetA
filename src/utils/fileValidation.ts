export const validateFile = async (file: Express.Multer.File | undefined) => {
    if (!file) {
        throw new Error('No file uploaded');
    }
    if (file.mimetype !== 'audio/wave' && file.mimetype !== 'audio/x-wave') {
        throw new Error('Only .wav files are allowed');
    }
};