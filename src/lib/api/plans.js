import { serverFetch } from "../core/ServerMutation"

export const getPlansById = async (planId) => {
    return serverFetch(`/api/plans?plan_id=${planId}`)
}