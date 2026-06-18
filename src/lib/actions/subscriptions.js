'use server'

import { ServerMutation } from "../core/ServerMutation"

export const createSubscription = async (subInfo) => {
    return ServerMutation('/api/subscriptions', subInfo)
}