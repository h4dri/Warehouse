import { createContext } from "react";
import { action, configure } from 'mobx';
import CommonStore from "./CommonStore";
import ProductStore from "./ProductStore";
import UserStore from "./UserStore";

configure({ enforceActions: 'always' });

export class RooteStore {
    userStore: UserStore;
    productStore: ProductStore;
    commonStore: CommonStore;

    @action delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
    
    constructor(){
        this.userStore = new UserStore(this);
        this.productStore = new ProductStore(this);
        this.commonStore = new CommonStore(this);
    }
}

export const RootStoreContext = createContext(new RooteStore());