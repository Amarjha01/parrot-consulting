
import axios from "axios";

// Create an axios instance with baseURL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // ✅ This sends cookies with every request
});



export const registerAsUser = (formdata) => {
    return API.post("/user/registeruser", formdata, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  export const loginAsUser = (formdata) => {
    return API.post("/user/loginuser", formdata, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  
  export const logoutUSer = async () => {
    try {
      const response = await API.post("/user/logoutuser");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };




  export const seeBooking = async () => {
    try {
      const response = await API.get("/user/seebookings");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }