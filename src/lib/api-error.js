import axios, { AxiosError } from "axios";
export function getApiError(error) {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        // Validation error
        if (error.response?.status === 422 && data?.errors) {
            return Object.values(data.errors)[0][0];
        }
        // Normal API error
        return data?.message ?? "Something went wrong";
    }
    return "Unexpected error";
}
