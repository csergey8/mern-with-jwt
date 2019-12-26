import { useState, useCallback, useEffect } from "react";
import { useMessage } from "./message.hook";


export const useHttp = () => {
  const [ loading, setLoading ] = useState(false);
  let [ error, setError ] = useState(null);

  const clearError = useCallback(() => setError(null), [])


  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    try {
      if(body) {
        body = JSON.stringify(body);
        headers['Content-type'] = 'application/json';
      }
      const response = await fetch(url, {
        method, body, headers
      })
      const data = await response.json();
      if(!response.ok){
        throw new Error(data.message || 'Something goes wrong')
      }
      setLoading(false)

      return data

    } catch (e) {
      setLoading(false)
      setError(e.message)
      console.log(error);
      throw e
    }
  }, [])

  

  return { loading, request, error, clearError }
}