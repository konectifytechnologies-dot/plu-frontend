import { getLoggedInUser } from "@/lib/auth";
import { queryOptions } from "@tanstack/react-query";
export const getUser = queryOptions({
    queryKey: ['LOGGED_IN_USER'],
    queryFn: getLoggedInUser,
});
