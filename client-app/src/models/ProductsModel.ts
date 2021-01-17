export interface IProduct{
    id: string;
    productName: string;
    priceEa: number;
    numberOfProducts: number;
}

export interface INewProduct{
    productName: string;
    priceEa: number;
    numberOfProducts: number;
}

export interface IUpdateProduct{
    id: string;
    productName: string;
    priceEa: number;
    numberOfProducts: number;
}