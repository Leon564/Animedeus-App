import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            setStatus('loading');
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
            setStatus('success');
        };

        fetchData();
    }, [url]);

    return { status, data };
};

export default useFetch;