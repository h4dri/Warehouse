import axios, { AxiosResponse } from 'axios';
import { INewProduct, IProduct, IUpdateProduct } from '../models/ProductsModel';
import { IUser, IUserFromValues } from '../models/UserModel';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config
}, error =>{
    return Promise.reject(error);
})

axios.interceptors.response.use(undefined, (error) => {
    if (error.message === "Network Error" && !error.response) {
        console.error('Network error - make sure API is running!')
    }

    const {status} = error.response;
    if (status === 401) {
        console.log("Brak dostępu!");
    }

    throw error;
})

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(200)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(200)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(200)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(200)).then(responseBody)
}

const User = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFromValues): Promise<IUser> => requests.post('/user/login', user),
    register: (user: IUserFromValues): Promise<IUser> => requests.post('/user/register', user)
}

const Products = {
    list: (): Promise<IProduct[]> => requests.get('/products'),
    details: (id: string): Promise<IProduct> => requests.get(`/products/${id}`),
    create: (product: INewProduct) => requests.post('/products', product),
    update: (product: IUpdateProduct) => requests.put(`/products/${product.id}`, product),
    delete: (id: string) => requests.del(`/products/${id}`)
}


export default {
    Products,
    User
}