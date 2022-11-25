import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Elitebook = () => {
    const {data: elitebooks = [], refetch} = useQuery({
        queryKey:["elitebook"],
        queryFn: async()=>{
            const res = await fetch(`${process.env.REACT_APP_api_link}/elitebook`,{
                headers:{
                    authorization: `bearer ${localStorage.getItem("buytop-token")}`
                }
            });
            const data = res.json();
            return data;
        }
    })
    console.log(elitebooks);
    return (
        <div>
            
        </div>
    );
};

export default Elitebook;