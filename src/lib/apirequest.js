import axios from "axios";
import { getApiError } from "./api-error";
export async function apiRequest(request) {
    try {
        const { data } = await request();
        return { data, error: null };
    }
    catch (error) {
        return { data: null, error: getApiError(error) };
    }
}
