import  { useEffect, useState } from 'react';

const useVerify = (email) => {
        const [isVerified, setIsVerified] = useState(false);
        useEffect(()=>{
            if(email){
                fetch(`${process.env.REACT_APP_api_link}/users/verify/${email}`)
                .then(res=>res.json())
                .then(data=>{
                    setIsVerified(data.isVerified)
                })
            }
        },[email])
        return [isVerified]
};

export default useVerify;