import { useEffect, useState } from "react"

const useBuyer = email => {
    const [isBuyer, setIsBuyer] = useState(false);
    const [isBuyerLoading, setIsBuyerLoading] = useState(true);
    useEffect(()=>{
        if(email){
            fetch(`${process.env.REACT_APP_api_link}/users/buyer/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsBuyer(data.isSeller);
                setIsBuyerLoading(false);
            })
        }
    },[email])
    return [isBuyer, isBuyerLoading]
}

export default useBuyer;