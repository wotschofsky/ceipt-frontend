import getColorFromScore from "../../utils/getColorFromScore";

export default function MiniReceipt({ score, name }: { score: number, name: string }) {

  const color = getColorFromScore(score)

  return (
    <svg
      width="132"
      height="215"
      viewBox="0 0 132 215"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M114.529 0C114.529 6.7 109.097 12.132 102.397 12.132C95.696 12.132 90.265 6.7 90.265 0H78.133C78.133 6.7 72.701 12.132 66.001 12.132C59.301 12.132 53.868 6.7 53.868 0H41.736C41.736 6.7 36.304 12.132 29.604 12.132C22.903 12.132 17.472 6.7 17.472 0H0V214.5H17.496C17.76 208.033 23.071 202.868 29.603 202.868C36.135 202.868 41.446 208.034 41.71 214.5H53.893C54.157 208.033 59.468 202.868 66 202.868C72.532 202.868 77.843 208.034 78.107 214.5H90.29C90.554 208.033 95.865 202.868 102.397 202.868C108.929 202.868 114.24 208.034 114.504 214.5H132V0H114.529Z"
        fill="white"
      />
      <text fill="black" x="15" y="43" fontSize="10">{name}</text>
      {/* <path d="M116.5 36.25H15.5V46.25H116.5V36.25Z" fill={color} /> */}
      <path d="M116.5 66H15.5V76H116.5V66Z" fill="#666" />
      <path d="M116.5 99H15.5V109H116.5V99Z" fill="#666" />
      <text x="95" y="170" fill={color} fontSize="10" fontWeight="bold">{score}</text>
    </svg>
  );
}
