import fs from 'fs';
import tmp from 'tmp';
import { OpenAI } from 'openai';

export const transcribeWav = async (buffer: Buffer, apiKey: string): Promise<string> => {
    const tmpFile = tmp.fileSync({ postfix: '.wav' });
    fs.writeFileSync(tmpFile.name, buffer);

    const openai = new OpenAI({ apiKey });

    return openai.audio.transcriptions.create({
        file: fs.createReadStream(tmpFile.name),
        language: 'en',
        model: "whisper-1"
    }).then(response => {
        tmpFile.removeCallback();
        return response.text;
    });
}