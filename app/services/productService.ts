import axios from 'axios';
import { Product } from '../types/Product';

const API_BASE_URL = 'https://fakestoreapi.com';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const addProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await apiClient.post<Product>('/products', product);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Failed to add product'
      );
    }
    throw new Error('An unexpected error occurred');
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get<Product[]>('/products');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Failed to fetch products'
      );
    }
    throw new Error('An unexpected error occurred');
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Failed to fetch product'
      );
    }
    throw new Error('An unexpected error occurred');
  }
};