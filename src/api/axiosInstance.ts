import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000', // Đổi thành địa chỉ máy chủ của bạn
});
instance.defaults.withCredentials = true; // Đây là nơi bạn thiết lập withCredentials
export default instance;
