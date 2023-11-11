// require('dotenv').config();/

import axios from 'axios';
// console.log("dotenv", process.env.BASE_URL);
const BASE_URL ='http://localhost:8000'; // Thay đổi URL dựa vào API của bạn

const apiService = axios.create({
    baseURL: BASE_URL,
    timeout: 5000, // Thời gian chờ tối đa cho mỗi yêu cầu
});

// Xử lý lỗi tại đây nếu cần
apiService.interceptors.response.use(
    (response) => response.data,
    (error) => {
        // Xử lý lỗi
        console.error('API Error:', error);
        throw error;
    }
);

export default apiService;