import { serverFetch } from "../core/ServerMutation"

export const getUserByRecruiterId = async (recruiterId) => {
     return serverFetch(`/api/user/${recruiterId}`);
}