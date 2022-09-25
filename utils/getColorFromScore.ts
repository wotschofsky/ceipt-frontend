export default function getColorFromScore(score: number) {

    if (score < 0.5) return "green"
    if (score < 1) return "green" // opacity 0.75
    if (score < 1.5) return "green" // opacity 0.5
    if (score < 2) return "orange"
    if (score < 2.5) return "orange"
    if (score < 3) return "red" // opacity 0.5
    if (score < 3.5) return "red" // opacity 0.75
  
    return "red"
  }