import axios from 'axios';

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
  };
}
