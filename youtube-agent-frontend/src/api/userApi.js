import axios from "axios";

const API_URL = "http://localhost:8000/api/users"; 

// Upsert user data
export const upsertUser = async (userId, userData) => {
  try {
    const response = await axios.post(`${API_URL}/upsert`, {
      userId,
      userData,
    });

    console.log("User upserted successfully:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error upserting user:", error);
    throw error;
  }
};
