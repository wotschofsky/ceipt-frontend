import { GetServerSideProps } from 'next';
import Link from 'next/link';
import MiniReceipt from '../components/MiniReceipt';
import receiptController from '../controllers/receipt.controller';
import Receipt from '../definitions/Receipt';
import initMongoose from '../utils/initMongoose';

export interface PageProps {
  receipts: Receipt[]
}
export default function Page({ receipts }: PageProps) {
  return (
    <div>
      {receipts.length === 0 && <span>No Receipts</span>}
      {receipts.map((r) => (
        <Link key={r._id} href={`/receipts/${r._id}`}>

          <a style={{ padding: '1rem' }}>
            <MiniReceipt score={r.score} name={r.ownerName} />
          </a>
        </Link>
      ))}
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {

  const receipts = await receiptController.getAll()

  return { props: { receipts } };
};

