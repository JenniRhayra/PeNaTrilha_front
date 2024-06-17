import { useCallback, useEffect, useState } from "react";

type ApiCallback = () => Promise<any>;

interface QueryState<T> {
    data: T | undefined;
    error: any;
    loading: boolean;
}

export const useQuery = <T,>(apiCb: any, dependenciesList: any[]): [any, any, boolean, () => Promise<void>] => {
    const [data, setData] = useState<T | undefined>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const cb = useCallback(apiCb, dependenciesList);

    const fetchData = useCallback(async () => {
        setData(undefined);
        setError(undefined);
        setLoading(true);

        try {
            const response = await cb();
            setData(response?.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [cb]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [data, error, loading, fetchData];
};
