import { BusinessType } from "@/types";
import axios from "axios";

export async function createBusiness(arg: any) {
  const { data } = await axios.post("/api/business", arg);
  return data;
}

export async function getBusiness(page = 1, limit = 10) {
  const { data } = await axios.get(`/api/business?page=${page}&limit=${limit}`);
  return data;
}

export async function getBusinessById(id: string) {
  const { data } = await axios.get(`/api/business/${id}`);
  return data as { data: BusinessType };
}

export async function getBusinessByProfileId(id: string) {
  try {
    const response = await axios.get(`/api/business/get-all/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching business by profile:", error);
    throw error;
  }
}
