import axios from "../api/api";


export const addReviewApi = (productId, review) => {
  return axios.post(`/reviews/${productId}`, review, {
    withCredentials: true,
  });
};


export const getReviewsApi = (productId) => {
  return axios.get(`/reviews/${productId}`);
};
