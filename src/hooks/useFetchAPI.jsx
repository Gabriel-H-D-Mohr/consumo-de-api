import axios from "axios";
import { useState, useEffect } from "react";
export default function useFetchAPI (url, char) {
    const [ret, setRet] = useState({});
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(false); 
    useEffect (() => {
        const getData = async () => {
        try {
            const ret = await axios.get(
                `${url}${char}`);
            setRet(ret.data);

            setLoading(false);
        } catch (error) {
            setLoading(false); 
            setError(true);
            console.error( "Erro ao carregar API", error );
      };
    }
    getData();
    }, []);
    return {loading, error, ret}
}