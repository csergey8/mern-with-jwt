import { useState, useCallback } from "react";


export const useHttp = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null)
  const request = useCallback(async (url, method = 'GET', body = null, header = {}) => {
    try {
      const response = await fetch(url, {
        method, body, header
      })
      const data = await response.json();
    } catch (error) {
      
    }
  }, [])

  return { loading, request, error }
}