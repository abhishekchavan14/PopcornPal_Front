import axios from "axios";

const client = axios.create({baseURL: 'https://popcornpal.onrender.com/api'})

export default client
