const calculateOverallScore = (
  individualScores: { score: number; quantity: number }[]
) => {
  const sum = individualScores.reduce(
    (acc, p) => (p.score ? acc + p.quantity * p.score : acc),
    0
  );
  const count = individualScores.reduce(
    (acc, p) => (p.score ? acc + p.quantity : acc),
    0
  );
  return (sum / count).toFixed(2);
};

export default calculateOverallScore;
