import Link from 'next/link';
import MiniReceipt from '../components/MiniReceipt';
import receiptController from '../controllers/receipt.controller';

export default function Page({ receipts }: any) {
  return (
    <div>
      {receipts.length === 0 && <span>No Receipts</span>}
      {receipts.map((r: any) => (
        <Link key={r._id} href={`/receipts/${r._id}`}>

          <a style={{ padding: '1rem' }}>
            <MiniReceipt score={r.score} name={r.ownerName} />
          </a>
        </Link>
      ))}
    </div>
  );
}
export const getServerSideProps = async () => {

  const receipts = await receiptController.getAll()

  return { props: { receipts } };
};

