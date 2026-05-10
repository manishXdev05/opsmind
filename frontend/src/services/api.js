import axios from "axios";

const API = axios.create({
  baseURL: "https://opsmind-cgx0.onrender.com/api",
});

export default API;