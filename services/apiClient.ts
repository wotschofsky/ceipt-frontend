import axios from 'axios';
import FormData from 'form-data';

export default function apiClient() {
  const _httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api/v1',
    // headers: {'X-Custom-Header': 'foobar'}
  });

  return {
    getReceiptById: async (id: string) => {
      const res = await _httpClient.get(`/receipts/${id}`);
      return res.data.data;
    },
    createReceipt: async (receiptData: any) => {
      const res = await _httpClient.post(`/receipts/`, receiptData);
      return res.data;
    },
    getAllReceipts: async () => {
      const res = await _httpClient.get(`/receipts/`);
      return res.data.data;
    },
    getReceiptsByOwnerId: async (ownerId: string) => {
      const res = await _httpClient.get(`/receipts/users/${ownerId}/receipts`);
      return res.data.data;
    },
    getReceiptFromImg: async (img: File) => {
      const formData = new FormData();

      formData.append('image', img, img.name);

      const res = await _httpClient.post(`/receipts/analyze`, formData, {
        // browser implementation of FormData does not have getHeaders() method, see: https://stackoverflow.com/a/72853623
        headers: formData.getHeaders
          ? formData.getHeaders()
          : { 'Content-Type': 'multipart/form-data' },
      });
      return res.data.data;
    },
    // getReceiptFromImg: async (img: File) => {

    //   const res = await _httpClient.post(`/receipts/analyze`, img, {
    //     headers: { "Content-Type": img.type }
    //   });
    //   return res.data.data;
    // },
  };
}
