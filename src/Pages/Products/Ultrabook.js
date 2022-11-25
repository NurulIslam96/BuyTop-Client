import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Ultrabook = () => {
    const {data: ultrabook = [], refetch} = useQuery({
        queryKey:["ultrabook"],
        queryFn: async()=>{
            const res = await fetch(`${process.env.REACT_APP_api_link}/ultrabook`,{
                headers:{
                    authorization: `bearer ${localStorage.getItem("buytop-token")}`
                }
            });
            const data = res.json();
            return data;
        }
    })
    console.log(ultrabook);
    return (
        <div>
            
        </div>
    );
};

export default Ultrabook;