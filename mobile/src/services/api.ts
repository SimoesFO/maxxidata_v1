import axios from "axios";

const PORT = 3333;
const HOST = '192.168.15.5';
// const HOST = 'localhost';

const api = axios.create({
  baseURL: `http://${HOST}:${PORT}/api/v1`,
});

export default api;
