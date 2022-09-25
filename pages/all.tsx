import MiniReceipt from '../components/MiniReceipt';
import { getColorFromScore } from '../components/ReceiptSvg';
import apiClient from '../services/apiClient';

export default function Page({ receipts }: any) {
  return (
    <div>
      {receipts.map((r: any) => (
        <a key={r._id} style={{ padding: '1rem' }} href={`/receipts/${r._id}`}>
          <MiniReceipt score={r.score} name={r.ownerName} />
          
        </a>
      ))}
    </div>
  );
}
export const getServerSideProps = async () => {
  const receipts = await apiClient().getAllReceipts();

  return { props: { receipts } };
};

