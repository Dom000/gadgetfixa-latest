import { ReviewInput } from "@/types";
import axios from "axios";

export async function sendReview(data: ReviewInput) {
  const response = await axios.post("/api/reviews", data);
  return response.data;
}
