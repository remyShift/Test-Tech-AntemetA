export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const validateFile = async (file: Express.Multer.File | undefined) => {
	if (!file) {
		throw new Error('No file uploaded');
	}
	const ext = file.originalname.split('.').pop();
	if (ext !== 'wav') {
		throw new Error('Only .wav files are allowed');
	}
	if (file.size > MAX_FILE_SIZE) {
		throw new Error(`File size exceeds ${MAX_FILE_SIZE} limit`);
	}
};
