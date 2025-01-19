import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useCallback } from "react";

export const useQueryParams = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Parse and return current query parameters
    const queryParams = useMemo(() => {
        const params = new URLSearchParams(location.search);
        const entries: Record<string, string> = {};
        for (const [key, value] of params.entries()) {
            entries[key] = value;
        }
        return entries;
    }, [location.search]);

    // Function to update query parameters
    const setQueryParams = useCallback(
        (newParams: Record<string, string | undefined>) => {
            const searchParams = new URLSearchParams(location.search);

            // Update the params
            Object.keys(newParams).forEach(key => {
                if (newParams[key]) {
                    searchParams.set(key, newParams[key] as string);
                } else {
                    searchParams.delete(key);
                }
            });

            // Replace the current history entry
            navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
        },
        [location.search, navigate]
    );

    return { queryParams, setQueryParams };
};
