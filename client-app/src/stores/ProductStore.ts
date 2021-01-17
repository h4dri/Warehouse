import { action, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IProduct } from "../models/ProductsModel";
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
}