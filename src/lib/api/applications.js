import { serverFetch } from "../core/ServerMutation"

export const getApplicationsByApplicant = async (applicantId) => {
    return serverFetch(`/api/applications?applicantId=${applicantId}`)
}