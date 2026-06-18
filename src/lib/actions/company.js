"use server";

import { revalidatePath } from "next/cache";
import { ServerMutation } from "../core/ServerMutation";

export const createCompany = async (newCompanyData) => {
    return ServerMutation("/api/companies", newCompanyData)
}

export const updateCompany = async (id, data,) => {
    const result = await ServerMutation(`/api/companies/${id}`, data, "PATCH")
    revalidatePath("/dashboards/admin/companies");
    return result;
}

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// export const createCompany = async (newCompanyData) => {
//   const res = await fetch(`${baseUrl}/api/companies`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newCompanyData),
//   });
//   return res.json();
// };
