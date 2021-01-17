import { action, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { INewProduct, IProduct, IUpdateProduct } from "../models/ProductsModel";
import { RooteStore } from "./RootStore";

export default class ProductStore {
    rootStore: RooteStore;
    constructor(rootStore: RooteStore){
        this.rootStore = rootStore;
    }
    
    @observable products: IProduct[] = [];
    @observable isLoading = false;

    @action loadProducts = async () => {
        this.isLoading = true;
        try{
            const products = await agent.Products.list()
            products.forEach(product => {
                this.products.push(product)
            })
            this.isLoading = false;
        } catch (error) {
            console.log(error);
            this.isLoading = false;
        }
    }

    @action deleteProduct = async (id: string) => {
        try{
            await agent.Products.delete(id);
        } catch (error) {
            console.log(error)
        }
    }

    @action createProduct = async (value: INewProduct) => {
        try{
            await agent.Products.create(value);
        } catch (error) {
            console.log(error)
        }
    }

    @action updateProduct = async (value: IUpdateProduct) => {
        try{
            await agent.Products.update(value)
        } catch (error) {
            console.log(error)
        }
    }
}