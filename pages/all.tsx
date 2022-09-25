import MiniReceipt from '../components/MiniReceipt';
import apiClient from '../services/apiClient';

export default function Page({ receipts }: any) {
  return (
    <div>
      {receipts.map((r: any) => (
        <a key={r._id} style={{ padding: '1rem' }} href={`/receipts/${r._id}`}>
          <MiniReceipt color="red" />
        </a>
      ))}
    </div>
  );
}
export const getServerSideProps = async () => {
  const receipts = await apiClient().getAllReceipts();

  return { props: { receipts } };
};
