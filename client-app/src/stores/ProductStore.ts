import { action, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { INewProduct, IProduct, IUpdateProduct } from "../models/ProductsModel";
import { RooteStore } from "./RootStore";

export default class ProductStore {
    rootStore: RooteStore;
    constructor(rootStore: RooteStore){
        this.rootStore = rootStore;
    }
    
    @observable cashProducts: IProduct[] = [];
    @observable products: IProduct[] = [];
    @observable actualProduct: IProduct | null = null;
    @observable isLoading = false;

    @action addProductToCash(value: IProduct){
        this.cashProducts.push(value);
        console.log("Dodano przedmiot do koszyka:")
        console.log(value)
        console.log("Produktów w koszyku")
        console.log(this.cashProducts)
    }

    @action buyProducts(){
        this.cashProducts.forEach((item, index) => {
            this.getProduct(item.id)
                .then(() => {
                    if(this.actualProduct){
                        var max = this.actualProduct.numberOfProducts
                        item.numberOfProducts = max - item.numberOfProducts
                        this.updateProduct(item)
                            .then(() => {
                                if(index === this.cashProducts.length - 1){
                                    this.cashProducts = []
                                    window.open("/customerPanel", "_self")
                                }
                            })
                    }
                })
        })
    }

    @action loadProducts = async () => {
        this.isLoading = true;
        try{
            this.products = [];
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

    @action getProduct = async (id: string) => {
        try{
            this.actualProduct = await agent.Products.details(id)
        } catch (error) {
            console.log(error)
        }
    }
}