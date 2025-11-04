import axios from "axios";

export async function getProfileById(id: string) {
  console.log(id, "id gotten");

  try {
    const response = await axios.get(`/api/profile/${id}`);
    console.log("Profile response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}
