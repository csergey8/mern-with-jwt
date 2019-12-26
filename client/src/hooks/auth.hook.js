import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY_NAME = 'USER_DATA'

export const useAuth = () => {
    const [ token, setToken ] = useState(null);
    const [ userId, setUserId] = useState(null);



    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem(STORAGE_KEY_NAME, JSON.stringify({ userId: id, token: jwtToken }))
    }, [])

    const logOut = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(STORAGE_KEY_NAME)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY_NAME))
        if(data && data.token){
            login(data.token, data.userId);
        }
    }, login)



    return { login, logOut, token, userId }
}