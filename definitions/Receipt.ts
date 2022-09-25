export interface Product {
    label: string
    quantity: number
    score: number
}

export default interface Receipt {
    _id: string
    products: Product[]
    ownerName: string
    score: number
    image: string
}