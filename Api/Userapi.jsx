import axios from "axios";
const Userapi = axios.create({
    baseURL: 'http://192.168.56.1:8000', // Ajustar la URL base 
  });
export default Userapi;