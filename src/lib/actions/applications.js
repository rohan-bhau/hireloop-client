'use server'

import { ServerMutation } from "../core/ServerMutation"

export const submitApplication = async (applicationData) => {
    return ServerMutation('/api/applications', applicationData)
}