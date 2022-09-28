type Product = {
  label: string;
  quantity: number;
  score: number | "";
  group?: string | undefined;
  item?: string | undefined;
  footprint?: number | "" | undefined;
  typology?: string | undefined;
}

const calculateOverallScore = (
  individualScores: Product[]
) => {
  const sum = individualScores.reduce(
    (acc, p) => (p.score ? acc + p.quantity * p.score : acc),
    0
  );
  const count = individualScores.reduce(
    (acc, p) => (p.score ? acc + p.quantity : acc),
    0
  );
  return parseFloat((sum / count).toFixed(2));
};

export default calculateOverallScore;


