import MiniReceipt from '../components/MiniReceipt';
import { getColorFromScore } from '../components/ReceiptSvg';
import receiptController from '../controllers/receipt.controller';
import initMongoose from '../utils/initMongoose';

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
  await initMongoose();
  const receipts = await receiptController.getAll();

  return { props: { receipts } };
};

