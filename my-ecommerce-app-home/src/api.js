// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/products'; 

// Oтримання продуктів з параметрами пошуку, сортування та фільтрації
export const fetchProducts = async (search = '', sortCriteria = '', sortOrder = '', category = '') => {
    try {
        const params = {};
        if (search) params.search = search;
        if (sortCriteria) params.sortCriteria = sortCriteria;
        if (sortOrder) params.sortOrder = sortOrder;
        if (category) params.category = category;

        const response = await axios.get(API_URL, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

// Пошук продуктів
export const searchProducts = async (search) => {
    try {
        const response = await axios.get(`${API_URL}/search`, { params: { search } });
        return response.data;
    } catch (error) {
        console.error("Error searching products:", error);
        throw error; 
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
};
