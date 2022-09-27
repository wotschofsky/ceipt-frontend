import axios from 'axios';
import FormData from 'form-data';

export default function apiClient() {
  const _httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1',
  });

  return {
    createReceipt: async (receiptData: any) => {
      const res = await _httpClient.post(`/receipts/`, receiptData);
      return res.data;
    },
    getAllReceipts: async () => {
      const res = await _httpClient.get(`/receipts/`);

      return res.data.data;
    },
    getReceiptById: async (id: string) => {
      const res = await _httpClient.get(`/receipts/${id}`);
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
  };
}
