import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4444/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getCustomers = async () => {
    const response = await api.get('/customer');
    return response.data;
};

export const createCustomer = async (payload) => {
    const response = await api.post('/customer', payload);
    return response.data;
};

export const getProducts = async () => {
    const response = await api.get('/product');
    return response.data;
};

export const createProduct = async (payload) => {
    const response = await api.post('/product', payload);
    return response.data;
};

export const getOrders = async () => {
    const response = await api.get('/order');
    return response.data;
};

export const createOrder = async (payload) => {
    const response = await api.post('/order', payload);
    return response.data;
};

