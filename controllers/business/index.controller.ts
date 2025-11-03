import axios from "axios";

export async function createBusiness(arg: any) {
  const { data } = await axios.post("/api/business", arg);
  return data;
}

export async function getBusiness() {
  const { data } = await axios.get("/api/business");
  return data;
}
