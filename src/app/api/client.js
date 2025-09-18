import axios from "axios";

/**
 * Creates an isolated API instance
 */
function createApiClient() {
    // New instance
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL
    });

    return instance;
}

export const api = createApiClient();
