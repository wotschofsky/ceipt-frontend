import axios from 'axios';
import logger from './logger';

export default function ocrClient() {
    const _httpClient = axios.create({
        baseURL: process.env.OCR_HOST,
    });

    _httpClient.interceptors.response.use((res) => res, (err) => {

        logger("ocrClient").err.logAxios(err)

        return Promise.reject(err);
    })

    return {
        getStringsFromReceipt: async (data: Buffer, mimetype: string) => {

            const config = { headers: { 'Content-Type': mimetype } }

            try {
                const res = await _httpClient.post<{ strings: string[] }>("/receipt-analyses?lang=deu", data, config)

                return res.data.strings

            } catch (err) {
                console.error("error when trying to connect to ocr service:", err)

                return []
            }
        }
    }
}