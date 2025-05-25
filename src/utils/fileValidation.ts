export const validateFile = async (file: Express.Multer.File | undefined) => {
    if (!file) {
        throw new Error('No file uploaded');
    }
    const ext = file.originalname.split('.').pop();
    if (ext !== 'wav') {
        throw new Error('Only .wav files are allowed');
    }
};