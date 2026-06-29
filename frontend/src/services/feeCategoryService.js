import axios from "axios";

const API_URL = "https://api.sihs.online/api/fee-categories";

export const getFeeCategories = () => {
    return axios.get(API_URL);
};

export const createFeeCategory = (data) => {
    return axios.post(API_URL, data);
};

export const updateFeeCategory = (id, data) => {
    return axios.put(`${API_URL}/${id}`, data);
};

export const deleteFeeCategory = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
