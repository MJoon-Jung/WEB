import React, { useEffect } from 'react';
import router from 'next/router';
import useRefresh from '../../hooks/requestRefresh';
import useAuth from '../../hooks/requestAuth';

const Refresh = () => {

    const { accessToken } = useRefresh();    
    useEffect(() => {
        if(accessToken){
            router.replace('/');
        }
    }, [accessToken]);

    return (
        <div>
            Loading...
        </div>
    )
}

export default Refresh;