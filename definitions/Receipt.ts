export interface Product {
    label: string;
    quantity: number;
    score: number | "";
    group?: string | undefined;
    item?: string | undefined;
    footprint?: number | "" | undefined;
    typology?: string | undefined;
}

export default interface Receipt {
    _id: string
    products: Product[]
    ownerName: string
    score: number
    image: string
}