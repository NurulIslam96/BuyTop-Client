import { useQuery } from '@tanstack/react-query';
import React from 'react';

const GamingLaptop = () => {
    const {data: gamingLaptop = [], refetch} = useQuery({
        queryKey:["gaminglaptop"],
        queryFn: async()=>{
            const res = await fetch(`${process.env.REACT_APP_api_link}/gaminglaptop`,{
                headers:{
                    authorization: `bearer ${localStorage.getItem("buytop-token")}`
                }
            });
            const data = res.json();
            return data;
        }
    })
    console.log(gamingLaptop);
    return (
        <div>
            
        </div>
    );
};

export default GamingLaptop;