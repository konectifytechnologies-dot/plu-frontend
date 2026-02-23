import axios from "@/lib/axios";
import { queryOptions } from "@tanstack/react-query";
export const getUserData = queryOptions({
    queryKey: ["USER_DATA"],
    queryFn: async () => {
        const response = await axios.get("/api/agent");
        if (response.status === 200) {
            return response.data;
        }
        else {
            throw new Error(response.data.error);
        }
    },
});
export const getAgent = async () => {
    try {
        const { data } = await axios.get('/api/agent');
        return data;
    }
    catch (error) {
        return error.message;
    }
};
export const getProperty = (id) => queryOptions({
    queryKey: ['PROPERTY', id],
    queryFn: async () => {
        const response = await axios.get(`/api/property/${id}`);
        if (response.status === 200) {
            return response.data;
        }
        throw new Error(response.data?.error ?? 'Failed to fetch property');
    },
});
export const getLandlords = () => queryOptions({
    queryKey: ['AGENT_LANDLORDS'],
    queryFn: async () => {
        const response = await axios.get(`/api/landlords`);
        if (response.status === 200) {
            return response.data;
        }
        throw new Error(response.data?.error ?? 'Failed to fetch property');
    },
});
