import axios from "./axios";
export const csrf = () => axios.get('/sanctum/csrf-cookie');
export const getLoggedInUser = async () => {
    try {
        const { data } = await axios.get('/api/user');
        return data;
        //const parsed = userSchema.safeParse(data)
        /*if (!parsed.success) {
          console.error(parsed.error)
          return null
        }
        return parsed.data*/
    }
    catch (error) {
        if (error.response?.status === 422) {
            return error.response.data;
        }
    }
};
export const logOut = async () => {
    await csrf();
    const { data } = await axios.post('/api/logout');
    return data;
};
