import axios from 'axios';
import FormData from "form-data"

export default function apiClient() {
  const _httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    // headers: {'X-Custom-Header': 'foobar'}
  });

  return {
    postReceipt: async (receiptData: any) => {
      const res = await _httpClient.post(`/receipts/`, receiptData);

      return res.data;
    },
    getReceiptsByOwnerId: async (ownerId: string) => {
      const res = await _httpClient.get(`/receipts/users/${ownerId}/receipts`);

      return res.data.data;
    },
    getReceiptFromImg: async (img: File) => {

      const formData = new FormData();

      formData.append('image', img, File.name);

      const res = await _httpClient.post(`/receipt/analyse`, formData, {
        // see: https://stackoverflow.com/a/72853623
        headers: formData.getHeaders ? formData.getHeaders() : {'Content-Type': 'multipart/form-data' }

        
      });
      return res.data.data
    }
  };
}
