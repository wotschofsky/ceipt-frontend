import calculateScore from "./calculateScore";

const toScoredItem = async (label: string, quantity: number) => {

    const item = await calculateScore(label);

    return {
        ...item,
        label,
        quantity,
        score: item?.footprint ?? NaN,
    };
}
export default toScoredItem