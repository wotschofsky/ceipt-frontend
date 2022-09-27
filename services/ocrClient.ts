import axios from 'axios';


export default function ocrClient() {
    const _httpClient = axios.create({
        baseURL: process.env.OCR_HOST,
    });

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


// const response = await axios(
//     `${process.env.OCR_HOST}/receipt-analyses?lang=deu`,
//     {
//       method: 'POST',
//       data: fileData,
//       headers: {
//         // @ts-ignore
//         'Content-Type': req.file.mimetype,
//       },
//     }
//   );